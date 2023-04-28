import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { cardData } from 'src/model/cardData';
@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.sass']
})
export class CreatenoteComponent implements OnInit{
  Id?:string;
  Title?: string;
  Subtitle?: string;
  Content?: string;
  CategoryList = ["Personal", "Shopping List", "Medicine"];
  CategorySelected: string = '';


  constructor(private storageService: StorageService,
     private router: Router,
     private activedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    let id = this.activedRoute.snapshot.paramMap.get("id");
    if(id == null || id == undefined){
      //In create Mode
    }else{
      //In modification mode
      this.Id = id;
      let noteDetails: cardData[] = this.storageService.get().filter((noteElem)=>{
        return noteElem.id == this.Id;
      });
      this.Title = noteDetails[0].title;
      this.CategorySelected = noteDetails[0].category,
      this.Subtitle = noteDetails[0].subtitle,
      this.Content = noteDetails[0].content
    }
  }

  createOrModifyNote() {
    let datalist: any[] = this.storageService.get();

    let guid:string; 
    if(this.Id == null){
      guid = UUID.UUID();
    }else{
        guid = this.Id;
        datalist = datalist.filter((dataElem)=> dataElem.id!=guid);
    }

    let noteDetails : cardData = {
      id: guid,
      title: this.Title,
      subtitle: this.Subtitle,
      content: this.Content,
      imageUrl:'',
      category: this.CategorySelected
    }
    datalist.push(noteDetails);
    this.storageService.set(datalist);
    console.log(this.Title, this.Subtitle, this.Content, this.CategorySelected, this.Content);
    this.router.navigateByUrl('/dashboard');
  }
  cancelNote() {
    this.Title = '';
    this.Subtitle = '';
    this.Content = '';
    this.CategorySelected = '';
  }
}
