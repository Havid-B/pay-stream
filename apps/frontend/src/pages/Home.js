import React from "react";

export default function Home() {

 

  return (
    <div className="align-middle text-center text-banner -mt-12">
      <div className="flex bg-docsGrey text-white h-screen pt-20 pb-2">
        <div className="grow self-center">
          <h1 className="text-5xl font-extrabold dark:text-docsGrey-900">
            Stream With Benefits
          </h1>
          <p className="mb-6 mt-6 text-lg font-extrabold  font-normal text-docsGrey-500 lg:text-xl sm:px-16 xl:px-48 dark:text-docsGrey-400">
          </p>
          <div className="flex justify-evenly m-20">
            <div className="p-8">
              <h3 className="text-3xl font-bold dark:text-white mb-2">
                Tipping
              </h3>
              <p className="mb-3 text-lg font-light text-docsGrey-400 md:text-xl dark:text-docsGrey-400">
                Happy viewers can give you a tip
              </p>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold dark:text-white mb-2">
                Sell Video Rights
              </h3>
              <p className="mb-3 text-lg font-light text-docsGrey-400 md:text-xl dark:text-docsGrey-400">
                Get paid the price you set and handover claim to future tippings on the content
              </p>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold dark:text-purple mb-2">
                Fee
              </h3>
              <p className="mb-3 text-lg font-light text-docsGrey-400 md:text-xl dark:text-docsGrey-400">
                As a creator, uploading a new content is free. Tippers and Buyers do not pay any hidden fees. To keep the platform running, we take a small bite(0.1%) from every tip and purchase
              </p>
            </div>
            
          </div>
          <h3 className="text-3xl font-bold dark:text-white">            
            <mark className="px-1 text-docsGrey-900 bg-white rounded dark:bg-docsGrey-900 dark:text-purple">
            <a href="/upload">Upload Video </a>
            </mark>

            <br></br>
            <br></br>
            <mark className="px-1 text-docsGrey-900 bg-white rounded dark:bg-docsGrey-900 dark:text-purple">
            <a href="/explore">Explore Videos </a>
            </mark>
          </h3>
        </div>
      </div>

    </div>
  );
}
