import React, { useState } from 'react';
import {
  useAddress,
  useContract,
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
  useCreateAuctionListing,
  useCreateDirectListing
} from '@thirdweb-dev/react';

import Header from '../components/Header';
import { NFT } from '@thirdweb-dev/sdk';

type Props = {};

function createListing({}: Props) {
  const address = useAddress();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    'marketplace'
  );

  const { contract: collectionContract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    'nft-collection'
  );

  // nfts owned by authenticated user
  const ownedNFTs = useOwnedNFTs(collectionContract, address);

  const [selectedNFT, setselectedNFT] = useState<NFT>();

  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto p-10 pt-2">
        <h1 className="text-4xl font-bold">List an item</h1>
        <h2 className="text-xl font-semibold pt-5">
          Select an item you would like to sell
        </h2>

        <hr className="mb-5" />

        <p>Below you will find the NFTs that you own in your wallet</p>

        <div className="flex overflow-x-scroll space-x-2 p-4">
          {ownedNFTs?.data?.map((nft) => (
            <div
              key={nft.metadata.id}
              onClick={() => setselectedNFT(nft)}
              className={`flex flex-col ${
                selectedNFT?.metadata.id === nft.metadata.id
                  ? 'border-black'
                  : 'border-transparent'
              } space-y-2 card min-w-fit border-2 bg-gray-100`}
            >
              <MediaRenderer
                className="h-48 rounded-lg"
                src={nft.metadata.image}
              />
              <p className="text-lg truncate font-bold">{nft.metadata.name}</p>
              <p className="text-xs truncate">{nft.metadata.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default createListing;
