import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'index.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private themeService: ThemeService
  ) {
    this.themeService.setInitialTheme();
  }
}
