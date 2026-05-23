import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { createReport, getReportById, updateReport } from '../db/reportsRepository';
import { useLocation } from '../hooks/useLocation';
import { theme } from '../constants/theme';
import { Category, ReportInput, Status } from '../types/report';
import { formatCoords } from '../utils/format';
import { CategoryPicker } from './CategoryPicker';
import { PhotoPicker } from './PhotoPicker';
import { StatusBadge } from './StatusBadge';
import { STATUSES } from '../constants/categories';

interface Props {
  /** Pass an id to edit an existing report; omit to create a new one. */
  reportId?: number;
  onSaved: () => void;
}

export function ReportForm({ reportId, onSaved }: Props) {
  const db = useSQLiteContext();
  const { capture, loading: locating } = useLocation();
  const isEdit = reportId != null;

  const [category, setCategory] = useState<Category>('iluminacao');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Status>('aberto');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  // Load existing values when editing.
  useEffect(() => {
    if (reportId == null) return;
    let active = true;
    (async () => {
      const existing = await getReportById(db, reportId);
      if (active && existing) {
        setCategory(existing.category);
        setDescription(existing.description);
        setStatus(existing.status);
        setPhotoUri(existing.photoUri);
        setLatitude(existing.latitude);
        setLongitude(existing.longitude);
        setAddress(existing.address);
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [db, reportId]);

  async function handleCaptureLocation() {
    const result = await capture();
    if (result.error) {
      Alert.alert('Localização', result.error);
      return;
    }
    if (result.location) {
      setLatitude(result.location.latitude);
      setLongitude(result.location.longitude);
      setAddress(result.location.address);
    }
  }

  async function handleSave() {
    if (description.trim().length < 5) {
      Alert.alert('Descrição obrigatória', 'Descreva o problema com pelo menos 5 caracteres.');
      return;
    }
    setSaving(true);
    const input: ReportInput = {
      category,
      description: description.trim(),
      status,
      photoUri,
      latitude,
      longitude,
      address,
    };
    try {
      if (reportId == null) {
        await createReport(db, input);
      } else {
        await updateReport(db, reportId, input);
      }
      onSaved();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o registro. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Tipo de problema</Text>
        <CategoryPicker value={category} onChange={setCategory} />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Poste apagado há 3 dias na esquina da Rua A com a Rua B."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {isEdit ? (
          <>
            <Text style={styles.label}>Situação</Text>
            <View style={styles.statusRow}>
              {STATUSES.map((s) => (
                <Pressable key={s.value} onPress={() => setStatus(s.value)}>
                  <View style={[styles.statusOption, status === s.value && styles.statusOptionActive]}>
                    <StatusBadge status={s.value} />
                  </View>
                </Pressable>
              ))}
            </View>
          </>
        ) : null}

        <Text style={styles.label}>Foto</Text>
        <PhotoPicker value={photoUri} onChange={setPhotoUri} />

        <Text style={styles.label}>Localização</Text>
        <Text style={styles.coords}>{formatCoords(latitude, longitude)}</Text>
        {address ? <Text style={styles.address}>{address}</Text> : null}
        <Pressable
          style={styles.locationBtn}
          onPress={handleCaptureLocation}
          disabled={locating}
        >
          {locating ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <Text style={styles.locationBtnText}>
              📍 {latitude == null ? 'Capturar localização atual' : 'Atualizar localização'}
            </Text>
          )}
        </Pressable>

        <Pressable
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveBtnText}>{isEdit ? 'Salvar alterações' : 'Registrar problema'}</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: theme.colors.background,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    padding: 14,
    fontSize: 15,
    minHeight: 96,
    color: theme.colors.text,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusOption: {
    padding: 6,
    borderRadius: theme.radius,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  statusOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}12`,
  },
  coords: {
    fontSize: 15,
    color: theme.colors.text,
  },
  address: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  locationBtn: {
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius,
    paddingVertical: 12,
    alignItems: 'center',
  },
  locationBtnText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  saveBtn: {
    marginTop: 28,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
