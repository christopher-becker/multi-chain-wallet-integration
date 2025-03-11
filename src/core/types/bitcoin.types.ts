import { ReactNode } from "react";

export type BitcoinWalletContextType = {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  isPending: boolean;
  address?: string;
  balance?: number;
  error?: string | ReactNode;
};

export type UTXOType = {
  value: number;
};
