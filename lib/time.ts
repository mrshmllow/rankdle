import { useCallback, useEffect, useState } from "react";

export function useUTCMidnightCallback(callback: () => void) {
	const [timeUntilMidnight, setTimeUntilMidnight] = useState<number>(0);

	const calculateTimeUntilMidnight = useCallback(() => {
		const now = new Date();
		const nextDayUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
		const timeDifference = nextDayUTC.getTime() - now.getTime();

		return timeDifference;
	}, []);

	useEffect(() => {
		setTimeUntilMidnight(calculateTimeUntilMidnight());
	}, [calculateTimeUntilMidnight]);

	useEffect(() => {
		if (timeUntilMidnight > 0) {
			const timer = setTimeout(callback, timeUntilMidnight);
			return () => clearTimeout(timer);
		}
	}, [callback, timeUntilMidnight]);
}

