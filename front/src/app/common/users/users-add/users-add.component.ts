import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/common/services/global.service';
import { BUTTONS } from 'src/app/common/translates/button.translate';
import { ERRORS } from 'src/app/common/translates/error.translate';
import { USER, USER_MESSAGES } from 'src/app/common/translates/user.translate';
import { IModalRef } from '../../common-components/modal-windows/interfaces/i-modal-ref';
import { User } from '../../models/user.model';
import { REGISTER, REGISTER_ERRORS } from '../../translates/register.translate';


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {
  // Classes
  @Input() user: User = new User;

  // Forms
  userForm: UntypedFormGroup;

  // Modules
  modules: string[] = [];

  // Enums
  BUTTONS = BUTTONS;
  ERRORS = ERRORS;
  REGISTER = REGISTER;
  USER_MESSAGES = USER_MESSAGES;
  REGISTER_ERRORS = REGISTER_ERRORS;
  // Booleans
  isSaving: boolean = false;
  wasSubmitted: boolean = false;
  isChecked: boolean = false;

  // Show password
  showPass: string = '<i class="fas fa-eye"></i>';
  show: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private globalService: GlobalService,
    public translate: TranslateService,
    private toastr: ToastrService,
  ) {
    this.userForm = this.initializeUserForm();
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.user);
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


  initializeUserForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      default_lang: ['es'],
    })
  }

  addorEditUser(modal: IModalRef<any>): Observable<User> {
    this.wasSubmitted = true;
    return new Observable(observer => {
      if (!this.userForm.invalid) {
        this.isSaving = true;
        const user = Object.assign(this.user, this.userForm.value);
        user.default_lang = 'es';
        const obs = user.id ? this.globalService.editUser(user) : this.globalService.addUser(user);
        obs.subscribe({
          next: (rtn) => {
            observer.next(rtn.data[0]);
            modal.close();
          },
          error: (error) => {
            observer.error(error);
            this.isSaving = false;
          },
          complete: () => {
            this.isSaving = false;
          }
        })
      }
    })
  }

}
