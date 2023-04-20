import { useState, useEffect } from 'react';

export function usePersistentState<T>(key: string, initialValue: T, expireDaily: boolean = false) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const { data, expiration } = JSON.parse(storedValue);
      if (expireDaily) {
        const expirationDate = new Date(expiration);
        const now = new Date();
        const nextDay = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);

        if (expirationDate.getTime() >= nextDay.getTime()) {
          return data;
        }
      } else {
        return data;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    const now = new Date();
    const nextDayUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
    const data = JSON.stringify({
      data: value,
      expiration: expireDaily ? nextDayUTC.getTime() : null,
    });
    localStorage.setItem(key, data);
  }, [key, value, expireDaily]);

  return [value, setValue] as const;
}

