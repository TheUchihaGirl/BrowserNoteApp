import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CardData } from 'src/model/CardData';
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
    
  }


  title = 'BrowserNoteapp';
}
