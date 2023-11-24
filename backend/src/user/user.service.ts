import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(userData: User): Promise<User> {
    const { email, password } = userData; // Destructure necessary fields

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async generateJwtToken(userId: number): Promise<string> {
    const payload = { userId };
    return this.jwtService.signAsync(payload);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Delete Logic
  async deleteUser(userId: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      await this.userRepository.remove(user);
      return user;
    }
    return undefined;
  }

  async changePassword(userId: number, newPassword: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return false;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return true;
  }

  // Deleting with email logic
  //   async deleteUserByEmail(email: string): Promise<User | undefined> {
  //     const user = await this.userRepository.findOne({ where: { email } });
  //     if (user) {
  //       await this.userRepository.remove(user);
  //       return user;
  //     }
  //     return undefined;
  //   }
}
