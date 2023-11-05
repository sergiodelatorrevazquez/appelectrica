import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.firebaseService.login(this.form.value as Usuario)
        .then(async response => {
          console.log(response)

          let usuario: Usuario = {
            uid: response.user.uid,
            nombre: response.user.displayName,
            email: response.user.email
          }

          this.utilsService.setElementInLocalStorage('usuario', usuario);
          this.utilsService.routerLink('/inicio/perfil');

          this.utilsService.presentToast({
            message: `Bienvenido ${usuario.nombre}`,
            duration: 1500,
            color: 'primary',
            icon: 'person-outline'
          })

          this.form.reset();
        }, error => {
          console.log(error);

          this.utilsService.presentToast({
            message: error,
            duration: 5000,
            color: 'warning',
            icon: 'alert-outline'
          })
        })
    }
  }

}
