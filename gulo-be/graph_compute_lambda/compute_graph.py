import logging
from s3_cache import get_cache_from_s3, save_cache_to_s3
from fetch_data import fetch_all_streams, process_graph_data

logger = logging.getLogger()
logger.setLevel(logging.INFO)

GRAPH_KEY = lambda chain_id: f"streams/{chain_id}/graph.json"
STREAMS_KEY = lambda chain_id: f"streams/{chain_id}/streams.json"
MAX_SKIP = 5000
MAX_FETCH = 100


def compute_graph(chain_id, endpoint, initial_skip):
    try:
        logger.info(f"Fetching streams from endpoint with skip: {initial_skip}")
        streams = fetch_all_streams(endpoint, initial_skip)
        logger.info(f"Fetched {len(streams)} streams")

        if not streams or len(streams) == 0:
            logger.info("No new streams fetched, no update needed")
            return {"message": "No new streams fetched, no update needed"}

        logger.info("Fetching streams cache from S3...")
        streams_cache = get_cache_from_s3(STREAMS_KEY(chain_id))
        existing_streams_count = streams_cache.get("count", 0)
        logger.info(f"Streams cache found with {existing_streams_count} streams.")

        all_streams = streams_cache.get("streams", [])
        skip = existing_streams_count
        has_more = True
        has_new_streams = False

        all_streams.extend(streams)
        skip += len(streams)
        logger.info(f"Total streams so far: {len(all_streams)}")

        last_timestamp = streams[-1]["timestamp"] if streams else None

        while has_more:
            if skip < MAX_SKIP:
                current_skip = min(skip, MAX_SKIP)
                logger.info(f"Fetching streams from endpoint with skip: {current_skip}")
                streams = fetch_all_streams(endpoint, current_skip)
            else:
                logger.info(
                    f"Fetching streams from endpoint with timestamp_gt: {last_timestamp}"
                )
                streams = fetch_all_streams(endpoint, 0, timestamp_gt=last_timestamp)

            logger.info(f"Fetched {len(streams)} streams")

            if not streams or len(streams) == 0:
                has_more = False
            else:
                all_streams.extend(streams)
                skip += len(streams)
                logger.info(f"Total streams so far: {len(all_streams)}")
                has_new_streams = True
                last_timestamp = streams[-1]["timestamp"]

        if has_new_streams:
            logger.info("New streams detected, saving updated streams cache to S3...")
            save_cache_to_s3(
                STREAMS_KEY(chain_id),
                {"count": len(all_streams), "streams": all_streams},
            )
            logger.info("Updated streams cache saved to S3")

        cache_key = GRAPH_KEY(chain_id)
        logger.info("Fetching graph cache from S3...")
        cached_graph_data = get_cache_from_s3(cache_key)

        existing_nodes = cached_graph_data.get("nodes", [])
        existing_edges = cached_graph_data.get("edges", [])

        if has_new_streams or not existing_nodes or not existing_edges:
            logger.info("Recomputing graph data...")
            graph_data = process_graph_data(existing_nodes, existing_edges, all_streams)
            graph_data["streamCount"] = len(all_streams)
            logger.info("Graph data recomputed, saving to S3...")
            save_cache_to_s3(cache_key, graph_data)
            logger.info("Graph data saved to S3")
        else:
            logger.info("Using cached graph data")
            graph_data = cached_graph_data
            graph_data["streamCount"] = len(all_streams)

        return graph_data

    except Exception as e:
        logger.error("Error in compute graph: %s", e)
        raise
