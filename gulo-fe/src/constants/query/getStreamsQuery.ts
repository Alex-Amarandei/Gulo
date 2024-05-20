const getStreamsQuery = `
query getStreams_BySender_Or_ByRecipient($first: Int!, $skip: Int!, $recipient: Bytes!, $sender: Bytes!, $subgraphId: BigInt!) {
  streams(
    first: $first
    skip: $skip
    orderBy: subgraphId
    orderDirection: desc
    where: {
      or: [
        {and: [{sender: $sender}, {subgraphId_lt: $subgraphId}]}, 
        {and: [{proxender: $sender}, {subgraphId_lt: $subgraphId}]}, 
        {and: [{recipient: $recipient}, {subgraphId_lt: $subgraphId}]}
      ]
    }
  ) {
    id
    tokenId
    subgraphId
    chainId
    alias
    category
    funder
    sender
    recipient
    hash
    timestamp
    depositAmount
    startTime
    endTime
    cliff
    cliffTime
    cliffAmount
    cancelable
    renounceTime
    canceled
    canceledTime
    withdrawnAmount
    intactAmount
    position
    proxied
    proxender
    transferable
    version
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

export default getStreamsQuery;
