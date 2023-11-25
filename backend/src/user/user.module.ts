import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: '123', // Replace with your own secret key (keep it secure)
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    // Other imports...
  ],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
