'use client';

import React, { useState, createContext, useContext } from 'react';
import type { NavLink } from '@/lib/types';

type ActiveContextProviderProps = {
  children: React.ReactNode;
};

type ActiveContextType = {
  hamburgerClicked: boolean;
  setHamburgerClicked: React.Dispatch<React.SetStateAction<boolean>>;
  activeSection: NavLink;
  setActiveSection: React.Dispatch<React.SetStateAction<NavLink>>;
};

const ActiveContextSection = createContext<ActiveContextType | null>(null);

const ActiveContext = ({ children }: ActiveContextProviderProps) => {
  const [hamburgerClicked, setHamburgerClicked] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<NavLink>('Blog');
  return (
    <ActiveContextSection.Provider
      value={{
        hamburgerClicked,
        setHamburgerClicked,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </ActiveContextSection.Provider>
  );
};

export const useActiveContext = () => {
  const context = useContext(ActiveContextSection);
  if (context === null) {
    throw new Error(
      'useActiveContext must be used within an ActiveContextProvider'
    );
  }
  return context;
};

export default ActiveContext;
