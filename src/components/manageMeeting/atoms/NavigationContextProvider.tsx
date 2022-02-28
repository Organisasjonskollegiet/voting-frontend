import React, { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type NavigationContextState = {
  activeTab: number;
  navigateToTab: (nextIndex: number) => void;
};

const defaultValues = { navigateToTab: (value: number) => undefined, activeTab: 1 };

export const NavigationContext = createContext<NavigationContextState>(defaultValues);

const NavigationContextProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();

  /**
   * Active tab refers to the current step of creating a meeting:
   * 0: General information
   * 1: Votations
   * 2: Participants
   */
  const [activeTab, setActiveTab] = useState<number>(0);

  const navigateToTab = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex > 2) {
        return navigate('/', { replace: true });
      }
      setActiveTab(nextIndex);
    },
    [navigate]
  );

  return (
    <>
      <NavigationContext.Provider value={{ navigateToTab, activeTab }}>{children}</NavigationContext.Provider>
    </>
  );
};

export default NavigationContextProvider;
