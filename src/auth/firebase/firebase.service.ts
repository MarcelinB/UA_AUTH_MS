import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  async createUser(userData: admin.auth.CreateRequest): Promise<admin.auth.UserRecord> {
    return admin.auth().createUser(userData);
  }

  async getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    return admin.auth().getUserByEmail(email);
  }

  async getUser(userId: string): Promise<admin.auth.UserRecord> {
    return admin.auth().getUser(userId);
  }

  async updateUser(userId: string, updates: any): Promise<admin.auth.UserRecord> {
    return admin.auth().updateUser(userId, updates);
  }

  async deleteUser(userId: string): Promise<void> {
    return admin.auth().deleteUser(userId);
  }

  async createCustomToken(uid: string): Promise<string> {
    return admin.auth().createCustomToken(uid);
  }

  async verifyIdToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(token);
  }

  async generatePasswordResetLink(email: string): Promise<string> {
    return admin.auth().generatePasswordResetLink(email);
  }
}