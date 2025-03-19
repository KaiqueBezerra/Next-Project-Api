export interface Report {
  id: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  projectId: string;
}

export interface ReportCreate {
  comment: string;
  userId: string;
  projectId: string;
}

export interface ReportRepository {
  createReport(data: ReportCreate): Promise<void>;
}
