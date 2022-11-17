import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getPopularMovies(page = 1, query?: string): Observable<Movie.PopularMovieListModel> {
    return this.http.get<Movie.PopularMovieListModel>(`${environment.baseApiUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }

  getTopRatedMovies(page = 1, query?: string): Observable<Movie.PopularMovieListModel> {
    return this.http.get<Movie.PopularMovieListModel>(`${environment.baseApiUrl}/movie/top_rated?api_key=${environment.apiKey}&page=${page}`);
  }

  getLatestMovies(page = 1, query?: string): Observable<Movie.LatestMovieListModel> {
    return this.http.get<Movie.LatestMovieListModel>(`${environment.baseApiUrl}/movie/latest?api_key=${environment.apiKey}&page=${page}`);
  }

  getMovieById(id: string): Observable<Movie.MovieDetailModel> {
    return this.http.get<Movie.MovieDetailModel>(`${environment.baseApiUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }

  searchMovies(query: string): Observable<Movie.SearchedMovieResponseModel> {
    return this.http.get<Movie.SearchedMovieResponseModel>(`${environment.baseApiUrl}/search/movie?api_key=${environment.apiKey}&query=${query}`);
  }
}
