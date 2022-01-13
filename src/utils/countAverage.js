export const countAverage = (data) => {
  let count = 0;
  for (let index in data) {
    count += +data[index];
  }
  count = count / data.length;
  return count;
};
