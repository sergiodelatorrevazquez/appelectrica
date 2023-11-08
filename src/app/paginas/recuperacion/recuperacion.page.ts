import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RecoverComponent } from 'src/app/shared/components/recover/recover.component';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  async onSubmit(){
    this.firebaseService.recoverPassword(this.form.value.email);

    await this.utilsService.presentModal({
      component: RecoverComponent,
      cssClass: 'modal-message'
    })
  }

}
