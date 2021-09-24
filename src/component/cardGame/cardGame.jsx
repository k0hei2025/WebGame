import React, { useEffect, useState } from 'react'
import {Grid} from '@mui/material'
import {imageContainer} from './cards'
import classes from '../cardGame/card.module.css'
import { TramOutlined } from '@mui/icons-material'
import { useSelector , useDispatch } from 'react-redux'
import { actionState} from '../../store/globalState'
 
export default function CardGame() {

  const [rState , rsetState] = useState("hidden");
  // const [rImageState , rsetStateImage] = useState([]);
  // const [imgimgState , setImgImgState] = useState([]);
  const [counteree, setCount] = useState(0);
  
  const imageRSave = useSelector((state)=>state.imageRSave)
  const positionSwapArray = useSelector((state)=>state.randomDynamisedArray)
  const dispatch = useDispatch();

  useEffect(()=>{


    dispatch((actionState.cardManupulate({
    imgArray : imageContainer
  })))


  },[])

       console.log(`imageRSave`,imageRSave)
       console.log(`positionSwapArray`,positionSwapArray)
  


       const idSearchHandler=(image)=>{
         
        positionSwapArray.map((i)=>{
          if  (image === i.img.img){
            console.log('founded at index' , i)
          }
        })
        
       }
               


               return (
                              
                              <Grid  className={classes.card} container spacing={2}>
                              {positionSwapArray.map((i)=>{
     
     return (
                             <div className={classes.cardStruct} id={i.img} item md={2} onClick={()=>{
                                            positionSwapArray.map((imgs)=>{
          if  (i.img.img === imgs.img.img){
                console.log('founded at index' , i)
               
 
             setCount(counteree+1)

                dispatch((actionState.scoreCounter({
    counter : counteree + 1
  })))
             console.log('count' , counteree)
                rsetState("visible")
     
            // console.log(rState);

                             return (         <div style={{visibility:rState}} id={i.img} >
                                      <img  src={i.img.img} width="250px" alt='iirr' height="250px"   />
                                         </div>
 
                                   
         
                             )
          }
        })
                                      }}>

                                      <div className={classes.cardHide} id={i.img} >
                                      <img  src={i.img.img} width="250px" alt='iirr' height="250px"   />
                                         </div>
 
                                     </div>

     )
                            
                              })}           

                              </Grid>
               )
}
