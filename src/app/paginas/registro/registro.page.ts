import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NewFormComponent } from 'src/app/shared/components/new-form/new-form.component';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('')
  })

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  onSubmit() {
    if (this.form.valid) {
      this.utilsService.presentLoading({ message: 'Registrando nuevo usuario' });
      this.firebaseService.signUp(this.form.value as Usuario)
        .then(async response => {
          console.log(response)
          await this.firebaseService.updateUser({ displayName: this.form.value.nombre })

          let usuario: Usuario = {
            uid: response.user.uid,
            nombre: response.user.displayName,
            email: response.user.email
          }

          this.firebaseService.addUser(usuario);
          
          this.utilsService.setElementInLocalStorage('usuario', usuario);

          this.utilsService.dismissLoading();

          await this.utilsService.presentModal({
            component: NewFormComponent,
            cssClass: 'new-form'
          })

          this.utilsService.routerLink('/inicio/home');

          this.utilsService.presentToast({
            message: `Bienvenido ${usuario.nombre}`,
            duration: 1500,
            color: 'primary',
            icon: 'person-outline'
          })

          this.form.reset()
        }, error => {
          console.log(error);
          this.utilsService.dismissLoading();

          this.utilsService.presentToast({
            message: error,
            duration: 5000,
            color: 'warning',
            icon: 'alert-outline'
          })
        })
    }
  }

  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ])

    this.form.controls.confirmPassword.updateValueAndValidity();
  }

}
