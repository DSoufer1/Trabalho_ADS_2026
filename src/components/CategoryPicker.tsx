import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { theme } from '../constants/theme';
import { Category } from '../types/report';

interface Props {
  value: Category;
  onChange: (value: Category) => void;
}

export function CategoryPicker({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {CATEGORIES.map((cat) => {
        const selected = cat.value === value;
        return (
          <Pressable
            key={cat.value}
            onPress={() => onChange(cat.value)}
            style={[
              styles.chip,
              selected && { borderColor: cat.color, backgroundColor: `${cat.color}1A` },
            ]}
          >
            <Text style={styles.icon}>{cat.icon}</Text>
            <Text style={[styles.label, selected && { color: cat.color, fontWeight: '700' }]}>
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: theme.colors.surface,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 15,
    color: theme.colors.text,
  },
});
