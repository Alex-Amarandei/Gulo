GET_ALL_STREAMS_QUERY = """
query getAllStreams($skip: Int!) {
  streams(
    skip: $skip
    orderBy: timestamp
    orderDirection: asc
  ) {
    alias
    sender
    recipient
    timestamp
    startTime
    endTime
    cliffTime
    cliffAmount
    cancelable
    canceled
    canceledTime
    depositAmount
    intactAmount
    withdrawnAmount
  }
}
"""
