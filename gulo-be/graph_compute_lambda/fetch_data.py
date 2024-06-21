import logging
import requests
from queries import GET_ALL_STREAMS_QUERY

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def fetch_all_streams(endpoint, skip):
    try:
        response = requests.post(
            endpoint, json={"query": GET_ALL_STREAMS_QUERY, "variables": {"skip": skip}}
        )
        response.raise_for_status()
        data = response.json()
        return data.get("data", {}).get("streams", [])
    except Exception as e:
        logger.error("Error fetching streams from endpoint: %s", e)
        raise


def process_graph_data(existing_nodes, existing_edges, streams):
    unique_nodes = {node["id"]: node for node in existing_nodes}
    unique_edges = {f"{edge['from']}-{edge['to']}": edge for edge in existing_edges}

    for stream in streams:
        sender = stream["sender"]
        recipient = stream["recipient"]
        edge_key = f"{sender}-{recipient}"

        if sender not in unique_nodes:
            unique_nodes[sender] = {"id": sender, "label": sender, "title": sender}

        if recipient not in unique_nodes:
            unique_nodes[recipient] = {
                "id": recipient,
                "label": recipient,
                "title": recipient,
            }

        if edge_key not in unique_edges:
            unique_edges[edge_key] = {"from": sender, "to": recipient}

    return {
        "nodes": list(unique_nodes.values()),
        "edges": list(unique_edges.values()),
        "streamCount": len(streams),
    }
