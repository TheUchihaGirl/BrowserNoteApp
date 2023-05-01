import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private key = "categoryData"
  constructor() { }

  set(data: any): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(){
    try {
      let dataString : string | null = localStorage.getItem(this.key);
      if(dataString == null){
        return [];
      }else{
        return JSON.parse(dataString);
      }
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return [];
    }
  }

}
