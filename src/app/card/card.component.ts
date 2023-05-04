import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CardData, Category } from 'src/model/CardData';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit{
  constructor(private storageService:StorageService, 
    private router : Router,
    private categoryService: CategoryService){
  }
  @Input() card? : CardData;
  @Output() deleteCard = new EventEmitter<string>();
  id?:string;
  title: string;
  subtitle: string;
  imageContent: string;
  content: string;
  categoryName : string
  cardBackgroundColour : string;

  ngOnInit(): void {
    this.id = this.card.id;
    this.subtitle = this.card.subtitle;
    this.title = this.card.title;
    this.imageContent = this.card.imageContent;
    this.content = this.card.content;
    this.categoryName = this.card.category;

    this.cardBackgroundColour = '#' + this.categoryService.get().filter((categoryItem : Category)=>{
        return categoryItem.name === this.categoryName
    })[0].colour.hex;
    console.log(this.cardBackgroundColour);
  }

  delete(){
    this.storageService.Delete(this.id);
    this.deleteCard.emit(this.id);
  }

  modify(){
    this.router.navigateByUrl('/modify/' + encodeURIComponent(this.id));
  }
}
