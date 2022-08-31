import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OwnerComponent } from './owner/owner.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "home", component: HomeComponent, children: [
      { path: "", component: DashComponent },
      { path: "owner", component: OwnerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
