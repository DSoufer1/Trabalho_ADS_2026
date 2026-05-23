import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

interface Props {
  value: string | null;
  onChange: (uri: string | null) => void;
}

export function PhotoPicker({ value, onChange }: Props) {
  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Conceda acesso à câmera para tirar a foto.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.6,
    });
    if (!result.canceled && result.assets[0]) {
      onChange(result.assets[0].uri);
    }
  }

  async function pickFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.6,
    });
    if (!result.canceled && result.assets[0]) {
      onChange(result.assets[0].uri);
    }
  }

  return (
    <View>
      {value ? (
        <View>
          <Image source={{ uri: value }} style={styles.preview} />
          <Pressable style={styles.removeBtn} onPress={() => onChange(null)}>
            <Text style={styles.removeText}>Remover foto</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Nenhuma foto adicionada</Text>
        </View>
      )}
      <View style={styles.actions}>
        <Pressable style={styles.actionBtn} onPress={takePhoto}>
          <Text style={styles.actionText}>📷 Tirar foto</Text>
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={pickFromGallery}>
          <Text style={styles.actionText}>🖼️ Galeria</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 200,
    borderRadius: theme.radius,
    backgroundColor: theme.colors.border,
  },
  placeholder: {
    width: '100%',
    height: 140,
    borderRadius: theme.radius,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: theme.colors.textMuted,
  },
  removeBtn: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  removeText: {
    color: theme.colors.danger,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
