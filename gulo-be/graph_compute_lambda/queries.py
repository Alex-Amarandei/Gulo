GET_ALL_STREAMS_QUERY = """
query getAllStreams($skip: Int, $timestamp_gt: BigInt) {
  streams(
    skip: $skip
    where: { timestamp_gt: $timestamp_gt }
    orderBy: timestamp
    orderDirection: asc
  ) {
    ...StreamFragment
  }
}

fragment StreamFragment on Stream {
  alias
  sender
  recipient
  timestamp
}
"""
