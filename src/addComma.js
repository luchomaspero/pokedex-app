export default function addComma(num) {
    const string = num.toString();
    if (string.length < 2) {
      const result = `0${string.slice(0, -1)},${string.slice(-1)}`;
      return result;
    }
  
    const result = `${string.slice(0, -1)},${string.slice(-1)}`;
    return result;
  }