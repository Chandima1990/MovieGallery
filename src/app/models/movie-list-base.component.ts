import { Component } from "@angular/core";
import { InfiniteScrollCustomEvent } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { MovieService } from "../services/movie.service";
import { Movie } from "./";

@Component({
  template: ''
})
export abstract class MovieListBaseComponent<T> {

  searchedMovieSet: Set<Movie.SearchedMovieModel> = new Set<Movie.SearchedMovieModel>();
  movieSet: Set<T> = new Set<T>();
  lastPage = 1;
  baseImagesUrl = environment.images;
  searchLoading = false;
  constructor(protected service: MovieService) {
  }

  /**
   *  Load movies from the API
   * @param event scroll event if relevant
   * @param query search query
   */
  abstract loadMovies(event?: InfiniteScrollCustomEvent, query?: string): void;

  get moviesArray(): T[] {
    return Array.from(this.movieSet);
  }

  handleRefresh() {
    window.location.reload();
  }


  queryChanged(event: any) {
    if (event.detail.value) {
      this.searchLoading = true;
      this.service.searchMovies(event.detail.value).subscribe(movies => {
        this.searchedMovieSet = new Set<Movie.SearchedMovieModel>(movies.results);
        this.searchLoading = false;
      });
    } else {
      this.queryClear();
    }
  }

  /**
   * This method is called when the user scrolls to the bottom of the page.
   * It will load the next page
   */
  loadMoreMovies(event: any) {
    this.lastPage++;
    this.loadMovies(event);
  }

  get searchedMoviesArray(): Movie.SearchedMovieModel[] {
    return Array.from(this.searchedMovieSet);
  }

  queryClear() {
    this.searchLoading = false;
    this.searchedMovieSet.clear();
  }

}
