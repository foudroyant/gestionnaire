import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories=[]
  label=""
  newPage=false
  pages=[]

  //Constructeur
  constructor(private db:DataService, private routeur:Router) { }

  ngOnInit() {
    this.initializeCategories()
    this.db.ouvrir()
    this.getPages()
    
  }

  getPages(){
    this.db.getPages().then(res=>{
      this.pages=res
    })
  }
  
  addCategorie(){
    this.categories.push({label:"", valeur:""})
  }

  creer(){
    const data={
      label:this.label,
      categories:this.categories
    }
    this.db.add("pages",data)
    this.initializeCategories()
    this.newPage=false
    this.getPages()
  }

  goTo(page){
    this.db.setPageEncours(page)
    this.routeur.navigate(['/page'])
  }
  del(page){
    this.db.del("pages", page.id).then(res=>{
      this.getPages()
    })
  }
  initializeCategories(){
    this.categories=[
      {label:"", valeur:""}
    ]
  }

  showCategories(c){
    let out=''
    c.forEach(element => {
      out+=element["label"]+" - "
    });
    return out
  }

}
