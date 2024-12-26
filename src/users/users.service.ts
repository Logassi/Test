import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDTO } from './dto/update-user-dto';
import { RegisterUserDTO } from './dto/register-user-dto';
import { LoginUserDTO } from './dto/login-user-dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  //local db
  //local array
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private readonly users = [];

  async register(registerUser: RegisterUserDTO) {
    const saltRound = 10;
    const hashedPassword = await hash(registerUser.password, saltRound);

    const newUser = new this.userModel({
      ...registerUser,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(loginUser: LoginUserDTO) {
    const user = await this.userModel.findOne({ email: loginUser.email });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await compare(loginUser.password, user.password);
    if (!isPasswordValid) throw new Error('Password invalid');

    const payload = { id: user.id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  create(createUser: CreateUserDTO) {
    const newUser = new this.userModel(createUser);

    return newUser.save();
    // this.users.push(createUser);
    // return this.users;
  }

  findAll() {
    const userFromDB = this.userModel.find();
    //fetch all from DB
    // throw new Error('For example there is an error in DB');
    return userFromDB;
  }

  findById(id: string) {
    const userFromDbById = this.userModel.findById(id);

    return userFromDbById;
  }

  //NOTES : when { new: true } added, the data shows/response is the new one
  updateUserById(id: string, updateUserDTO: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });
  }

  deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
