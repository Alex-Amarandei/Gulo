const GET_STREAMS_QUERY = `
query getStreams_BySender_Or_ByRecipient($recipient: Bytes!, $sender: Bytes!) {
  streams(
    orderBy: subgraphId
    orderDirection: desc
    where: {
      or: [
        {sender: $sender}, 
        {proxender: $sender}, 
        {recipient: $recipient},
      ]
    }
  ) {
    id
    tokenId
    subgraphId
    chainId
    alias
    category
    sender
    recipient
    depositAmount
    startTime
    endTime
    cliffTime
    cliffAmount
    cancelable
    canceled
    canceledTime
    intactAmount
    withdrawnAmount
    asset {
      id
      address
      chainId
      decimals
      name
      symbol
    }
    batch {
      id
      label
      size
    }
    contract {
      id
      address
      category
      version
    }
    segments {
      id
      position
      amount
      exponent
      milestone
      endTime
      startTime
      startAmount
      endAmount
    }
  }
}`;

export default GET_STREAMS_QUERY;
