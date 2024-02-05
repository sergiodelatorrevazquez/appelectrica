import { Component, OnChanges, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Profile } from 'src/app/models/profile.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.page.html',
  styleUrls: ['./recomendaciones.page.scss'],
})
export class RecomendacionesPage implements OnInit{

  recomendaciones: String[] = [];
  perfiles: Profile[] = [];

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.recomendaciones = [];
    this.getRecommendations();
  }

  getRecommendations() {
    let user = this.utilsService.getElementFromLocalStorage('usuario');

    let path = `cuestionario1/${user.uid}/respuestas`;

    this.firebaseService.getAnswers(path)
      .then(res => {
        res.forEach(doc => {
          let ans = doc.data() as Answer
          if (ans.id == "8") {
            if (ans.respuesta == "Sí") {
              this.recomendaciones.push("1. Recuerda que todos los consumos que hagas en las horas centrales del día harán que se aproveche mejor la energía generada por tu instalación.");
            } else if (ans.respuesta == "No") {
              this.recomendaciones.push("1. Recuerda que puedes consultar los precios horarios para encontrar las horas más baratas.");
            } else {
              this.recomendaciones.push("1. Has respondido la pregunta 8 del cuestionario inicial con NS/NC, por lo que no podemos recomendar nada.");
            }
          }
        });
      })
  }

}
