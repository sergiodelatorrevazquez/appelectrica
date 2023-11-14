import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NewFormComponent } from '../new-form/new-form.component';

@Component({
  selector: 'app-show-questions',
  templateUrl: './show-questions.component.html',
  styleUrls: ['./show-questions.component.scss'],
})
export class ShowQuestionsComponent  implements OnInit {

  respuestas: Answer[] = []

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getForm();
  }

  getForm(){
    let user: Usuario = this.utilsService.getElementFromLocalStorage('usuario');
    let cuestionario: number = this.utilsService.getElementFromLocalStorage('cuestionario');

    let path = `cuestionario${cuestionario}/${user.uid}/respuestas`;

    this.firebaseService.getAnswers(path)
    .then(res => {
      res.forEach(doc => {
        console.log(doc.data())
        this.respuestas.push(doc.data() as Answer);
      });
    })
  }

  async onClick(){
    await this.utilsService.presentModal({
      component: NewFormComponent,
      cssClass: 'modal'
    })

    
    this.respuestas = [];
    this.getForm();
  }

}
