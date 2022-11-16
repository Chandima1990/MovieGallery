import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Movie } from 'src/app/models';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.page.html',
  styleUrls: ['./top-rated-movies.page.scss'],
})
export class TopRatedMoviesPage implements OnInit {
  movieSet: Set<Movie.PopularMovie> = new Set<Movie.PopularMovie>();
  searchedMovieSet: Set<Movie.SearchedMovieModel> = new Set<Movie.SearchedMovieModel>();
  currentPage = 1;
  baseImagesUrl = environment.images;
  searchLoading = false;
  constructor(private service: MovieService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  handleRefresh() {
    window.location.reload();
  }

  /**
   *  Load movies from the API
   * @param event scroll event if relevant
   */
  async loadMovies(event?: InfiniteScrollCustomEvent, query?: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'crescent'
    });

    /* This is a check to see if the event is undefined. If it is, then we want to present the loading
    spinner. Event is used to show the bottom loading indicator */
    if (!event) {
      await loading.present();
    }

    this.service.getTopRatedMovies(this.currentPage, query).subscribe(movies => {
      movies.results.forEach(movie => this.movieSet.add(movie));
      loading.dismiss();

      if (event) {
        // event.target.disabled = movies.total_pages === this.currentPage;
      }

      event?.target.complete();
    });
  }

  /**
   * This method is called when the user scrolls to the bottom of the page.
   * It will load the next page
   */
  loadMoreMovies(event: any) {
    this.currentPage++;
    this.loadMovies(event);
  }

  get moviesArray(): Movie.PopularMovie[] {
    return Array.from(this.movieSet);
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

  get searchedMoviesArray(): Movie.SearchedMovieModel[] {
    return Array.from(this.searchedMovieSet);
  }

  queryClear() {
    this.searchLoading = false;
    this.searchedMovieSet.clear();
  }

}
