import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonLabel , IonToolbar, IonTitle, IonContent, IonInfiniteScroll,InfiniteScrollCustomEvent, IonAlert, IonList, IonAvatar, IonItem, IonSkeletonText, IonBadge, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-home-defer',
  templateUrl: './home-defer.page.html',
  styleUrls: ['./home-defer.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonSkeletonText
    ,IonAlert, IonLabel, DatePipe, RouterModule, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class HomeDeferPage{
  private moviesService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public movies: MovieResult[] = [];
  public isLoading = false;
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(5);

  constructor() {
    this.loadMovies();
  }

  loadMovies(event? : InfiniteScrollCustomEvent){ {
    this.error = null;

    if (!event){
      this.isLoading = true;
    }

    this.moviesService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false;
        if (event){
          event.target.complete();
        }
      }),
      catchError((error: any) => {
        console.log(this.error);
        this.error = error.status_message;
        return [];
      })
    ).subscribe({
      next: (data) => {
        console.log(data);
        this.movies = [...this.movies, ...data.results];
        this.currentPage++;
        if (event){
          event.target.disabled = data.total_pages === this.currentPage;
        }
      }
    });
  };


  }
    loadMore(event?: InfiniteScrollCustomEvent){
      this.currentPage++;
      this.loadMovies(event);
  }

}
