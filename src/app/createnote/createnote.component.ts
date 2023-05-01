import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { CardData } from 'src/model/CardData';
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
  selectedFileName :string = '';
  selectedFile : File;
  preview : string;


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
      let noteDetails: CardData[] = this.storageService.get().filter((noteElem)=>{
        return noteElem.id == this.Id;
      });
      this.Title = noteDetails[0].title;
      this.CategorySelected = noteDetails[0].category,
      this.Subtitle = noteDetails[0].subtitle,
      this.Content = noteDetails[0].content,
      this.preview = noteDetails[0].imageContent,
      this.selectedFileName = noteDetails[0].imageName
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

    let noteDetails : CardData = {
      id: guid,
      title: this.Title,
      subtitle: this.Subtitle,
      content: this.Content,
      imageContent:this.preview,
      imageName : this.selectedFileName,     
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
    this.router.navigateByUrl('/dashboard');
  }

  uploadFile(){
    if (this.selectedFile) {
      console.log(this.selectedFile.name);
    }
  }

  selectFile(event: any):void{
    this.selectedFileName = '';
    this.selectedFile = event.target.files[0];
  
    if (this.selectedFile) {
      const numberOfFiles = 1;
      for (let i = 0; i < numberOfFiles; i++) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };  
        reader.readAsDataURL(this.selectedFile); 
        this.selectedFileName = this.selectedFile.name;
      }
    }
  }
}
