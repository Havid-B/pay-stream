import { CHAIN_IDS } from "../common/constants";
import { NftInContract } from "./types";

export abstract class NftService {

  // Gets all Nfts minted from a contract. 
  // use the pageKey( returned with each response ) to request the next page of nfts
  // pageSize is 100 by default
  public static async getNftsForContract(
    contractAddress: string,
    chainID: number,
    tatumAPIKey: string,
    options?: {offset?: string, pageSize?: number},
  ): Promise<NftInContract[] | null> {
    try {
      const query = new URLSearchParams({
        chain: chainID === CHAIN_IDS.CELO_MAINNET ? 'celo' : 'celo-testnet',
        collectionAddresses: contractAddress,
        ...(!!options && {offset: options.offset, pageSize: `${options.pageSize}`})
      }).toString();
      
      const resp = await fetch(
        `https://api.tatum.io/v3/data/collections?${query}`,
        {
          method: 'GET',
          headers: {
            'x-api-key': tatumAPIKey
          }
        }
      );
      
      const data = await resp.json();
      console.log(data);
      return data;
    } catch (error) {
      return null;
    }
  }
}
