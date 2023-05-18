import { getBundlr } from "./get-bundlr";

/**
 * Function to upload metadata to Bundlr. The function signature is defined
 * by Lens. The Lens React hooks automatically generate metadata, which
 * is passed to this function for upload. This function then returns an URL
 * to the uploaded metadata which is automatically posted to Lens.
 *
 * @param {*} data Data to be uploaded, JSON formatted metadata
 * @returns A URL to the recently uploaded metadata.
 */
export const upload = async (data) => {
  //set up unique app id - required when working with Lens
  //required now, may be automatic in future versions
  data.appId = "onlybundlr";
  const bundlr = await getBundlr();
  try {
    const serialized = JSON.stringify(data);
    //get the size of the serialized data after converting to
    //a blob, find the size.
    const price = await bundlr.getPrice(new Blob([serialized]).size);
    const balance = await bundlr.getLoadedBalance();

    //ensure enough funds to upload data
    if (price.isGreaterThanOrEqualTo(balance)) {
      console.log("Funding the upload..");
      await bundlr.fund(price);
    } else {
      console.log("Sufficient funds for upload");
    }
    const tx = await bundlr.upload(serialized, {
      tags: [{ name: "Content-type", value: "application/json" }],
    });

    console.log(`JSON uploaded to https://arweave.net/${tx.id}`);
    return "https://arweave.net/" + tx.id;
  } catch (err) {
    console.log("Error in uploading.." + err);
  }
};
