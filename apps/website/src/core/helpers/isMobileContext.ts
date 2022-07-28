import React from 'react';

type isMobileContextProps = {
  isMobile?: boolean;
};

export const IsMobileContext = React.createContext<isMobileContextProps>({});

export const useIsMobileContext = () => React.useContext(IsMobileContext);
