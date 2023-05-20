- [Click to View DEMO](https://bit.ly/3Mj81x7)
- [Click to View deployed NFT Marketplace Contract](https://alfajores.celoscan.io/address/0x7daaf9b1b46eeb8309c9652c4d11600dbf66574f)


<img width="1186" alt="image" src="https://github.com/Havid-B/pay-stream/assets/86498114/d8bf19c7-5fa7-4490-aad3-59891715458f">

### Apps and Packages

- [api](https://github.com/Havid-B/pay-stream/tree/main/apps/api): a nestjs server
- [frontend](https://github.com/Havid-B/pay-stream/tree/main/apps/frontend): a create-react-app for user-facing site
- [pay-stream-sdk](https://github.com/Havid-B/pay-stream/tree/main/packages/pay-stream-sdk): a typescript library that contains the [Nft Market Place contract](https://github.com/Havid-B/pay-stream/blob/main/packages/pay-stream-sdk/contracts/nft/LIQ_ERC721_Market_Place.sol) created for Pay Stream and other functions to facilitate blockchain interaction including the deployment of the Nft Market Place Contract for Pay Stream
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).


## Tools used

- Spheron CLI was used to deploy the front end to Spheron Cloud
- Videos are hosted using Spheron Storage SDK which is used in an API


### Develop
- rename env.example in [apps/frontend](https://github.com/Havid-B/pay-stream/blob/main/apps/frontend/.env-example) and [apps/api](https://github.com/Havid-B/pay-stream/blob/main/apps/api/.env.example) to .env (You can use the values there as is)
- To develop all apps and packages, run the following command in the root folder:

```
yarn install
yarn dev
```


### Build


```
yarn build
```

