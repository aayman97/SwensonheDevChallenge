export const formattedNumber = (num: number | undefined) => {
  if (num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
      .format(num)
      .split('.')[0];
  }
};
