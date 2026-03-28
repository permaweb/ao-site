import { ethers } from 'ethers';

import { ArWalletEnum } from './types';

export const AO = {
	token: '0syT13r0s0tgPmIed95bJnuSqaD29HQNN8D3ElLSrsc',
	tokenMirror: 'ptCu-Un-3FF8sZ5zNMYg43zRgSYAGVkjz2Lb0HZmx2M',
	cred: 'Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc',
	aoClaim: 'U2Bv-LEoFzwAFfBx9MiXNnAfaYRjT4MG9T7sFcVHn20',
	aoMetrics: 'vdpaKV_BQNISuDgtZpLDfDlMJinKHqM3d2NWd3bzeSk',
	delegationOracle: 'cuxSKjGJ-WDB9PzSkVkVVrIBSh3DrYHYz44usQOj5yE',
	stEthPriceOracle: 'wJV8FMkpoeLsTjJ6O7YZEuQgMqj-sDjPHhTeA73RsCc',
	daiPriceOracle: '5q8vpzC5QAKOAJFM26MAKfZw1gwtw7WA_J2861ZiKhI',
	usdsPriceOracle: 'qjOMZnan8Vo2gaLaOF1FXbFXOQOn_5sKbYspNSVRyNY',
	yieldPreferences: 'pGpdfjH4XkjS_GPuFSPlkEJ3buIWWlI8q4-BqG7GiAo',
	yieldHistorian: 'NRP0xtzeV9MHgwLmgD254erUB7mUjMBhBkYkNYkbNEo',
	flpFactory: 'It-_AKlEfARBmJdbJew1nG9_hIaZt0t20wQc28mFGBE',
	piProcess: 'H1I09hGlSlqrvlQid4zBp-lleynE8bNo2Ep1u8xq0fQ',
	piBalanceProcess: '4hXj_E-5fAKmo4E8KjgQvuDJKAFk9P2grhycVmISDLs',
	blogIndexProcessId: import.meta.env.VITE_AO_BLOG_INDEX_PROCESS_ID || 'xr1mnj8gaabHwPaOSws0f0a5ltX71aPibSpvqn4ISbQ',
};

export const BLOG = {
	portalPublicationId: import.meta.env.VITE_PORTAL_PUBLICATION_ID || '0akIdTrZmLVrOaaJNrlrYXLXJfdqD1ulMljPhB1dIp0',
	portalBaseUrl: import.meta.env.VITE_PORTAL_BASE_URL || 'https://hb.portalinto.com',
};

export const SUPABASE = {
	url: 'https://kzmzniagsfcfnhgsjkpv.supabase.co',
	anonKey:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6bXpuaWFnc2ZjZm5oZ3Nqa3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MjI5NDEsImV4cCI6MjA2Mzk5ODk0MX0.IjB7j34CjhqUXQcO_dKM_9k3okmSomSpu9dtyPV2agU',
};

export const HB = {
	defaultNode: 'https://forward.computer',
	read1: 'https://state.forward.computer',
	read2: 'https://state-a.forward.computer',
	read3: 'https://state-b.forward.computer',
	app1: 'https://app-1.forward.computer',
};

export const PATCH_MAP = {
	stEth: {
		processId: 'U4IrjxcKVsEya5kQbZPbjLCoj868P129Z4IlArMOzuc',
		ticker: 'eth',
	},
	dai: {
		processId: 'QzWis3AEZTl1se17kvHXko-dfhPdWXJezhuyy0e3NTg',
		ticker: 'dai',
	},
	usds: {
		processId: 'JJPMirAJb2RR7mqIAilAGWjA3EwHIEXAnc__CfNKqNs',
		ticker: 'usds',
	},
};

export const ETH_CONTRACTS = {
	stEth: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
	stEthBridge: '0xfE08D40Eee53d64936D3128838867c867602665c',
	dai: '0x6b175474e89094c44da98b954eedeac495271d0f',
	daiBridge: '0x6A1B588B0684dACE1f53C5820111F400B3dbfeBf',
	usds: '0xdc035d45d973e3ec169d2276ddab16f1e407384f',
	usdsBridge: '0x7Cd01D5CaD4BA0CaEbA02583a5C61d35B23E08eB',
	ethUsdPriceFeed: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
	daiUsdPriceFeed: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
	usdsUsdPriceFeed: '0x0000000000000000000000000000000000000000',
	daiToUsdsUpgrade: '0x3225737a9bbb6473cb4a45b7244aca2befdb276a',
};

export const AO_TOKEN_DENOMINATION = Math.pow(10, 12);
export const ETH_TOKEN_DENOMINATION = Math.pow(10, 18);

export const ENDPOINTS = {
	tx: (tx: string) => `https://arweave.net/${tx}`,
	arBalance: (address: string) => `https://arweave.net/wallet/${address}/balance`,
	arTotalSupply: `https://arweave.net/total_supply`,
	arTxEndpoint: (txId: string) => `https://arweave.net/${txId}`,
	metrics: (days: number) => `https://atlas-server.decent.land/mainnet/explorer/days?limit=${days}`,
	metricsLegacy: (days: number) => `https://atlas-server.decent.land/explorer/days?limit=${days}`,
	goldsky: `https://arweave-search.goldsky.com/graphql`,
	mainnetRpc: `https://ethereum.publicnode.com`,
	aoStateNode: (token: string) => `https://state-a.forward.computer/${token}~process@1.0/`,
	portalPublication: (publicationId: string) =>
		`${BLOG.portalBaseUrl}/${publicationId}~process@1.0/compute?require-codec=application/json&accept-bundle=true`,
	portalPosts: (publicationId: string) =>
		`${BLOG.portalBaseUrl}/${publicationId}~process@1.0/compute/posts?require-codec=application/json&accept-bundle=true`,
	portalAsset: (assetId: string) =>
		`${BLOG.portalBaseUrl}/${assetId}~process@1.0/compute/asset?require-codec=application/json&accept-bundle=true`,
};

const getTxEndpoint = (txId: string) => ENDPOINTS.arTxEndpoint(txId);

/**
 * ASSETS: Icons and images hosted on Arweave via getTxEndpoint.
 * To add new icons: 1) Add SVG to public/icons/ 2) Deploy with
 *   npm run deploy:icon -- --deploy-file ./public/icons/<name>.svg --arns-name ao
 * 3) Add txId here via getTxEndpoint(txId) and remove the local file.
 */
export const ASSETS = {
	arconnect: getTxEndpoint('1Q5zOfpHzHnNtD2BS6Rg50WWT2H8aq3GYThDV3x6Qo0'),
	arweaveApp: getTxEndpoint('CNZKujmn8vo0QM7Ssq18-3d0k6Azv1xsj20yAWt1Vew'),
	codehawksAudit: getTxEndpoint('rT-u8ijl3BLWDZlrQ3zpSNQ3gCz5GAq-LZRX4Gwo_yA'),
	morpheusAudit: getTxEndpoint('QbdAzvz1zVMpWw-9x-8W_0uBJt2lMVEryPKAVf0A9fw'),
	nccAudit: getTxEndpoint('BX5fd9Z4PijeWx7GFwgh-BjJRVNcnD1dPi4qo4vUDcA'),
	othent: getTxEndpoint('CV4m-XD_SYNKoxm7nh-3pxl_RdG9SdrOB2ibFmwCDPA'),
	renascenseAudit: getTxEndpoint('oVv6te32GQUC-qidsZZlUOp3nTdfPcGFN-UeW9brau4'),
	walletConnect: getTxEndpoint('llCUeYuxYxnH6rp2PVrkOR2pkGy0rFPR8wlIBbl-Ols'),
	add: getTxEndpoint('RLWnDhoB0Dd_X-sLnNy4w2S7ds3l9591HcHK8nc3YRw'),
	ao: getTxEndpoint('AzM59q2tcYzkySUUZUN1HCwfKGVHi--71UdoIk5gPUE'),
	aoCircled: getTxEndpoint('UkS-mdoiG8hcAClhKK8ch4ZhEzla0mCPDOix9hpdSFE'),
	arrow: getTxEndpoint('ghFL1fzQ2C1eEAnqSVvfAMP5Jikx7NKSPP5neoNPALw'),
	arweave: getTxEndpoint('LeeiCXkCDZKdh9uEfau2a13LziNGnT82anXFDW51Hgw'),
	checkmark: getTxEndpoint('mVnNwxm-F6CV043zVtORE-EaMWfd2j8w6HHX70IcVbI'),
	close: getTxEndpoint('BASlMnOWcLCcLUSrO2wUybQL_06231dLONeVkdTWs3o'),
	copy: getTxEndpoint('au_20PzacCJjUbwjoX85kkzmW0YwH4KrPfP98NOBK8M'),
	dai: getTxEndpoint('0fH_eBybJYRxjpjhJLiDoj8-7u7wYEHXtNElWEPb5is'),
	deposit: getTxEndpoint('KJtoIHxAHtVRMDgDGF00NYcnz81iUSo2o8odeDB623Q'),
	disconnect: getTxEndpoint('eWncZs2hH5oNSsWTIImJhqdZ4-n0P4CfZbduK2ae4L4'),
	discord: getTxEndpoint('3X1BfFleeCZZdVZIx8DKDIblcLw7jzzRBCzSItlBy9E'),
	edit: getTxEndpoint('SUWTk8Qtcub9EsP5PDF6-vzgKsP5Irg1bB9b8NImDDk'),
	ethereum: getTxEndpoint('LmRXPMcmymzB5S_WpRgmmQtGMWoTHW7BFcmotOkKcGM'),
	exchange: getTxEndpoint('KfE6Dh0j2pTLo4Z8U6fmk6mCRsB6O6NgxJpI_Vm0_wY'),
	arrowRight: getTxEndpoint('Xkqtxc5_R8KSczygjl9iOk0LHv-GSbD8xhIw5IPIIuc'),
	github: getTxEndpoint('7JXQVvywkWNFXAyAPJ8WdC5VSk7d0q0E-c-6v-oM3iM'),
	hammer: getTxEndpoint('pn4Go4GauR4_m9lyV77xJu3nzzxeIjfTQYfl9_fOx70'),
	info: getTxEndpoint('XnaFbPesz-Hib7zpxlvJ0Bpeigl__8wrBtCfYpkWfWk'),
	landingGraphic: getTxEndpoint('H6009sE8L1EOCjUOZzUVAH9gAI0ZMaQYPnEGcR63oJI'),
	landingGraphicPlaceholder: getTxEndpoint('9MYLUUkcF5gbTuLLlliTzWnRwuJwcHlsLjFrwDiyx0Y'),
	link: getTxEndpoint('UMfjnj-8e7fb3lYRdcFygu8c4JoBZq3hB-mzycYT4DU'),
	menu: getTxEndpoint('0La3-o2_gGMDbkfV4zVVUMjTYQ7Cn9YWQ2JO-FbjAIk'),
	pi: getTxEndpoint('fGTu1CGT6TAz6Uj55CPkpJRy_whPKRZH6OFFpVHWOS0'),
	plus: getTxEndpoint('OUryhpUV-y709P_Tr575rN8gS-8c5rzlKXNymR9gsE4'),
	remove: getTxEndpoint('aKjWuVXkSeYOKzGP0MnnhHwoYUXqTHFMJfVCbqzYEo0'),
	search: getTxEndpoint('KpzIhvoBduBivOq-4vLxy-uRHjGbH-40YMG9e5FnYXc'),
	searchList: getTxEndpoint('9et3owOcEeE63ZGVJHkIW5p3JhbJWgXdZq8CL4CNJVw'),
	stEth: getTxEndpoint('0SmAFjMZ5BmFPB_wlPeVJLhWGZ9JqAlV3sNozIPV2yk'),
	success: getTxEndpoint('mVnNwxm-F6CV043zVtORE-EaMWfd2j8w6HHX70IcVbI'),
	usds: getTxEndpoint('_BWFo1KkjR5t0Mg7mhS9Kme1q4JbxKZJYwg9sglm_UA'),
	token: getTxEndpoint('f18VARM42GRSDY8UzZtEJrCsakbxluldOAnnED_V_Zk'),
	trendUp: getTxEndpoint('Vhb94c_k1-QNjphRQpF4mwbAL79VseUTyZ-y_fo68yE'),
	view: getTxEndpoint('LOxVL3vN3EkCqjbSxwuenYTTsbLtFJzK-lLJ6P4k59w'),
	wallet: getTxEndpoint('667ltlFnNixyTj_CbCcOP_CWMz7MzLrfv5bAjZtKux4'),
	wander: getTxEndpoint('0nDLgQik8oWPr0nSVEwI9B8D-XMEptQagNdsdr_y6Jk'),
	warning: getTxEndpoint('667ltlFnNixyTj_CbCcOP_CWMz7MzLrfv5bAjZtKux4'),
	website: getTxEndpoint('YBilSmUhX--T9vffUIDsCCrWoakxaxPqPVw7NCZNNVs'),
	withdraw: getTxEndpoint('QOJLKefBz2xCPUbO8dEKB22aWv_zdQ6FYA_UWUriyJw'),
	x: getTxEndpoint('8j0KOYorbeN1EI2_tO-o9tUYi4LJkDwFCDStu0sWMV8'),
	yield: getTxEndpoint('RrusyNB6RzmXfYcocp7tG9GSDkrF_z-_NfZMSxVgzOE'),
};

export const AR_WALLETS = [
	{ type: ArWalletEnum.wander, logo: ASSETS.wander },
	{ type: ArWalletEnum.arweaveApp, logo: ASSETS.arweaveApp },
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
		max: '1600px',
		tablet: '840px',
		tabletSecondary: '768px',
		mobile: '540px',
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
			primary: '0px',
			alt1: '15px',
			alt2: '5px',
			alt3: '2.5px',
		},
	},
	motion: {
		duration: {
			fast: '200ms',
		},
		easing: {
			decelerate: 'cubic-bezier(0.16, 1, 0.3, 1)',
		},
	},
};

function createURLs() {
	const base = `/`;
	const mint = `${base}mint/`;
	return {
		base: base,
		blog: `${base}blog/`,
		mint: mint,
		mintDeposits: `${mint}deposits/`,
		mintYield: `${mint}yield/`,
		nasa: `${base}nasa/`,
		policies: `${base}policies/`,
		read: `${base}read/`,
		delegate: `${base}delegate/`,
		delegateDashboard: `${base}delegate/dashboard/`,
		notFound: `${base}404`,
	};
}

export const URLS = createURLs();

export const WALLET_PERMISSIONS = ['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION', 'DISPATCH', 'SIGNATURE'];

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
			{ internalType: 'uint128', name: 'withdrawLockPeriodAfterStake', type: 'uint128' },
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

export const UsdsBridge_ABI = [
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
		inputs: [
			{ indexed: false, internalType: 'uint256', name: 'totalAssets', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'overplus', type: 'uint256' },
		],
		name: 'CalculateOverplusResult',
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
		inputs: [{ indexed: true, internalType: 'address', name: 'implementation', type: 'address' }],
		name: 'Upgraded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
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
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ indexed: false, internalType: 'bytes32', name: 'arweaveAddress', type: 'bytes32' },
		],
		name: 'UserWithdrawn',
		type: 'event',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'aoDistributionWallet_', type: 'address' },
			{ internalType: 'uint128', name: 'withdrawLockPeriodAfterStake_', type: 'uint128' },
			{ internalType: 'uint256', name: 'minimalStake_', type: 'uint256' },
			{ internalType: 'uint128', name: 'lastUpdate_', type: 'uint128' },
			{ internalType: 'address', name: 'refunderAddress_', type: 'address' },
			{ internalType: 'address', name: 'fallbackAddress_', type: 'address' },
			{ internalType: 'uint16', name: 'depositReferralCode_', type: 'uint16' },
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
		inputs: [],
		name: 'calculateOverplus',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'depositReferralCode',
		outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
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
		inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
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
		name: 'lastUpdate',
		outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'minimalStake',
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
		name: 'totalDepositedInVault',
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
		inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
		name: 'usersData',
		outputs: [
			{
				components: [
					{ internalType: 'uint128', name: 'lastStake', type: 'uint128' },
					{ internalType: 'uint256', name: 'deposited', type: 'uint256' },
				],
				internalType: 'struct IDistribution.UserData',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'vault',
		outputs: [{ internalType: 'contract IERC4626', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'vaultAddress',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'amount_', type: 'uint256' },
			{ internalType: 'bytes32', name: 'arweaveAddress_', type: 'bytes32' },
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'withdrawLockPeriodAfterStake',
		outputs: [{ internalType: 'uint128', name: '', type: 'uint128' }],
		stateMutability: 'view',
		type: 'function',
	},
];

export const DaiToUsdsUpgrade_ABI = [
	{
		inputs: [
			{ internalType: 'address', name: 'daiJoin_', type: 'address' },
			{ internalType: 'address', name: 'usdsJoin_', type: 'address' },
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'caller', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'usr', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256' },
		],
		name: 'DaiToUsds',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'caller', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'usr', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256' },
		],
		name: 'UsdsToDai',
		type: 'event',
	},
	{
		inputs: [],
		name: 'dai',
		outputs: [{ internalType: 'contract GemLike', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'daiJoin',
		outputs: [{ internalType: 'contract DaiJoinLike', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'usr', type: 'address' },
			{ internalType: 'uint256', name: 'wad', type: 'uint256' },
		],
		name: 'daiToUsds',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'usds',
		outputs: [{ internalType: 'contract GemLike', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'usdsJoin',
		outputs: [{ internalType: 'contract UsdsJoinLike', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'address', name: 'usr', type: 'address' },
			{ internalType: 'uint256', name: 'wad', type: 'uint256' },
		],
		name: 'usdsToDai',
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

export const PRICE_FEED_ABI = [
	{
		inputs: [],
		name: 'latestRoundData',
		outputs: [
			{ internalType: 'uint80', name: 'roundId', type: 'uint80' },
			{ internalType: 'int256', name: 'answer', type: 'int256' },
			{ internalType: 'uint256', name: 'startedAt', type: 'uint256' },
			{ internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
			{ internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
		],
		stateMutability: 'view',
		type: 'function',
	},
];

export const REDIRECTS = {
	arconnect: `https://arconnect.io`,
	cookbook: `https://cookbook_ao.arweave.net`,
	x: `http://x.com/aoTheComputer`,
	github: `https://github.com/permaweb/ao`,
	discord: `https://discord.gg/dYXtHwc9dc`,
	stethMinting: `https://stake.lido.fi/`,
	wander: `https://www.wander.app/`,
	stethConversion: `https://matcha.xyz/tokens/ethereum/eth?buyChain=1&buyAddress=0xae7ab96520de3a18e5e111b5eaab095312d7fe84`,
	tokenomics: `https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ`,
	ipBlock: `https://www.standwithcrypto.org/action/call?action=call-your-representative`,
	viewblock: (address: string) => `https://viewblock.io/arweave/address/${address}`,
	etherscan: (address: string) => `https://etherscan.io/address/${address}`,
};

export async function fetchTokenYield(tokenType: 'dai' | 'usds' | 'stEth'): Promise<number | null> {
	try {
		const provider = new ethers.JsonRpcProvider(ENDPOINTS.mainnetRpc);
		const SECS = 365 * 24 * 3600;
		const apy = (r: number) => (Math.pow(r, SECS) - 1) * 100;

		switch (tokenType) {
			case 'dai':
				// DAI DSR (Maker Pot)
				const dsrContract = new ethers.Contract(
					'0x197e90f9fad81970ba7976f33cbd77088e5d7cf7',
					['function dsr() view returns(uint256)'],
					provider
				);
				const dsrValue = await dsrContract.dsr();
				return apy(parseFloat(ethers.formatUnits(dsrValue, 27)));

			case 'usds':
				// USDS SSR (Sky Savings Rate)
				const ssrContract = new ethers.Contract(
					'0xa3931d71877c0e7a3148cb7eb4463524fec27fbd',
					['function ssr() view returns(uint256)'],
					provider
				);
				const ssrValue = await ssrContract.ssr();
				return apy(parseFloat(ethers.formatUnits(ssrValue, 27)));

			case 'stEth':
				// stETH 7-day SMA APR (already in %)
				const stEthResponse = await fetch('https://eth-api.lido.fi/v1/protocol/steth/apr/sma');
				const stEthData = await stEthResponse.json();
				return +(
					stEthData?.data?.smaApr ?? // new schema
					stEthData?.data?.apr ?? // old schema
					stEthData?.smaApr ?? // fallback
					stEthData?.apr
				);

			default:
				return null;
		}
	} catch (error) {
		console.error(`Error fetching ${tokenType} yield:`, error);
		return null;
	}
}

export const ETH_EXCHANGE_CONFIG = {
	arweave: {
		description: `Owners of AR generate AO continuously, proportionate to their holdings. You do not need to perform any form of activation in order to receive these tokens.
This page will help you keep track of your AO rewards and future projections. Simply connect your Arweave wallet to view your balance.
AO tokens will become transferrable after 15% of the supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ" target="_blank">blog post</a>.`,
	},
	dai: {
		description: `66.6% of AO tokens are minted to users that bridge their assets to the network. Simply connect your wallet, deposit Dai, and earn AO.
You will begin to accrue AO 24 hours after your deposit has been confirmed.<br/><br/>DAI has an 18-hour minimum lockup period. This means that you will not be able to remove your DAI from the bridge for 18 hours after depositing it.
AO tokens will become transferrable after 15% of the supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ" target="_blank">blog post</a>.`,
	},
	stEth: {
		description: `66.6% of AO tokens are minted to users that bridge their assets to the network. Simply connect your wallet, deposit staked Ethereum, and earn AO.
You can remove your deposited tokens at any time. You will begin to accrue AO 24 hours after your deposit has been confirmed.<br/><br/>AO tokens will become transferrable after 15% of the supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/-UWra0q0KWecSpgg2-c37dbZ0lnOMEScEEkabVm9qaQ" target="_blank">blog post</a>.`,
	},
	usds: {
		description: `66.6% of AO tokens are minted to users that bridge their assets to the network. Simply connect your wallet, deposit USDS, and earn AO.
You will begin to accrue AO 24 hours after your deposit has been confirmed.<br/><br/>USDS has an 18-hour minimum lockup period. This means that you will not be able to remove your USDS from the bridge for 18 hours after depositing it.`,
	},
	cred: {
		description: `Users that took part in AO testnet quests are able to convert their CRED tokens for AO-CLAIMs, at a rate of 1:1000.
AO tokens have a 100% fair launch, with zero pre-allocations of any kind. As a consequence, the AO provided to those that convert their CRED will be purchased or earned via holding AR by ecosystem parties that have volunteered to do so.
AO-claims will become redeemable after 15% of the AO supply has been minted, on approximately February 8th, 2025. Learn more in the <a href="https://mirror.xyz/0x1EE4bE8670E8Bd7E9E2E366F530467030BE4C840/ydfvlhml1NI9DdTps3nEX634AY5JaQD4WmFGtRBryzk" target="_blank">blog post</a>.
`,
	},
};

export const ETH_EXCHANGE_REDIRECTS = {
	ncc1: 'https://arweave.net/jZHVGxxxVpjGxD_uwpp-NSsezf9_z0r0evhDnV2hFNs',
	ncc2: 'https://arweave.net/qWdHQIGjeAjc5U5O9gk_o2k4jRYO6khL1vOAGQzkd9Y',
	ncc3: 'https://arweave.net/uJbexla4PpyQloxMHYuNqXOLTilYRxdweBKbUFjiMpQ',
	morpheus:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Distribution%20V1%20Audit%20%7C%20Community.md',
	codehawks:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Distribution%20V1%20Public%20Bug%20Bounty%20%7C%20Code%20Hawks.md',
	renascence:
		'https://github.com/MorpheusAIs/Docs/blob/main/Security%20Audit%20Reports/Distribution%20Contract/Distribution%20V2%20Audit%20%7C%20Renascence.pdf',
};

export const NAV_REDIRECTS: { path: string; label: string; target?: '_blank' }[] = [
	{ path: REDIRECTS.discord, label: 'Discord' },
	{ path: REDIRECTS.x, label: 'X' },
	{ path: REDIRECTS.github, label: 'GitHub' },
	{ path: URLS.policies, label: 'Policies' },
];
