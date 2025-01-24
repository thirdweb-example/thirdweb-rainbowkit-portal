"use client";

import Image from "next/image";
import { ConnectButton, SiteLink } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { mainnet } from "thirdweb/chains";

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex flex-col gap-12 items-center justify-center mb-20">
          <div className="flex flex-col gap-4 items-center justify-center max-w-md text-center">
            <p>1. Connect normally to your thirdweb app.</p>
            <ConnectButton
              client={client}
              appMetadata={{
                name: "Example App",
                url: "https://example.com",
              }}
              accountAbstraction={{
                sponsorGas: true,
                chain: mainnet
              }}
            />
          </div>


          <div className="flex flex-col gap-4 items-center max-w-md text-center justify-center">
            <p>2. Use {" "}<code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
              SiteLink
            </code>{" "} to persist your wallet connection through to the RainbowKit site.</p>
            <SiteLink
              href="http://localhost:3001"
              client={client}
              className="bg-blue-600 hover:bg-blue-500 transition-colors text-white py-2 px-4 rounded-md"
            >
              Visit Rainbow Site
            </SiteLink>
          </div>
        </div>

        <ThirdwebResources />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb{" "}
        <span className="inline-block -skew-x-6 text-blue-500"> RainbowKit </span>
        {" "}Portal
      </h1>

      <p className="text-zinc-300 text-base">
        Read the{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          README.md
        </code>{" "}
        file to get started.
      </p>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Learn more about SiteLink"
        href="https://portal.thirdweb.com/react/v5/SiteLink"
        description="Learn about the SiteLink component and how to use it."
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
