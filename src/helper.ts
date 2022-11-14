export function startsWithNumber(str: string) {
  return /^\d/.test(str);
}

export function removeSpaces(str: string) {
  return str.replace(/\s+/g, '');
}
