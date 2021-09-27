import { Grid , Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import SnakeImg from "../image/images (1).png"
import {useSelector , useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {actionState} from '../store/globalState'
import classes from './Css/Home.module.css'


export default function Snake() {




          
               const nameRef = useRef();

               const dispatch = useDispatch();
               const [submit , setSubmit] = useState(false);
               const [err , setEr] = useState(false);

               const nameStateOfStore = useSelector((state)=>
                 state.name
               )

               console.log('nameStateofStore'  , nameStateOfStore)

               const submitHandler=(event)=>{
                 
                              event.preventDefault();
                          
                              if (nameRef.current.value !== ''){



                             dispatch(actionState.nameHandler({
                                              userName : nameRef.current.value
                             }))

                             setSubmit(true);
                             setEr(false);
                              } else {
                                setEr(true)
                              }


               }

               return (
                              <Grid container spacing={2} className={classes.parentContainer} >
                                             <Grid item md={12} xs={12} style={{textAlign: 'center' , marginTop:'14%'}}>
                                              <div>
                                             <img src={SnakeImg} height="250px" width="250px" alt="Snake" />

                                              
                                                 {submit ?  <p style={{color : 'green'}}> Submitted</p> : ""}
                                                     {err ? <b style={{color : 'red'}}> Fill your name  </b> : ""}
                                               <form onSubmit={submitHandler}>
                                                              <input type="text" ref={nameRef} placeholder="Enter User-Name"/>
                                                              <Button color="primary" onClick={submitHandler} > Submit </Button>
                                                       

                                               </form>
                                                 
                                              </div>

                                           {submit ? <Link to="/game1"  > <h1  > Play Game </h1> </Link> : <> </> }  
</Grid>
                              </Grid>
               )
}
