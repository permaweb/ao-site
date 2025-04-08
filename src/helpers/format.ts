import { FORMAT_DECIMALS } from '../settings';

/**
 * Format addresses
 *
 * @param address Address to format
 */
export function formatAddress(address: string, count = 13) {
	return address.substring(0, count) + '...' + address.substring(address.length - count, address.length);
}

/**
 * Returns if this is a valid arweave address
 */
export const isAddress = (addr: string) => /[a-z0-9_-]{43}/i.test(addr);

/**
 * Parse gateway from URL
 */
export function parseGateway(url: string) {
	const urlObj = new URL(url);

	return {
		host: urlObj.host,
		port: urlObj.port ? parseFloat(urlObj.port) : 443,
		protocol: urlObj.protocol.replace(':', '') as 'http' | 'https',
	};
}

export function formatNumber(number: number | string, options: Intl.NumberFormatOptions = {}, locale?: string) {
	return new Intl.NumberFormat(locale, options).format(Number(number));
}

export function truncateNumberAuto(number?: number | string, decimals = FORMAT_DECIMALS) {
	if (number === 0 || number === '0' || !number) return '0';

	const value = Number(number);

	const longValue = value.toFixed(18);

	const delimiter = '.';

	const smallValue = value < 1 && value > -1;
	let firstNonZeroPos = longValue.indexOf(delimiter) + 1;
	let leadingZeroes = 0;
	while (longValue[firstNonZeroPos] === '0') {
		firstNonZeroPos++;
		leadingZeroes++;
	}
	let maxDecimals = leadingZeroes + 4;

	if (maxDecimals > 18) maxDecimals = 18;
	if (maxDecimals < decimals) maxDecimals = decimals;

	const truncatedValue = smallValue ? value.toFixed(maxDecimals) : value.toFixed(decimals);
	return truncatedValue;
}

export function formatNumberAuto(number?: number | string, decimals = FORMAT_DECIMALS) {
	if (number === 0 || number === '0' || !number) return '0';

	const value = Number(number);

	const longValue = formatNumber(value, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: 18,
	});

	const delimiter = formatNumber(0.1).charAt(1);

	const smallValue = value < 1 && value > -1;
	let firstNonZeroPos = longValue.indexOf(delimiter) + 1;
	let leadingZeroes = 0;
	while (longValue[firstNonZeroPos] === '0') {
		firstNonZeroPos++;
		leadingZeroes++;
	}
	let maxDecimals = leadingZeroes + 4;

	if (maxDecimals > 18) maxDecimals = 18;
	if (maxDecimals < decimals) maxDecimals = decimals;

	const options: Intl.NumberFormatOptions = {
		minimumFractionDigits: 0,
		maximumFractionDigits: smallValue ? maxDecimals : decimals,
	};

	return formatNumber(truncateNumberAuto(value, decimals), options);
}

/**
 * Parse a bigint to a string containing a decimal number (float), based on a token denomination
 */
export function parseBigIntAsNumber(value?: bigint | string, denomination = 0, maximumFractionDigits = denomination) {
	try {
		if (!value) return '0';

		// handle negative values by capturing the sign
		const isNegative = value.toString().startsWith('-');
		const absValue = isNegative
			? (typeof value === 'string' ? BigInt(value) : value) * BigInt(-1)
			: typeof value === 'string'
			? BigInt(value)
			: value;

		// multiplier according to the denomination using a loop instead of exponentiation
		let dMul = BigInt(1);
		for (let i = 0; i < denomination; i++) {
			dMul *= BigInt(10);
		}

		// fractional and integer parts
		const integerPart = absValue / dMul;
		let result = integerPart.toString();

		// add fractions
		if (maximumFractionDigits !== 0) {
			// starting index of the fractional part
			const fractionalPartStart = integerPart !== BigInt(0) ? integerPart.toString().length : 0;

			// calculate fractional part
			let fractions = absValue
				.toString()
				.slice(fractionalPartStart)
				.padStart(denomination, '0')
				.slice(0, maximumFractionDigits);

			if (fractions !== '' && BigInt(fractions) > BigInt(0)) {
				result += '.' + fractions.replace(/0*$/, '');
			}
		}

		// reapply the negative sign if necessary
		if (isNegative) result = '-' + result;

		return result;
	} catch (error) {
		console.error('Cannot parse BigInt as number', value, denomination, maximumFractionDigits, error);
		return '0';
	}
}

/**
 * Parse a string containing a decimal number (float) to a bigint, based on a token denomination
 */
export function parseNumberAsBigInt(number?: string, denomination = 0) {
	// Support numbers with scientific notation, e.g. "4.3311482723360494e-7"
	let value = number?.includes('e') ? Number(number).toFixed(denomination) : number;
	if (!value) return BigInt(0);

	// Remove formatters like commas
	value = value.replace(/,/g, '');
	if (value === '') return BigInt(0);

	// Build multiplier (dMul = 10^denomination) without using exponentiation
	let dMul = BigInt(1);
	for (let i = 0; i < denomination; i++) {
		dMul *= BigInt(10);
	}

	const parts = value.split('.');
	let result = BigInt(parts[0]) * dMul;
	const plainFractions = parts[1];

	if (plainFractions && plainFractions !== '') {
		// Only keep digits up to the given denomination
		const relevantPart = plainFractions.slice(0, denomination);
		let fractionalPart = BigInt(relevantPart);

		// If the fraction has fewer digits than the denomination, adjust by a multiplier
		const diff = denomination - relevantPart.length;
		if (diff > 0) {
			let multiplier = BigInt(1);
			for (let i = 0; i < diff; i++) {
				multiplier *= BigInt(10);
			}
			fractionalPart *= multiplier;
		}

		result += fractionalPart;
	}

	return result;
}

/**
 * Format tickers
 */
export function formatTicker(ticker?: string) {
	if (!ticker) return 'Unknown';

	ticker = ticker.replace('Botega LP ', '');

	if (ticker.includes('/')) {
		const index = ticker.indexOf('/');
		const first = ticker.slice(0, index);
		const second = ticker.slice(index + 1);
		return `$${first}/$${second}`;
	}

	return `$${ticker}`;
}

const decimalRegexp = /^\d*(?:[.])?\d*$/;
export const decimalEnforcer = (nextUserInput: string) => {
	if (nextUserInput === '') {
		return '';
	} else if (nextUserInput === '.') {
		return '0.';
	} else if (decimalRegexp.test(nextUserInput)) {
		return nextUserInput;
	}
	return '';
};

const integerRegexp = /^\d*$/;
export const integerEnforcer = (nextUserInput: string) => {
	if (nextUserInput === '') {
		return '';
	} else if (integerRegexp.test(nextUserInput)) {
		return nextUserInput;
	}
	return '';
};
