export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface UserGet {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRepository {
  create(data: UserCreate): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<UserGet | null>;
}
