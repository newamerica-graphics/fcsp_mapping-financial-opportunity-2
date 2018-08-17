export const sum = (arr, obj) => {
  let total = 0;
  for(let i=0; i<arr.length; i++){
    total += obj[arr[i]];
  }

  return total;
}
