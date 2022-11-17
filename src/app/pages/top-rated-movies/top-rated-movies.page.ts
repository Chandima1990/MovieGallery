import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Movie, MovieListBaseComponent } from 'src/app/models';
import { MovieService } from 'src/app/services/';

@Component({
  selector: 'app-top-rated-movies',
  templateUrl: './top-rated-movies.page.html',
  styleUrls: ['./top-rated-movies.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TopRatedMoviesPage
extends MovieListBaseComponent<Movie.TopRatedMovie>
implements OnInit {
  constructor(protected override service: MovieService,
    protected loadingCtrl: LoadingController) {
    super(service);
  }

  ngOnInit() {
    this.loadMovies();
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

    this.service.getTopRatedMovies(this.lastPage, query).subscribe(movies => {
      movies.results.forEach(movie => this.movieSet.add(movie));
      loading.dismiss();

      if (event) {
        event.target.disabled = movies.total_pages === this.lastPage;
      }

      event?.target.complete();
    });
  }
}
