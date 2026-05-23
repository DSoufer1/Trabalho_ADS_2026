import { useMemo, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ReportCard } from '../components/ReportCard';
import { EmptyState } from '../components/EmptyState';
import { STATUSES } from '../constants/categories';
import { theme } from '../constants/theme';
import { useReports } from '../hooks/useReports';
import { Status } from '../types/report';
import type { ProblemsStackParamList, RootTabParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProblemsStackParamList, 'ReportList'>;

type Filter = Status | 'todos';

export function ReportListScreen({ navigation }: Props) {
  const { reports, loading, reload } = useReports();
  const [filter, setFilter] = useState<Filter>('todos');

  const filtered = useMemo(
    () => (filter === 'todos' ? reports : reports.filter((r) => r.status === filter)),
    [reports, filter],
  );

  function goToRegister() {
    navigation
      .getParent<BottomTabNavigationProp<RootTabParamList>>()
      ?.navigate('Registrar');
  }

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {(['todos', ...STATUSES.map((s) => s.value)] as Filter[]).map((f) => {
          const label = f === 'todos' ? 'Todos' : STATUSES.find((s) => s.value === f)?.label;
          const active = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ReportCard
              report={item}
              onPress={() => navigation.navigate('ReportDetail', { id: item.id })}
            />
          )}
          refreshing={loading}
          onRefresh={reload}
          ListEmptyComponent={
            <EmptyState
              title="Nenhum problema registrado"
              subtitle="Use a aba Registrar para relatar um problema urbano no seu bairro."
              actionLabel="Registrar problema"
              onAction={goToRegister}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    paddingBottom: 4,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 13,
    color: theme.colors.textMuted,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  list: {
    padding: 16,
    paddingTop: 8,
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
