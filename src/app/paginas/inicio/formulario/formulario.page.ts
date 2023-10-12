import { Component, OnInit } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { DocumentSnapshot } from 'firebase/firestore';
import { Question } from 'src/app/models/question.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {


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

  respuestas: DocumentSnapshot;

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getForm()
  }

  getForm(){
    let user: Usuario = this.utilsService.getElementFromLocalStorage('usuario');
    let path = `users/${user.uid}`

    this.firebaseService.getCollection(path)
      .then(response => {
        console.log(response)
        this.respuestas = response
      })
      .catch(error => {
        console.log(error)
      })
  }

}
