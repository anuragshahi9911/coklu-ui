import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './home/breadcrumb/breadcrumb.component';
import { HomeComponent } from './home/home.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { AlertsComponent } from './shared/components/alerts/alerts.component';
import { RootAuthGuard } from './shared/guards/root-auth.guard';
import { AlwaysAuthChildrenGuard } from './shared/guards/always-auth-children.guard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';;
import { ChatfeatureComponent } from './mainpannel/table/maindata/chatfeature/chatfeature.component'

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        BreadcrumbModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        AppComponent,
        AlertsComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        BreadcrumbComponent,
        ChatfeatureComponent
    ],
    providers: [
        RootAuthGuard,
        AlwaysAuthChildrenGuard
    ],
    bootstrap: [AppComponent],
    exports: [CommonModule, HomeComponent]
})

export class AppModule { }