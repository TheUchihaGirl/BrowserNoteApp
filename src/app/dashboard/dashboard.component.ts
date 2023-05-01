import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardData, Category } from 'src/model/CardData';
import { StorageService } from '../storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryDialogComponent } from '../create-category-dialog/create-category-dialog.component';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  CardData: CardData[] = [];
  categoryDataItem: Category = {name:'',colour:'' };
  constructor(private router: Router,
    private storageService: StorageService,
    private dialog: MatDialog,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.CardData = this.storageService.get();
  }

  deleteCard(deletedNoteId: string) {
    this.CardData = this.CardData.filter((cardElem) => {
      return cardElem.id != deletedNoteId;
    });
  }

  createNote() {
    this.router.navigateByUrl('/create');
  }

  openCreateCategoryDialog() {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      data: { name: this.categoryDataItem.name, colour: this.categoryDataItem.colour },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.categoryDataItem = {
        colour: result.colour,
        name: result.name
      }
      let categoryDataList: Category[] = this.categoryService.get();
      categoryDataList.push(this.categoryDataItem);
      this.categoryService.set(categoryDataList);
    });
  }
}
