import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  Chain,
  arbitrum,
  avalanche,
  base,
  blast,
  bsc,
  gnosis,
  lightlinkPhoenix,
  mainnet,
  optimism,
  polygon,
  scroll,
  sepolia,
  zkSync,
} from 'wagmi/chains';

const WAGMI_CONFIG = getDefaultConfig({
  appName: 'Gulo',
  projectId: 'a6bc9e7c5a90b4c17dee323e0efc3683',
  chains: [
    mainnet,
    arbitrum,
    avalanche,
    base,
    blast,
    bsc,
    gnosis,
    lightlinkPhoenix,
    optimism,
    polygon,
    scroll,
    sepolia,
    zkSync,
  ],
  ssr: true,
});

export const SABLIER_SUBGRAPH_ENDPOINTS: Record<Chain['id'], string> = {
  [mainnet.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2/',
  [arbitrum.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-arbitrum/',
  [avalanche.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-avalanche/',
  [base.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-base/',
  [blast.id]: 'https://api.studio.thegraph.com/query/57079/sablier-v2-blast/version/latest',
  [bsc.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-bsc/',
  [gnosis.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-gnosis/',
  [lightlinkPhoenix.id]: 'https://graph.phoenix.lightlink.io/query/subgraphs/name/lightlink/sablier-v2-lightlink',
  [optimism.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-optimism/',
  [polygon.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-polygon/',
  [scroll.id]: 'https://api.studio.thegraph.com/query/57079/sablier-v2-scroll/version/latest',
  [sepolia.id]: 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-sepolia/',
  [zkSync.id]: 'https://api.studio.thegraph.com/query/57079/sablier-v2-zksync/version/latest',
};

export default WAGMI_CONFIG;
