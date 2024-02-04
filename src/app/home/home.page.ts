import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  private moviesService = inject(MovieService);

  constructor() {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getTopRatedMovies().subscribe((data) => {
      console.log(data);
    });
  };
}
