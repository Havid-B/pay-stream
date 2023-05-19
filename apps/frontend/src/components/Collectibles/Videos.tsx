import * as React from "react";
import {Nft721MarketPlace } from "pay-stream-sdk";
import { CHAIN_ID_NUM, CONTRACT_ADDRESS } from "../../constants";
import { useMetaMask } from "metamask-react";
import { NftInContract } from "pay-stream-sdk/dist/src/nft/types";
import ReactPlayer from "react-player";
import { createNftMarketPlaceOnTestnet } from "../../utils";


type Props = {
  videos: Array<NftInContract>;
};

export const Videos: React.FC<Props> = (props) => {

  const { ethereum } = useMetaMask();
  const [renderedVideos, setRenderedVideos] = React.useState([]);


  const { videos } = props;
  // const videos =[{metadata: {image:'http://google.com', name: 'Good video', description: 'Good description'}, id: '46'}]

  const buyVideo = async (id: string, newPrice: string) => {
    await Nft721MarketPlace.buy(CONTRACT_ADDRESS, id, newPrice, true, CHAIN_ID_NUM, ethereum);
    alert("Payment in progress");
    setTimeout(() => alert("Payment completed"), 2000);
  }

  const tipCreator = async (id: string) => {
    const tip = window.prompt("How much?");

    await Nft721MarketPlace.tip(CONTRACT_ADDRESS, id, tip, CHAIN_ID_NUM, ethereum);
    alert("Tip in progress");
    setTimeout(() => alert("Tipping completed"), 2000);
  }

  const renderVideos = async () => {
    let rows = [];
    if (videos.length > 0) {
      console.log('videos => ',  videos);
      rows =  videos.map( async (nft, index) => {
        console.log('one nft => ', nft);
        const tokenInfo = await Nft721MarketPlace.tokenInfo(CONTRACT_ADDRESS, nft.tokenId, CHAIN_ID_NUM)
        const {price} = tokenInfo;
        const metadata = await (await fetch(nft.metadataURI)).json();
        console.log('Metadata from  uri = > ', metadata);

        return (
          <div className="rounded  p-4 h-64" key={index}>
            <ReactPlayer url={metadata.videoUrl} width="320" height="240" controls />

            <div className="pt-2">
              <p className="text-xs">
                {" "}
                <b>Title:</b> {metadata.name}
              </p>
              <p className="text-xs">
                <b>Description:</b> {metadata.description}
              </p>
              <p className="text-xs">
               <b>Price:</b> {price}
              </p>
             <button onClick={ () => tipCreator(nft.tokenId)} >
                Tip
              </button>
              <button onClick={() => buyVideo(nft.tokenId, price)} >
                Buy
              </button>
            </div>
          </div>
        );
      });
    } else {
      return <p>No Videos available</p>;
    }

    const renderedVideos =  await Promise.all(rows);
    console.log(renderedVideos);
    setRenderedVideos(renderedVideos);
  };

  React.useEffect(() => {
    if(videos)
      renderVideos();
  },[videos])
  


  //https://flowbite.com/docs/images/examples/image-4@2x.jpg
  return (
    <div className="grid grid-cols-5 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {renderedVideos}
    </div>
  );
};
