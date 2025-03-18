export interface Project {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ProjectCreate {
  name: string;
  description: string;
  requirements: string[];
  phoneNumber: string;
  userId: string;
}

export interface ProjectGet {
  project: Project | null;
  favoriteCount: number;
}

export interface ProjectRepository {
  create(data: ProjectCreate): Promise<Project>;
  findAllProject(
    search: string,
    filter: string,
    page: number,
    limit: number
  ): Promise<Project[] | null>;
  findProjectById(id: string): Promise<ProjectGet>;
  findProjectByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<Project[]>;
}
