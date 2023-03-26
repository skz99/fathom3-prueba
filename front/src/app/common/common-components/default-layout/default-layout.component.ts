import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HttpInterceptor } from '../../services/http-interceptor';
import { BUTTONS } from '../../translates/button.translate';



@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})

export class DefaultLayoutComponent implements OnInit {
  // Session Storage
  logedUser: string = '';
  logedUserEmail: string = '';
  modules: string[] = [];
  width: number = 0;


  constructor(private httpInterceptor: HttpInterceptor,
    public translate: TranslateService,) {
    this.width = window.innerHeight;
    this.logedUser = sessionStorage.getItem('username')!;
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  // Enums
  BUTTONS = BUTTONS;

  hideSidebar(event: boolean) {
    // this.VisibleSidebarMobile = event;
  }

  selectLang(selectedLanguage: string) {
    sessionStorage.setItem('lang', selectedLanguage);
    window.location.reload();
  }

  logout() {
    sessionStorage.clear();
    this.httpInterceptor.logout();
  }
}
