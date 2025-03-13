export type ConnectionType = {
  isConnected: boolean;
  id: number | undefined;
  symbol: string | undefined;
  name: string | undefined;
  address: string | null | undefined;
};

export type ConnectionsType = {
  [key: string]: ConnectionType;
};
