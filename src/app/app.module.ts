import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputManModule} from "@grapecity/inputman.angular";
import {AppComponent,NumberArrayConvertorPipe,NumberConvertorPipe,StringArrayConvertorPipe,DateConvertorPipe,BooleanConvertorPipe,FlagEnumConvertorPipe} from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        NumberArrayConvertorPipe,
        NumberConvertorPipe,
        StringArrayConvertorPipe,
        DateConvertorPipe,
        BooleanConvertorPipe,
        FlagEnumConvertorPipe
    ],
    imports: [
        InputManModule,
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}