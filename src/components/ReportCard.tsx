import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { categoryMeta } from '../constants/categories';
import { theme } from '../constants/theme';
import { Report } from '../types/report';
import { formatDateTime } from '../utils/format';
import { StatusBadge } from './StatusBadge';

interface Props {
  report: Report;
  onPress: () => void;
}

export function ReportCard({ report, onPress }: Props) {
  const cat = categoryMeta(report.category);
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {report.photoUri ? (
        <Image source={{ uri: report.photoUri }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbPlaceholder, { backgroundColor: `${cat.color}1A` }]}>
          <Text style={styles.thumbIcon}>{cat.icon}</Text>
        </View>
      )}
      <View style={styles.body}>
        <Text style={styles.category}>
          {cat.icon} {cat.label}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {report.description}
        </Text>
        <View style={styles.footer}>
          <StatusBadge status={report.status} />
          <Text style={styles.date}>{formatDateTime(report.createdAt)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
  },
  thumbPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbIcon: {
    fontSize: 28,
  },
  body: {
    flex: 1,
  },
  category: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textMuted,
    marginBottom: 2,
  },
  description: {
    fontSize: 15,
    color: theme.colors.text,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
});
