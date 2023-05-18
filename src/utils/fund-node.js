import { getBundlr } from "./get-bundlr";

/**
 * Funds a Bundlr node the specified amount.
 * Note: The currency (token) used is the currency specified when
 * creating the Bundlr object in the file `get-bundlr.js`.
 *
 * @param {*} fundAmount About to fund, value in standard units. Value will automatically
 * be coverted to atomic units.
 * @returns "Node funded" if successful or an error message.
 */
export const fundNode = async (fundAmount) => {
  try {
    const bundlr = await getBundlr();
    const fundAmountAtomic = bundlr.utils.toAtomic(fundAmount);
    const tx = await bundlr.fund(fundAmountAtomic);
    return "Node funded";
  } catch (err) {
    console.log("Error in funding bundlr: " + err);
    return "Error in funding" + err;
  }
};
