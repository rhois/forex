export const numberFormat = (nStr) => {
    if (nStr >= 1000000000) {
      return `${(nStr / 1000000000).toFixed(1).replace(/\.0$/, '')} G`;
    }
    return nStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  export default numberFormat;
  
  