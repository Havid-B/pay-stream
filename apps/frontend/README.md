# PAY STREAM (Click to [Visit](https://tipstream-740d17.spheron.app/))

Get Paid for your video content. 

[Click to View DEMO](https://bit.ly/3Mj81x7)

<img width="1186" alt="image" src="https://github.com/Havid-B/pay-stream/assets/86498114/d8bf19c7-5fa7-4490-aad3-59891715458f">

## Tools used

- Spheron CLI was used to deploy the front end to Spheron Cloud
- Videos are hosted using Spheron Storage SDK which is used in an API [backend]()
- Pay Stream SDK was used with an Nft Market place Module 

## Run the app

- `yarn install`
- Deploy your own Nft Market place contract like this 
`const hash = await Nft721MarketPlace.create({tokenName: "PayStream", tokenSymbol:"PaySTr"}, 
<enter fee rate, 100 means 1%, 1000 means 0.1%. etc>, <fee collector address>, 
<CHAIN_ID in decimal>,
<private key or ExternalProvider>);`

- Create a .env file like [this]()

- `yarn dev`



