import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AlwaysAuthChildrenGuard } from './shared/guards/always-auth-children.guard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
    MatButtonModule, MatCheckboxModule,
    MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatIconModule
} from '@angular/material';
import { ParticlesModule } from 'angular-particle';
import { HeaderSearchComponent } from './shared/components/header-search/header-search.component';;
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from './shared/shared.module';
import { TooltipDirective } from './shared/components/tooltip/tooltip.directive';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';

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
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        HeaderSearchComponent,
        TooltipComponent
    ],
    providers: [
        SharedModule,
        AlwaysAuthChildrenGuard
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        TooltipComponent
    ],
    exports: [CommonModule,
        HomeComponent,
        MatFormFieldModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule    
    ]
})

export class AppModule { }