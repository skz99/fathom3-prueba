import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
// import { DeleteComponent } from './delete/delete.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RegisterComponent } from './common-components/register/register.component';
import { LoginComponent } from './common-components/login/login.component';
import { ModalComponent } from './common-components/modal-windows/modal/modal.component';
import { ModalHostDirective } from './common-components/modal-windows/models/modal-host.directive';
import { OCSpinnerComponent } from './common-components/oc-spinner/oc-spinner.component';
import { ModalService } from './common-components/modal-windows/services/modal.service';
import { DashboardComponent } from './common-components/dashboard/dashboard.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { DefaultLayoutComponent } from './common-components/default-layout/default-layout.component';
import { DeleteComponent } from './common-components/delete/delete.component';






@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    UsersListComponent,
    UsersAddComponent,
    // DeleteComponent,
    ModalComponent,
    ModalHostDirective,
    OCSpinnerComponent,
    DashboardComponent,
    DefaultLayoutComponent,
    DeleteComponent,
  ],
  providers: [ModalService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    ModalModule.forRoot(),
    TooltipModule,
    RouterModule,
    SortableModule,

  ], exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    OCSpinnerComponent,
    ModalComponent,
    ModalHostDirective,
    RouterModule,
    SortableModule,
  ]
})
export class CustomCommonModule { }
