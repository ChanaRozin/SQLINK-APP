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


export type Props = {
  data: PersonalDetails | null |Project[]
}
export const BasicCard = observer((props: Props) => {
  const { data } = props;

  const profileDataCategory = data ? Object.entries(data).map((key, i) => {
    return (
      <>
         <Typography variant="h5" >
      {key[0]} : 
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> 
          {key[1]} 
          </Typography>
        </>
    );
  }) : null;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        {profileDataCategory}
        {/* <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box> */}

         {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
         vvv
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> 
      <CardActions>
      </CardActions> */}
             </CardContent>

    </Card>
  );
})
