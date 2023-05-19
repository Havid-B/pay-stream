import { Nft721MarketPlace } from "pay-stream-sdk";
import { useState } from "react";
import "../../index.css";
import { UploadVideoForm } from "../../components/Collectibles/UploadVideoForm";
import { MintERC721Request } from "pay-stream-sdk";
import { useMetaMask } from "metamask-react";


export default function UploadVideo() {

  const {ethereum}  = useMetaMask();
  
  const [transactionHash, setTransactionHash] = useState("");

  const uploadVideo = async (request: Partial<MintERC721Request>, price, sellable, chainId: number ) => {

    const hash: any = await Nft721MarketPlace.mint(request,  price, sellable, chainId, ethereum);
    console.log('Mint hash => ', hash);
    setTransactionHash(hash);
  }

  return (
    <div className="align-middle text-center text-banner mb-24">
      <div style={{ padding: 20 }} className="h-screen flex ">
        <div className="grow space-y-10 self-start">
          <UploadVideoForm onSubmit={uploadVideo} transactionHash={transactionHash}/>
        </div>
      </div>
    </div>
  );
}
