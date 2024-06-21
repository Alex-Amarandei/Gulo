from typing import List, Dict


class GraphStream(Dict):
    sender: str
    recipient: str


class CachedGraphData(Dict):
    nodes: List[Dict]
    edges: List[Dict]
