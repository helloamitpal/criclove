import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule
  ],
  exports: [
    MatSnackBarModule,
    MatFormFieldModule,
    MatTabsModule
  ]
})
export class MaterialModule {}
