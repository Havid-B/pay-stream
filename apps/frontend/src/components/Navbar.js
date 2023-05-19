import React, { useContext, useEffect } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import Connected from "./Connected/Connected";
import Styles from "./navbar.module.css"
import { Nft721MarketPlace, TransactionService } from "pay-stream-sdk";
import { CHAIN_ID_NUM, CONTRACT_ADDRESS } from "../constants";
import { useMetaMask } from "metamask-react";

const Navbar = () => {
  const [address, setAddress] = React.useState("Sign in");
  const  {connectWallet, connected, userInfo } = useContext(ConnectionContext);
  const {ethereum} = useMetaMask()

  const [showNftMenu, setShowNftMenu] = React.useState(false);
  const [nftMenuClass, setNftMenuClass] = React.useState(
    "absolute z-10 hidden py-2 mt-1 bg-white rounded-md shadow-lg"
  );

  const setShowDropdown = () => {
    if (!showNftMenu) {
      setShowNftMenu(true);
      setNftMenuClass("absolute z-10 py-2 mt-1 bg-white rounded-md shadow-lg");
    } else {
      setShowNftMenu(false);
      setNftMenuClass(
        "absolute z-10 hidden py-2 mt-1 bg-white rounded-md shadow-lg"
      );
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("loginResponse")) {
      const connectedAccount = JSON.parse(
        localStorage.getItem("loginResponse")
      ).loginResponse;
      if (connectedAccount) {
        setAddress(
          String(connectedAccount.publicAddress).substr(0, 5) +
            "..." +
            String(connectedAccount.publicAddress).substr(38, 4)
        );
      }
    }
  }, [address]);


  console.log(nftMenuClass, "NFT MENU CLASS", showNftMenu);
  return (
    <nav className="px-2 bg-white border-docsGrey-200 dark:bg-docsGrey-900 sticky top-0 shadow-md mt-1 pt-2 pb-2 z-10">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <span className={Styles.logo}>PAY<span className={Styles.logo2}>STREAM</span></span>
        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex justify-center items-center ml-3 text-docsGrey-400 rounded-lg md:hidden hover:text-docsGrey-900 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:text-docsGrey-400 dark:hover:text-white dark:focus:ring-docsGrey-500"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col p-4 mt-4 bg-docsGrey-50 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-docsGrey-800 md:dark:bg-docsGrey-900 dark:border-docsGrey-700">
            <li>
              <a
                href="/#/"
                className="block py-2 pr-4 pl-3 text-purple bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0 md:dark:text-purple dark:bg-purple-600 md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/#/explore"
                className="block py-2 pr-4 pl-3 text-docsGrey-700 rounded hover:bg-docsGrey-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-docsGrey-400 md:dark:hover:text-white dark:hover:bg-docsGrey-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Explore
              </a>
            </li>
            <li>
              <a
                href="/#/upload"
                className="block py-2 pr-4 pl-3 text-docsGrey-700 rounded hover:bg-docsGrey-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-docsGrey-400 md:dark:hover:text-white dark:hover:bg-docsGrey-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Upload
              </a>
            </li>
            <li>
              {/* <a
                href="/auth"
                className="block py-2 pr-4 pl-3 text-purple-700 rounded hover:bg-purple-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-purple-400 md:dark:hover:text-white dark:hover:bg-purple-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {address}
              </a> */}
              <div className="">
            {connected ? <Connected
              celo_balance = {userInfo.celo_balance}
              address = {userInfo.address}
            /> : <button onClick={connectWallet} className={Styles.connect_btn}>Sign In</button>}
        </div>
            </li>
          </ul>
        </div>
        
      </div>
    </nav>
    
  );
};

export default Navbar;
