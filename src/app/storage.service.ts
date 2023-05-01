import { Injectable } from '@angular/core';
import { CardData } from 'src/model/CardData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private key = "datalist";
  constructor() { }
  set(data: any): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get():CardData[] {
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

  getById(id:string){

  }


}
