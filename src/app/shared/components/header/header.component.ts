import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() color: string;

  darkMode: BehaviorSubject<boolean>;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.darkMode = this.themeService.darkMode;
  }

  setTheme(darkMode: boolean){
    this.themeService.setTheme(darkMode);
  }

}
