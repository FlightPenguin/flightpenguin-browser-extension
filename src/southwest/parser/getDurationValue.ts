interface GetDurationValueProps {
  minutes: number;
}

export const getDurationValue = ({ minutes }: GetDurationValueProps): string => {
  const durationHours = Math.floor(minutes / 60);
  const durationMinutes = minutes % 60;
  return `${durationHours}h ${durationMinutes}m`;
};
