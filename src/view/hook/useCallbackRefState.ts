import { useCallback, useState } from 'react';

const useCallbackRefState = <T>() => {
  const [refState, setRefState] = useState<T | null>(null);
  const refCallback = useCallback((value: T) => setRefState(value), []);
  return [refState, refCallback];
};

export default useCallbackRefState;
