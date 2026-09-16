/**
 * Converte string "HH:mm" em minutos totais desde a meia-noite.
 */
export function timeStringToMinutes(timeString: string): number | null {
  const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
  if (!timeRegex.test(timeString)) return null;

  const [hours, minutes] = timeString.split(':').map(Number);
  return (hours ? hours * 60 : 0) + (minutes ? minutes : 0);
}

/**
 * Converte minutos totais para decimal (ex: 90min -> 1.5).
 */
export function minutesToDecimalHours(minutes: number): number {
  if (minutes < 0) return 0;
  return Math.round((minutes / 60) * 100) / 100;
}

/**
 * Formata minutos para exibição legível "Xh Ym".
 */
export function formatMinutesToReadable(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ''}` : `${m}m`;
}
