import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent  implements OnInit {

  texto: string;

  constructor(navParams: NavParams) { 
    this.texto = navParams.get('texto');
  }

  ngOnInit() {}

}
