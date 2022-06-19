import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Observer, observer } from 'mobx-react-lite';
import { Profile } from './profile';
import { ListProjects } from './list-projects';
import { useEffect } from 'react';

export const Information = observer(() => {
  useEffect(()=>{
    console.log("vkkkkkkkkkkkkkkkkkkkk");
  },[]);

      return (
    <>
      <Profile></Profile>
      <ListProjects></ListProjects>
    </>
 )
});