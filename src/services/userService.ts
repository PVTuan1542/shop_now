import { UserLogin, UserRegister } from "../controllers/user/user.interface";
import { User } from "../entities/user";
import { dataSource } from "../ormconfig";
import * as bcrypt from "bcrypt"
import { JWT_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from "../untils/constant";
import * as jwt from "jsonwebtoken";
import { Token } from "../entities/token";

interface ResultsInterface<T> {
  data?: T;
  error?: any;
  status?: number;
}

interface ResultsGetAll<T> {
  pagination?: {
    count?: Number,
    pageCount?: Number,
    currentPage?: Number,
    pageItem?: Number,
  },
  data?: T;
  error?: any;
  status?: number;
}

export class UserService {
  private userRepository = dataSource.getRepository(User);
  private tokenRepository = dataSource.getRepository(Token);

  comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
  };
  

  async login(data: UserLogin): Promise<ResultsInterface<any>> {
    const { password, userName } = data;
    try {
      const user = await this.userRepository.findOne({
        where: {
          userName
        }
      })

      if(!user) {
        return {
          error: "User not existing"
        }
      }

      const isValidPassword = await this.comparePassword(password, user.encryptPassword);

      if(!isValidPassword) {
        return {
          error: "Password incorrect"
        }
      }

      const accessToken = jwt.sign({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName},
        JWT_SECRET, { expiresIn: JWT_EXPIRATION})

      const refreshToken = jwt.sign({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName},
        JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION })

      await this.tokenRepository.save({
        userId: user.id,
        token: accessToken,
        refreshToken,
      })

      return {
        data: {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          accessToken,
          refreshToken
        },
        status: 201,
      }
    } catch (error) {
      return {
        error: error,
        status: 500,
      }
    }
  }

  async getUser(): Promise<ResultsGetAll<User[]>> {
    try {
      const [users, count] = await this.userRepository.findAndCount();

      return {
        pagination: {
          count
        },
        data: users,
        status: 201,
      }
    } catch (error) {
      return {
        error: error,
        status: 500,
      }
    }
  }

  async registerUser(data: UserRegister): Promise<ResultsInterface<User>> {
    const { password, ...newData } = data;
    try {
      const encryptPassword = await bcrypt.hash(data.password, 10);
      const user = await this.userRepository.save({ ...newData, encryptPassword });

      return {
        data: user,
        status: 201,
      }
    } catch (error) {
      return {
        error: error,
        status: 500,
      }
    }
  }
}