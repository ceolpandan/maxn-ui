import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';
import Konva from 'konva';

interface INode {
  parent: INode | null;
  info: Object;
  playerID: string;
  h: number[];
  g: number;
}
interface IGame {
  pocketsPerSide: number;
  stonesPerPocket: number;
  initialBoardInfo: Object;
}

class NodeP implements INode {
  parent: INode;
  info: Object;
  playerID: string;
  h: number[];
  g: number;
  mutari_posibile: NodeP[];
  stare_aleasa: NodeP;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  numOfPlayers: number = 0;
  text: string = " ";
  boardInfo: NodeP = null;
  moves = []
  indexes = []
  

  constructor(private gameState: GameStateService) { }

  ngOnInit(): void {
    this.gameState.currentNumOfPlayers.subscribe(num => this.numOfPlayers = num);
    this.gameState.getInit().subscribe(data => {
      this.boardInfo = data as NodeP
      this.text = `Jucatorul ${this.boardInfo.playerID} muta. 
      Buzunare disponibile:
      `
      
      this.moves = this.boardInfo.info[this.boardInfo.playerID].map((elem, index)=>{if(elem>0 && index<=5) return index+1})
      this.render();
    })
    
  }

  drawScene(stage, layer): void {
    //scena

    var rect = new Konva.Rect({
      x: stage.width() / 2 - 200,
      y: stage.height() / 2 - 200,
      width: 400,
      height: 400,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 50,
    });

    // add the shape to the layer
    layer.add(rect);

    // add the layer to the stage
    stage.add(layer);
    //N
    var rect = new Konva.Rect({
      x: stage.width() / 2 - 225,
      y: stage.height() / 2 - 225,
      width: 50,
      height: 50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 0,
    });
    
    layer.add(rect);
    stage.add(layer);


    //draw N Pockets
    let xDecay = 150
    let yDecay = 200
    let radius = 24

    for (let i = 0; i < 6; i++) {
      var pocket = new Konva.Circle({
        x: stage.width() / 2 - xDecay,
        y: stage.height() / 2 - yDecay,
        radius: radius,
        fill: 'grey',
        stroke: 'grey',
        strokeWidth: 1,
      });
      layer.add(pocket);
      stage.add(layer);
      xDecay -= 2 * radius + 10
    }
    //S
    var rect = new Konva.Rect({
      x: stage.width() / 2 + 175,
      y: stage.height() / 2 + 175,
      width: 50,
      height: 50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 0,
    });

    layer.add(rect);
    stage.add(layer);

    xDecay = 150
    yDecay = 200
    radius = 24
    //draw S pockets
    for (let i = 0; i < 6; i++) {
      var pocket = new Konva.Circle({
        x: stage.width() / 2 + xDecay,
        y: stage.height() / 2 + yDecay,
        radius: radius,
        fill: 'grey',
        stroke: 'grey',
        strokeWidth: 1,
      });
      layer.add(pocket);
      stage.add(layer);
      xDecay -= 2 * radius + 10
    }
    //E
    var rect = new Konva.Rect({
      x: stage.width() / 2 + 175,
      y: stage.height() / 2 - 225,
      width: 50,
      height: 50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 0,
    });

    layer.add(rect);
    stage.add(layer);

    xDecay = 200
    yDecay = -150

//draw E pockets

    for (let i = 0; i < 6; i++) {
      var pocket = new Konva.Circle({
        x: stage.width() / 2 + xDecay,
        y: stage.height() / 2 + yDecay,
        radius: radius,
        fill: 'grey',
        stroke: 'grey',
        strokeWidth: 1,
      });
      layer.add(pocket);
      stage.add(layer);
      yDecay += 2 * radius + 10
    }

    //W
    var rect = new Konva.Rect({
      x: stage.width() / 2 - 225,
      y: stage.height() / 2 + 175,
      width: 50,
      height: 50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 0,
    });

    layer.add(rect);
    stage.add(layer);

    xDecay = -200
    yDecay = -150

//draw W pockets

    for (let i = 0; i < 6; i++) {
      var pocket = new Konva.Circle({
        x: stage.width() / 2 + xDecay,
        y: stage.height() / 2 + yDecay,
        radius: radius,
        fill: 'grey',
        stroke: 'grey',
        strokeWidth: 1,
      });
      layer.add(pocket);
      stage.add(layer);
      yDecay += 2 * radius + 10
    }
  }

  drawPockets(stage, layer){

    //N
    let xDecay = 150
    let yDecay = 210
    let radius = 24

    for (let i = 5; i >= 0; i--) {
      let pocket = new Konva.Text({
        x: stage.width() / 2 - xDecay,
        y: stage.height() / 2 - yDecay,
        text: this.boardInfo.info['N'][i].toString(),
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black',
      });
      layer.add(pocket);
      stage.add(layer);
      xDecay -= 2 * radius + 10
    }


    //S
    xDecay = 150
    yDecay = -190
    radius = 24

    for (let i = 0; i < 6; i++) {
      let pocket = new Konva.Text({
        x: stage.width() / 2 - xDecay,
        y: stage.height() / 2 - yDecay,
        text: this.boardInfo.info['S'][i].toString(),
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black',
      });
      layer.add(pocket);
      stage.add(layer);
      xDecay -= 2 * radius + 10
    }

    //E
    xDecay = +200
    yDecay = -160

    for (let i = 5; i >= 0; i--) {
      let pocket = new Konva.Text({
        x: stage.width() / 2 + xDecay,
        y: stage.height() / 2 + yDecay,
        text: this.boardInfo.info['E'][i].toString(),
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black',
      });
      layer.add(pocket);
      stage.add(layer);
      yDecay += 2 * radius + 10
    }

    //W
    xDecay = -200
    yDecay = -160

    for (let i = 0; i < 6; i++) {
      let pocket = new Konva.Text({
        x: stage.width() / 2 + xDecay,
        y: stage.height() / 2 + yDecay,
        text: this.boardInfo.info['W'][i].toString(),
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black',
      });
      layer.add(pocket);
      stage.add(layer);
      yDecay += 2 * radius + 10
    }
  }

  drawNorthHome(stage, layer, value){
    //N
    var simpleText = new Konva.Text({
      x: stage.width() / 2 - 215,
      y: stage.height() / 2 - 225,
      text: value.toString(),
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green',
    });
    layer.add(simpleText)

    stage.add(layer)
  }

  drawSouthHome(stage, layer, value){
    var simpleText = new Konva.Text({
      x: stage.width() / 2 +200,
      y: stage.height() / 2 + 190,
      text: value.toString(),
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green',
    });
    layer.add(simpleText)

    stage.add(layer)
  }

  drawEastHome(stage, layer, value){
    var simpleText = new Konva.Text({
      x: stage.width() / 2 + 190,
      y: stage.height() / 2 - 225,
      text: value.toString(),
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green',
    });
    layer.add(simpleText)

    stage.add(layer)
  }

  drawWestHome(stage, layer, value){
    var simpleText = new Konva.Text({
      x: stage.width() / 2 - 200,
      y: stage.height() / 2 + 190,
      text: value.toString(),
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green',
    });
    layer.add(simpleText)

    stage.add(layer)
  }

  makeMove(choice){
    this.gameState.makeMove(choice).subscribe(data =>{this.boardInfo = data as NodeP; this.render()})

  }

  getMaxnMove(){
    this.gameState.getMaxnMove().subscribe(data =>{
      this.boardInfo = data as NodeP; 
      console.log(data);
      this.render()})
  }

  render(){
    let width = window.innerWidth;
    let height = window.innerHeight;

    let stage = new Konva.Stage({
        container: 'scene',
        width: width,
        height: height,
      });
    let layer = new Konva.Layer();
    this.drawScene(stage, layer)
      this.drawEastHome(stage, layer, this.boardInfo.info['E'][6])
      this.drawWestHome(stage, layer, this.boardInfo.info['W'][6])
      this.drawNorthHome(stage, layer, this.boardInfo.info['N'][6])
      this.drawSouthHome(stage, layer, this.boardInfo.info['S'][6])
      this.drawPockets(stage, layer)

    this.text = `Jucatorul ${this.boardInfo.playerID} muta. Mutari disponibile: `
    this.moves = this.boardInfo.info[this.boardInfo.playerID].map((elem, index)=>{if(elem>0 && index <= 5) return index+1});
    this.moves = this.moves.filter(elem => Number.isInteger(elem))
  }

}