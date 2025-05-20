import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SplitterModule } from 'primeng/splitter';
import { NavComponent } from "./components/nav/nav.component";

@NgModule({
    imports: [
        ButtonModule,
        CardModule,
        InputTextModule, SplitterModule,
    ],
    declarations: [
        NavComponent
    ],
    exports: [
        ButtonModule,
        CardModule,
        InputTextModule, SplitterModule,
        NavComponent

    ],
})

export class ShareModules { }