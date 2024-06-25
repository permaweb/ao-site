import ao from 'assets/ao.svg';
import arconnect from 'assets/arconnect.png';
import arrow from 'assets/arrow.svg';
import arweaveApp from 'assets/arweave-app.svg';
import calculator from 'assets/calculator.svg';
import checkmark from 'assets/checkmark.svg';
import close from 'assets/close.svg';
import codehawksAudit from 'assets/codehawks-audit.svg';
import eth from 'assets/eth.svg';
import info from 'assets/info.svg';
import ipBlock from 'assets/ip-block.png';
import metamask from 'assets/metamask.png';
import morpheusAudit from 'assets/morpheus-audit.svg';
import nccAudit from 'assets/ncc-audit.svg';
import othent from 'assets/othent.svg';
import rabby from 'assets/rabby.png';
import renascenseAudit from 'assets/renascense-audit.svg';
import walletConnect from 'assets/wallet-connect.png';

import { ArWalletEnum, EthWalletEnum } from './types';

export const AO = {
	token: 'm3PaWzK4PTG9lAaqYQPaPdOcXdO8hYqi5Fe9NWqXd0w',
	tokenMirror: 'Pi-WmAQp2-mh-oWH9lWpz5EthlUDj_W0IusAv-RXhRk',
	cred: 'Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc',
	aoClaim: 'U2Bv-LEoFzwAFfBx9MiXNnAfaYRjT4MG9T7sFcVHn20',
};

export const ETH_CONTRACTS = {
	steth: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
	ao: '0xfE08D40Eee53d64936D3128838867c867602665c',
};

export const TOKEN_DENOMINATION = Math.pow(10, 12);

export const ASSETS = {
	ao,
	arconnect,
	arrow,
	arweaveApp,
	calculator,
	checkmark,
	close,
	codehawksAudit,
	eth,
	info,
	ipBlock,
	metamask,
	morpheusAudit,
	nccAudit,
	othent,
	rabby,
	renascenseAudit,
	walletConnect,
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
		max: '1440px',
		tablet: '840px',
		tabletSecondary: '768px',
		secondary: '540px',
	},
	dimensions: {
		button: {
			height: '40px',
			width: 'fit-content',
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
	const ethereum = `${mint}ethereum/`;
	return {
		base: base,
		mint: mint,
		read: `${base}read/`,
		ethereum: ethereum,
		arweave: `${mint}arweave/`,
		cred: `${mint}cred/`,
		notFound: `${base}404`,
	};
}

export const URLS = createURLs();

export const WALLET_PERMISSIONS = ['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION', 'DISPATCH', 'SIGNATURE'];

export const IP_TOKEN = '04c286535ab4dc';

export const AO_ABI = [
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

export const STETH_ABI = [
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
	mainnetRpc: `https://eth.llamarpc.com`,
};

export const REDIRECTS = {
	stethMinting: 'https://stake.lido.fi/',
	stethConversion:
		'https://matcha.xyz/tokens/ethereum/eth?buyChain=1&buyAddress=0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
	ipBlock: 'https://www.standwithcrypto.org/action/call?action=call-your-representative',
};
