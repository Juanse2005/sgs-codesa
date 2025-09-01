import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SplitterModule } from 'primeng/splitter';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from "@angular/forms";
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { DropdownModule } from "primeng/dropdown";
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/** 
 * Módulo compartido que agrupa los módulos de PrimeNG utilizados en la aplicación.
 * Cada módulo importado aquí puede ser utilizado en cualquier componente que importe 
 * este módulo compartido.
 */
@NgModule({
    imports: [
        ButtonModule,
        CardModule,
        InputTextModule,
        SplitterModule,
        FloatLabelModule,
        FormsModule,
        PanelMenuModule,
        TableModule,
        DropdownModule,
        ProgressBarModule,
        MultiSelectModule,
        TagModule,
        PasswordModule,
        DialogModule,
        ToastModule,
        InputTextareaModule,
        ChartModule,
        ConfirmDialogModule,
        CalendarModule,
        SplitButtonModule,
        AvatarModule,
        ProgressSpinnerModule 
    ],
    exports: [
        ButtonModule,
        CardModule,
        InputTextModule, SplitterModule,
        FloatLabelModule,
        FormsModule,
        TableModule,
        ProgressBarModule,
        MultiSelectModule,
        TagModule,
        PasswordModule,
        DialogModule,
        ToastModule,
        DropdownModule,
        InputTextareaModule,
        ChartModule,
        ConfirmDialogModule,
        CalendarModule,
        SplitButtonModule,
        AvatarModule,
        ProgressSpinnerModule 
    ],
})

export class ShareModules { }