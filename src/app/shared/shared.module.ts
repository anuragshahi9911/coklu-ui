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
import { TooltipComponent } from "@angular/material";
import { TooltipDirective } from "./components/tooltip/tooltip.directive";
import { BarchartComponent } from './components/charts/barchart/barchart.component';
import { PiechartComponent } from './components/charts/piechart/piechart.component';
import { fakeBackendProvider } from "./services/fake-backend";


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
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
    PiechartComponent
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
    PiechartComponent
  ],
  providers: [
    AlertService,
    ConfirmDialogService,
    fakeBackendProvider
    
  ],
  entryComponents: [
    TooltipComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
