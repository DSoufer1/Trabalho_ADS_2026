import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReportForm } from '../components/ReportForm';
import type { ProblemsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProblemsStackParamList, 'EditReport'>;

export function EditReportScreen({ route, navigation }: Props) {
  return <ReportForm reportId={route.params.id} onSaved={() => navigation.goBack()} />;
}
