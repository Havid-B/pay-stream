import { MintERC721Request, TransactionService } from "pay-stream-sdk";
import { useMetaMask } from "metamask-react";
import * as React from "react";
import { useState } from "react";
import { CHAIN_ID_NUM, CONTRACT_ADDRESS } from "../../constants";
import { postData } from "../../utils";
import ReactPlayer from 'react-player'

type Props = {
  onSubmit: (request: Partial<MintERC721Request>, price: string, sellable: boolean, chainId: number ) => void;
  transactionHash: string;
};

export const UploadVideoForm: React.FC<Props> = (props) => {

  const { onSubmit, transactionHash } = props;

  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [price, setPrice] = useState('0');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  React.useEffect(() => {
    if(!transactionHash) return;

    const interval= setInterval(async () => {
      const status = await TransactionService.getTransactionStatus(transactionHash, CHAIN_ID_NUM);
      if (status === "Transaction Successful") {
        alert("Video uploaded");
        clearInterval(interval);
      }
    }, 2000)

  }, [transactionHash])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    // Upload video
    const videoForm = new FormData();
    videoForm.append(
      'video',
      video,  
      'video'
    );
    let {link: videoUrl} = await postData(`${process.env.REACT_APP_API}/videos`, videoForm);

    console.log("VideoURL => ", videoUrl)

    const metadata = {
      name,description,videoUrl
    }

    const blob = new Blob([JSON.stringify(metadata)], { type: 'text/plain' });
    const metadataFile = new File([blob], 'metadata')
  


    // Upload metadata

    const metadataForm = new FormData();
    metadataForm.append(
      'metadata',
      metadataFile,
      'metadata'
    );
    const {link: uri} = await postData(`${process.env.REACT_APP_API}/metadatas`, metadataForm);

    console.log("URI => ", uri)
    
    onSubmit({contractAddress: CONTRACT_ADDRESS, uri: uri}, price, true, CHAIN_ID_NUM );
  };

  return (
    <div className="inline-flex" style={{ padding: 20 }}>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Upload Video
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Fill the form below to upload Video. 
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4" action="#">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Upload video
            </label>
            <input
              onChange={(event) => {
                setVideo(event.target.files[0]);
                setVideoUrl(URL.createObjectURL(event.target.files[0]))
              }}
              type="file"
              id="video"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
            <ReactPlayer url={videoUrl} width="320" height="240" controls />

            {/* <video width="320" height="240" controls>
              <source src={videoUrl}/>
              Your browser does not support the video tag.
            </video> */}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              id="name"
              placeholder="Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              type="text"
              id="description"
              placeholder="Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              type="text"
              id="price"
              placeholder="Price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:hover:bg-purple-700 dark:focus:ring-purple-900 mr-2 mb-2"
          >
            Upload Video
          </button>
        </form>
      </div>{" "}
    </div>
  );
};
