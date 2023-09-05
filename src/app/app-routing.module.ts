import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { Graficos2Component } from './components/graficos2/graficos2.component';
import { Graficos3Component } from './components/graficos3/graficos3.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { HumedadsComponent } from './components/humedads/humedads.component';
import { TemperaturaComponent } from './components/temperatura/temperatura.component';
import { HumedadComponent } from './components/humedad/humedad.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path: 'main',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'graficos', component: GraficosComponent },
  { path: 'graficos2', component: Graficos2Component },
  { path: 'graficos3', component: Graficos3Component },
  { path: 'humedads', component: HumedadsComponent },
  { path: 'temperatura', component: TemperaturaComponent },
  { path: 'humedad', component: HumedadComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
