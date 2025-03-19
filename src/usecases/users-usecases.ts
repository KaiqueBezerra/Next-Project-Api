import {
  User,
  UserCreate,
  UserGet,
  UserRepository,
} from "../interfaces/users-interface";
import { UserRepositoryPrisma } from "../repositories/users-repository";
import { AuthService } from "../services/auth-service";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async createUser({ name, email, password }: UserCreate): Promise<void> {
    const userVeriryExists = await this.userRepository.findUserByEmail(email);

    if (userVeriryExists) {
      throw new Error("Usuário já existe.");
    }

    const hashedPassword = await AuthService.hashPassword(password);

    await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.userRepository.findUserByEmail(email);

    if (!result) {
      throw new Error("Usuário não encontrado.");
    }

    return result;
  }

  async findUserById(id: string): Promise<UserGet | null> {
    const result = await this.userRepository.findUserById(id);

    if (!result) {
      throw new Error("Usuário não encontrado.");
    }

    return result;
  }

  async updateUser(id: string, name: string): Promise<UserGet | null> {
    const result = await this.userRepository.updateUser(id, name);

    if (!result) {
      throw new Error("Usuário não encontrado.");
    }

    return result;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.deleteUser(id);
  }

  async authenticate(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Email inválido.");
    }

    const isPasswordValid = await AuthService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Senha inválida.");
    }

    return AuthService.generateToken(user.id);
  }
}

export { UserUseCase };
