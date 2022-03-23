import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  numOfPlayers: number = 0;
  constructor(private gameState: GameStateService) { }

  ngOnInit(): void {
    this.gameState.currentNumOfPlayers.subscribe(num => this.numOfPlayers = num);
  }
}
