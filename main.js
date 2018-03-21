import Game from './game.jsx';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import code_text from './customcode.js';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

class MyNewGame extends Component{
    constructor(){
		super();
        //ReactDOM.render(<Game key={0} player1= {(world) => this.getCommands(world,1)} player2= {(world) => this.getCommands(world,2)}/>,document.getElementById('game1'));
        ReactDOM.render(
        <div >
			<div id={"game-"+1}  style={{height: '100vh', width: '50%',float:'left'}}>
			{/* <Game key={0} gameId={0}/>
			<Game key={1} gameId={1}  player2= {(world) => this.getCommands(world,2)} config={{speed:10, minGems:20, maxGems:30, gatherToWin:30}}/>
			<Game key={2} gameId={2}  player1= {(world) => this.getCommands(world,1)}  player2= {(world) => this.getCommands(world,2)}/> */}
			<Game key={3} gameId={3}  player1= {(world) => this.getPlayersCommands(world,1)}  player2= {(world) => this.getCommands(world,2)}/>
			</div>
			<div style={{width:'50%',float:'left'}}>

			<h4>{'function getPlayersCommands(world, playerNum){'}</h4>
			{/* <textarea id={"customCode"} style={{"width":"100%", height:"600px"}}></textarea> */}
			<AceEditor
				mode="javascript"
				theme="github"
				name="aceEditor"
				onChange={this.handleCodeChange}
				fontSize={14}
				showPrintMargin={true}
				showGutter={true}
				highlightActiveLine={true}
				value={code_text}
				setOptions={{
				enableBasicAutocompletion: false,
				enableLiveAutocompletion: false,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 2,
				}}/>
			<h4>{'}'}</h4>
			<button onClick={this.updateCustomCode.bind(this)}>Update code</button>
			</div>

        </div>,document.getElementById('game')
        );
        this.timestamp = 0;
        this.timing = 1000;
		//document.getElementById("customCode").value = code_text;
		this.customCode = code_text;
		this.editorCode = code_text;
    }
    getCommands(world, playerNum){
        //var player = world.bodies.find(body=>{if(body.label=="character"&&body.customId==playerNum-1) return body;});
		var player = world.players[playerNum-1];
        var closestGem = false;
		var closest
        world.stones.forEach(stone => {
			if(closestGem==false)
				closestGem = stone;
			else if(
				Math.abs(Math.sqrt(closestGem.x*closestGem.x+closestGem.y*closestGem.y)-Math.sqrt(player.x*player.x+player.y*player.y))>
				Math.abs(Math.sqrt(stone.x*stone.x+stone.y*stone.y)-Math.sqrt(player.x*player.x+player.y*player.y))
			){
				closestGem = stone;
			}
        });
        if(closestGem){
            if(closestGem.x-player.x>10){
				var direction = {left:false, right:true, up:false, down:false};
			}   
            else if(closestGem.x-player.x<-10){
				var direction = {left:true, right:false, up:false, down:false};
			}
            else if(closestGem.y-player.y>10){
				var direction = {left:false, right:false, up:false, down:true};
			}
            else if(closestGem.y-player.y<-10){
				var direction = {left:false, right:false, up:true, down:false};
			}
            return direction;
        }
        else if(Date.now() - this.timestamp>=this.timing){
			var newState = Math.floor(Math.random()*(11-8+1)+8);
            this.timestamp = Date.now();
			if(newState == 11) 
				var direction = {left:false, right:true, up:false, down:false};
			else if(newState == 10) 
				var direction = {left:false, right:false, up:false, down:true};
			else if(newState == 9) 
				var direction = {left:true, right:false, up:false, down:false};
			else if(newState == 8) 
				var direction = {left:false, right:false, up:true, down:false};
            return direction;
		}
	}
	getPlayersCommands(world, playerNum){
		try {
			var expression = this.customCode;
			var result = eval('(function() {' + expression + '}())');
			return result;
		} catch (err) {
			//console.log(err);
		}
	}
	updateCustomCode(){
		//this.customCode = document.getElementById("customCode").value;
		this.customCode = this.editorCode;
	}
	handleCodeChange=(newCode)=>{
		this.editorCode = newCode;
	}
}

var newGame = new MyNewGame();
export default MyNewGame