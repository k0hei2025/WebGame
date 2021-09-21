import React , {useEffect} from 'react'
import {useSelector} from 'react-redux'

function GameOver(props) {

               
             const nameStore = useSelector((state)=>state.name);
 
             console.log(nameStore)
             
               // eslint-disable-next-line react-hooks/exhaustive-deps
               useEffect(async() =>{
        
                              const data = await fetch(`https://mygame-5fcfd-default-rtdb.firebaseio.com/game.json`,{
                                             method : 'POST',
                                             body: JSON.stringify({
                                                            name : nameStore,
                                                            score : props.score,
                                             }),
                                             headers: {'Content-Type' : 'application/json'}
                              })
                              
                              const resData =  await data.json();
               
                              console.log(resData)
               },[])
               
               

               


               return (
                              <div
                                             id='GameBoard'
                                             style={{
                                                            width: props.width,
                                                            height: props.height,
                                                            borderWidth: props.width / 50,
                                             }}>
                                             <div id='GameOver' style={{ fontSize: props.width / 15 }}>
                                                            <div id='GameOverText'>GAME OVER</div>
                                                            <div>Your score: {props.score}</div>
                                                            <div>
                                                                           {props.newHighScore ? 'New local ' : 'Local '}high score:{' '}
                                                                           {props.highScore}
                                                            </div>
                                                            <div id='PressSpaceText'>Press Space to restart</div>
                                             </div>
                              </div>
               )
}

export default GameOver