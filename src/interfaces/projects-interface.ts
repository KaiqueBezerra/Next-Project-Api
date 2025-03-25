export interface Project {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  User?: {
    name: string;
  };
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
  createProject(data: ProjectCreate): Promise<void>;
  findAllProjects(
    search: string,
    filter: string,
    page: number,
    limit: number
  ): Promise<Project[]>;
  findProjectById(id: string): Promise<ProjectGet>;
  findProjectsByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<Project[]>;
  findProjectsByUserIdNoToken(
    userId: string,
    page: number,
    limit: number
  ): Promise<Project[]>;
  updateProject(id: string, data: ProjectCreate): Promise<void>;
  deleteProject(id: string, userId: string): Promise<void>;
}
