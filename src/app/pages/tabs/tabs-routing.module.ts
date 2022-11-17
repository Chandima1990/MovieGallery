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
    loadChildren: () => import('../movies/movies.module').then(m => m.MoviesPageModule),
    data: {
      title: 'Popular Movies'
    }
  },
  {
    path: 'popular/:id',
    loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsPageModule),
    data: {
      title: 'Movie Details'
    }
  },
  {
    path: 'toprated',
    loadChildren: () => import('../top-rated-movies/top-rated-movies.module').then(m => m.TopRatedMoviesPageModule),
    data: {
      title: 'Top Rated Movies'
    }
  },
  {
    path: 'toprated/:id',
    loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsPageModule),
    data: {
      title: 'Movie Details'
    }
  },
  {
    path: 'favorite',
    loadChildren: () => import('../favorite/favorite.module').then(m => m.FavoritePageModule),
    data: {
      title: 'Favorite Movies'
    }
  },
  {
    path: 'favorite/:id',
    loadChildren: () => import('../movie-details/movie-details.module').then(m => m.MovieDetailsPageModule),
    data: {
      title: 'Movie Details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
