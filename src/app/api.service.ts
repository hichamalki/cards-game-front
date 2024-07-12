import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  initGame(): Observable<any> {
    return this.http.get('http://cards.local/game/init');
  }

  showHand(uid: string): Observable<any> {
    return this.http.get(`http://cards.local/game/${uid}/hand`);
  }

  sortHand(uid: string): Observable<any> {
    return this.http.get(`http://cards.local/game/${uid}/sort`);
  }
}
