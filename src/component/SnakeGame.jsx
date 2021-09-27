import React from 'react'
import './SnakeGame.css'
import GameOver from './SnakeGameOver.jsx'
import AppleImage from '../image/apple.jpg'
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {connect} from 'react-redux'

import { Button, Grid, Link } from '@mui/material'

class SnakeGame extends React.Component {
               constructor(props) {
                              super(props)

                              this.handleKeyDown = this.handleKeyDown.bind(this)

                              this.state = {
                                            listScore : '',
                                            pushed : false,
                                             max : 0
                                              ,
                                              maxNumber : 0,
                                              top3 : [],
                                              others : [],
                                              scoreApple : '',
                                             playerScore: [],
                                             width: 0,
                                             height: 0,
                                             blockWidth: 0,
                                             blockHeight: 0,
                                             gameLoopTimeout: 100,
                                             timeoutId: 0,
                                             startSnakeSize: 0,
                                             snake: [],
                                             apple: {},
                                             direction: 'right',
                                             directionChanged: false,
                                             isGameOver: false,
                                             snakeColor: this.props.snakeColor || this.getRandomColor(),
                                             appleColor: this.props.appleColor || this.getRandomColor(),
                                             score: 0,
                                             highScore: Number(localStorage.getItem('snakeHighScore')) || 0,
                                             newHighScore: false,

                              }
               }

               componentDidMount() {
                              this.initGame()
                              window.addEventListener('keydown', this.handleKeyDown)
                              this.gameLoop()

                           const func =   async()=>{
                              
                              const data = await fetch('https://mygame-5fcfd-default-rtdb.firebaseio.com/game.json')
                              
                              const resData = await data.json();

                              const arrayContainerOfScore = [];
                              let topNo = [];
               
                              for (let i in resData){
                                             arrayContainerOfScore.push({

                                             id : i, 
                                             name : resData[i].name,
                                             score : resData[i].score,  
                                             })



                                             if (resData[i].score > this.state.maxNumber){
                                        
                                                 if (this.state.top3.length < 3){
                                                      topNo.push({
                                                          name: resData[i].name,
                                                         score : resData[i].score})
                                                                 {this.setState({maxNumber : resData[i].score})}
                                                 {this.setState({ top3 : topNo }) }
                                                 }
                                               
                                             }
                              }

                              console.log(`top`,this.state.top3)
                              this.setState({playerScore : arrayContainerOfScore})

                              console.log(this.state.playerScore)
                                  
                              }

                              func();

                             




               }

               



               initGame() {
                              // Game size initialization
                              let percentageWidth = this.props.percentageWidth || 60
                              let width =
                                             document.getElementById('GameBoard').parentElement.offsetWidth *
                                             (percentageWidth / 60)
                              width -= width % 30
                              if (width < 30) width = 30
                              let height = (width / 3) * 1
                              let blockWidth = width / 30
                              let blockHeight = height / 20

                              // snake initialization
                              let startSnakeSize = this.props.startSnakeSize || 3
                              let snake = []
                              let Xpos = width / 2
                              let Ypos = height / 2
                              let snakeHead = { Xpos: width / 2, Ypos: height / 2 }
                              snake.push(snakeHead)
                              for (let i = 1; i < startSnakeSize; i++) {
                                             Xpos -= blockWidth
                                             let snakePart = { Xpos: Xpos, Ypos: Ypos }
                                             snake.push(snakePart)
                              }

                              // apple position initialization
                              let appleXpos =
                                             Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
                                             blockWidth
                              let appleYpos =
                                             Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
                                             blockHeight
                              while (appleYpos === snake[0].Ypos) {
                                             appleYpos =
                                                            Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
                                                            blockHeight
                              }

                              this.setState({
                                             width,
                                             height,
                                             blockWidth,
                                             blockHeight,
                                             startSnakeSize,
                                             snake,
                                             apple: { Xpos: appleXpos, Ypos: appleYpos },
                              })
               }

               gameLoop() {
                              let timeoutId = setTimeout(() => {
                                             if (!this.state.isGameOver) {
                                                            this.moveSnake()
                                                            this.tryToEatSnake()
                                                            this.tryToEatApple()
                                                            this.setState({ directionChanged: false })
                                             }

                                             this.gameLoop()
                              }, this.state.gameLoopTimeout)

                              this.setState({ timeoutId })
               }

               componentWillUnmount() {
                              clearTimeout(this.state.timeoutId)
                              window.removeEventListener('keydown', this.handleKeyDown)
               }

               resetGame() {
                              let width = this.state.width
                              let height = this.state.height
                              let blockWidth = this.state.blockWidth
                              let blockHeight = this.state.blockHeight
                              let apple = this.state.apple

                              // snake reset
                              let snake = []
                              let Xpos = width / 2
                              let Ypos = height / 2
                              let snakeHead = { Xpos: width / 2, Ypos: height / 2 }
                              snake.push(snakeHead)
                              for (let i = 1; i < this.state.startSnakeSize; i++) {
                                             Xpos -= blockWidth
                                             let snakePart = { Xpos: Xpos, Ypos: Ypos }
                                             snake.push(snakePart)
                              }

                              // apple position reset
                              apple.Xpos =
                                             Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
                                             blockWidth



                              apple.Ypos =
                                             Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
                                             blockHeight
                              while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
                                             apple.Xpos =
                                                            Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
                                                            blockWidth
                                             apple.Ypos =
                                                            Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
                                                            blockHeight
                              }

                              this.setState({
                                             snake,
                                             apple,
                                             direction: 'right',
                                             directionChanged: false,
                                             isGameOver: false,
                                             gameLoopTimeout: 50,
                                             snakeColor: this.getRandomColor(),
                                             appleColor: this.getRandomColor(),
                                             score: 0,
                                             newHighScore: false,
                              })
               }

               getRandomColor() {
                              let hexa = '0123456789ABCDEF'
                              let color = '#'
                              for (let i = 0; i < 6; i++) color += hexa[Math.floor(Math.random() * 16)]
                              return color
               }

               moveSnake() {
                              let snake = this.state.snake
                              let previousPartX = this.state.snake[0].Xpos
                              let previousPartY = this.state.snake[0].Ypos
                              let tmpPartX = previousPartX
                              let tmpPartY = previousPartY
                              this.moveHead()
                              for (let i = 1; i < snake.length; i++) {
                                             tmpPartX = snake[i].Xpos
                                             tmpPartY = snake[i].Ypos
                                             snake[i].Xpos = previousPartX
                                             snake[i].Ypos = previousPartY
                                             previousPartX = tmpPartX
                                             previousPartY = tmpPartY
                              }
                              this.setState({ snake })
               }

               tryToEatApple() {
                              let snake = this.state.snake
                              let apple = this.state.apple

                              // if the snake's head is on an apple
                              if (snake[0].Xpos === apple.Xpos && snake[0].Ypos === apple.Ypos) {
                                             let width = this.state.width
                                             let height = this.state.height
                                             let blockWidth = this.state.blockWidth
                                             let blockHeight = this.state.blockHeight
                                             let newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos }
                                             let highScore = this.state.highScore
                                             let newHighScore = this.state.newHighScore
                                             let gameLoopTimeout = this.state.gameLoopTimeout
                                             
                                             

                                             // increase snake size
                                             snake.push(newTail)

                                             // create another apple
                                             apple.Xpos =
                                                            Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
                                                            blockWidth
                                             apple.Ypos =
                                                            Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
                                                            blockHeight
                                             while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
                                                            apple.Xpos =
                                                                           Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
                                                                           blockWidth
                                                            apple.Ypos =
                                                                           Math.floor(
                                                                                          Math.random() * ((height - blockHeight) / blockHeight + 1)
                                                                           ) * blockHeight
                                             }

                                             // increment high score if needed
                                             if (this.state.score === highScore) {
                                                            highScore++
                                                            localStorage.setItem('snakeHighScore', highScore)
                                                            newHighScore = true
                                             }

                                             // decrease the game loop timeout
                                             if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5

                                             this.setState({
                                                            snake,
                                                            apple,
                                                            score: this.state.score + 1,
                                                            highScore,
                                                            newHighScore,
                                                            gameLoopTimeout,
                                             })
                              }
               }

               tryToEatSnake() {
                              let snake = this.state.snake

                              for (let i = 1; i < snake.length; i++) {
                                             if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos)
                                                            this.setState({ isGameOver: true })
                              }

               }

               isAppleOnSnake(appleXpos, appleYpos) {
                              let snake = this.state.snake
                              for (let i = 0; i < snake.length; i++) {
                                             if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
                                                            return true
                              }

                              return false
               }

               moveHead() {
                              switch (this.state.direction) {
                                             case 'left':
                                                            this.moveHeadLeft()
                                                            break
                                             case 'up':
                                                            this.moveHeadUp()
                                                            break
                                             case 'right':
                                                            this.moveHeadRight()
                                                            break
                                             default:
                                                            this.moveHeadDown()
                              }
               }

               moveHeadLeft() {
                              let width = this.state.width
                              let blockWidth = this.state.blockWidth
                              let snake = this.state.snake
                              snake[0].Xpos =
                                             snake[0].Xpos <= 0 ? width - blockWidth : snake[0].Xpos - blockWidth
                              this.setState({ snake })
               }

               moveHeadUp() {
                              let height = this.state.height
                              let blockHeight = this.state.blockHeight
                              let snake = this.state.snake
                              snake[0].Ypos =
                                             snake[0].Ypos <= 0 ? height - blockHeight : snake[0].Ypos - blockHeight
                              this.setState({ snake })
               }

               moveHeadRight() {
                              let width = this.state.width
                              let blockWidth = this.state.blockWidth
                              let snake = this.state.snake
                              snake[0].Xpos =
                                             snake[0].Xpos >= width - blockWidth ? 0 : snake[0].Xpos + blockWidth
                              this.setState({ snake })
               }

               moveHeadDown() {
                              let height = this.state.height
                              let blockHeight = this.state.blockHeight
                              let snake = this.state.snake
                              snake[0].Ypos =
                                             snake[0].Ypos >= height - blockHeight ? 0 : snake[0].Ypos + blockHeight
                              this.setState({ snake })
               }

               handleKeyDown(event) {
                              // if spacebar is pressed to run a new game
                              if (this.state.isGameOver && event.keyCode === 32) {
                                             this.resetGame()
                                             return
                              }

                              if (this.state.directionChanged) return

                              switch (event.keyCode) {
                                             case 37:
                                             case 65:
                                                            this.goLeft()
                                                            break
                                             case 38:
                                             case 87:
                                                            this.goUp()
                                                            break
                                             case 39:
                                             case 68:
                                                            this.goRight()
                                                            break
                                             case 40:
                                             case 83:
                                                            this.goDown()
                                                            break
                                             default:
                              }
                              this.setState({ directionChanged: true })
               }

               goLeft() {
                              let newDirection = this.state.direction === 'right' ? 'right' : 'left'
                              this.setState({ direction: newDirection })
               }

               goUp() {
                              let newDirection = this.state.direction === 'down' ? 'down' : 'up'
                              this.setState({ direction: newDirection })
               }

               goRight() {
                              let newDirection = this.state.direction === 'left' ? 'left' : 'right'
                              this.setState({ direction: newDirection })
               }

               goDown() {
                              let newDirection = this.state.direction === 'up' ? 'up' : 'down'
                              this.setState({ direction: newDirection })
               }

               fullScreenHandler(){
                   console.log("clicked")
                          let fullS = document.getElementById('GameBoard');
                      
                                
                               if (fullS.requestFullscreen){
                                  fullS.requestFullscreen();
                              }
                          

               }

                  pushHandler(){
                                this.setState({pushed: true}); 
                            this.setState({listScore : this.state.playerScore((u)=>{
                                  
                                  return (<div id={u}> 

                                       <div>
                                           Name  : {u.name}
                                       </div>

                                       <div>
                                           Score :   {u.score}
                                       </div>


                                    </div> )
                                }) })    
                               
                              console.log(this.state.pushed);    
                              }

                            

               render() {

                               console.log(`top`,this.state.top3)  
                             
                           


                              // Game over
                              if (this.state.isGameOver) {
                                             return (
                                                            <GameOver
                                                                           width={this.state.width}
                                                                           height={this.state.height}
                                                                           highScore={this.state.highScore}
                                                                           newHighScore={this.state.newHighScore}
                                                                           score={this.state.score}
                                                            />
                                             )
                              }



                              return (
                                             <Grid container spacing={2}>
                                                            <Grid item md={12} xs={12}
                                                                           id='GameBoard'
                                                                           style={{
                                                                                          width: this.state.width,
                                                                                          height: this.state.height,
                                                                                          
                                                                           }}>
                                                                              <div onClick={this.fullScreenHandler}>  <FullscreenIcon/> 
                                                                              
                                                                              </div>

                                                                             
                                                                             <b> userName </b> : {this.props.userName}
                                                                            <b> Score :</b>{this.state.score}

                                                                           {this.state.snake.map((snakePart, index) => {
                                                                                        
                                                                                        
                                                                                        if (index === 0){


                                                                                            
                                                                                        return (
                                                                                                         <div
                                                                                            key={index}
                                                                               className='Block'


     
                                                                                                                        style={{
                                                                                                                                       width: this.state.blockWidth,
                                                                                                                                       height: this.state.blockHeight,
                              
        borderRadius:'.5rem',                                                                                                             
                                                                                                                                       left: snakePart.Xpos,
                                                                                                                                       top: snakePart.Ypos,
                                                                                                                                       background: this.state.snakeColor,
                                                                                                                        }}
                                                                                                         />
                                                                                        )
                                                                                                                    }





                                                                                        
                                                                                        
                                                                                        
                                                                                        return (
                                                                                                         <div
                                                                                            key={index}
                                                                               className='Block'


     
                                                                                                                        style={{
                                                                                                                                       width: this.state.blockWidth,
                                                                                                                                       height: this.state.blockHeight,
                              
                                                                                                                                       
                                                                                                                                       left: snakePart.Xpos,
                                                                                                                                       top: snakePart.Ypos,
                                                                                                                                       background: this.state.snakeColor,
                                                                                                                        }}
                                                                                                         />
                                                                                          )
                                              })}
                                                                           <div
                                 className='BlockApple'
                                                  style={{
                                          width: this.state.blockWidth,
                                        height: this.state.blockHeight,
                                    left: this.state.apple.Xpos,
                                   top: this.state.apple.Ypos,
                                    background: this.state.appleColor,
                                    }}
                                                                           />
                                                    
                                                    
                                                   </Grid> 
                                                    
                                                    



                                                    
                                                    
                                                              <Grid container spacing={2}id='Score' style={{ marginLeft:"35px", marginTop:"10px", fontSize: "20px" }}>
                                                <b> TOP 3 SCORE </b> 
                                                             {this.state.top3.map((i)=>{
                                                  
                                                  return ( <Grid container spacing={2} id={i}>
                                                       
                                                                 <>
                                                                    <Grid item md={4} id={i}>
                                                                         Name : {i.name}
                                                                    </Grid>

                                                                         <Grid item md={4} id={i}>
                                                                         Score : {i.score}
                                                                        </Grid>
                                                                        </>
 
                                                        </Grid>
                                                  )
                                                          })}  
                                                 
                                                                           </Grid>

                                                             <div>
                                                                <Button style={{marginLeft : '15px'}} onClick={()=>{

                                                                    this.setState({pushed : !this.state.pushed});

                                        
                                                            this.setState({listScore :
                                                            this.state.playerScore.map((u)=>{
                                  
                                  return (<Grid style={{textAlign: 'center' , margin:"5px"}} container spacing={2} id={u}> 

                                       <Grid item md={6}>
                                           <b>Name</b>  : {u.name}
                                       </Grid>

                                       <Grid item md={6}>
                                          <b> Score </b>:   {u.score}
                                       </Grid>


                                    </Grid> )
                                })   
                            
                                                            })          }}
                                                              > { this.state.pushed ? <p> Hide all PLayers score </p>  :  <p> See all player Score </p> } </Button> 

                                                                
                                                             </div>
                                                              
                                                            { this.state.pushed  ?  this.state.listScore : ""}

                                                            </Grid>
                                            
                              )
               }
}

const mapStateToProps=(state)=>({
   userName : state.name
})


export default connect(mapStateToProps)(SnakeGame)