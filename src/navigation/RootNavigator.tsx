import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { theme } from '../constants/theme';
import { ReportListScreen } from '../screens/ReportListScreen';
import { ReportDetailScreen } from '../screens/ReportDetailScreen';
import { EditReportScreen } from '../screens/EditReportScreen';
import { CreateReportScreen } from '../screens/CreateReportScreen';
import { AboutScreen } from '../screens/AboutScreen';
import type { ProblemsStackParamList, RootTabParamList } from './types';

const Stack = createNativeStackNavigator<ProblemsStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const screenHeader = {
  headerStyle: { backgroundColor: theme.colors.primary },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: '700' as const },
};

function ProblemsStack() {
  return (
    <Stack.Navigator screenOptions={screenHeader}>
      <Stack.Screen
        name="ReportList"
        component={ReportListScreen}
        options={{ title: 'Problemas Urbanos' }}
      />
      <Stack.Screen
        name="ReportDetail"
        component={ReportDetailScreen}
        options={{ title: 'Detalhes do problema' }}
      />
      <Stack.Screen
        name="EditReport"
        component={EditReportScreen}
        options={{ title: 'Editar registro' }}
      />
    </Stack.Navigator>
  );
}

function tabIcon(emoji: string) {
  return ({ color }: { color: string }) => (
    <Text style={{ fontSize: 20, color }}>{emoji}</Text>
  );
}

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenHeader,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Problemas"
        component={ProblemsStack}
        options={{ headerShown: false, tabBarIcon: tabIcon('📋') }}
      />
      <Tab.Screen
        name="Registrar"
        component={CreateReportScreen}
        options={{ title: 'Registrar problema', tabBarIcon: tabIcon('➕') }}
      />
      <Tab.Screen
        name="Sobre"
        component={AboutScreen}
        options={{ title: 'Sobre o app', tabBarIcon: tabIcon('ℹ️') }}
      />
    </Tab.Navigator>
  );
}
