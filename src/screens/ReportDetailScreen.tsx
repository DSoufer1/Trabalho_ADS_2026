import { useLayoutEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { StatusBadge } from '../components/StatusBadge';
import { categoryMeta, STATUSES } from '../constants/categories';
import { theme } from '../constants/theme';
import { deleteReport, updateReportStatus } from '../db/reportsRepository';
import { useReport } from '../hooks/useReport';
import { formatCoords, formatDateTime } from '../utils/format';
import { Status } from '../types/report';
import type { ProblemsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProblemsStackParamList, 'ReportDetail'>;

export function ReportDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const db = useSQLiteContext();
  const { report, loading, reload } = useReport(id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('EditReport', { id })} hitSlop={8}>
          <Text style={styles.headerAction}>Editar</Text>
        </Pressable>
      ),
    });
  }, [navigation, id]);

  async function changeStatus(value: Status) {
    await updateReportStatus(db, id, value);
    await reload();
  }

  function confirmDelete() {
    Alert.alert('Excluir registro', 'Tem certeza que deseja excluir este problema?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteReport(db, id);
          navigation.goBack();
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!report) {
    return (
      <View style={styles.centered}>
        <Text style={styles.muted}>Registro não encontrado.</Text>
      </View>
    );
  }

  const cat = categoryMeta(report.category);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {report.photoUri ? (
        <Image source={{ uri: report.photoUri }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.photoPlaceholder]}>
          <Text style={styles.photoIcon}>{cat.icon}</Text>
        </View>
      )}

      <Text style={styles.category}>
        {cat.icon} {cat.label}
      </Text>
      <StatusBadge status={report.status} />

      <Text style={styles.sectionLabel}>Descrição</Text>
      <Text style={styles.description}>{report.description}</Text>

      <Text style={styles.sectionLabel}>Localização</Text>
      <Text style={styles.value}>{formatCoords(report.latitude, report.longitude)}</Text>
      {report.address ? <Text style={styles.muted}>{report.address}</Text> : null}

      <Text style={styles.sectionLabel}>Registrado em</Text>
      <Text style={styles.value}>{formatDateTime(report.createdAt)}</Text>
      {report.updatedAt !== report.createdAt ? (
        <Text style={styles.muted}>Atualizado em {formatDateTime(report.updatedAt)}</Text>
      ) : null}

      <Text style={styles.sectionLabel}>Alterar situação</Text>
      <View style={styles.statusRow}>
        {STATUSES.map((s) => (
          <Pressable
            key={s.value}
            onPress={() => changeStatus(s.value)}
            style={[
              styles.statusBtn,
              report.status === s.value && { borderColor: s.color, backgroundColor: `${s.color}1A` },
            ]}
          >
            <Text style={[styles.statusBtnText, report.status === s.value && { color: s.color }]}>
              {s.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.deleteBtn} onPress={confirmDelete}>
        <Text style={styles.deleteBtnText}>Excluir registro</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerAction: { color: theme.colors.primary, fontWeight: '700', fontSize: 15 },
  photo: {
    width: '100%',
    height: 220,
    borderRadius: theme.radius,
    backgroundColor: theme.colors.border,
  },
  photoPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  photoIcon: { fontSize: 56 },
  category: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    marginTop: 22,
    marginBottom: 6,
  },
  description: { fontSize: 16, color: theme.colors.text, lineHeight: 22 },
  value: { fontSize: 15, color: theme.colors.text },
  muted: { fontSize: 13, color: theme.colors.textMuted, marginTop: 2 },
  statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statusBtn: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface,
  },
  statusBtnText: { fontWeight: '700', color: theme.colors.textMuted },
  deleteBtn: {
    marginTop: 36,
    borderWidth: 1.5,
    borderColor: theme.colors.danger,
    borderRadius: theme.radius,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteBtnText: { color: theme.colors.danger, fontWeight: '700', fontSize: 15 },
});
