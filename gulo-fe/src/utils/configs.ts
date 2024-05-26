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

export function getSablierSubgraphEndpoint(chain: Chain | undefined): string {
  switch (chain) {
    case mainnet:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2/';
    case arbitrum:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-arbitrum/';
    case avalanche:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-avalanche/';
    case base:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-base/';
    case blast:
      return 'https://api.studio.thegraph.com/query/57079/sablier-v2-blast/version/latest';
    case bsc:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-bsc/';
    case gnosis:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-gnosis/';
    case lightlinkPhoenix:
      return 'https://graph.phoenix.lightlink.io/query/subgraphs/name/lightlink/sablier-v2-lightlink';
    case optimism:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-optimism/';
    case polygon:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-polygon/';
    case scroll:
      return 'https://api.studio.thegraph.com/query/57079/sablier-v2-scroll/version/latest';
    case sepolia:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2-sepolia/';
    case zkSync:
      return 'https://api.studio.thegraph.com/query/57079/sablier-v2-zksync/version/latest';
    default:
      return 'https://api.thegraph.com/subgraphs/name/sablier-labs/sablier-v2/';
  }
}

export default WAGMI_CONFIG;
