# PAY STREAM (Click to [Visit](https://tipstream-740d17.spheron.app/))

Get Paid for your video content. 

<img width="1633" alt="image" src="https://user-images.githubusercontent.com/76119744/226216327-b6a1202e-f9e9-4336-9305-0e270257fa94.png">

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



