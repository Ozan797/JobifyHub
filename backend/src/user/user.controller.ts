import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express'; // Import Response from express

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
    @Res() res: Response, // Inject the Response object from express
  ) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email' });
    }

    const isPasswordValid = await this.usersService.comparePassword(
      password,
      user.password,
    );
    if (isPasswordValid) {
      const token = await this.usersService.generateJwtToken(user.id);

      // Set the token in the Authorization header
      res.set('Authorization', `Bearer ${token}`);

      // Return success message
      return res.status(200).json({ message: 'Login Successful' });
    } else {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  }

  // Deleting user
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAccount(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.userId; // Access user ID from JWT payload

    // Ensure the user is deleting their own account
    if (userId !== parseInt(id, 10)) {
      return { message: 'Unauthorized: You can only delete your own account' };
    }

    // Implement deletion logic
    const deletedUser = await this.usersService.deleteUser(userId);
    if (deletedUser) {
      return { message: 'Account Deleted' };
    } else {
      return { message: 'Account not deleted' };
    }
  }

  //Deleting User by email instead of JWT
  //   @Delete('deleteByEmail/:email')
  //   async deleteAccountByEmail(@Param('email') email: string) {
  //     const deletedUser = await this.usersService.deleteUserByEmail(email);
  //     if (deletedUser) {
  //       return { message: 'Account deleted successfully' };
  //     } else {
  //       return { message: 'Account deletion failed' };
  //     }
  //   }

  @Patch('reset-password')
  @UseGuards(JwtAuthGuard) // Protect this endpoint with JwtAuthGuard
  async resetPassword(
    @Body('userId') userId: number, // Assuming you pass userId in the request body
    @Body('newPassword') newPassword: string,
    @Res() res: Response,
  ) {
    // Verify if userId is valid or exists in the request body
    if (!userId) {
      return res.status(400).json({ message: 'Invalid or missing user ID' });
    }

    // Call the service to change the password
    const isPasswordReset = await this.usersService.changePassword(
      userId,
      newPassword,
    );

    if (isPasswordReset) {
      return res.status(200).json({ message: 'Password reset successful' });
    } else {
      return res.status(500).json({ message: 'Failed to reset password' });
    }
  }
}
