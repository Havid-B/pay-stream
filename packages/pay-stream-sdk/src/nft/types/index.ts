export interface NftInContract {
    "chain": string,
    "tokenId": string,
    "tokenAddress": string,
    "tokenType": string,
    "metadataURI": string,
    "metadata": {
    "name": string,
    "description": string,
    "image": string
  }
}

export interface CreateERC721CollectionRequest {
  tokenName: string;
  tokenSymbol: string;
}

export interface MintERC721Request {
  contractAddress: string;
  recipient: string;
  uri: string;
}
