export const theme = {
  colors: {
    primary: '#0F4C81',
    primaryDark: '#0A3A63',
    background: '#F2F4F7',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    danger: '#C0392B',
    success: '#1E8449',
  },
  /** 8pt spacing scale. */
  spacing: (n: number): number => n * 8,
  radius: 12,
} as const;
