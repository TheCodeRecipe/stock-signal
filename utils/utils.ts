// utils/format.ts
// export const formatDate = (isoDateString: string): string => {
//   const date = new Date(isoDateString);

//   return new Intl.DateTimeFormat('ko-KR', {
//     dateStyle: 'long',
//     timeStyle: 'medium',
//   }).format(date);
// };

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-based
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};
