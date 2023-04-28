import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { cardData } from 'src/model/cardData';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{

  storageService:StorageService;
  constructor(storageService : StorageService){
    this.storageService = storageService;
  }
  ngOnInit(): void {
    if(this.storageService.get() == null || this.storageService.get() == undefined){
      this.storageService.set([]);
    }
    
  }


  title = 'BrowserNoteapp';
}
