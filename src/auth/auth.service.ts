import { 
  Injectable, 
  BadRequestException, 
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthResponse, UserResponse } from './interfaces/auth.interface';
import { FirebaseService } from './firebase/firebase.service';
import { AuthUtils } from './utils/auth.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly authUtils: AuthUtils
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    try {
      if (!this.authUtils.isValidEmail(registerDto.email)) {
        throw new BadRequestException('Invalid email format');
      }

      const userRecord = await this.firebaseService.createUser({
        email: registerDto.email,
        password: registerDto.password,
        emailVerified: false,
      });

      const token = await this.firebaseService.createCustomToken(userRecord.uid);

      return {
        user: this.authUtils.mapUserRecord(userRecord),
        token,
      };
    } catch (error) {
      this.authUtils.handleFirebaseError(error);
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      if (!this.authUtils.isValidEmail(loginDto.email)) {
        throw new BadRequestException('Invalid email format');
      }

      const userRecord = await this.firebaseService.getUserByEmail(loginDto.email);
      const token = await this.firebaseService.createCustomToken(userRecord.uid);

      return {
        user: this.authUtils.mapUserRecord(userRecord),
        token,
      };
    } catch (error) {
      this.authUtils.handleFirebaseError(error);
    }
  }

  async getUser(userId: string): Promise<UserResponse> {
    try {
      const userRecord = await this.firebaseService.getUser(userId);
      return this.authUtils.mapUserRecord(userRecord);
    } catch (error) {
      this.authUtils.handleFirebaseError(error);
    }
  }

  async updateUser(userId: string, updates: Partial<UserResponse>): Promise<UserResponse> {
    try {
      const userRecord = await this.firebaseService.updateUser(userId, updates);
      return this.authUtils.mapUserRecord(userRecord);
    } catch (error) {
      this.authUtils.handleFirebaseError(error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.firebaseService.deleteUser(userId);
    } catch (error) {
      this.authUtils.handleFirebaseError(error);
    }
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      return await this.firebaseService.verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.firebaseService.generatePasswordResetLink(email);
    } catch (error) {
      this.authUtils.handleFirebaseError(error);
    }
  }
}