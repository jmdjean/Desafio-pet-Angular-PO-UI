import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { PoStorageModule } from '@po-ui/ng-storage';
import { PoSyncModule } from '@po-ui/ng-sync';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        Ng2SearchPipeModule,
        FormsModule,
        HttpClientModule,
        PoModule,
        PoStorageModule.forRoot(),
        PoSyncModule,
        ReactiveFormsModule 
    ],
    exports: [
        CommonModule,
        Ng2SearchPipeModule,
        FormsModule,
        HttpClientModule,
        PoModule,
        PoStorageModule,
        PoSyncModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: []
})
export class SharedModule { }
