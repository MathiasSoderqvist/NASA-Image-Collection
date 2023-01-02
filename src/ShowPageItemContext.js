import { createContext } from 'react';

const defaultValue = {
  showPageItem: {},
  setShowPageItem: () => {},
};

export const ShowPageItemContext = createContext(defaultValue);

export const ShowPageItemProvider = ShowPageItemContext.Provider;
export const ShowPageItemConsumer = ShowPageItemContext.Consumer;
