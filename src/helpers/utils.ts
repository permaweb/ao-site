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

	const REWARD_PER_PERIOD = 0.000001647321875;
	const EMISSION_PERIOD = 5;

	let reward = 0;
	const periods = (60 / EMISSION_PERIOD) * 24 * days;

	for (let i = 0; i < periods; i++) {
		const periodSupply = currentSupply + reward;
		reward += (TOTAL_AO_SUPPLY - periodSupply) * REWARD_PER_PERIOD;
	}

	return reward;
}

export function getArReward(days: number, userBalance: number, totalBalances: number, currentAOSupply: number) {
	return getRewardInDays(days, currentAOSupply) * (1 / 3) * (userBalance / totalBalances);
}

export function getEthReward(days: number, userBalance: number, totalBalances: number, currentAOSupply: number) {
	return getRewardInDays(days, currentAOSupply) * (2 / 3) * (userBalance / totalBalances);
}
