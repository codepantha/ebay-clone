import type { NextPage } from 'next';
import {
  useActiveListings,
  useContract,
  MediaRenderer
} from '@thirdweb-dev/react';
import { ListingType } from '@thirdweb-dev/sdk';
import { GiBanknote } from 'react-icons/gi';
import { HiOutlineClock } from 'react-icons/hi';

import Header from '../components/Header';

const Home: NextPage = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    'marketplace'
  );
  const { data: listings, isLoading: loadingListings } =
    useActiveListings(contract);

  return (
    <div className="">
      <Header />

      <main className="max-w-6xl mx-auto p-2">
        {loadingListings ? (
          <p className="text-center animate-pulse text-blue-500">
            Loading listings...
          </p>
        ) : (
          <div className="listingContainer">
            {listings?.map((listing) => (
              <div key={listing.id} className="listingItem">
                <div className="listingItemImageContainer">
                  <MediaRenderer
                    className="w-44 mx-auto"
                    src={listing.asset.image}
                  />
                </div>

                <div className="pt-2 space-y-4">
                  <div>
                    <h2 className="text-lg truncate">{listing.asset.name}</h2>
                    <hr />
                    <p className="truncate text-sm text-gray-600 mt-2">
                      {listing.asset.description}
                    </p>
                  </div>

                  <p>
                    <span className="font-bold mr-1">
                      {listing.buyoutCurrencyValuePerToken.displayValue}
                    </span>
                    {listing.buyoutCurrencyValuePerToken.symbol}
                  </p>

                  <div
                    className={`flex items-center space-x-1 justify-end text-xs
                      border w-fit ml-auto p-2 rounded-md text-white ${
                        listing.type === ListingType.Direct
                          ? 'bg-blue-500'
                          : 'bg-red-500'
                      }`}
                  >
                    <p>
                      {listing.type === ListingType.Direct
                        ? 'Buy Now'
                        : 'Auction'}
                    </p>
                    {listing.type === ListingType.Direct ? (
                      <GiBanknote className="h-4" />
                    ) : (
                      <HiOutlineClock className="h-4" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
