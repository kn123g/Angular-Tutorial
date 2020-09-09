import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
    // auto imports if there is exports in NgModule
    // imports : [  
    //     MatButtonModule,
    //     MatFormFieldModule,
    //     MatCardModule,
    //     MatInputModule,
    //     MatToolbarModule,
    //     MatIconModule,
    //     MatExpansionModule,
    //     MatProgressSpinnerModule,
    //     MatPaginatorModule,
    //     MatDialogModule
    // ],
    exports : [
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule
    ]

})
export class AngularMaterialModule{



}