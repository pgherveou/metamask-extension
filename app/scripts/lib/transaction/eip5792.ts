import { SendCalls } from '@metamask/eth-json-rpc-middleware/dist/methods/wallet-send-calls';
import { NetworkController } from '@metamask/network-controller';
import { rpcErrors } from '@metamask/rpc-errors';
import { TransactionController } from '@metamask/transaction-controller';
import { Hex, JsonRpcRequest } from '@metamask/utils';
import { PreferencesController } from '../../controllers/preferences-controller';

export async function processSendCalls(
  transactionController: TransactionController,
  networkController: NetworkController,
  params: SendCalls,
  req: JsonRpcRequest & { networkClientId: string },
) {
  const { calls, chainId: requestChainId, from } = params;
  const { networkClientId } = req;
  const transactions = calls.map((call) => ({ params: call }));

  const dappChainId =
    networkController.getNetworkClientById(networkClientId).configuration
      .chainId;

  if (
    requestChainId &&
    requestChainId.toLowerCase() !== dappChainId.toLowerCase()
  ) {
    throw rpcErrors.invalidInput(
      `Chain ID must match the dApp selected network: Got ${requestChainId}, expected ${dappChainId}`,
    );
  }

  const result = await transactionController.addTransactionBatch({
    from,
    networkClientId,
    transactions,
  });

  return result.batchId;
}

export function getTransactionReceiptsByBatchId(
  controller: TransactionController,
  batchId: string,
) {
  return controller.state.transactions
    .filter((tx) => tx.id === batchId)
    .map((tx) => tx.txReceipt);
}

export async function getCapabilities(
  transactionController: TransactionController,
  preferencesController: PreferencesController,
  address: Hex,
) {
  const atomicBatchChains = await transactionController.isAtomicBatchSupported(
    address,
  );

  const disabledChains =
    preferencesController.getDisabledAccountUpgradeChains();

  return atomicBatchChains
    .filter((chainId) => !disabledChains.includes(chainId))
    .reduce(
      (acc, chainId) => ({
        ...acc,
        [chainId]: {
          atomicBatch: {
            supported: true,
          },
        },
      }),
      {},
    );
}
