const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
export default (input: string) => {
  input = input + '';
  let hash = 5381;
  let i = input.length - 1;
  if (typeof input === 'string') {
    for (; i > -1; i--) hash += (hash << 5) + input.charCodeAt(i);
  } else {
    for (; i > -1; i--) hash += (hash << 5) + input[i];
  }
  let value = hash & 0x7fffffff;
  let retValue = '';
  do {
    retValue += I64BIT_TABLE[value & 0x3f];
  } while ((value >>= 6));
  return retValue;
};
