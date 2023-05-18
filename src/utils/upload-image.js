import fileReaderStream from "filereader-stream";
import { getBundlr } from "./get-bundlr";

/**
 * Uploads an image to Bundlr.
 *
 *
 * @param {*} fileToUpload The file to be uploaded.
 * @param {*} fileType The mime-type of the file to be uploaded.
 * @returns
 */
export const uploadImage = async (fileToUpload, fileType) => {
  const bundlr = await getBundlr();
  try {
    const dataStream = fileReaderStream(fileToUpload);
    //get an estimate of the cost of the upload for the data size
    const price = await bundlr.getPrice(dataStream.size);
    const balance = await bundlr.getLoadedBalance();

    //ensure enough funds to upload data
    if (price.isGreaterThanOrEqualTo(balance)) {
      console.log("Funding node");
      await bundlr.fund(price);
    }
    const tx = await bundlr.upload(dataStream, {
      tags: [{ name: "Content-type", value: fileType }],
    });

    console.log(`Image uploaded to https://arweave.net/${tx.id}`);
    return "https://arweave.net/" + tx.id;
  } catch (err) {
    console.log("Error in uploading.." + err);
  }
};
