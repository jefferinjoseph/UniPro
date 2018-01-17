import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test-component/test.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'test', component: TestComponent }
  ];

  export const routing: ModuleWithProviders = RouterModule.forRoot(routes);