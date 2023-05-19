import { Nft721MarketPlace } from "pay-stream-sdk";


export function getPrivateKey(): string {
    return JSON.parse(localStorage.getItem("loginResponse")!).loginResponse.privateKey;
}

export const addressShortner = (address, shorter) => {
    if(shorter)
        return `${address.slice(0, 5)}...${address.slice(address.length - 4, address.length)}`
    return `${address.slice(0, 12)}.....${address.slice(address.length - 10, address.length)}`
}


export async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // mode: 'no-cors', // no-cors, *cors, same-origin
    body: data, // body data type must match "Content-Type" header
  });

  console.log('Response => ', response);
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function createNftMarketPlaceOnTestnet(provider) {
    const hash = await Nft721MarketPlace.create({tokenName: "PayStream", tokenSymbol:"PSTR"}, 1000, "0xfE1690c68D20F638FC319E5c8f53807ee661AE2e", 44787, provider);
    console.log('Hash => ',hash)
}