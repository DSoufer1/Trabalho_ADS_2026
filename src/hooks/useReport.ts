import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { getReportById } from '../db/reportsRepository';
import { Report } from '../types/report';

/** Loads a single report by id and keeps it fresh on screen focus. */
export function useReport(id: number) {
  const db = useSQLiteContext();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setReport(await getReportById(db, id));
    } finally {
      setLoading(false);
    }
  }, [db, id]);

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  return { report, loading, reload };
}
