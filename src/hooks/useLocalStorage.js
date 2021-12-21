import { useState } from "react";

const useLocalStorage = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      return null;
    }
  };

  const clearValues = () => {
    try {
      window.localStorage.clear();
    } catch (e) {
      return null;
    }
  };
  return [storedValue, setValue, clearValues];
};

export default useLocalStorage;
