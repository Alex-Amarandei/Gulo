import os
from datetime import datetime, timezone
from s3_cache import get_token_price_from_s3, save_token_price_to_s3
from api import fetch_token_price_from_cmc
from utils import create_response
import logging

BUCKET_NAME = os.environ["S3_BUCKET_NAME"]

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def lambda_handler(event, context):
    query_params = event.get("queryStringParameters", {})
    ticker = query_params.get("ticker")
    if not ticker:
        logger.error("Missing ticker in the request")
        return create_response(400, "Missing ticker in the request")

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    s3_key = f"tokens/{ticker}/{today}.txt"

    logger.info(f"Checking S3 for cached price of {ticker} on {today}")

    token_price = get_token_price_from_s3(BUCKET_NAME, s3_key)
    if token_price is not None:
        logger.info(f"Found cached price for {ticker}: {token_price}")
        return create_response(200, {"price": token_price})

    logger.info(f"Cached price for {ticker} not found, fetching from CoinMarketCap")

    token_price = fetch_token_price_from_cmc(ticker)
    if token_price is None:
        logger.error(f"Failed to fetch price for {ticker} from CoinMarketCap")
        return create_response(500, "Failed to fetch price from CoinMarketCap")

    save_token_price_to_s3(BUCKET_NAME, s3_key, token_price)
    logger.info(f"Saved price for {ticker} to S3: {token_price}")

    return create_response(200, {"price": token_price})
