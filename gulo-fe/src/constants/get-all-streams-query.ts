const GET_ALL_STREAMS_QUERY = `
query getAllStreams($skip: Int!) {
  streams(
    skip: $skip
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
}`;

export default GET_ALL_STREAMS_QUERY;
