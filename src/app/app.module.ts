import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AlwaysAuthChildrenGuard } from './shared/guards/always-auth-children.guard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
    MatButtonModule, MatCheckboxModule,
    MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatIconModule,  MatSnackBarModule
} from '@angular/material';
import { ParticlesModule } from 'angular-particle';
import { HeaderSearchComponent } from './shared/components/header-search/header-search.component';;
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { AuthInterceptor } from './shared/guards/auth.interceptor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';;
import { RecoveryComponent } from './user/recovery/recovery.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';

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
        AngularFontAwesomeModule,
        ParticlesModule,
        OverlayModule,
        SharedModule
    ],
    declarations: [
        AppComponent,       
        HomeComponent,
        HeaderSearchComponent,
        UserComponent,
        UserProfileComponent,
        RecoveryComponent,
        PageNotFoundComponent
        
        
       ],
    providers: [
        SharedModule,
        AlwaysAuthChildrenGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
          }
        ],
    bootstrap: [AppComponent],
    entryComponents: [
        
    ],
    exports: [CommonModule,
        HomeComponent
       
          
    ]
})

export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));