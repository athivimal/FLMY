import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
      
      {
        path: 'userlist',
        component: UserListComponent
      },
      {
        path: 'user/:id',
        children: [
          {
            path: '',
            component: UserDetailsComponent,
            children: [
            ]
          },
          {
            path: 'edit-user',
            component: EditUserComponent
          }
        ]
      },
      {
        path: 'add-user',
        component: AddUserComponent
      },
      {
        path: '',
        redirectTo: 'userlist',
        pathMatch: 'full'
      }
    // ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }