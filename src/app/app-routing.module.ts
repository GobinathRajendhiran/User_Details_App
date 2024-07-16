import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'homePage', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
