import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [

  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'top-rated-movies',
    loadChildren: () => import('./pages/top-rated-movies/top-rated-movies.module').then( m => m.TopRatedMoviesPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./pages/favorite/favorite.module').then( m => m.FavoritePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
