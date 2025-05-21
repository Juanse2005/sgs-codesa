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
        ChartModule
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
        ChartModule
    ],
})

export class ShareModules { }