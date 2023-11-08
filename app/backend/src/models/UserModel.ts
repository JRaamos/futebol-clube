import { IUserModel } from '../Interfaces/users/IUserModel';
import User from '../database/models/UserModel';

export default class UserModel implements IUserModel {
  private model = User;

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
