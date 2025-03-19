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
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRepository {
  createUser(data: UserCreate): Promise<void>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<UserGet | null>;
  updateUser(id: string, name: string): Promise<UserGet | null>;
  deleteUser(id: string): Promise<void>;
}
