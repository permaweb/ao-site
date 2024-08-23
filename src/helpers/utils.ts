export function checkValidAddress(address: string | null) {
	if (!address) return false;
	return /^[a-z0-9_-]{43}$/i.test(address);
}

export function formatAddress(address: string | null, wrap: boolean) {
	if (!address) return '';
	const formattedAddress = address.substring(0, 6) + '...' + address.substring(36, address.length);
	return wrap ? `(${formattedAddress})` : formattedAddress;
}

export function formatRequiredField(field: string) {
	return `${field} *`;
}

export function formatDisplayAmount(amount: number | string | null) {
	if (amount === null) return '-';
	if (amount.toString().includes('.')) {
		let parts = amount.toString().split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		let firstTwoDecimals = parts[1].substring(0, 2);

		if (firstTwoDecimals === '00') {
			parts[1] = parts[1].substring(0, 6);
		} else {
			parts[1] = parts[1].substring(0, 4);
		}

		return parts.join('.');
	} else {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
}

export function getTagValue(list: { [key: string]: any }[], name: string): string {
	for (let i = 0; i < list.length; i++) {
		if (list[i]) {
			if (list[i]!.name === name) {
				return list[i]!.value as string;
			}
		}
	}
	return null;
}

export function base64UrlToBase64(base64Url) {
	return base64Url.replace(/-/g, '+').replace(/_/g, '/');
}

export function byteArrayToHexString(byteArray) {
	return byteArray.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
}

export function arweaveToEVMBytes(arweaveAddress) {
	// Convert base64url to base64
	const base64Address = base64UrlToBase64(arweaveAddress);

	// Decode base64 to binary string
	const binaryString = atob(base64Address);

	// Convert binary string to byte array
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	// Convert byte array to hex string
	const hexString = byteArrayToHexString(bytes);

	return `0x${hexString}`;
}

export function getRewardInDays(days: number, currentSupply: number) {
	const TOTAL_AO_SUPPLY = 21000000;
	//  AO_MINTED is the % of AO tokens already minted
	const AO_MINTED = currentSupply / TOTAL_AO_SUPPLY;
	// BLOCKS is the number of 5 minute blocks within the reward period
	const BLOCKS = 288 * days;
	const REWARD_PER_PERIOD = 0.000001647321875;

	const reward = (1 - AO_MINTED) * (1 - (1 - REWARD_PER_PERIOD) ** BLOCKS) * TOTAL_AO_SUPPLY;
	return reward;
}

export function getArReward(days: number, arBalance: number, arSupply: number, currentAOSupply: number) {
	const arRewards = getRewardInDays(days, currentAOSupply) * (1 / 3);
	return arRewards * (arBalance / arSupply);
}

export function getEthReward(
	days: number,
	stEthBridgedByUser: number,
	currentAoSupply: number,
	totalStEthBridged: number,
	totalDaiBridged: number,
	stEthPrice: number,
	stEthYield: number,
	daiPrice: number,
	daiYield: number
) {
	const bridgeRewards = getRewardInDays(days, currentAoSupply) * (2 / 3);

	const totalStEthYield = totalStEthBridged * stEthPrice * stEthYield;
	const totalDaiYield = totalDaiBridged * daiPrice * daiYield;
	const totalYield = totalStEthYield + totalDaiYield;

	const userYield = stEthBridgedByUser * stEthPrice * stEthYield;
	return bridgeRewards * (userYield / totalYield);
}

export function getDaiReward(
	days: number,
	daiBridgedByUser: number,
	currentAoSupply: number,
	totalStEthBridged: number,
	totalDaiBridged: number,
	stEthPrice: number,
	stEthYield: number,
	daiPrice: number,
	daiYield: number
) {
	const bridgeRewards = getRewardInDays(days, currentAoSupply) * (2 / 3);

	const totalStEthYield = totalStEthBridged * stEthPrice * stEthYield;
	const totalDaiYield = totalDaiBridged * daiPrice * daiYield;
	const totalYield = totalStEthYield + totalDaiYield;

	const userYield = daiBridgedByUser * daiPrice * daiYield;
	return bridgeRewards * (userYield / totalYield);
}
