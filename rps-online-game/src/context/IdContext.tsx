"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type IdContextType = {
  id: string;
  setId: (newId: string) => void;
};

const IdContext = createContext<IdContextType | undefined>(undefined);

export function IdProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string>("");

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
}

export function useIdContext(): IdContextType {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error("useIdContext must be used inside an IdProvider");
  }
  return context;
}
