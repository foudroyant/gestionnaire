import { Injectable } from '@angular/core';
import Dexie from 'dexie'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  db
  pageEncours

  constructor() { }

  ouvrir(){
    this.db=new Dexie("gestionnaire")
    this.db.version(0.4).stores(
      {
        user:"id++, username, pwd, mail, telephone",
        pages:"id++, label, categories",
        lines:"id++, description, montant, categorie, page"
      }
    )
    this.db.open()
  }

  add(collection,data){
    return this.db[collection].add(data)
  }
  getLines(page){
    return this.db.lines.where("page").equals(page).toArray()
    //return this.db.lines.toArray()
  }
  getPages(){
    return this.db.pages.toArray()
  }
  del(collection, id){
    return this.db[collection].delete(id)
  }
  //delAll(collection){}
  setPageEncours(page){this.pageEncours=page}
  getPageEncours(){return this.pageEncours}


}
