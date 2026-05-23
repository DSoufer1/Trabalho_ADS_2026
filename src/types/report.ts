export type Category = 'iluminacao' | 'buraco' | 'dengue';

export type Status = 'aberto' | 'andamento' | 'resolvido';

export interface Report {
  id: number;
  category: Category;
  description: string;
  status: Status;
  photoUri: string | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Fields the user supplies; id/timestamps are managed by the repository. */
export type ReportInput = Omit<Report, 'id' | 'createdAt' | 'updatedAt'>;
