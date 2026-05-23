import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { theme } from '../constants/theme';

const TEAM = [
  // TODO: substituir pelos nomes reais dos integrantes da equipe.
  'Integrante 1',
  'Integrante 2',
  'Integrante 3',
  'Integrante 4',
];

export function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>PointGov</Text>
      <Text style={styles.tagline}>Cidadania ativa: registre problemas urbanos do seu bairro.</Text>

      <Text style={styles.section}>Problema social</Text>
      <Text style={styles.paragraph}>
        Muitos problemas urbanos — iluminação pública apagada, buracos nas vias e
        focos do mosquito da dengue — demoram a ser resolvidos por falta de um
        canal simples de registro pelo cidadão. O PointGov permite documentar
        cada ocorrência com foto e localização e acompanhar sua situação até a
        resolução.
      </Text>

      <Text style={styles.section}>O que você pode registrar</Text>
      {CATEGORIES.map((c) => (
        <View key={c.value} style={styles.itemRow}>
          <Text style={styles.itemIcon}>{c.icon}</Text>
          <Text style={styles.itemText}>{c.label}</Text>
        </View>
      ))}

      <Text style={styles.section}>Equipe</Text>
      {TEAM.map((name) => (
        <Text key={name} style={styles.paragraph}>
          • {name}
        </Text>
      ))}

      <Text style={styles.section}>Sobre o app</Text>
      <Text style={styles.paragraph}>
        Aplicativo desenvolvido em React Native (Expo) com React Navigation e
        persistência local em SQLite (expo-sqlite). Trabalho prático de
        Programação para Dispositivos Móveis.
      </Text>
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL('https://github.com/juliocartier/turma_android_sexta')
        }
      >
        Requisitos do trabalho ↗
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: theme.colors.primary },
  tagline: { fontSize: 15, color: theme.colors.textMuted, marginTop: 4 },
  section: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.text,
    textTransform: 'uppercase',
    marginTop: 26,
    marginBottom: 8,
  },
  paragraph: { fontSize: 15, color: theme.colors.text, lineHeight: 22, marginBottom: 4 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  itemIcon: { fontSize: 20, marginRight: 10 },
  itemText: { fontSize: 15, color: theme.colors.text },
  link: { fontSize: 15, color: theme.colors.primary, fontWeight: '700', marginTop: 12 },
});
