// utils/format.ts
export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'long',
    timeStyle: 'medium',
  }).format(date);
};
