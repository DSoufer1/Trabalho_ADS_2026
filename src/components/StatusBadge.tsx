import { StyleSheet, Text, View } from 'react-native';
import { statusMeta } from '../constants/categories';
import { Status } from '../types/report';

interface Props {
  status: Status;
}

export function StatusBadge({ status }: Props) {
  const meta = statusMeta(status);
  return (
    <View style={[styles.badge, { backgroundColor: `${meta.color}1A`, borderColor: meta.color }]}>
      <View style={[styles.dot, { backgroundColor: meta.color }]} />
      <Text style={[styles.label, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
