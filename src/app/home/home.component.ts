import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../game-state.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numOfPlayers: number = null;
  @Output() updateNumOfPlayers = new EventEmitter<number>();

  constructor(private router:Router, private gameState: GameStateService) { }

  ngOnInit(): void {
  }

  updateGameState(event: any){
    this.numOfPlayers = parseInt(event.target.value);
  }

  startGame(){
    this.updateNumOfPlayers.emit(this.numOfPlayers);
    this.gameState.updateNumOfPlayers(this.numOfPlayers);
    this.router.navigate(['/play']);
  }

}
