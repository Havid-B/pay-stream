import { getChainProvider } from "./factory/chain-provider";
import { TX_STATUS } from "./common/constants";

export abstract class TransactionService {

  public static async getTransactionStatus(
    hash: string,
    chainID: number,
    minBlockConfirmation = 0,
  ): Promise<string> {
    const chainProvider = await getChainProvider(chainID);
    const tx = await chainProvider.getTransaction(hash);
    if (!tx) throw Error(TX_STATUS.NOT_FOUND);
    if (
      tx.confirmations &&
      tx.confirmations > minBlockConfirmation
    ) {
      const { status } = await chainProvider.getTransactionReceipt(
        hash
      );
      if (Number(status) === 1) {
        return TX_STATUS.SUCCESS;
      } else {
        return TX_STATUS.FAILED;
      }
    }
    return TX_STATUS.NOT_CONFIRMED;
  }
}
