import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html'
})
export class SnackBarComponent implements OnInit {
  private duration = 5000;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  openSnackBar(message: string, action ?: string, className ?: string): void {

    this.snackBar.open(message, action, {
     duration: this.duration,
     verticalPosition: 'top',
     horizontalPosition: 'end',
     panelClass: [className],
   });
  }

}
