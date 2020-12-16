import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        Ng2SearchPipeModule,
        FormsModule,
        HttpClientModule,
        PoModule
    ],
    exports: [
        CommonModule,
        Ng2SearchPipeModule,
        FormsModule,
        HttpClientModule,
        PoModule
    ],
    providers: [],
    bootstrap: []
})
export class SharedModule { }
