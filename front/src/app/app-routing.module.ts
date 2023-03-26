import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateUserService } from './can-activate-user.service';
import { DashboardComponent } from './common/common-components/dashboard/dashboard.component';
import { DefaultLayoutComponent } from './common/common-components/default-layout/default-layout.component';
import { LoginComponent } from './common/common-components/login/login.component';
import { RegisterComponent } from './common/common-components/register/register.component';
import { UsersListComponent } from './common/users/users-list/users-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', canActivate: [CanActivateUserService], component: DefaultLayoutComponent, children: [ {path: '', component: UsersListComponent } ] },
  { path: '', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
