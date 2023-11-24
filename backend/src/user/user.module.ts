import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Provide your UserEntity here
    // Other imports...
  ],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
