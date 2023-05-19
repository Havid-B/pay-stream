import { ExternalProvider } from "@ethersproject/providers";

export type AccountToken = {
  tokenContractAddress: string | null
  tokenName: string | null
  tokenSymbol: string | null
  rawBalance: string | null
  formattedBalance: string | undefined
}

export type PKeyOrProvider = ExternalProvider | string 