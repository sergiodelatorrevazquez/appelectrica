import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario = {} as Usuario

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUser()
  }

  getUser(){
    return this.usuario = this.utilsService.getElementFromLocalStorage('usuario');
  }

  signOut() {
    this.utilsService.presentAlert({
      header: 'Cerrar Sesión',
      message: '¿Seguro que quiere cerrar sesión?',
      mode: 'ios',
      buttons: [
        {
          text: 'No, mantener sesión iniciada',
          role: 'cancel',
        }, {
          text: 'Sí, cerrar sesión',
          handler: () => {
            return this.firebaseService.signOut();
          }
        }
      ]
    })
  }

}
