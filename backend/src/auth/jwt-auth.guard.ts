import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Assuming the token is sent in the 'Authorization' header

    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Store user details in the request object for future access
      return true;
    } catch (error) {
      return false;
    }
  }
}
