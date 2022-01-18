import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: "users",
    component: UsersComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
    enableTracing: false,
    relativeLinkResolution: 'legacy'
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
