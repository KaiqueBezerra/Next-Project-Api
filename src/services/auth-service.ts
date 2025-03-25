import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = (process.env.JWT_SECRET as string) || "super_secret";

class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(userId: string): string {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, SECRET_KEY);
  }

  static getUserFromToken(token: string) {
    try {
      const decoded = this.verifyToken(token);
      return { id: decoded.id };
    } catch (error) {
      return null;
    }
  }
}

export { AuthService };
