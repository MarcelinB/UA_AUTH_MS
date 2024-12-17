import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserResponse } from '../interfaces/auth.interface';

@Injectable()
export class AuthUtils {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  mapUserRecord(userRecord: admin.auth.UserRecord): UserResponse {
    return {
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      disabled: userRecord.disabled,
      metadata: {
        lastSignInTime: userRecord.metadata.lastSignInTime,
        creationTime: userRecord.metadata.creationTime,
      },
    };
  }

  handleFirebaseError(error: any): never {
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-exists':
          throw new BadRequestException('Email already exists');
        case 'auth/invalid-email':
          throw new BadRequestException('Invalid email format');
        case 'auth/user-not-found':
          throw new BadRequestException('User not found');
        case 'auth/weak-password':
          throw new BadRequestException('Password is too weak');
        case 'auth/invalid-password':
          throw new BadRequestException('Invalid password');
        case 'auth/operation-not-allowed':
          throw new BadRequestException('Operation not allowed');
        default:
          throw new InternalServerErrorException('Authentication error occurred');
      }
    }
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}