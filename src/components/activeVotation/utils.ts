export const getRoundedPercentage = (share: number): number => {
  return Math.round(share * 100 * 100) / 100;
};
