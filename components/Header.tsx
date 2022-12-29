import React from 'react';
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import Link from 'next/link';
import {
  HiChevronDown,
  HiOutlineBell,
  HiOutlineShoppingCart
} from 'react-icons/hi';
import { RxMagnifyingGlass } from 'react-icons/rx';
import Image from 'next/image';

type Props = {};

const Header = (props: Props) => {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  return (
    <section className="max-w-6xl mx-auto p-2">
      <nav className="flex justify-between">
        <div className="flex items-center space-x-2 text-sm">
          {address ? (
            <button onClick={disconnect} className="connectWalletBtn">
              Hi {address.slice(0, 5) + '...' + address.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWithMetamask} className="connectWalletBtn">
              Connect your wallet
            </button>
          )}
          <p className="headerLink">Daily Deals</p>
          <p className="headerLink">Help & Contact</p>
        </div>

        <div className="flex items-center space-x-4">
          <p className="headerLink hover:link">Ship to</p>
          <p className="headerLink hover:link">Sell</p>
          <p className="headerLink hover:link">Watchlist</p>

          <Link href="/addItem" className="flex items-center hover:link">
            Add to inventory
            <HiChevronDown className="h-4" />
          </Link>

          <HiOutlineBell className="h-6 w-6" />
          <HiOutlineShoppingCart className="h-6 w-6" />
        </div>
      </nav>

      <hr className="mt-2" />

      <section className="flex items-center space-x-2 py-5">
        <div className="h-16 w-16 sm:w-28 md:w-44 cursor-pointer flex-shrink-0">
          <Link href="/">
            <Image
              className="h-full w-full object-contain"
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png"
              width={100}
              height={100}
            />
          </Link>
        </div>

        <button className="hidden lg:flex items-center space-x-2 w-20">
          <p className="text-gray-600 text-sm">Shop by Category</p>
          <HiChevronDown className="h-4 flex-shrink-0" />
        </button>

        <div
          className="flex items-center flex-1 space-x-2 px-2 md:px-5 py-2
        border-black border-2"
        >
          <RxMagnifyingGlass className="w-5 text-gray-400" />
          <input
            className="flex-1 outline-none"
            type="text"
            placeholder="Search for anything"
          />
        </div>

        <button
          className="hidden sm:inline bg-blue-600 text-white px-5
            md:px-10 py-2 border-2 border-blue-600"
        >
          Search
        </button>
        <Link href="/createListing">
          <button
            className="border-2 border-blue-600 px-5 md:px-10 py-2
              text-blue-600 hover:bg-blue-600/50 hover:text-white"
          >
            List Item
          </button>
        </Link>
      </section>

      <hr />

      <section className="flex py-3 space-x-6 text-xs md:text-sm whitespace-nowrap justify-center px-6">
        <p className="headerLink hover:link">Home</p>
        <p className="headerLink hover:link">Electronics</p>
        <p className="headerLink hover:link">Music</p>
        <p className="headerLink hover:link hidden sm:inline">Computers</p>
        <p className="headerLink hover:link hidden sm:inline">Video Games</p>
        <p className="headerLink hover:link hidden md:inline">Home & Garden</p>
        <p className="headerLink hover:link hidden lg:inline">
          Health & Beauty
        </p>
        <p className="headerLink hover:link hidden lg:inline">
          Collectibles and Art
        </p>
        <p className="headerLink hover:link hidden lg:inline">Books</p>
        <p className="headerLink hover:link hidden xl:inline">Deals</p>
        <p className="headerLink hover:link hidden xl:inline">Other</p>
        <p className="headerLink hover:link">More</p>
      </section>
    </section>
  );
};

export default Header;
