import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDTO } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  //local db
  //local array
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  private readonly users = [];

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
