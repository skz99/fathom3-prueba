import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../services/global.service';
import { ERRORS } from '../../translates/error.translate';
import { REGISTER, REGISTER_ERRORS } from '../../translates/register.translate';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loadingBoolean: boolean = false;
  wasSubmitted: boolean = false;
  registerForm: UntypedFormGroup;
  // countries: Country[] = [];
  isCapsLocked?: boolean;

  // Enums
  ERRORS = ERRORS;
  REGISTER_ERRORS = REGISTER_ERRORS;
  REGISTER = REGISTER;
  
  constructor(private router: Router,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService) {

    this.registerForm = this.initialize();
  }

  // Show password
  showPass: string = '<i class="fas fa-eye"></i>';
  show: boolean = false;

  ngOnInit(): void {
    const lang = sessionStorage.getItem('lang');
    this.registerForm.controls['default_lang'].patchValue(lang);
  }

  selectLang(selectedLanguage: string) {
    sessionStorage.setItem('lang', selectedLanguage);
  }


  redirectTo(route: string) {
    this.loadingBoolean = true;
    this.router.navigateByUrl(`${route}`).then(a => this.loadingBoolean = false);
  }

  detectCapsLocked(event: any) {
    this.isCapsLocked = event.getModifierState && event.getModifierState('CapsLock');
  };

  showPassword() {
    this.show = !this.show;

    if (this.show == false) {
      this.showPass = '<i class="fas fa-eye"></i>';
    }
    else {
      this.showPass = '<i class="fas fa-eye-slash"></i>';
    }
  }


  initialize() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      default_lang: [''],
    })
  }

  newAccount() {
    this.translate.get('ERRORS.REGISTER_ERROR').subscribe(translations => {
      this.wasSubmitted = true;
      if (!this.registerForm.invalid) {
        this.loadingBoolean = true;
        this.globalService.addUser(this.registerForm.value).subscribe({
          next: (rtn) => {
            this.toastr.info('Usuario creado correctamente');
            setTimeout(() => {
              this.router.navigateByUrl('/login').then(a => this.loadingBoolean = false);
            }, 800)
          }, error: (error) => {
            console.error(error);
            this.loadingBoolean = false;
            this.toastr.error(translations['ERRORS.REGISTER_ERROR']);
          }, complete: () => {
          }
        });
      }
    })
  }

}
