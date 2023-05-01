import {Component, Inject, OnInit} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.sass']
})
export class CreateCategoryDialogComponent implements OnInit{
  
  // user = { color: '#234532' };

  disabled = false;
  selectedColor: ThemePalette = 'primary';
  touchUi = false;

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];
  
  constructor(
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.data = {};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
