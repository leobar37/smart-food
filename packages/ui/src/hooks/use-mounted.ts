import { useState, useEffect } from 'react';
export const useMounted = () => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(true);
  }, [value]);
  return value;
};
