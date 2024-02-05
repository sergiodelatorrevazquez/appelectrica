import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Profile } from 'src/app/models/profile.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  recomendacion: String = "Has respondido la pregunta 7 del cuestionario inicial con NS/NC, por lo que no podemos mostrar tu ranking actual.";
  porcentaje: number = 0;
  perfiles: Profile[] = [];

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPercentaje();
  }

  getPercentaje() {
    let user = this.utilsService.getElementFromLocalStorage('usuario');

    let path = `cuestionario1/${user.uid}/respuestas`;

    this.firebaseService.getAnswers(path)
      .then(res => {
        res.forEach(doc => {
          let ans = doc.data() as Answer

          if(ans.id == "9"){
            this.firebaseService.getProfiles("perfiles")
              .then(res2 => {
                res2.forEach(doc => {
                  console.log(doc.data()as Profile);
                  this.perfiles.push(doc.data() as Profile);
                });

                this.porcentaje = -1;

                if (ans.respuesta == "Hasta 150 kWh") {
                  this.porcentaje = +this.perfiles[0].porcentaje;
                } else if (ans.respuesta == "Entre 150 y 250 kWh") {
                  this.porcentaje = +this.perfiles[1].porcentaje;
                } else if (ans.respuesta == "Entre 250 y 350 kWh") {
                  this.porcentaje = +this.perfiles[2].porcentaje;
                } else if (ans.respuesta == "Entre 350 y 450 kWh") {
                  this.porcentaje = +this.perfiles[3].porcentaje;
                } else if (ans.respuesta == "Entre 450 y 550 kWh") {
                  this.porcentaje = +this.perfiles[4].porcentaje;
                } else if (ans.respuesta == "Más de 550 kWh") {
                  this.porcentaje = +this.perfiles[5].porcentaje;
                }

                if(this.porcentaje == -1){
                  this.recomendacion = "Tienes que rellenar la pregunta de consumo del Cuestonario Inicial."
                }
                this.recomendacion = "Tienes un consumo similar al " + this.porcentaje + "% de la población."
              })
          }
        });
      })
  }

}
