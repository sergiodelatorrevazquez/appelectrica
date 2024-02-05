import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { Usuario } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { questionsStorage } from 'src/assets/questionsStorage';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss'],
})
export class NewFormComponent implements OnInit {

  usuario = {} as Usuario;
  cuestionario: number;
  questionsStorage: Question[];
  rellenar: boolean;

  cnt = 0;
  id: string;
  pregunta: string;
  respuestas: string[];

  form = new FormGroup({
    respuesta: new FormControl('', Validators.required)
  })

  answer: Answer;

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.usuario = this.utilsService.getElementFromLocalStorage('usuario');
    this.cuestionario = this.utilsService.getElementFromLocalStorage('cuestionario');
    if(this.cuestionario == 1) this.questionsStorage = questionsStorage;

    this.id = this.questionsStorage[this.cnt].id;
    this.pregunta = this.questionsStorage[this.cnt].pregunta;
    if(this.questionsStorage[this.cnt].respuestas == null){
      this.rellenar = true;
    } else{
      this.rellenar = false;
      this.respuestas = this.questionsStorage[this.cnt].respuestas;
    }
    this.cnt++;
  }

  onSubmit(){
    this.answer = {
      id: this.id,
      pregunta: this.pregunta,
      respuesta: this.form.value.respuesta
    }

    this.firebaseService.addAnswer(this.cuestionario, this.usuario.uid, this.answer, this.cnt);

    this.form = new FormGroup({
      respuesta: new FormControl('', Validators.required)
    })

    if(this.cnt == this.questionsStorage.length){
      this.utilsService.dismissModal();
    } else {
      this.next();
    }
  }

  next(){
    this.id = this.questionsStorage[this.cnt].id;
    this.pregunta = this.questionsStorage[this.cnt].pregunta;
    console.log(this.questionsStorage[this.cnt].respuestas)
    if(this.questionsStorage[this.cnt].respuestas == null){
      this.rellenar = true;
    } else{
      this.rellenar = false;
      this.respuestas = this.questionsStorage[this.cnt].respuestas;
    }
    this.cnt++;
  }

}
