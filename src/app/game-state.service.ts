import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameStateService {

  numOfPlayers = new BehaviorSubject<number>(1);
  currentNumOfPlayers = this.numOfPlayers.asObservable();

  constructor() { }

  updateNumOfPlayers(num: number){
    this.numOfPlayers.next(num);
  }
}
