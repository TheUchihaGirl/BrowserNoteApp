import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { cardData } from 'src/model/cardData';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  cardData : cardData[] = [];
  constructor(private router : Router, private storageService : StorageService){}

  ngOnInit(): void {
    this.cardData = this.storageService.get();
  }

  deleteCard(deletedNoteId : string){
    this.cardData = this.cardData.filter((cardElem)=>{
      return cardElem.id != deletedNoteId;
    });
  }

  // cardData : cardData[] = [{
  //   title : "Shiba Inu",
  //   subtitle : "Dog Breed",
  //   imageUrl : "https://material.angular.io/assets/img/examples/shiba2.jpg",
  //   content : `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
  //   A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
  //   bred for hunting.`
  // }];

  createNote(){
    this.router.navigateByUrl('/create');
  }
}
