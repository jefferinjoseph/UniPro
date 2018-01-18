import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test-component/test.component';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from './dashboard/dashboard.component';

import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'test', component: TestComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'details', component: DetailsComponent}
    
  ];

  export const routing: ModuleWithProviders = RouterModule.forRoot(routes);