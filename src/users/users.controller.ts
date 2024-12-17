import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user-dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return `fetch this id : ${typeof id}`;
    // return {
    //   message: 'Here is the fetched by id ',
    //   id: id,
    // };
  }

  @Put(':id')
  update() {
    return 'updated id :';
  }

  @Delete(':id')
  delete() {
    return 'deleted id';
  }
}
