import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

const MaterialComponents = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatChipsModule,
  MatMenuModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatDividerModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatBottomSheetModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class AppMaterialModule { }
