import { prisma } from "../db/prisma-client";
import {
  User,
  UserCreate,
  UserGet,
  UserRepository,
} from "../interfaces/users-interface";

class UserRepositoryPrisma implements UserRepository {
  async createUser(data: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return result;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return result;
  }

  async findUserById(id: string): Promise<UserGet | null> {
    const result = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return result;
  }

  async updateUser(id: string, name: string): Promise<UserGet | null> {
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return result;
  }
}

export { UserRepositoryPrisma };
