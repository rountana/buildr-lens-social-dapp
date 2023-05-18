import { getBundlr } from "./get-bundlr";

// gets the loaded balance in MATIC, not atomic units
/**
 * Gets the balance the user has already loaded on the specified
 * Bundlr node. Balance returned is in standard MATIC units, not atomic units.
 *
 *
 * @returns Balance loaded on the node for current user.
 */
export const getBalanceMatic = async () => {
  try {
    const bundlr = await getBundlr();
    const atomicBalance = await bundlr.getLoadedBalance();
    return bundlr.utils.fromAtomic(atomicBalance).toString();
  } catch (err) {
    console.log("Error fetching balance : " + err);
  }
};
