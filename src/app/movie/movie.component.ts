import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieDB: any[] = [];
  section = 1;

  title: string = "";
  year: number = 0;
  movieId: string = "";
  


  constructor(private dbService: DatabaseService) { }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.movieDB = data;
    })
  }
 
  OnSaveMovie(item){
    let obj = {title:this.title, year:this.year};
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
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
      this.dbService.deleteMovie(element._id).subscribe()
    })
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }


}
