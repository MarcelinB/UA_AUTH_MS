import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UserIdDto } from './dto/auth.dto';
import { AuthResponse, UserResponse } from './interfaces/auth.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async register(data: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(data);
  }

  @MessagePattern('auth.login')
  async login(data: LoginDto): Promise<AuthResponse> {
    return this.authService.login(data);
  }

  @MessagePattern('auth.get_user')
  async getUser(data: UserIdDto): Promise<UserResponse> {
    return this.authService.getUser(data.userId);
  }

  @MessagePattern('auth.update_user')
  async updateUser(data: { userId: string; updates: Partial<UserResponse> }): Promise<UserResponse> {
    return this.authService.updateUser(data.userId, data.updates);
  }

  @MessagePattern('auth.delete_user')
  async deleteUser(data: UserIdDto): Promise<void> {
    return this.authService.deleteUser(data.userId);
  }

  @MessagePattern('auth.reset_password')
  async resetPassword(data: { email: string }): Promise<void> {
    return this.authService.resetPassword(data.email);
  }

  @MessagePattern('auth.verify_token')
  async verifyToken(data: { token: string }): Promise<any> {
    return this.authService.verifyToken(data.token);
  }
}