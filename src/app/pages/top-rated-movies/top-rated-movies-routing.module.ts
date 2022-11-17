import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopRatedMoviesPage } from './top-rated-movies.page';

const routes: Routes = [
  {
    path: '',
    component: TopRatedMoviesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopRatedMoviesPageRoutingModule {}
