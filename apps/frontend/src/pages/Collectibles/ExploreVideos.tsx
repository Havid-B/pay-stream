import { NftService } from "pay-stream-sdk";
import { useEffect, useState } from "react";
import { Videos } from "../../components/Collectibles/Videos";
import { CHAIN_ID_NUM, CONTRACT_ADDRESS } from "../../constants";
import "../../index.css";


export default function ExploreVideos() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videos: any = await NftService.getNftsForContract(CONTRACT_ADDRESS, CHAIN_ID_NUM, process.env.REACT_APP_TATUM_API_KEY);
      setVideos(videos);
    };

    fetchVideos();

  }, [])



  return (
    <div className="align-middle text-center text-banner mb-24">
      <div style={{ padding: 20 }} className="h-screen flex ">
        <div className="grow space-y-10 self-start">
          <Videos videos={videos}/>
        </div>
      </div>
    </div>
  );
}
