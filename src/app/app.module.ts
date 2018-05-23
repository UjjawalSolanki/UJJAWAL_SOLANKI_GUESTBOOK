import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {JwtModule} from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutingModule } from './routing/routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MaterialcomponentsModule} from './materialcomponents/materialcomponents.module';
import { TudipApiService } from './service/tudip-api.service';
import {TokenInterceptorService} from './service/token-interceptor.service';
import { DeleteVisitorDialogComponent } from './delete-visitor-dialog/delete-visitor-dialog.component';
import { UpdateVisitorComponent } from './update-visitor/update-visitor.component';
import { WidgetUtilService } from './service/widget-util.service';
import { AddVisitorComponent } from './add-visitor/add-visitor.component';
import { VisitorProfileComponent } from './visitor-profile/visitor-profile.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    DeleteVisitorDialogComponent,
    UpdateVisitorComponent,
    AddVisitorComponent,
    VisitorProfileComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    FlexLayoutModule,
    MaterialcomponentsModule
  ],
  providers: [
    TudipApiService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    },
    WidgetUtilService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteVisitorDialogComponent, UpdateVisitorComponent, AddVisitorComponent]
})
export class AppModule { }
