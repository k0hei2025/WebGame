import React from 'react'
import MatchCard from '../component/cardGame/cardGame'
import classes from '../component/cardGame/card.module.css'
import {useSelector} from 'react-redux'

export default function MatchBox() {

               const selector = useSelector((state)=>state.score);
            

               console.log(selector , 'at matchbox ouyter')


               return (
                               <>
                               <div style={{position: 'absolute' , right: '10%'}}>
                               <h1 > Steps : {selector} </h1>

                                <h1> Highscore </h1>
                                
                               </div>
                              <div  className={classes.card}>
                              <MatchCard />
                              </div>
                            </>
               )
}
