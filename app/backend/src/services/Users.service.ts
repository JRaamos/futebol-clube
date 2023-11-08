import * as bcrypt from 'bcryptjs';
import { Token } from '../Interfaces/jwt';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/users/IUserModel';
// import { IUser } from '../Interfaces/users/IUser';
import { generateToken } from '../utils/jwt.utils';
import UserModel from '../models/UserModel';

export default class UsersService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async findByEmailPassword(
    email: string,
    password: string,
  ): Promise<ServiceResponse<Token>> {
    const user = await this.userModel.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'Invalid email or password' },
      };
    }

    const token = generateToken({ email, password });

    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }
}
