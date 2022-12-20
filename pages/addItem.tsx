import { useAddress, useContract } from '@thirdweb-dev/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

import Header from '../components/Header';

type Props = {};

function addItem({}: Props) {
  const address = useAddress();
  const router = useRouter();
  const [preview, setPreview] = useState<string>('');
  const [image, setImage] = useState<File>();

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    'nft-collection'
  );

  const mintNft = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contract || !address) {
      console.log('no contract or address');
      return;
    }

    if (!image) {
      alert('Please select an image');
      return;
    }

    // extend the type definition for e.target by
    // tacking on our name and description values
    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };

    const metadata = {
      name: target.name.value,
      description: target.description.value,
      image: image
    };

    try {
      const tx = await contract.mintTo(address, metadata);
      // get the transaction receipt and id of the minted nft
      const { receipt, id: tokenId } = tx;
      // fetch details of minted nft
      const nft = await tx.data();
      console.log(receipt, tokenId, nft);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <main className="max-w-6xl p-10 border mx-auto">
        <h1 className="text-4xl fonot-bold">Add an Item to the Marketplace</h1>
        <h2 className="text-xl font-semibold pt-5">Item Details</h2>
        <p className="pb-5">
          By adding an item to the marketplace, you're essentially minting an
          NFT of the item into your wallet which we can then list for sale!
        </p>

        <div
          className="flex flex-col justify-center items-center
          md:flex-row md:space-x-5 pt-5"
        >
          <Image
            className="border h-80 w-80 object-fit"
            alt="nft image placeholder"
            src={
              preview ||
              `https://boltagency.ca/content/images/2020/03/placeholder-images-product-1_large.png`
            }
            width={100}
            height={100}
          />

          <form
            onSubmit={mintNft}
            className="flex flex-col flex-1 p-2 space-y-2"
          >
            <label className="font-light">Name of Item</label>
            <input
              className="formField"
              type="text"
              placeholder="Item name..."
              name="name"
              id="name"
            />

            <label className="font-light">Description</label>
            <input
              className="formField"
              type="text"
              placeholder="Enter description..."
              name="description"
              id="description"
            />

            <label className="font-light">Image of the Item</label>
            <input
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.files?.[0]) {
                  setPreview(URL.createObjectURL(target.files[0]));
                  setImage(target.files[0]);
                }
              }}
              className="formField"
              type="file"
            />

            <button
              type="submit"
              className="bg-blue-600 font-bold text-white rounded-full py-4
              px-10 w-56 md:mt-auto mx-auto lg:ml-auto"
            >
              Add / Mint Item
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default addItem;
