import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { getReports } from '../db/reportsRepository';
import { Report } from '../types/report';

/** Loads the full report list and refreshes it whenever the screen regains focus. */
export function useReports() {
  const db = useSQLiteContext();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setReports(await getReports(db));
    } finally {
      setLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  return { reports, loading, reload };
}
