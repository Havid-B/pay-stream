import {
  CreateERC721CollectionRequest,
  MintERC721Request,
} from "./types";
import { AddressZero } from "@ethersproject/constants";
import { ethers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";
import { 
  ERC721MarketPlace__factory,
} from "../../typechain-types";
import { getChainProvider } from "../factory/chain-provider";
import { getWallet } from "../common/utils";
import { formatEther, parseEther } from "ethers/lib/utils";
export abstract class Nft721MarketPlace {


  public static async create(
    { tokenName, tokenSymbol }: CreateERC721CollectionRequest,
    platformFee: number, // 100 is same as 1%, 1000 is same as 0.1%
    feeCollector: string,
    chainId: number,
    provider: ExternalProvider,
  ): Promise<string> {
    const wallet = await getWallet(provider, chainId);

    let contractFactory;
    let args = [tokenName,tokenSymbol,platformFee,feeCollector];

    
    contractFactory = new ethers.ContractFactory(
      ERC721MarketPlace__factory.abi,
      ERC721MarketPlace__factory.bytecode,
      wallet
    );


    const tx = contractFactory.getDeployTransaction(...args);

    return (
      await (await getWallet(provider, chainId)).sendTransaction(
        tx
      )
    ).hash;

  }

  public static async mint(
    { contractAddress, uri }: Partial<MintERC721Request>,
    price: string,
    sellable: boolean,
    chainId: number,
    provider: ExternalProvider,
  ): Promise<string> {
    const contract = ERC721MarketPlace__factory.connect(
      AddressZero,
      await getChainProvider(chainId)
    ).attach(contractAddress!);

    const wallet = await getWallet(provider, chainId);

    console.log('price => ',   price);
    console.log('got here1 ==> ', parseEther(price));
    console.log(uri);
    const tx = await contract.populateTransaction.safeMint(uri!,  parseEther(price), sellable);
    console.log('got here2');

    return (
      await wallet.sendTransaction(
        tx
      )
    ).hash;
  }

  public static async isMarketPlaceApproved(
    contractAddress: string,
    chainId: number,
    provider: ExternalProvider,
  ): Promise<boolean> {
    const contract = ERC721MarketPlace__factory.connect(
      AddressZero,
      await getChainProvider(chainId)
    ).attach(contractAddress!);

    const wallet = await getWallet(provider, chainId);
    const owner = await wallet.getAddress();
    console.log('owner is  => ', owner);

    return await contract.isApprovedForAll(owner, contractAddress);
  }

  public static async approveMarketPlace(
    contractAddress: string,
    chainId: number,
    provider: ExternalProvider,
  ): Promise<string> {
    const contract = ERC721MarketPlace__factory.connect(
      AddressZero,
      await getChainProvider(chainId)
    ).attach(contractAddress!);

    const wallet = await getWallet(provider, chainId);

    const tx = await contract.populateTransaction.setApprovalForAll(contractAddress, true);

    return (
      await wallet.sendTransaction(
        tx
      )
    ).hash;

  }

  
  public static async tip(
    contractAddress: string,
    tokenID: string,
    amount: string,
    chainId: number,
    provider: ExternalProvider,
  ): Promise<string> {
    const contract = ERC721MarketPlace__factory.connect(
      AddressZero,
      await getChainProvider(chainId)
    ).attach(contractAddress!);

    const wallet = await getWallet(provider, chainId);

    const tx = await contract.populateTransaction.tipCreator(tokenID);

    return (
      await wallet.sendTransaction(
        {
        ...tx,
        value: parseEther(amount).toString()
        },
      )
    ).hash;
  }

  public static async buy(
    contractAddress: string,
    tokenID: string,
    newPrice: string,
    sellable: boolean,
    chainId: number,
    provider: ExternalProvider,
  ): Promise<string> {
    const contract = ERC721MarketPlace__factory.connect(
      AddressZero,
      await getChainProvider(chainId)
    ).attach(contractAddress!);

    const wallet = await getWallet(provider, chainId);
    
    const tx = await contract.populateTransaction.buyNft(tokenID, parseEther(newPrice), sellable);
    const tokenInfo = await contract.tokensInfo(tokenID);
    const price = tokenInfo.price;

    return (
      await wallet.sendTransaction(
        {
          ...tx,
          value: price.toString()
        },
      )
    ).hash;
  }

  public static async tokenInfo(
    contractAddress: string,
    tokenID: string,
    chainId: number,
  ) {
    const contract = ERC721MarketPlace__factory.connect(
      AddressZero,
      await getChainProvider(chainId)
    ).attach(contractAddress!);
    
    const tokenInfo = await contract.tokensInfo(tokenID);
    const price = formatEther(tokenInfo.price);

    return {...tokenInfo, price};
  }

}
