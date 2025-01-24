import { createThirdwebClient, defineChain as thirdwebChain } from 'thirdweb';
import { createConfig, http } from 'wagmi';
import { inAppWalletConnector } from "@thirdweb-dev/wagmi-adapter";
import {
  base,
  mainnet,
} from 'wagmi/chains';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    // add the in-app wallet connector
    inAppWalletConnector({
      client,
      smartAccount: {
        sponsorGas: true,
        chain: thirdwebChain(1)
      }
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
