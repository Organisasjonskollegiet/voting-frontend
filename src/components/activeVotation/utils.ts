export const getRoundedPercentage = (share: number) => {
  return Math.round(share * 100 * 100) / 100;
};
