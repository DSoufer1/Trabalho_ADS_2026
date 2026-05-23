import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ReportForm } from '../components/ReportForm';
import type { RootTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<RootTabParamList, 'Registrar'>;

export function CreateReportScreen({ navigation }: Props) {
  return (
    <ReportForm
      onSaved={() => navigation.navigate('Problemas', { screen: 'ReportList' })}
    />
  );
}
