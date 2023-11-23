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
import { Firestore, collection, doc, getDoc, getDocs, setDoc, query } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { UtilsService } from './utils.service';
import { Answer } from '../models/answer.model';
import { PriceTime } from '../models/price-time.model';

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
  login(usuario: Usuario) {
    return signInWithEmailAndPassword(this.auth, usuario.email, usuario.password)
  }

  signUp(usuario: Usuario) {
    return createUserWithEmailAndPassword(this.auth, usuario.email, usuario.password)
  }

  updateUser(usuario: any) {
    const auth = getAuth();
    return updateProfile(auth.currentUser, usuario)
  }

  getAuthState() {
    return authState;
  }

  async signOut() {
    await signOut(this.auth);
    this.utilsService.routerLink('/inicio-sesion');
    localStorage.removeItem('usuario')
  }

  recoverPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  // FIRESTORE
  async addAnswer(cuestionario: number, userId: string, answer: Answer, cnt: number) {
    let path = `cuestionario${cuestionario}/${userId}`;
    let respuesta = "respuestas/" + JSON.stringify(cnt);
    await setDoc(doc(this.db, path, respuesta), answer);
  }

  async getAnswers(path: string) {
    const querySnapshot = await getDocs(collection(this.db, path));
    return querySnapshot;
  }

  async getProfiles(path: string){
    const querySnapshot = await getDocs(collection(this.db, path));
    return querySnapshot;
  }

  async addAPI(priceTime: PriceTime[]){
    await setDoc(doc(this.db, "API", "Uq8OLkPDnMbEcIlGdxVD"), { 'priceTime': priceTime });
  }

  async getAPI(){
    const querySnapshot = await getDocs(collection(this.db, "API/Uq8OLkPDnMbEcIlGdxVD"));
    return querySnapshot;
  }

}

