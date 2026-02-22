"use client";

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// Using a standard public demo projectId for WalletConnect
const projectId = 'b56e46b5cca4ee0197d19e0750e32230';

const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

const metadata = {
    name: 'Pi DEX Premium',
    description: 'The premier decentralized exchange for the Pi Network utilizing $314.159 GCV.',
    url: 'http://localhost:3000',
    icons: ['https://pi.app/favicon.ico']
}

const ethersConfig = defaultConfig({
    metadata,
})

createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: false,
    themeMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#8b5cf6', // Electric Purple
    }
})

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
