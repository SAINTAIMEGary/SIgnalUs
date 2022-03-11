import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async sinscrire({ email, motdepasse }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        motdepasse
      );
      return user;
    } catch(e) {
      return null;
    }
    
  }

  async connexion({ email, motdepasse }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        motdepasse
      );
      return user;
    } catch(e) {
      return null;
    }
  }

  deconnexion() {
    return signOut(this.auth);
  }
}