import { createContext, useContext } from 'react';

export interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 내부에서만 사용 가능합니다.');
  }
  return context;
};
