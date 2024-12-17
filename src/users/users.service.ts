import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  //local db
  //local array

  private readonly users = [];

  create(user: CreateUserDTO) {
    this.users.push(user);
    return this.users;
  }

  findAll() {
    //fetch all from DB
    // throw new Error('For example there is an error in DB');
    return this.users;
  }
}
