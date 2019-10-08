import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieDB: any[] = [];
  actorsDB: any[] = [];

  section = 1;

  title: string = "";
  year: number = 0;
  movieId: string = "";
  movieActor:any[]=[];
  aname:string="";
  aid:string="";
  
  constructor(private dbService: DatabaseService) { }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.movieDB = data;
    })
  }
 
  OnSaveMovie(){
    let obj = {title:this.title, year:this.year};
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    })
  }

  //Delete Movie
  onDeleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    })
  }

  onDeletebeforeYear(aYear:number){
    let movies = this.movieDB.filter(element => element.year <= aYear)
    movies.forEach(element => {
      this.dbService.deleteMovie(element._id).subscribe(result => {
        this.onGetMovies();
      })
    })
  }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  addActorToMovie(){
    this.onGetActors();
  }

  onSelectActor(item) {
    this.aname = item.name;
    this.aid = item._id;
   
  }
  onSelectUpdate(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId=item._id;
    this.movieActor= item.actors;
  }

  onUpdateMovie() {
    if (this.aid !=""){
      this.movieActor.push(this.aid);
    }
    let obj = { title: this.title, year: this.year ,actors:this.movieActor};
    this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();  
    this.onGetActors();

  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
    this.aname = "";
    this.aid = "";
  }


}
