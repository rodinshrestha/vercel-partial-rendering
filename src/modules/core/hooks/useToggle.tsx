import React from 'react';

type ReturnTypes = {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useToggle = (initialState = false): ReturnTypes => {
  // Initialize the state
  const [state, setState] = React.useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = React.useCallback(() => setState((state) => !state), []);

  return { isOpen: state, setIsOpen: setState, toggle };
};

export default useToggle;
