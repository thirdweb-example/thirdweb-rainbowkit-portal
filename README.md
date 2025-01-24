![repo-banner](https://github.com/user-attachments/assets/d8304886-bbf9-49b8-94c7-8c3c61192ba6)
# thirdweb to RainbowKit Wallet Portal

[<img alt="thirdweb SDK" src="https://img.shields.io/npm/v/thirdweb?label=Thirdweb SDK&style=for-the-badge&logo=npm" height="30">](https://www.npmjs.com/package/thirdweb)
[<img alt="Discord" src="https://img.shields.io/discord/834227967404146718.svg?color=7289da&label=discord&logo=discord&style=for-the-badge" height="30">](https://discord.gg/thirdweb)

With thirdweb's `SiteLink` component, users can open links to other sites you own without needing to reconnect their wallet.

## Getting Started

Navigate to the thirdweb app with, install its dependencies, and run the app:
```bash
cd thirdweb-app && pnpm i
pnpm dev
```

In a new terminal window, navigate to the RainbowKit app, install, and run the app:
```bash
cd rainbow-app && pnpm i
pnpm dev
```

Go to [http://localhost:3000](http://localhost:3000) in a browser. This is the thirdweb app, connect your wallet here.

Once your wallet is connected, click "Visit Rainbow Site". This will take you to the second app (make sure its running on port 3001) and after a moment, you'll be connected with the same wallet address.

https://github.com/user-attachments/assets/0a45cfc6-5193-4fbb-a945-89e39d022338

## How it Works

### The thirdweb app

The thirdweb app is just like any other app you'd build with the thirdweb SDK! There's no special configurations necessary as the `SiteLink` component does all the work. Just add it anywhere in your app:
```tsx
import { SiteLink } from "thirdweb/react";
 
<SiteLink
  href="https://thirdweb.com"
  client={thirdwebClient}
  ecosystem={{ id: "ecosystem.thirdweb" }}
>
  Visit Site
</SiteLink>;
```

> [!IMPORTANT]  
> Your thirdweb and RainbowKit sites must use the same client ID or ecosystem for the `SiteLink` or `SiteEmbed` components to work.

If you'd rather embed another site rather than link out to it, you can use the `SiteEmbed` component:

```tsx
import { SiteEmbed } from "thirdweb/react";
 
<SiteEmbed
  src="https://thirdweb.com"
  client={thirdwebClient}
  ecosystem={{ id: "ecosystem.thirdweb" }}
/>;
```

> [!TIP]
> Make sure the embedded site doesn't restrict usage as an iframe.

### The RainbowKit App

To allow your RainbowKit app to receive and establish the connection with your thirdweb wallet, we use the thirdweb wagmi adapter from the `@thirdweb-dev/wagmi-adapter` package.

From an already setup RainbowKit site, first add the `ThirdwebProvider` where you setup your wagmi and RainbowKit providers:

```tsx
import { ThirdwebProvider } from "thirdweb/react"

...

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <ThirdwebProvider>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </ThirdwebProvider>
    </WagmiProvider>
  );
}
```

Then, include the thirdweb in-app wallet connector in your wagmi config:

```tsx
import { createThirdwebClient, defineChain as thirdwebChain } from 'thirdweb';
...

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const config = createConfig({
  chains: [...],
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
    ...
  },
});
```

> [!NOTE]  
> We're using smart accounts in this example to keep the same wallet/address between the origin and destinations sites. If you're not using smart accounts in your origin site, just remove the `smartAccount` object from your connector.

That's all there is to it! You've now created a wallet portal between a thirdweb and RainbowKit site!

## Documentation

-   [React SDK](https://portal.thirdweb.com/react/v5)
-   [SiteLink](https://portal.thirdweb.com/react/v5/SiteLink)
-   [RainbowKit](https://www.rainbowkit.com/docs/introduction)
