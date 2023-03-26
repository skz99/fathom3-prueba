import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fathom3 Prueba JMMV';

  constructor(public translate: TranslateService) {
    // Get current Lang
    var lang = sessionStorage.getItem('lang')!
    if (!lang) {
      lang = window.navigator.language.substring(0, 2);
    }
    this.translate.use(lang);
  }
}
