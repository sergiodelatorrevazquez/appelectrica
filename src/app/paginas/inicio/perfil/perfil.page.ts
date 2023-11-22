import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { UtilsService } from 'src/app/services/utils.service';
import { ShowQuestionsComponent } from 'src/app/shared/components/show-questions/show-questions.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  cuestionarios = ['Cuestionario Inicial']
  respuestas: Answer[] = []

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  async onClick(cuestionario: string){
    this.utilsService.setElementInLocalStorage('cuestionario', this.cuestionarios.indexOf(cuestionario) + 1);

    await this.utilsService.presentModal({
      component: ShowQuestionsComponent,
      cssClass: 'modal'
    })

    this.utilsService.deleteElementFromLocalStorage('cuestionario');
  }

}
