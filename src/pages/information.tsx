import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { Profile } from './profile';
import { ListProjects } from './list-projects';

export const Information = observer(() => {
  return (
    <>
      <Profile></Profile>
      <ListProjects></ListProjects>
    </>
  );
})
