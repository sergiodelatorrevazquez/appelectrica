import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent  implements OnInit {

  @Input() control: FormControl;
  @Input() pregunta: string;
  @Input() respuestas: string[];
  @Output() respuestaSeleccionada: string;

  constructor() { }

  ngOnInit() {}

}
