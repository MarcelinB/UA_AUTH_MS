import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount = require('../../config/serviceAccountKey.json') as ServiceAccount;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}); 

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
