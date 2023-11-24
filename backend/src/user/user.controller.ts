import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  //   Register a new user
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

  //   Login existing user
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
      const token = await this.usersService.generateJwtToken(user.id);
      return { message: 'Login Successful', token };
    } else {
      return { message: 'incorrect password' };
    }
  }
}
