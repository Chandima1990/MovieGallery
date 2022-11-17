import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopRatedMoviesPageRoutingModule } from './top-rated-movies-routing.module';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { TopRatedMoviesPage } from './top-rated-movies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopRatedMoviesPageRoutingModule,
    ScrollingModule
  ],
  declarations: [TopRatedMoviesPage]
})
export class TopRatedMoviesPageModule {}
