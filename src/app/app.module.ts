import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from "ng-apexcharts";

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppSettings } from 'appsettings-json-reader';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { ToastrModule } from 'ngx-toastr'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { Graficos2Component } from './components/graficos2/graficos2.component';
import { Graficos3Component } from './components/graficos3/graficos3.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { HumedadComponent } from './components/humedad/humedad.component';
import { HumedadsComponent } from './components/humedads/humedads.component';
import { TemperaturaComponent } from './components/temperatura/temperatura.component';
const appSettings = AppSettings.readAppSettings();

@NgModule({
  declarations: [
    AppComponent,
    GraficosComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    Graficos2Component,
    Graficos3Component,
    GaleriaComponent,
    HumedadComponent,
    HumedadsComponent,
    TemperaturaComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AngularFireModule.initializeApp(appSettings.firebaseConfig),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot()   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
