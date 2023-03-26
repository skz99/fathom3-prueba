import { Component, EventEmitter, HostListener, OnInit, Output, } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../models/api.model';
import { LoginService } from '../../services/login.service';
import { ERRORS } from '../../translates/error.translate';
import { LOGIN } from '../../translates/login.tanslate';
import { REGISTER_ERRORS } from '../../translates/register.translate';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loadingBoolean: boolean = false;
  loginForm: UntypedFormGroup;
  wasSubmitted: boolean = false;
  selectedLanguage: string = '';
  isCapsLocked?: boolean;

  // Show password
  showPass: string = '<i class="fas fa-eye"></i>';
  show: boolean = false;

  constructor(private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,) {
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang!.match(/es|en/) ? browserLang! : 'en');
    sessionStorage.setItem('lang', translate.currentLang);
    this.loginForm = this.initialize();

  }

  // Enums
  LOGIN = LOGIN;
  ERRORS = ERRORS;
  REGISTER_ERRORS = REGISTER_ERRORS;


  ngOnInit(): void {
  }

  redirectTo(route: string) {
    this.loadingBoolean = true;
    this.router.navigateByUrl(`${route}`).then((a: any) => this.loadingBoolean = false);
  }

  selectLang(selectedLanguage: string) {
    sessionStorage.setItem('lang', selectedLanguage);
  }

  initialize() {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  showPassword() {
    this.show = !this.show;

    if (this.show == false) {
      this.showPass = '<i class="fas fa-eye"></i>';
    }
    else {
      this.showPass = '<i class="fas fa-eye-slash"></i>';
    }
  }

  login() {
    this.translate.get('ERRORS.LOGIN_ERROR').subscribe(translations => {
      this.wasSubmitted = true;
      if (!this.loginForm.invalid) {
        this.loadingBoolean = true;
        this.loginService.login(this.loginForm.value).subscribe({
          next: (rtn: ApiResponse<any>) => {
            if (rtn.success) {
              sessionStorage.setItem('username', rtn.data[0].email.split('@', 1)[0]);
              this.router.navigateByUrl('/dashboard').then((a: any) => this.loadingBoolean = false);
            } else {
              this.toastr.error(rtn.message);
            }
          }, error: (error: any) => {
            console.log(error);
            this.loadingBoolean = false;
            console.log(error)
            this.toastr.error(error.message);
          }, complete: () => {
            this.loadingBoolean = false;
          },
        });
      } else {
        this.loginForm.controls['username'].errors;
        this.loginForm.controls['password'].errors;
      }
    })
  }
}