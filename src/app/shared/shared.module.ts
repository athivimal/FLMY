import { Users } from './config/users';
import { RouterModule } from '@angular/router';
import { HeaderList } from './config/header-list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { GraphDashboardComponent } from './container/graph-dashboard/graph-dashboard.component';
import { FloorPlanComponent } from './components/floor-plan/floor-plan.component';


@NgModule({
  declarations: [HeaderComponent, UserCardComponent, SideNavComponent, GraphDashboardComponent, FloorPlanComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    HeaderComponent, UserCardComponent, SideNavComponent, GraphDashboardComponent
  ],
  providers: [ HeaderList, Users ]
})
export class SharedModule { }
