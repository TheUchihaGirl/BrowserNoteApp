import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { UUID } from 'angular2-uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { CardData, Category } from 'src/model/CardData';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.sass']
})
export class CreatenoteComponent implements OnInit {
  Id?: string;
  Title?: string;
  Subtitle?: string;
  Content?: string;
  CategoryList: Category[] = [];
  CategorySelected: string = '';
  selectedFileName: string = '';
  selectedFile: File;
  preview: string;


  constructor(private storageService: StorageService,
    private categoryService: CategoryService,
    private router: Router,
    private activedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.CategoryList = this.categoryService.get();
    let id = this.activedRoute.snapshot.paramMap.get("id");
    if (id == null || id == undefined) {
      //In create Mode
    } else {
      //In modification mode
      this.Id = id;
      let noteDetails: CardData = this.storageService.getById(id);
      
      this.Title = noteDetails.title;
      this.CategorySelected = noteDetails.category,
        this.Subtitle = noteDetails.subtitle,
        this.Content = noteDetails.content,
        this.preview = noteDetails.imageContent,
        this.selectedFileName = noteDetails.imageName
    }
  }

  createOrModifyNote() {
    let noteDetails: CardData = {
      id: '',
      title: this.Title,
      subtitle: this.Subtitle,
      content: this.Content,
      imageContent: this.preview,
      imageName: this.selectedFileName,
      category: this.CategorySelected
    }
    if (this.Id == null) {
      noteDetails.id = UUID.UUID();
      this.storageService.Create(noteDetails);
    } else {
      noteDetails.id = this.Id;
      this.storageService.Update(noteDetails);
    }
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

  selectFile(event: any): void {
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
