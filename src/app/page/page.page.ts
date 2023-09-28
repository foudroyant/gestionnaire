import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface ligne {
  description:string,
  categorie:string,
  montant:number
}

@Component({
  selector: 'app-page',
  templateUrl: './page.page.html',
  styleUrls: ['./page.page.scss'],
})
export class PagePage implements OnInit {

  newLine={
    description:"",
    categorie:"",
    montant:0
  }
  showLine
  page
  lines=[]


  //Constructeur
  constructor(private db:DataService) { }

  ngOnInit() {
    this.showLine=false
    this.page=this.db.getPageEncours()
    this.get()
  }

  add(){
    let data={
      montant:this.newLine.montant,
      description:this.newLine.description,
      page:this.page.label
    }
    for (let index = 0; index < this.page["categories"].length; index++) {
      if(this.newLine.categorie==this.page["categories"][index]["label"]){
        data["categorie"]=this.page["categories"][index]
        break
      }
    }
    this.db.add("lines", data)
    this.showLine=false
    this.newLine={
      description:"",
      categorie:"",
      montant:0
    }
    this.get()
  }

  get(){
    this.db.getLines(this.page.label).then(res=>{
      this.lines=res
    })
  }

  del(line){
    this.db.del("lines",line.id).then(res=>{
      this.get()
    })
  }

}
