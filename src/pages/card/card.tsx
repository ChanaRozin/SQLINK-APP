import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { PersonalDetails } from '../../stores/user-auth-store';
import { Project } from '../../stores/list-projects-store';

export const BasicCard = observer((props:any) => {
  // const { data } = props;

  return (
    <div>
      {props}
    </div>

  );
})
