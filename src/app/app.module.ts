import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';
import { AppComponent } from './app.component';
import { TestComponent } from './test-component/test.component';
import { LoginComponent } from "./login/login.component";
import { AuthenticationService } from "./login/authentication.service";
import { routing } from './main.routing';
import { ServerURLInterceptor } from "./app.interceptor";
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { DashboardService } from "./dashboard/dashboard.service";
import { DetailsComponent } from './details/details.component';

import { SafeHtml } from './safe-html.pipe';


export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions){
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(new ServerURLInterceptor())
  return service;
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2DragDropModule.forRoot()
  ],
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    DashboardComponent,
    DetailsComponent,
    SafeHtml
  ],
  providers: [
    AuthenticationService,
    DashboardService,
    { provide: InterceptorService, useFactory: interceptorFactory, deps: [XHRBackend, RequestOptions] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
