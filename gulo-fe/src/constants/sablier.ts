import { StreamCategory } from '@/constants/enums';
import { Address } from 'viem';
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

export const TOKEN_URI_ABI = [
  {
    type: 'function',
    name: 'tokenURI',
    stateMutability: 'view',
    inputs: [{ name: 'streamId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: 'uri', type: 'string', internalType: 'string' }],
  },
] as const;

export const NEXT_STREAM_ID_ABI = [
  {
    type: 'function',
    name: 'nextStreamId',
    stateMutability: 'view',
    outputs: [{ name: 'nextStreamId', type: 'int', internalType: 'uint256' }],
  },
] as const;

export const CHAIN_CONTRACT_MAPPING: Record<Chain['id'], Record<StreamCategory, Address>> = {
  [mainnet.id]: {
    [StreamCategory.LockupLinear]: '0xAFb979d9afAd1aD27C5eFf4E27226E3AB9e5dCC9',
    [StreamCategory.LockupDynamic]: '0x7CC7e125d83A581ff438608490Cc0f7bDff79127',
  },
  [arbitrum.id]: {
    [StreamCategory.LockupLinear]: '0xFDD9d122B451F549f48c4942c6fa6646D849e8C1',
    [StreamCategory.LockupDynamic]: '0xf390cE6f54e4dc7C5A5f7f8689062b7591F7111d',
  },
  [avalanche.id]: {
    [StreamCategory.LockupLinear]: '0xB24B65E015620455bB41deAAd4e1902f1Be9805f',
    [StreamCategory.LockupDynamic]: '0x0310Da0D8fF141166eD47548f00c96464880781F',
  },
  [base.id]: {
    [StreamCategory.LockupLinear]: '0xFCF737582d167c7D20A336532eb8BCcA8CF8e350',
    [StreamCategory.LockupDynamic]: '0x461E13056a3a3265CEF4c593F01b2e960755dE91',
  },
  [blast.id]: {
    [StreamCategory.LockupLinear]: '0xcb099EfC90e88690e287259410B9AE63e1658CC6',
    [StreamCategory.LockupDynamic]: '0xDf578C2c70A86945999c65961417057363530a1c',
  },
  [bsc.id]: {
    [StreamCategory.LockupLinear]: '0x14c35E126d75234a90c9fb185BF8ad3eDB6A90D2',
    [StreamCategory.LockupDynamic]: '0xf900c5E3aA95B59Cc976e6bc9c0998618729a5fa',
  },
  [gnosis.id]: {
    [StreamCategory.LockupLinear]: '0xce49854a647a1723e8Fb7CC3D190CAB29A44aB48',
    [StreamCategory.LockupDynamic]: '0x1DF83C7682080B0f0c26a20C6C9CB8623e0Df24E',
  },
  [lightlinkPhoenix.id]: {
    [StreamCategory.LockupLinear]: '0x17c4f98c40e69a6A0D5c42B11E3733f076A99E20',
    [StreamCategory.LockupDynamic]: '0x49d753422ff05daa291A9efa383E4f57daEAd889',
  },
  [optimism.id]: {
    [StreamCategory.LockupLinear]: '0x4b45090152a5731b5bc71b5baF71E60e05B33867',
    [StreamCategory.LockupDynamic]: '0xd6920c1094eABC4b71f3dC411A1566f64f4c206e',
  },
  [polygon.id]: {
    [StreamCategory.LockupLinear]: '0x5f0e1dea4A635976ef51eC2a2ED41490d1eBa003',
    [StreamCategory.LockupDynamic]: '0xB194c7278C627D52E440316b74C5F24FC70c1565',
  },
  [scroll.id]: {
    [StreamCategory.LockupLinear]: '0x57e14AB4DAd920548899d86B54AD47Ea27F00987',
    [StreamCategory.LockupDynamic]: '0xAaff2D11f9e7Cd2A9cDC674931fAC0358a165995',
  },
  [sepolia.id]: {
    [StreamCategory.LockupLinear]: '0x7a43F8a888fa15e68C103E18b0439Eb1e98E4301',
    [StreamCategory.LockupDynamic]: '0xc9940AD8F43aAD8e8f33A4D5dbBf0a8F7FF4429A',
  },
  [zkSync.id]: {
    [StreamCategory.LockupLinear]: '0x2FcA69fa0a318EFDf4c15eE8F13A873347a8A8D4',
    [StreamCategory.LockupDynamic]: '0xE6c7324BEA8474209103e407779Eec600c07cF3F',
  },
};
