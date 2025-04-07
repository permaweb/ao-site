import { backOff } from 'exponential-backoff';

export type TimeoutConfig = {
	maxTries: number;
	initialDelay: number;
};

export const QUICK_OPERATION: TimeoutConfig = {
	maxTries: 5,
	initialDelay: 1_000,
};

export const NORMAL_OPERATION: TimeoutConfig = {
	maxTries: 1000,
	initialDelay: 2_000,
};

export const LONG_OPERATION: TimeoutConfig = {
	maxTries: 1000,
	initialDelay: 3_000,
};

export class BackendError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'BackendError';
	}
}

// `T` is a generic type for the return type of the function.
// `Args` is a tuple type representing the argument types of the function `fn`.
export function retryable<T, Args extends any[]>(
	fn: (...args: Args) => Promise<T>, // Function to be retried
	timeoutConfig = NORMAL_OPERATION
): (...args: Args) => Promise<T> {
	const { maxTries, initialDelay } = timeoutConfig;

	// Return a new function that wraps the original function
	return async function (...args: Args): Promise<T> {
		return backOff(() => fn(...args), {
			delayFirstAttempt: initialDelay > 0,
			startingDelay: initialDelay,
			timeMultiple: 1.1, // Default is `2`
			numOfAttempts: maxTries, // Maximum number of retry attempts
			retry: (error, attemptNumber) => {
				console.warn('onRetryFailed', attemptNumber, error);
				if (error instanceof BackendError) {
					return false; // Stop retrying if it's a BackendError
				}
				return true; // Continue retrying if there's an error
			},
		});
	};
}
