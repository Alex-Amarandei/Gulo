import os
import requests
import logging

CMC_API_KEY = os.environ["CMC_API_KEY"]
CMC_API_URL = os.environ.get(
    "CMC_API_URL",
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
)

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def fetch_token_price_from_cmc(token_ticker):
    headers = {"X-CMC_PRO_API_KEY": CMC_API_KEY}
    params = {"symbol": token_ticker, "convert": "USD"}

    logger.info(f"Fetching price for {token_ticker} from CoinMarketCap")

    response = requests.get(CMC_API_URL, headers=headers, params=params)
    data = response.json()

    if response.status_code != 200 or "data" not in data:
        logger.error(
            f"Failed to fetch price for {token_ticker} from CoinMarketCap: {data}"
        )
        return None

    price = data["data"][token_ticker]["quote"]["USD"]["price"]
    logger.info(f"Fetched price for {token_ticker}: {price}")
    return price
