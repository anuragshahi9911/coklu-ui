import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AlertsComponent } from "./components/alerts/alerts.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { DatePickerComponent } from "./components/date-picker/date-picker.component";
import { BreadcrumbComponent } from "../home/breadcrumb/breadcrumb.component";
import { AlertService } from "./components/alerts/alert.service";
import { ConfirmDialogService } from "./components/confirm-dialog/confirm-dialog.service";
import { MenuComponent } from './components/menu/menu.component';
import {
  TooltipComponent,
  MatFormFieldModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDialogModule,
  MatStepperModule
} from "@angular/material";
import { TooltipDirective } from "./components/tooltip/tooltip.directive";
import { BarchartComponent } from './components/charts/barchart/barchart.component';
import { PiechartComponent } from './components/charts/piechart/piechart.component';
import { fakeBackendProvider } from "./services/fake-backend";
import { MustMatchDirective } from './components/directive/must-match.directive';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatStepperModule
  ],
  declarations: [
    AlertsComponent,
    ConfirmDialogComponent,
    DatePickerComponent,
    BreadcrumbComponent,
    MenuComponent,
    TooltipComponent,
    TooltipDirective,
    BarchartComponent,
    PiechartComponent,
    MustMatchDirective,
    SnackbarComponent,
    DialogComponent
  ],
  exports: [
    AlertsComponent,
    ConfirmDialogComponent,
    DatePickerComponent,
    BreadcrumbComponent,
    MenuComponent,
    TooltipComponent,
    TooltipDirective,
    BarchartComponent,
    PiechartComponent,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    AlertService,
    ConfirmDialogService,
    fakeBackendProvider

  ],
  entryComponents: [
    TooltipComponent,
    SnackbarComponent,
    DialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
