import { Injectable } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  authState,
  signOut,
  sendPasswordResetEmail
} from '@angular/fire/auth'; 
import { Firestore, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { UtilsService } from './utils.service';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: Auth,
    private db: Firestore,
    private utilsService: UtilsService
  ) { }

  // AUTENTICACION
  login(usuario: Usuario){
    return signInWithEmailAndPassword(this.auth, usuario.email, usuario.password)
  }

  signUp(usuario: Usuario){
    return createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password)
  }

  updateUser(usuario: any){
    const auth = getAuth();
    return updateProfile(auth.currentUser, usuario)
  }

  getAuthState(){
    return authState;
  }

  async signOut(){
    await signOut(this.auth);
    this.utilsService.routerLink('/inicio-sesion');
    localStorage.removeItem('usuario')
  }

  recoverPassword(email: string){
    return sendPasswordResetEmail(this.auth, email);
  }

  // FIRESTORE
  async addAnswer(answer: Answer, userId: string, cnt: number){
    let path = `users/${userId}`;
    let respuesta = "respuestas/" + JSON.stringify(cnt);
    await setDoc(doc(this.db, path, respuesta), answer); 
  }

  async getAnswers(path: string){
    const querySnapshot = await getDocs(collection(this.db, path));
    return querySnapshot;
  }

  async addUser(usuario: Usuario,){
    let path = `users/${usuario.uid}`;
    let path2 = `user/${usuario.uid}`;
    await setDoc(doc(this.db, path, path2), usuario); 
  }

  async getUser(path: string){
    const docSnapshot = await getDoc(doc(this.db, path));
    return docSnapshot;
  }

}

