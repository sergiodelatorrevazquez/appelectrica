import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { QuestionComponent } from './components/question/question.component';
import { NewFormComponent } from './components/new-form/new-form.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { RecoverComponent } from './components/recover/recover.component';


@NgModule({
  declarations: [
    InputComponent,
    HeaderComponent,
    QuestionComponent,
    NewFormComponent,
    BarChartComponent,
    RecoverComponent
  ],
  exports: [
    InputComponent,
    HeaderComponent,
    QuestionComponent,
    NewFormComponent,
    BarChartComponent,
    RecoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgApexchartsModule
  ]
})
export class SharedModule { }
