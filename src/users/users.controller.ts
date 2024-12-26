import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user-dto';
import mongoose from 'mongoose';
import { UpdateUserDTO } from './dto/update-user-dto';
import { RegisterUserDTO } from './dto/register-user-dto';
import { LoginUserDTO } from './dto/login-user-dto';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createProfile')
  create(@Body() createUserDTO: CreateUserDTO) {
    console.log(createUserDTO);
    return this.usersService.create(createUserDTO);
  }

  @Post('register')
  register(@Body() registerUserDTO: RegisterUserDTO) {
    try {
      console.log(registerUserDTO);
      return this.usersService.register(registerUserDTO);
    } catch (error) {
      console.log(error);

      // throw new HttpException(
      //   'Server error',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      //   {
      //     cause: error,
      //   },
      // );
    }
  }

  @Post('login')
  login(@Body() loginUserDTO: LoginUserDTO) {
    try {
      console.log(loginUserDTO);
      return this.usersService.login(loginUserDTO);
    } catch (error) {
      console.log(error);

      // throw new HttpException(
      //   'Server error',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      //   {
      //     cause: error,
      //   },
      // );
    }
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
        'Server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      // Validate if the ID is a valid MongoDB ObjectId
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException('Invalid User ID', HttpStatus.BAD_REQUEST);
      }

      // Find the user by ID
      const findUser = await this.usersService.findById(id);
      if (!findUser) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }

      return findUser;
    } catch (error) {
      // If the error is already an HttpException, rethrow it
      if (error instanceof HttpException) {
        throw error;
      }

      // Handle unexpected errors
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    try {
      // Validate if the ID is a valid MongoDB ObjectId
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException('Invalid User ID', HttpStatus.BAD_REQUEST);
      }

      // Find the user by ID
      // const findUser = await this.usersService.findById(id);
      // if (!findUser) {
      //   throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      // }

      const updatedUser = await this.usersService.updateUserById(
        id,
        updateUserDTO,
      );

      if (!updatedUser) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
      console.log(updateUserDTO);
      console.log('This is the updated user : ' + updatedUser);

      return new HttpException('Success', HttpStatus.OK); // return http exception to conceal the changes [user have to get the data to see]
      // return updatedUser; // return the updated user to show the changes
      // return findUser;
    } catch (error) {
      // If the error is already an HttpException, rethrow it
      if (error instanceof HttpException) {
        throw error;
      }

      // Handle unexpected errors
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      // Validate if the ID is a valid MongoDB ObjectId
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (!isValid) {
        throw new HttpException('Invalid User ID', HttpStatus.BAD_REQUEST);
      }

      const deleteUser = await this.usersService.deleteUserById(id);

      if (!deleteUser) {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      }
      console.log(deleteUser);

      return;
      // return deleteUser;
      // return 'deleted id';
    } catch (error) {
      // If the error is already an HttpException, rethrow it
      if (error instanceof HttpException) {
        throw error;
      }

      // Handle unexpected errors
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
