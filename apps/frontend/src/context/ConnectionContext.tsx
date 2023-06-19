import { useMetaMask } from "metamask-react";
import { createContext, useEffect, useState } from "react";
import { CHAIN_ID_HEX, CHAIN_ID_NUM, CONTRACT_ADDRESS } from "../constants";
import { AccountService, MasaService, Nft721MarketPlace, TransactionService } from "pay-stream-sdk";

interface ConnectionContextValue {
    connected: any;
    connectWallet: () => void;
    userInfo: {celo_balance: string, address: string}
};

export const ConnectionContext = createContext<ConnectionContextValue>({
    connected:null,
    connectWallet: () => {},
    userInfo: null,
});

  export const ConnectionProvider = ({ children }) => {

    // connected user details
    const [userInfo, setUserInfo] = useState({
      celo_balance: '0',
      address: null,
      soulName: null,
    });

    const { status, connect, account, chainId, switchChain, ethereum } = useMetaMask();

    const getSoulName = async () => {
      let userSoulname = await MasaService.resolveAddress(ethereum);
      if(!userSoulname) {
        const inputValidSoulName = async (message: string) => {
          let input = window.prompt(message);
          let check =  await MasaService.isSoulNameValid(input, ethereum) as {isValid: boolean, message: string};
          while(!check.isValid) {
            input =  window.prompt(`${check.message}, Try again`);;
            check = await MasaService.isSoulNameValid(input, ethereum);
          }

          return input;
        }

        let soulName = await inputValidSoulName("First time using this site? Setup a soulName");
        let soulNameIsAvailable =  await MasaService.isSoulNameAvailable(soulName, ethereum);

        while(!soulNameIsAvailable) {
          soulName = await inputValidSoulName(`${soulName} already in use by someone else, Try another soulName`);
          soulNameIsAvailable = !await MasaService.isSoulNameAvailable(soulName, ethereum);
        }

        userSoulname = await MasaService.createSoulName(soulName, ethereum, process.env.REACT_APP_SOUL_NAME_CONTRACT_ADDRESS, process.env.REACT_APP_API);
      }

    }

    const getAccountDetails = async (account: string) => {
      const celoBalance = await AccountService.getBalance(account, CHAIN_ID_NUM);
      const soulName = await getSoulName();
      
      setUserInfo({
        celo_balance: celoBalance.rawBalance,
        address: account, 
        soulName,
      })
    }


    useEffect(() => {
      if (status === "unavailable")  alert("please use an etherum enabled browser");
      if (status === "notConnected") {
        setUserInfo({
          celo_balance: '0',
          address: null,
          soulName: null,
        });
        connect();
      }
      if (status === "connected") {
        if(chainId !== CHAIN_ID_HEX) {
          switchChain(chainId)
        }
        getAccountDetails(account)

        const func = async () =>  {
          if(await Nft721MarketPlace.isMarketPlaceApproved(CONTRACT_ADDRESS, CHAIN_ID_NUM, ethereum)) return;
          const transactionHash = await Nft721MarketPlace.approveMarketPlace(CONTRACT_ADDRESS, CHAIN_ID_NUM, ethereum);
  
          const interval= setInterval(async () => {
            const status = await TransactionService.getTransactionStatus(transactionHash, CHAIN_ID_NUM);
            if (status === "Transaction Successful") {
              alert("Market Place  is now approved to sell in your behalf");
              clearInterval(interval);
            }
          }, 2000)
        }
        func();
      }
    },[status, chainId, account])
  
    return (
        <ConnectionContext.Provider
          value={{
            connected: status === 'connected',
            connectWallet: connect,
            userInfo
          }}
        >
          {children}
        </ConnectionContext.Provider>
      );
};