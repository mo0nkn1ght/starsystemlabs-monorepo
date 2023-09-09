import { BigNumber } from '@ethersproject/bignumber';
export const BIG_ZERO = BigNumber.from('0');

export const DISCORD_LINK = 'https://discord.gg/7ZgBpmKZ';
export const TWITTER_LINK = 'https://twitter.com/StarSystem_Labs';
export const TELEGRAM_LINK = 'https://t.me/starsystemlabs';

export const MAINNET_RPC = 'https://main-rpc.linkpool.io';

export const BSCMAIN_RPC = 'https://bsc-dataseed.binance.org/';
export const BSCTEST_RPC = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

export const TESTNET_RPC = 'https://rpc.ankr.com/eth_rinkeby';
export const GOERLI_RPC = 'https://rpc.ankr.com/eth_goerli';

export const NFT_ADDR = '';

export const WLUNC_ADDR = '0xECCF35F941Ab67FfcAA9A1265C2fF88865caA005';
export const WLUNC_DECIMAL = 18;
export const WLUNA_ADDR = '0x156ab3346823B651294766e23e6Cf87254d68962';
export const WLUNA_DECIMAL = 6;

export const AUTOBOT_ADDR = '0x4aF4653E533fD0e04ce5Eae7F8bEd177c1Dce30c';

export const MOONBASE_ADDR = '0x11f10aA5AD642F011E97c22B0737D99a311074cD';
export const MOONBASE_DECIMAL = 9;
export const METEOR_ADDR = '0xcC8b68eF0f460976b0eec86Af0552F29D354FD50';
export const METEOR_DECIMAL = 18;

// Go Eth Addresses Below

// export const WLUNC_ADDR = '0x6bE32fE90F002Ab60409c681d662530e9d6601B7';
// export const WLUNC_DECIMAL = 18;
// export const WLUNA_ADDR = '0x8250Bc4157DceB0Ec2D608FbD492c2B65A841b1F';
// export const WLUNA_DECIMAL = 6;

// export const AUTOBOT_ADDR = '0x0d1b7e3d74342201b6e29B870Bd9622304e33C98';

// export const MOONBASE_ADDR = '0x8043Bb94c51419b914017fa20FA9f814EfbdEa85';
// export const MOONBASE_DECIMAL = 9;
// export const METEOR_ADDR = '0xeA9aa4919AD22d363467a320a2c0D9C3619F8a88';
// export const METEOR_DECIMAL = 18;

export const MERKLE_TREE_DATA: {
  [address: string]: { leaf: string; proof: string[] };
} = {};
