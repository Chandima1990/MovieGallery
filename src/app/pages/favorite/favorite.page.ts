import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
