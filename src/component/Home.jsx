import React from 'react'
import { Grid } from '@mui/material'
import classes from './Css/Home.module.css'
import CardMatchImage from '../image/download (7).jpeg'
import Snake from "../image/images (1).png"
import { Link } from 'react-router-dom'

export default function Home() {
               return (
                              <Grid container spacing={2} className={classes.container}>


                                             <Grid item md={12} xs={12} style={{ marginTop: "30px" }}  >

                                                            <h1>Web Games</h1>


                                             </Grid>

                                             <Grid item md={12} xs={12} className={classes.cardGame}>



                                                            <img src={Snake} height="250px" width="250px" className={classes.img} alt="snake" />
                                                            <Link to='/snake' style={{ color: "black", display: "flex" }}>
                                                                           <b className={classes.b}> Snake </b>

                                                            </Link>


                                             </Grid>



                                             <Grid item md={12} xs={12} className={classes.cardGame}>


                                                            <img src={CardMatchImage} height="150px" width="150px" className={classes.img} alt="match" />

                                                            <Link to='/matchBox' style={{ color: "black", display: "flex" }}>

                                                                           <b className={classes.b}> Memory Match </b>
                                                            </Link>

                                             </Grid>


                              </Grid>
               )
}
