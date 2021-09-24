import { Grid , Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import MatchBoxImg from '../image/download (7).jpeg'
import {useSelector , useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {actionState} from '../store/globalState'
import classes from './Css/Home.module.css'


export default function Match() {




          
               const nameRef = useRef();

               const dispatch = useDispatch();

               const nameStateOfStore = useSelector((state)=>
                 state.name
               )

               console.log('nameStateofStore'  , nameStateOfStore)

               const submitHandler=(event)=>{
                 
                              event.preventDefault();
                          

                             dispatch(actionState.nameHandler({
                                              userName : nameRef.current.value
                             }))
               }

               return (
                              <Grid container spacing={2} className={classes.parentContainer} >
                                             <Grid item md={12} xs={12} style={{textAlign: 'center' , marginTop:'14%'}}>
                                              <div>
                                             <img src={MatchBoxImg} height="250px" width="250px" alt="Snake" />
                                               <form onSubmit={submitHandler}>
                                                              <input type="text" ref={nameRef} placeholder="Enter User-Name"/>
                                                              <Button color="primary" onClick={submitHandler} > Submit </Button>

                                               </form>
                                              </div>

                                             <Link to="/matchEnter"> <h1  > Play Game </h1> </Link>
</Grid>
                              </Grid>
               )
}
