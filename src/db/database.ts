import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'pointgov.db';

/**
 * Creates the schema on first launch. Passed to <SQLiteProvider onInit={...} />
 * so it runs once before any screen queries the database.
 */
export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'aberto',
      photoUri TEXT,
      latitude REAL,
      longitude REAL,
      address TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);
}
