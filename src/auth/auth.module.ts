import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { FirebaseService } from './firebase/firebase.service';
import { AuthUtils } from './utils/auth.utils';

const serviceAccount = require('../../config/serviceAccountKey.json') as ServiceAccount;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}); 

@Module({
  providers: [AuthService, FirebaseService, AuthUtils],
  controllers: [AuthController],
  exports: [AuthService, FirebaseService, AuthUtils],
})
export class AuthModule {}
