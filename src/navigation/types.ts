import type { NavigatorScreenParams } from '@react-navigation/native';

/** Stack inside the "Problemas" tab. */
export type ProblemsStackParamList = {
  ReportList: undefined;
  ReportDetail: { id: number };
  EditReport: { id: number };
};

/** Bottom tab navigator. */
export type RootTabParamList = {
  Problemas: NavigatorScreenParams<ProblemsStackParamList>;
  Registrar: undefined;
  Sobre: undefined;
};
