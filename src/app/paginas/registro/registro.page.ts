import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  preguntas: Question[] = [
    {
      id: '1',
      pregunta: '¿En que provincia está ubicado el hogar?',
      respuestas: ['NS/NC', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 
        'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
        'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca',
        'Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense',
        'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
        'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 
        'Zamora', 'Zaragoza']
    },
    {
      id: '2',
      pregunta: '¿Cuál es el tamaño del hogar?',
      respuestas: ['NS/NC', 'Menos de 60 metros cuadrados', 'De 60 a 120 metors cuadrados', 
        'Más de 120 metros cuadrados']
    },
    {
      id: '3',
      pregunta: '¿Cuál es el estado de trabajo de los residentes?',
      respuestas: ['NS/NC', 'Todos en casa', 'Todos fuera de casa', 'Algunos en casa y otros fuera']
    },
    {
      id: '4',
      pregunta: '¿Posee calefacción el hogar?',
      respuestas: ['NS/NC', 'No', 'Sí, aerotermia', 'Sí, bomba de calor', 'Sí, radiador eléctrico']
    },
    {
      id: '5',
      pregunta: '¿Posee aire acondicionado?',
      respuestas: ['NS/NC', 'Sí', 'No']
    },
    {
      id: '6',
      pregunta: '¿Tiene instalación de autoconsumo?',
      respuestas: ['NS/NC', 'Sí', 'No']
    },
    {
      id: '7',
      pregunta: '¿Cuál es el consumo energético en el último mes?',
      respuestas: ['NS/NC', 'Entre 0 y 50 kWh', 'Entre 50 y 100 kWh', 'Entre 100 y 150 kWh', 'Entre 150 y 200 kWh']
    }
  ]

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('')
  })

  form2 = new FormGroup({
    respuesta0: new FormControl('', [Validators.required]),
    respuesta1: new FormControl('', [Validators.required]),
    respuesta2: new FormControl('', [Validators.required]),
    respuesta3: new FormControl('', [Validators.required]),
    respuesta4: new FormControl('', [Validators.required]),
    respuesta5: new FormControl('', [Validators.required]),
    respuesta6: new FormControl('', [Validators.required])
  })

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  onSubmit() {
    if (this.form.valid && this.form2.valid) {
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

          this.utilsService.setElementInLocalStorage('usuario', usuario);
          this.utilsService.routerLink('/inicio/perfil');

          let respuestas = {
            respuesta0: this.form2.value.respuesta0,
            respuesta1: this.form2.value.respuesta1,
            respuesta2: this.form2.value.respuesta2,
            respuesta3: this.form2.value.respuesta3,
            respuesta4: this.form2.value.respuesta4,
            respuesta5: this.form2.value.respuesta5,
            respuesta6: this.form2.value.respuesta6
          }

          this.firebaseService.addToCollection(response.user.uid, respuestas)

          this.utilsService.dismissLoading();

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
