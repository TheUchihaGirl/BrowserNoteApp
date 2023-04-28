import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { cardData } from 'src/model/cardData';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit{
  constructor(private storageService:StorageService, private router : Router){
  }
  @Input() card? : cardData;
  @Output() deleteCard = new EventEmitter<string>();
  id?:string;
  title: string;
  subtitle: string;
  imageUrl: string;
  content: string;

  ngOnInit(): void {
    this.id = this.card.id;
    this.subtitle = this.card.subtitle;
    this.title = this.card.title;
    this.imageUrl = this.card.imageUrl;
    this.content = this.card.content;
  }

  delete(){
    let datalist = this.storageService.get();
    datalist = datalist.filter((elem)=>{
      return elem.id != this.id;
    });
    this.storageService.set(datalist);
    this.deleteCard.emit(this.id);
  }

  modify(){
    this.router.navigateByUrl('/modify/' + encodeURIComponent(this.id));
  }
}
