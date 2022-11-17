import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/core';
import { Movie, MovieListBaseComponent } from 'src/app/models';
import { MovieService } from 'src/app/services/';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MoviesPage
extends MovieListBaseComponent<Movie.PopularMovie>
implements OnInit {
  constructor(protected override service: MovieService,
    private loadingCtrl: LoadingController) {
    super(service);
  }

  ngOnInit() {
    this.loadMovies();
  }

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

    this.service.getPopularMovies(this.lastPage, query).subscribe(movies => {
      movies.results.forEach(movie => this.movieSet.add(movie));
      loading.dismiss();

      if (event) {
        event.target.disabled = movies.total_pages === this.lastPage;
      }

      event?.target.complete();
    });
  }


}
