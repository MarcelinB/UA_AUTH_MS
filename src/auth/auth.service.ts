import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  register(email: string, password: string) {
      throw new Error('Method not implemented.');
  }
  async login(email: string, password: string) {
    /*if (!this.isValidEmail(email)) {
      throw new BadRequestException('L\'adresse e-mail est mal formatée.');
    } */

    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      // Ajoutez ici la logique pour vérifier le mot de passe (Firebase ne stocke pas les mots de passe en clair).
      return { userId: userRecord.uid };
    } catch (error) {
        console.log(email);
      // Vérifiez si l'erreur provient de Firebase
      if (error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            throw new BadRequestException('Utilisateur non trouvé.'); 
          case 'auth/invalid-email':
            throw new BadRequestException('L\'adresse e-mail est invalide.');
          default:
            throw new InternalServerErrorException('Une erreur est survenue lors de la connexion.');
        }
      }
      // Si l'erreur ne provient pas de Firebase, renvoyez une erreur générique
      throw new InternalServerErrorException('Une erreur est survenue lors de la connexion.');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
