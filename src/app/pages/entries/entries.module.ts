import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EntriesRouterModule } from './entries-routing.module';

@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        HttpClientModule,
        EntriesRouterModule
    ],
    exports:[]
})
export class EntriesModule{}