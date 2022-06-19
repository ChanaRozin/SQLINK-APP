import { Title } from '../shared/title/title';
import { Card, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../stores/root-store/use-root-store';

export const Profile = observer(() => {

  const { userAuthStore } = useRootStore();
  const profileDataCategory = userAuthStore.user ? Object.entries(userAuthStore.user).map((key, i) => {
    return (
      <Card>
        <Typography variant="h5" >
          {key[0]} :
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {key[1]}
        </Typography>
      </Card>
    );
  }) : null;

  return (
    <>
      <Title title={"Profile"}></Title>
      {profileDataCategory}
    </>
  );
})
