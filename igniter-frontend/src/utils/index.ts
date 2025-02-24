// Calculate number of remaining days left
export const daysLeft = (deadline: string): string => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

// Calculate how much percent project is funded
export const calculateBarPercentage = (goal: number, raisedAmount: number): number => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

// Check if image url is valid or not
export const checkIfImage = (url: string, callback: (isValid: boolean) => void): void => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
