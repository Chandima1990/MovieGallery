import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Movie } from 'src/app/models';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MovieDetailsPage implements OnInit {
  movie: Movie.MovieDetailModel = {} as Movie.MovieDetailModel;
  backRoute = 'tabs/popular';
  copyrightText = "Copyright © reserved 2022";
  baseImagesUrl = environment.images;
  imdbBaseUrl = environment.imdbBaseUrl;

  constructor(private service: MovieService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMovieById(id)
    this.setBackRoutes();
  }

  setBackRoutes() {
    this.backRoute = this.router.url.includes('toprated') ? 'tabs/toprated' : 'tabs/popular';
    this.backRoute = this.router.url.includes('favorite') ? 'tabs/favorite' : 'tabs/popular';
  }

  handleRefresh(event: any) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getMovieById(id, event)
  }

  getMovieId() {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  async getMovieById(movieId: string | null, event?: any) {

    const loading = await this.loadingCtrl.
      create({
        message: 'Loading...',
        spinner: 'crescent'
      });

    if (movieId === null) {
      return;
    }

    if (!event) {
      await loading.present();
    }

    this.service.getMovieById(movieId).
      subscribe(movie => {
        this.movie = movie;
        console.log(this.movie);

        if (event) {
          event.target.complete();
        }
        loading.dismiss();
      });

  }

  get genres() {
    return this.movie.genres?.
      map(genre => genre.name).join(', ');
  }

  get languages() {
    return this.movie.spoken_languages?.
      map(language => language.english_name).join(', ');
  }

  get originalTitle() {
    return this.movie.original_title === this.movie.title ? '' : this.movie.original_title;
  }

  openHomePage() {
    window.open(this.movie.homepage, '_blank');
  }

  openIMDBPage() {
    window.open(environment.imdbBaseUrl + this.movie.imdb_id, '_blank');
  }

}
