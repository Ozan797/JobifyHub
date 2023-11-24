import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      return { message: 'User already exists' };
    }

    const newUser = await this.usersService.create(email, password);
    return { message: 'User registered successfully', user: newUser };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return { message: 'Incorrect email' };
    }

    const isPasswordValid = await this.usersService.comparePassword(
      password,
      user.password,
    );
    if (isPasswordValid) {
      return { message: 'Login Successful' };
    } else {
      return { message: 'incorrect password' };
    }
  }
}
