import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NewFormComponent } from 'src/app/shared/components/new-form/new-form.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  respuestas: Answer[] = [];

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getForm()
  }

  ionViewWillEnter() {
  }

  getForm(){
    let user: Usuario = this.utilsService.getElementFromLocalStorage('usuario');
    let path = `users/${user.uid}/respuestas`;

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
      cssClass: 'new-form'
    });

    this.getForm();
  }

}
