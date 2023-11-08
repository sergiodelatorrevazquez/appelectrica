import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() color: string;
  @Input() isModal: boolean;
  @Input() title: string;

  darkMode: BehaviorSubject<boolean>;

  constructor(
    private themeService: ThemeService,
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.darkMode = this.themeService.darkMode;
  }

  setTheme(darkMode: boolean){
    this.themeService.setTheme(darkMode);
  }

  dismissModal(){
    this.utilsService.dismissModal();
  }

  isLogged(){
    if (this.utilsService.getElementFromLocalStorage('usuario') != null){
      return true;
    }
    return false;
  }

  logOut(){
    this.utilsService.presentAlert({
      header: 'Cerrar Sesión',
      message: '¿Seguro que quiere cerrar sesión?',
      mode: 'ios',
      buttons: [
        {
          text: 'No, mantener sesión iniciada',
          role: 'cancel',
        }, {
          text: 'Sí, cerrar sesión',
          handler: () => {
            return this.firebaseService.signOut();
          }
        }
      ]
    })
  }

}
