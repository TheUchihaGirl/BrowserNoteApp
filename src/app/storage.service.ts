import { Injectable } from '@angular/core';
import { CardData } from 'src/model/CardData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private key = "CardIdList";
  constructor() { }

  Create(cardDetails: CardData): void {
    try {
      let cardIdList : string[] = this.getCardIdList();
      let cardId : string= cardDetails.id;
      delete cardDetails.id;
      cardIdList.push(cardId);

      localStorage.setItem(cardId,JSON.stringify(cardDetails));
      this.saveCardIdList(cardIdList);    
    } catch (e) {
      console.error('Error saving note to localStorage', e);
    }
  }

  Update(noteDetails : CardData):void{
    try{
      let noteId : string = noteDetails.id;
      localStorage.removeItem(noteId);
      delete noteDetails.id;
      localStorage.setItem(noteId, JSON.stringify(noteDetails));
    }catch(e){
      console.error('Error updating note in localstorage',e );
    }
  }

  getAll():CardData[]{
    try{
      let cardIdList:string[] = this.getCardIdList();
      let cardDetailsList : CardData[] = [];

      cardIdList.forEach((cardId:string)=>{
        let cardDetails : CardData = JSON.parse(localStorage.getItem(cardId));
        cardDetailsList.push({
          id:cardId,
          ... cardDetails
        });
      });
      return cardDetailsList;
    }catch(e){
      console.log("Error getting card details from local storage", e);
    }
  }

  getById(id:string): CardData{
    try{
      let cardDetailsString = localStorage.getItem(id);
      return JSON.parse(cardDetailsString);
    }catch(e){
      console.error('Error getting card details for id ',e);
    }
  }

  private getCardIdList():string[]{
    try{
      let noteIdListString : string = localStorage.getItem(this.key);
      if(noteIdListString == null) return [];
      else return JSON.parse(noteIdListString);
    }catch(e){
      console.error('Error getting noteIdList from localStorage', e);
      return [];
    }
  }

  private saveCardIdList(noteIdList:string[]):void{
    try{
      localStorage.setItem(this.key,JSON.stringify(noteIdList));
    }catch(e){
      console.error('Error saving noteIdList to localStorage', e);
    }
  }


}
