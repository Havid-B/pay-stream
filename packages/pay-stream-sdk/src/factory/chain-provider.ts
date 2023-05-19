import { ethers } from "ethers";
import { CHAIN_IDS } from "../common/constants";
import { ExternalProvider, BaseProvider, Web3Provider } from "@ethersproject/providers";


const chainProviderCache: Record<number, BaseProvider> = {};

export async function getChainProvider(chainId: number, provider?: ExternalProvider): Promise<BaseProvider | Web3Provider> {
  if(provider) return new Web3Provider(provider);
  return chainProviderCache[chainId] ? chainProviderCache[chainId] : createChainProvider(chainId);
}

export function createChainProvider(chainId: number) {

  let chainProvider;
  if (chainId === CHAIN_IDS.CELO_TESTNET) {
    chainProvider = new ethers.providers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org" , CHAIN_IDS.CELO_TESTNET);
  }
  else {
    chainProvider = new ethers.providers.JsonRpcProvider("https://forno.celo.org" , CHAIN_IDS.CELO_MAINNET);
  }

  chainProviderCache[chainId] = chainProvider;
  return chainProvider
}
