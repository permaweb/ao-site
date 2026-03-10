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

export function formatDisplayAmount(amount: number | string | null, fixed?: number) {
	if (amount === null) return '-';

	let num = typeof amount === 'string' ? parseFloat(amount) : amount;
	if (isNaN(num)) return '-';

	let formatted: string;
	if (typeof fixed === 'number') {
		// Use toFixed with the given precision, then convert back to a number
		// to remove any trailing zeros.
		formatted = Number(num.toFixed(fixed)).toString();
	} else {
		// Fallback: use the original logic when no fixed argument is provided.
		formatted = num.toFixed(10).replace(/\.?0+$/, '');
		let [integerPart, decimalPart] = formatted.split('.');
		integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		if (decimalPart) {
			if (decimalPart.startsWith('00')) {
				decimalPart = decimalPart.substring(0, 6);
			} else {
				decimalPart = decimalPart.substring(0, 4);
			}
			return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
		}
		return integerPart;
	}

	let [integerPart, decimalPart] = formatted.split('.');
	integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}

export function formatDate(dateArg: string | number | null, dateType: 'dateString' | 'timestamp', fullTime?: boolean) {
	if (!dateArg) {
		return null;
	}

	let date: Date | null = null;

	switch (dateType) {
		case 'dateString':
			date = new Date(dateArg);
			break;
		case 'timestamp':
			date = new Date(Number(dateArg));
			break;
		default:
			date = new Date(dateArg);
			break;
	}

	return fullTime
		? `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getUTCFullYear()} ${
				date.getHours() % 12 || 12
		  }:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${
				date.getHours() >= 12 ? 'PM' : 'AM'
		  }`
		: `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getUTCFullYear()}`;
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

export function evmBytesToArweaveAddress(evmBytes: string): string | null {
	if (!evmBytes || !evmBytes.startsWith('0x') || evmBytes.length !== 66) {
		// Basic validation for a bytes32 hex string
		console.error('Invalid EVM bytes string for Arweave address conversion:', evmBytes);
		return null;
	}

	const hexString = evmBytes.substring(2);

	// Convert hex string to byte array
	const bytes = new Uint8Array(hexString.length / 2);
	for (let i = 0; i < hexString.length; i += 2) {
		bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
	}

	// Convert byte array to binary string
	let binaryString = '';
	for (let i = 0; i < bytes.length; i++) {
		binaryString += String.fromCharCode(bytes[i]);
	}

	// Convert binary string to base64
	const base64Address = btoa(binaryString);

	// Convert base64 to base64url
	const base64UrlAddress = base64Address.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

	// Arweave addresses are typically 43 characters long
	if (base64UrlAddress.length !== 43) {
		console.warn('Converted Arweave address has an unexpected length:', base64UrlAddress, 'Original hex:', evmBytes);
	}

	return base64UrlAddress;
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
	daiYield: number,
	totalUsdsBridged: number,
	usdsPrice: number,
	usdsYield: number
) {
	const bridgeRewards = getRewardInDays(days, currentAoSupply) * (2 / 3);

	const totalStEthYield = totalStEthBridged * stEthPrice * stEthYield;
	const totalDaiYield = totalDaiBridged * daiPrice * daiYield;
	const totalUsdsYield = totalUsdsBridged * usdsPrice * usdsYield;
	const totalYield = totalStEthYield + totalDaiYield + totalUsdsYield;

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
	daiYield: number,
	totalUsdsBridged: number,
	usdsPrice: number,
	usdsYield: number
) {
	const bridgeRewards = getRewardInDays(days, currentAoSupply) * (2 / 3);

	const totalStEthYield = totalStEthBridged * stEthPrice * stEthYield;
	const totalDaiYield = totalDaiBridged * daiPrice * daiYield;
	const totalUsdsYield = totalUsdsBridged * usdsPrice * usdsYield;
	const totalYield = totalStEthYield + totalDaiYield + totalUsdsYield;

	const userYield = daiBridgedByUser * daiPrice * daiYield;
	return bridgeRewards * (userYield / totalYield);
}

export function getUsdsReward(
	days: number,
	usdsBridgedByUser: number,
	currentAoSupply: number,
	totalStEthBridged: number,
	totalDaiBridged: number,
	totalUsdsBridged: number,
	stEthPrice: number,
	stEthYield: number,
	daiPrice: number,
	daiYield: number,
	usdsPrice: number,
	usdsYield: number
) {
	const bridgeRewards = getRewardInDays(days, currentAoSupply) * (2 / 3);

	const totalStEthYield = totalStEthBridged * stEthPrice * stEthYield;
	const totalDaiYield = totalDaiBridged * daiPrice * daiYield;
	const totalUsdsYield = totalUsdsBridged * usdsPrice * usdsYield;
	const totalYield = totalStEthYield + totalDaiYield + totalUsdsYield;

	const userYield = usdsBridgedByUser * usdsPrice * usdsYield;
	return bridgeRewards * (userYield / totalYield);
}

export function formatPercentage(percentage: any) {
	if (isNaN(percentage)) return '0%';

	let multiplied = percentage * 100;
	let decimalPart = multiplied.toString().split('.')[1];

	if (!decimalPart) {
		return `${multiplied.toFixed(0)}%`;
	}

	if (decimalPart.length > 6 && decimalPart.substring(0, 6) === '000000') {
		return `${multiplied.toFixed(0)}%`;
	}

	let nonZeroIndex = decimalPart.length;
	for (let i = 0; i < decimalPart.length; i++) {
		if (decimalPart[i] !== '0') {
			nonZeroIndex = i + 1;
			break;
		}
	}

	return `${multiplied.toFixed(nonZeroIndex)}%`;
}

export function getRelativeDate(timestamp: number) {
	if (!timestamp) return '-';
	const currentDate = new Date();
	const inputDate = new Date(timestamp);

	const timeDifference: number = currentDate.getTime() - inputDate.getTime();
	const secondsDifference = Math.floor(timeDifference / 1000);
	const minutesDifference = Math.floor(secondsDifference / 60);
	const hoursDifference = Math.floor(minutesDifference / 60);
	const daysDifference = Math.floor(hoursDifference / 24);
	const monthsDifference = Math.floor(daysDifference / 30.44); // Average days in a month
	const yearsDifference = Math.floor(monthsDifference / 12);

	if (yearsDifference > 0) {
		return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`;
	} else if (monthsDifference > 0) {
		return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
	} else if (daysDifference > 0) {
		return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
	} else if (hoursDifference > 0) {
		return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
	} else if (minutesDifference > 0) {
		return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
	} else {
		return `${secondsDifference} second${secondsDifference !== 1 ? 's' : ''} ago`;
	}
}

export function formatCount(count: string): string {
	if (count === '0' || !Number(count)) return '0';

	if (count.includes('.')) {
		let parts = count.split('.');
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		// Find the position of the last non-zero digit within the first 6 decimal places
		let index = 0;
		for (let i = 0; i < Math.min(parts[1].length, 12); i++) {
			if (parts[1][i] !== '0') {
				index = i + 1;
			}
		}

		if (index === 0) {
			// If all decimals are zeros, keep two decimal places
			parts[1] = '00';
		} else {
			// Otherwise, truncate to the last non-zero digit
			parts[1] = parts[1].substring(0, index);

			// If the decimal part is longer than 4 digits, truncate to 4 digits
			if (parts[1].length > 4 && parts[1].substring(0, 4) !== '0000') {
				parts[1] = parts[1].substring(0, 4);
			}
		}

		return parts.join('.');
	} else {
		return count.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
}

export function formatUSDAmount(amount: string): string {
	return `$ ${formatCount(amount)}`;
}

/**
 * Parse a bigint to a string containing a decimal number (float), based on a token denomination
 */
export function parseBigIntAsNumber(value?: bigint | string, denomination = 0, maximumFractionDigits = denomination) {
	try {
		if (!value) return '0';

		// Handle negative values by capturing the sign
		const isNegative = value.toString().startsWith('-');
		const absValue = isNegative
			? (typeof value === 'string' ? BigInt(value) : value) * BigInt(-1)
			: typeof value === 'string'
			? BigInt(value)
			: value;

		// Multiplier according to the denomination using a loop instead of exponentiation
		let dMul = BigInt(1);
		for (let i = 0; i < denomination; i++) {
			dMul *= BigInt(10);
		}

		// Fractional and integer parts
		const integerPart = absValue / dMul;
		let result = integerPart.toString();

		// Add fractions
		if (maximumFractionDigits !== 0) {
			// Starting index of the fractional part
			const fractionalPartStart = integerPart !== BigInt(0) ? integerPart.toString().length : 0;

			// Calculate fractional part
			let fractions = absValue
				.toString()
				.slice(fractionalPartStart)
				.padStart(denomination, '0')
				.slice(0, maximumFractionDigits);

			if (fractions !== '' && BigInt(fractions) > BigInt(0)) {
				result += '.' + fractions.replace(/0*$/, '');
			}
		}

		// Reapply the negative sign if necessary
		if (isNegative) result = '-' + result;

		return result;
	} catch (error) {
		console.error('Cannot parse BigInt as number', value, denomination, maximumFractionDigits, error);
		return '0';
	}
}

export function formatNumber(number: number | string, options: Intl.NumberFormatOptions = {}, locale?: string) {
	return new Intl.NumberFormat(locale, options).format(Number(number));
}

// Helper function to get price from Supabase
export async function getPriceForToken(
	processId: string,
	supabaseUrl: string,
	supabaseAnonKey: string
): Promise<{ usd_price: number; denominator: number } | null> {
	try {
		if (!supabaseUrl || !supabaseAnonKey) {
			console.error('Supabase configuration missing');
			return null;
		}

		const response = await fetch(`${supabaseUrl}/functions/v1/usd-price`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${supabaseAnonKey}`,
			},
			body: JSON.stringify({
				processId: processId,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching price from Supabase:', error);
		return null;
	}
}
