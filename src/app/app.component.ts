import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cards-front';
  uid: string | null;
  cards: any;
  sortedCards: any;
  handShown: boolean = false;

  constructor(private apiService: ApiService) {
    this.uid = localStorage.getItem('uid');
  }

  initGame() {
    this.apiService.initGame().subscribe(response => {
      this.uid = response.uid;
      localStorage.setItem('uid', response.uid);
    });
  }

  finishGame() {
    this.uid = null;
    this.cards = null;
    this.sortedCards = null;
    this.handShown = false;
    localStorage.removeItem('uid');
  }

  showHand() {
    if(this.uid) {
      if(this.cards && this.cards.length > 0) {
        this.handShown = true;
      } else {
        this.apiService.showHand(this.uid).subscribe(response => {
          this.cards = response.hand;
          this.handShown = true;
        });
      }
    }
  }

  hideHand() {
    this.handShown = false;
  }

  sortHand() {
    if(this.uid) {
      this.apiService.sortHand(this.uid).subscribe(response => {
        this.sortedCards = response.hand;
      });
    }
  }

}
