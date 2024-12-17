import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
    try {
      return this.usersService.findAll();
      // return { // returning an object [json]
      //   message: 'Here is the fetched by id ',
      //   id: id,
      // };
    } catch (error) {
      throw new HttpException(
        'Server error bangetsz',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,

          // cause: "yo nda tau kok tanya saaya",
        },
      );
      // console.log(`Inside the catch block, this is the error ${error}`);
    }
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    try {
      return `fetch this id : ${typeof id}`;
      // return { // returning an object [json]
      //   message: 'Here is the fetched by id ',
      //   id: id,
      // };
    } catch (error) {
      console.log(`Inside the catch block, this is the error ${error}`);
    }
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
