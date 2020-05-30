/* eslint-disable @typescript-eslint/no-explicit-any */
// now only for one nested fieldname
export const parseTouched = (fieldname: string, touched: any): boolean => {
  const parts: string[] = fieldname.split('.');
  const obj: any = touched[parts[0]];
  if(!obj) return false;
  return obj[parts[1]];
};