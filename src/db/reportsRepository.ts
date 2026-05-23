import type { SQLiteDatabase } from 'expo-sqlite';
import { Report, ReportInput, Status } from '../types/report';

/** CREATE — inserts a new report and returns its generated id. */
export async function createReport(
  db: SQLiteDatabase,
  input: ReportInput,
): Promise<number> {
  const now = new Date().toISOString();
  const result = await db.runAsync(
    `INSERT INTO reports
       (category, description, status, photoUri, latitude, longitude, address, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    input.category,
    input.description,
    input.status,
    input.photoUri,
    input.latitude,
    input.longitude,
    input.address,
    now,
    now,
  );
  return result.lastInsertRowId;
}

/** READ — all reports, newest first. */
export async function getReports(db: SQLiteDatabase): Promise<Report[]> {
  return db.getAllAsync<Report>(
    'SELECT * FROM reports ORDER BY datetime(createdAt) DESC',
  );
}

/** READ — a single report by id, or null if it no longer exists. */
export async function getReportById(
  db: SQLiteDatabase,
  id: number,
): Promise<Report | null> {
  return db.getFirstAsync<Report>('SELECT * FROM reports WHERE id = ?', id);
}

/** UPDATE — overwrites all editable fields of an existing report. */
export async function updateReport(
  db: SQLiteDatabase,
  id: number,
  input: ReportInput,
): Promise<void> {
  await db.runAsync(
    `UPDATE reports SET
       category = ?, description = ?, status = ?, photoUri = ?,
       latitude = ?, longitude = ?, address = ?, updatedAt = ?
     WHERE id = ?`,
    input.category,
    input.description,
    input.status,
    input.photoUri,
    input.latitude,
    input.longitude,
    input.address,
    new Date().toISOString(),
    id,
  );
}

/** UPDATE — quick status-only change used from the detail screen. */
export async function updateReportStatus(
  db: SQLiteDatabase,
  id: number,
  status: Status,
): Promise<void> {
  await db.runAsync(
    'UPDATE reports SET status = ?, updatedAt = ? WHERE id = ?',
    status,
    new Date().toISOString(),
    id,
  );
}

/** DELETE — removes a report permanently. */
export async function deleteReport(
  db: SQLiteDatabase,
  id: number,
): Promise<void> {
  await db.runAsync('DELETE FROM reports WHERE id = ?', id);
}
