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
    BarchartComponent
  ],
  exports: [
    AlertsComponent,
    ConfirmDialogComponent,
    DatePickerComponent,
    BreadcrumbComponent,
    MenuComponent,
    TooltipComponent,
    TooltipDirective,
    BarchartComponent
  ],
  providers: [
    AlertService,
    ConfirmDialogService
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
