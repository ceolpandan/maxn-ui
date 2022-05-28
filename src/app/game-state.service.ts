import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GameStateService {

  numOfPlayers = new BehaviorSubject<number>(1);
  currentNumOfPlayers = this.numOfPlayers.asObservable();

  constructor(private http: HttpClient) { }

  updateNumOfPlayers(num: number){
    this.numOfPlayers.next(num);
  }

  getInit(){
    return this.http.get('http://localhost:3080/new')
  }

  makeMove(choice){
    const body = JSON.stringify(choice);
    return this.http.post('http://localhost:3080/move', {'choice': choice})
  }

  getMaxnMove(){
    return this.http.get('http://localhost:3080/maxn')
  }
}
