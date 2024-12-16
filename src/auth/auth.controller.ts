import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_register')
  async register(data: { email: string; password: string }) {
    return this.authService.register(data.email, data.password);
  }

  @MessagePattern('auth_login')
  async login(data: { email: string; password: string }) {
    console.log(data);
    return this.authService.login(data.email, data.password);
  }
}
