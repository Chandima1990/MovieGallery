import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'popular',
    pathMatch: 'full'
  },
  {
    path: 'popular',
    loadChildren: () => import('../movies/movies.module').then(m => m.MoviesPageModule)
  },
  {
    path: 'popular/:id',
    loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsPageModule)
  },
  {
    path: 'toprated',
    loadChildren: () => import('../top-rated-movies/top-rated-movies.module').then(m => m.TopRatedMoviesPageModule)
  },
  {
    path: 'toprated/:id',
    loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('../favorite/favorite.module').then(m => m.FavoritePageModule)
  },
  {
    path: 'favorite/:id',
    loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
