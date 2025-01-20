import aoPict from 'assets/ao-pictograph.svg';
import arconnect from 'assets/arconnect.png';
import arweaveApp from 'assets/arweave-app.svg';
import codehawksAudit from 'assets/codehawks-audit.svg';
import ethereum from 'assets/ethereum.svg';
import heroGraphic from 'assets/hero-graphic.svg';
import ipBlock from 'assets/ip-block.png';
import metamask from 'assets/metamask.png';
import morpheusAudit from 'assets/morpheus-audit.svg';
import nccAudit from 'assets/ncc-audit.svg';
import othent from 'assets/othent.svg';
import plus from 'assets/plus.svg';
import rabby from 'assets/rabby.png';
import renascenseAudit from 'assets/renascense-audit.svg';
import walletConnect from 'assets/wallet-connect.png';

import { getTxEndpoint } from './endpoints';
import { ArWalletEnum, EthWalletEnum } from './types';

export const AO = {
	token: 'm3PaWzK4PTG9lAaqYQPaPdOcXdO8hYqi5Fe9NWqXd0w',
	tokenMirror: 'ptCu-Un-3FF8sZ5zNMYg43zRgSYAGVkjz2Lb0HZmx2M',
	cred: 'Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc',
	aoClaim: 'U2Bv-LEoFzwAFfBx9MiXNnAfaYRjT4MG9T7sFcVHn20',
	stEthPriceOracle: 'rwxd1EuSzEVoy3qTlDRm7eMYPbOMrmQMajynVrA-ikk',
	daiPriceOracle: 'SVu0Atwg7FRQfQA1PUvhpTYsdBmXeJK8s_58retkdBg',
};

export const ETH_CONTRACTS = {
	stEth: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
	stEthBridge: '0xfE08D40Eee53d64936D3128838867c867602665c',
	dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
	daiBridge: '0x6A1B588B0684dACE1f53C5820111F400B3dbfeBf',
};

export const AO_TOKEN_DENOMINATION = Math.pow(10, 12);
export const ETH_TOKEN_DENOMINATION = Math.pow(10, 18);

export const ASSETS = {
	aoPict,
	arconnect,
	arweaveApp,
	plus,
	codehawksAudit,
	heroGraphic,
	ipBlock,
	metamask,
	morpheusAudit,
	nccAudit,
	othent,
	rabby,
	renascenseAudit,
	walletConnect,
	ethereum,
	add: getTxEndpoint('RLWnDhoB0Dd_X-sLnNy4w2S7ds3l9591HcHK8nc3YRw'),
	ao: getTxEndpoint('AzM59q2tcYzkySUUZUN1HCwfKGVHi--71UdoIk5gPUE'),
	arrow: getTxEndpoint('ghFL1fzQ2C1eEAnqSVvfAMP5Jikx7NKSPP5neoNPALw'),
	arweave: getTxEndpoint('LeeiCXkCDZKdh9uEfau2a13LziNGnT82anXFDW51Hgw'),
	checkmark: getTxEndpoint('mVnNwxm-F6CV043zVtORE-EaMWfd2j8w6HHX70IcVbI'),
	close: getTxEndpoint('BASlMnOWcLCcLUSrO2wUybQL_06231dLONeVkdTWs3o'),
	dai: getTxEndpoint('0fH_eBybJYRxjpjhJLiDoj8-7u7wYEHXtNElWEPb5is'),
	discord: getTxEndpoint('3X1BfFleeCZZdVZIx8DKDIblcLw7jzzRBCzSItlBy9E'),
	github: getTxEndpoint('7JXQVvywkWNFXAyAPJ8WdC5VSk7d0q0E-c-6v-oM3iM'),
	info: getTxEndpoint('QQ4EJ_wH2EY1_ElfSNKffixnzVcbnvd2547lmluvT-0'),
	logo: getTxEndpoint('kKG4pr1WCy9OdiKPe7TKTs_HYUzP0-BPWBMDFCpZtfE'),
	menu: getTxEndpoint('0La3-o2_gGMDbkfV4zVVUMjTYQ7Cn9YWQ2JO-FbjAIk'),
	pi: getTxEndpoint('n1AM_4usUnh6zj8GzdQDu1KkvC5XFlBLk7sKXgNHtos'),
	stEth: getTxEndpoint('0SmAFjMZ5BmFPB_wlPeVJLhWGZ9JqAlV3sNozIPV2yk'),
	wallet: getTxEndpoint('MMIDwWfe33ob3yD34eforpwPkhK-1BDVrTla6ZTX-3A'),
	x: getTxEndpoint('8j0KOYorbeN1EI2_tO-o9tUYi4LJkDwFCDStu0sWMV8'),
};

export const AR_WALLETS = [
	{ type: ArWalletEnum.arConnect, logo: ASSETS.arconnect },
	{ type: ArWalletEnum.othent, logo: ASSETS.othent },
	{ type: ArWalletEnum.arweaveApp, logo: ASSETS.arweaveApp },
];

export const ETH_WALLETS = [
	{ type: EthWalletEnum.metamask, logo: ASSETS.metamask },
	{ type: EthWalletEnum.rabby, logo: ASSETS.rabby },
];

export const DOM = {
	loader: 'loader',
	notification: 'notification',
	overlay: 'overlay',
};

export const STYLING = {
	cutoffs: {
		desktop: '1200px',
		initial: '1024px',
		max: '1400px',
		tablet: '840px',
		tabletSecondary: '768px',
		secondary: '540px',
	},
	dimensions: {
		button: {
			height: '40px',
			width: 'fit-content',
		},
		nav: {
			height: '75px',
		},
		radius: {
			primary: '10px',
			alt1: '15px',
			alt2: '5px',
			alt3: '2.5px',
		},
	},
};

function createURLs() {
	const base = `/`;
	const mint = `${base}mint/`;
	return {
		base: base,
		mint: mint,
		read: `${base}read/`,
		deposit: `${mint}deposit/`,
		withdraw: `${mint}withdraw/`,
		notFound: `${base}404`,
	};
}

export const URLS = createURLs();

export const WALLET_PERMISSIONS = ['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION', 'DISPATCH', 'SIGNATURE'];

export const IP_TOKEN = '04c286535ab4dc';

export const StEthBridge_ABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'address', name: 'previousAdmin', type: 'address' },
			{ indexed: false, internalType: 'address', name: 'newAdmin', type: 'address' },
		],
		name: 'AdminChanged',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'address', name: 'beacon', type: 'address' }],
		name: 'BeaconUpgraded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }],
		name: 'Initialized',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }],
		name: 'OverplusBridged',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'uint256', name: 'poolId', type: 'uint256' },
			{
				components: [
					{ internalType: 'uint128', name: 'payoutStart', type: 'uint128' },
					{ internalType: 'uint128', name: 'decreaseInterval', type: 'uint128' },
					{ internalType: 'uint128', name: 'withdrawLockPeriod', type: 'uint128' },
					{ internalType: 'uint128', name: 'claimLockPeriod', type: 'uint128' },
					{ internalType: 'uint128', name: 'withdrawLockPeriodAfterStake', type: 'uint128' },
					{ internalType: 'uint256', name: 'initialReward', type: 'uint256' },
					{ internalType: 'uint256', name: 'rewardDecrease', type: 'uint256' },
					{ internalType: 'uint256', name: 'minimalStake', type: 'uint256' },
					{ internalType: 'bool', name: 'isPublic', type: 'bool' },
				],
				indexed: false,
				internalType: 'struct IDistribution.Pool',
				name: 'pool',
				type: 'tuple',
			},
		],
		name: 'PoolCreated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'uint256', name: 'poolId', type: 'uint256' },
			{
				components: [
					{ internalType: 'uint128', name: 'payoutStart', type: 'uint128' },
					{ internalType: 'uint128', name: 'decreaseInterval', type: 'uint128' },
					{ internalType: 'uint128', name: 'withdrawLockPeriod', type: 'uint128' },
					{ internalType: 'uint128', name: 'claimLockPeriod', type: 'uint128' },
					{ internalType: 'uint128', name: 'withdrawLockPeriodAfterStake', type: 'uint128' },
					{ internalType: 'uint256', name: 'initialReward', type: 'uint256' },
					{ internalType: 'uint256', name: 'rewardDecrease', type: 'uint256' },
					{ internalType: 'uint256', name: 'minimalStake', type: 'uint256' },
					{ internalType: 'bool', name: 'isPublic', type: 'bool' },
				],
				indexed: false,
				internalType: 'struct IDistribution.Pool',
				name: 'pool',
				type: 'tuple',
			},
		],
		name: 'PoolEdited',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'address', name: 'implementation', type: 'address' }],
		name: 'Upgraded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'uint256', name: 'poolId', type: 'uint256' },
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'address', name: 'receiver', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'UserClaimed',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'uint256', name: 'poolId', type: 'uint256' },
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ indexed: false, internalType: 'bytes32', name: 'arweaveAddress', type: 'bytes32' },
		],
		name: 'UserStaked',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'uint256', name: 'poolId', type: 'uint256' },
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ indexed: false, internalType: 'bytes32', name: 'arweaveAddress', type: 'bytes32' },
		],
		name: 'UserWithdrawn',
		type: 'event',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'depositToken_', type: 'address' },
			{ internalType: 'address', name: 'aoDistributionWallet_', type: 'address' },
			{
				components: [
					{ internalType: 'uint128', name: 'payoutStart', type: 'uint128' },
					{ internalType: 'uint128', name: 'decreaseInterval', type: 'uint128' },
					{ internalType: 'uint128', name: 'withdrawLockPeriod', type: 'uint128' },
					{ internalType: 'uint128', name: 'claimLockPeriod', type: 'uint128' },
					{ internalType: 'uint128', name: 'withdrawLockPeriodAfterStake', type: 'uint128' },
					{ internalType: 'uint256', name: 'initialReward', type: 'uint256' },
					{ internalType: 'uint256', name: 'rewardDecrease', type: 'uint256' },
					{ internalType: 'uint256', name: 'minimalStake', type: 'uint256' },
					{ internalType: 'bool', name: 'isPublic', type: 'bool' },
				],
				internalType: 'struct IDistribution.Pool[]',
				name: 'poolsInfo_',
				type: 'tuple[]',
			},
			{ internalType: 'address', name: 'refunderAddress_', type: 'address' },
			{ internalType: 'address', name: 'fallbackAddress_', type: 'address' },
		],
		name: 'Distribution_init',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'aoDistributionWallet',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{ inputs: [], name: 'bridgeOverplus', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [
			{
				components: [
					{ internalType: 'uint128', name: 'payoutStart', type: 'uint128' },
					{ internalType: 'uint128', name: 'decreaseInterval', type: 'uint128' },
					{ internalType: 'uint128', name: 'withdrawLockPeriod', type: 'uint128' },
					{ internalType: 'uint128', name: 'claimLockPeriod', type: 'uint128' },
					{ internalType: 'uint128', name: 'withdrawLockPeriodAfterStake', type: 'uint128' },
					{ internalType: 'uint256', name: 'initialReward', type: 'uint256' },
					{ internalType: 'uint256', name: 'rewardDecrease', type: 'uint256' },
					{ internalType: 'uint256', name: 'minimalStake', type: 'uint256' },
					{ internalType: 'bool', name: 'isPublic', type: 'bool' },
				],
				internalType: 'struct IDistribution.Pool',
				name: 'pool_',
				type: 'tuple',
			},
		],
		name: 'createPool',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'depositToken',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'poolId', type: 'uint256' },
			{ internalType: 'address', name: 'user', type: 'address' },
		],
		name: 'ejectStakedFunds',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'poolId_', type: 'uint256' },
			{ internalType: 'address', name: 'user_', type: 'address' },
		],
		name: 'getCurrentUserReward',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'poolId_', type: 'uint256' },
			{ internalType: 'uint128', name: 'startTime_', type: 'uint128' },
			{ internalType: 'uint128', name: 'endTime_', type: 'uint128' },
		],
		name: 'getPeriodReward',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'isNotUpgradeable',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'overplus',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'pools',
		outputs: [
			{ internalType: 'uint128', name: 'payoutStart', type: 'uint128' },
			{ internalType: 'uint128', name: 'decreaseInterval', type: 'uint128' },
			{ internalType: 'uint128', name: 'withdrawLockPeriod', type: 'uint128' },
			{ internalType: 'uint128', name: 'claimLockPeriod', type: 'uint128' },
			{ internalType: 'uint128', name: 'withdrawLockPeriodAfterStake', type: 'uint128' },
			{ internalType: 'uint256', name: 'initialReward', type: 'uint256' },
			{ internalType: 'uint256', name: 'rewardDecrease', type: 'uint256' },
			{ internalType: 'uint256', name: 'minimalStake', type: 'uint256' },
			{ internalType: 'bool', name: 'isPublic', type: 'bool' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'poolsData',
		outputs: [
			{ internalType: 'uint128', name: 'lastUpdate', type: 'uint128' },
			{ internalType: 'uint256', name: 'rate', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalDeposited', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'proxiableUUID',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function',
	},
	{ inputs: [], name: 'removeUpgradeability', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [
			{ internalType: 'uint256', name: 'poolId_', type: 'uint256' },
			{ internalType: 'uint256', name: 'amount_', type: 'uint256' },
			{ internalType: 'bytes32', name: 'arweaveAddress_', type: 'bytes32' },
		],
		name: 'stake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalDepositedInPublicPools',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'newImplementation', type: 'address' }],
		name: 'upgradeTo',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'newImplementation', type: 'address' },
			{ internalType: 'bytes', name: 'data', type: 'bytes' },
		],
		name: 'upgradeToAndCall',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '', type: 'address' },
			{ internalType: 'uint256', name: '', type: 'uint256' },
		],
		name: 'usersData',
		outputs: [
			{ internalType: 'uint128', name: 'lastStake', type: 'uint128' },
			{ internalType: 'uint256', name: 'deposited', type: 'uint256' },
			{ internalType: 'uint256', name: 'rate', type: 'uint256' },
			{ internalType: 'uint256', name: 'pendingRewards', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'poolId_', type: 'uint256' },
			{ internalType: 'uint256', name: 'amount_', type: 'uint256' },
			{ internalType: 'bytes32', name: 'arweaveAddress_', type: 'bytes32' },
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];

export const DaiBridge_ABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'previousAdmin',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'newAdmin',
				type: 'address',
			},
		],
		name: 'AdminChanged',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'beacon',
				type: 'address',
			},
		],
		name: 'BeaconUpgraded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'dsrDaiBalance',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'currentOverplus',
				type: 'uint256',
			},
		],
		name: 'CalculateOverplusResult',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint8',
				name: 'version',
				type: 'uint8',
			},
		],
		name: 'Initialized',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'OverplusBridged',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'poolId',
				type: 'uint256',
			},
			{
				components: [
					{
						internalType: 'uint128',
						name: 'withdrawLockPeriodAfterStake',
						type: 'uint128',
					},
					{
						internalType: 'uint256',
						name: 'minimalStake',
						type: 'uint256',
					},
					{ internalType: 'bool', name: 'isPublic', type: 'bool' },
				],
				indexed: false,
				internalType: 'struct IDistribution.Pool',
				name: 'pool',
				type: 'tuple',
			},
		],
		name: 'PoolCreated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'poolId',
				type: 'uint256',
			},
			{
				components: [
					{
						internalType: 'uint128',
						name: 'withdrawLockPeriodAfterStake',
						type: 'uint128',
					},
					{
						internalType: 'uint256',
						name: 'minimalStake',
						type: 'uint256',
					},
					{ internalType: 'bool', name: 'isPublic', type: 'bool' },
				],
				indexed: false,
				internalType: 'struct IDistribution.Pool',
				name: 'pool',
				type: 'tuple',
			},
		],
		name: 'PoolEdited',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'implementation',
				type: 'address',
			},
		],
		name: 'Upgraded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'poolId',
				type: 'uint256',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'receiver',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'UserClaimed',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'poolId',
				type: 'uint256',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'arweaveAddress',
				type: 'bytes32',
			},
		],
		name: 'UserStaked',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'uint256',
				name: 'poolId',
				type: 'uint256',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'arweaveAddress',
				type: 'bytes32',
			},
		],
		name: 'UserWithdrawn',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'aoDistributionWallet_',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'uint128',
						name: 'withdrawLockPeriodAfterStake',
						type: 'uint128',
					},
					{
						internalType: 'uint256',
						name: 'minimalStake',
						type: 'uint256',
					},
					{ internalType: 'bool', name: 'isPublic', type: 'bool' },
				],
				internalType: 'struct IDistribution.Pool[]',
				name: 'poolsInfo_',
				type: 'tuple[]',
			},
			{
				internalType: 'address',
				name: 'refunderAddress_',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'fallbackAddress_',
				type: 'address',
			},
		],
		name: 'Distribution_init',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'aoDistributionWallet',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'bridgeOverplus',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'calculateOverplus',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'uint128',
						name: 'withdrawLockPeriodAfterStake',
						type: 'uint128',
					},
					{
						internalType: 'uint256',
						name: 'minimalStake',
						type: 'uint256',
					},
					{ internalType: 'bool', name: 'isPublic', type: 'bool' },
				],
				internalType: 'struct IDistribution.Pool',
				name: 'pool_',
				type: 'tuple',
			},
		],
		name: 'createPool',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'daiDsrManager',
		outputs: [
			{
				internalType: 'contract IDaiDsrManager',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'daiDsrManagerAddress',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'depositToken',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'poolId', type: 'uint256' },
			{ internalType: 'address', name: 'user', type: 'address' },
		],
		name: 'ejectStakedFunds',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'isNotUpgradeable',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'pools',
		outputs: [
			{
				internalType: 'uint128',
				name: 'withdrawLockPeriodAfterStake',
				type: 'uint128',
			},
			{ internalType: 'uint256', name: 'minimalStake', type: 'uint256' },
			{ internalType: 'bool', name: 'isPublic', type: 'bool' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'poolsData',
		outputs: [
			{ internalType: 'uint128', name: 'lastUpdate', type: 'uint128' },
			{ internalType: 'uint256', name: 'totalDeposited', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'proxiableUUID',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'removeUpgradeability',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'poolId_', type: 'uint256' },
			{ internalType: 'uint256', name: 'amount_', type: 'uint256' },
			{
				internalType: 'bytes32',
				name: 'arweaveAddress_',
				type: 'bytes32',
			},
		],
		name: 'stake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalDepositedInPublicPools',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newImplementation',
				type: 'address',
			},
		],
		name: 'upgradeTo',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newImplementation',
				type: 'address',
			},
			{ internalType: 'bytes', name: 'data', type: 'bytes' },
		],
		name: 'upgradeToAndCall',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '', type: 'address' },
			{ internalType: 'uint256', name: '', type: 'uint256' },
		],
		name: 'usersData',
		outputs: [
			{ internalType: 'uint128', name: 'lastStake', type: 'uint128' },
			{ internalType: 'uint256', name: 'deposited', type: 'uint256' },
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'poolId_', type: 'uint256' },
			{ internalType: 'uint256', name: 'amount_', type: 'uint256' },
			{
				internalType: 'bytes32',
				name: 'arweaveAddress_',
				type: 'bytes32',
			},
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];

export const Erc20_ABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'owner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'spender', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Approval',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'to', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
		],
		name: 'Transfer',
		type: 'event',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'owner', type: 'address' },
			{ internalType: 'address', name: 'spender', type: 'address' },
		],
		name: 'allowance',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'approve',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'decimals',
		outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
		],
		name: 'decreaseAllowance',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_sharesAmount', type: 'uint256' }],
		name: 'getPooledEthByShares',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'uint256', name: '_ethAmount', type: 'uint256' }],
		name: 'getSharesByPooledEth',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'spender', type: 'address' },
			{ internalType: 'uint256', name: 'addedValue', type: 'uint256' },
		],
		name: 'increaseAllowance',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_account', type: 'address' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' },
		],
		name: 'mint',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'name',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{ inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [{ internalType: 'uint256', name: '_totalPooledEther', type: 'uint256' }],
		name: 'setTotalPooledEther',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
		name: 'sharesOf',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalPooledEther',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalShares',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'transfer',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'from', type: 'address' },
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' },
		],
		name: 'transferFrom',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_recipient', type: 'address' },
			{ internalType: 'uint256', name: '_sharesAmount', type: 'uint256' },
		],
		name: 'transferShares',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: '_sender', type: 'address' },
			{ internalType: 'address', name: '_recipient', type: 'address' },
			{ internalType: 'uint256', name: '_sharesAmount', type: 'uint256' },
		],
		name: 'transferSharesFrom',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];

export const ENDPOINTS = {
	arTotalSupply: `https://arweave.net/total_supply`,
	ipCheck: `https://ipinfo.io?token=${IP_TOKEN}`,
	mainnetRpc: `https://rpc.ankr.com/eth`,
};

export const REDIRECTS = {
	cookbook: `https://cookbook_ao.arweave.net`,
	x: 'http://x.com/aoTheComputer',
	github: 'https://github.com/permaweb/ao',
	discord: 'https://discord.gg/dYXtHwc9dc',
	stethMinting: 'https://stake.lido.fi/',
	stethConversion:
		'https://matcha.xyz/tokens/ethereum/eth?buyChain=1&buyAddress=0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
	ipBlock: 'https://www.standwithcrypto.org/action/call?action=call-your-representative',
};
