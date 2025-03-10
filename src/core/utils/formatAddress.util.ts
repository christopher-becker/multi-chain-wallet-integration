export const formatAddress = (address: string, chars = 4) => {
  if (!address || address.length < chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
