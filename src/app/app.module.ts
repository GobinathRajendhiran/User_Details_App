import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomepageComponent,
    HomeNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }