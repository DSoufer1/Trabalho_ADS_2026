/** Formats an ISO timestamp as a pt-BR date/time string. */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Human-readable coordinates, or a fallback when no location was captured. */
export function formatCoords(latitude: number | null, longitude: number | null): string {
  if (latitude == null || longitude == null) return 'Localização não informada';
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}
