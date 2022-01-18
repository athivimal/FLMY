import { UserDevicesComponent } from './user-devices/user-devices.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFlowComponent } from './login-flow/login-flow.component';
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    component: UserDevicesComponent , canActivate: [AuthGuard],
    children:[]
  },
  {
    path: 'login',
    component: LoginFlowComponent
  },
  
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
