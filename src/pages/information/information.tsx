
import { observer } from 'mobx-react-lite';
import { Profile } from '../profile';
import { ListProjects } from '../list-projects/list-projects';
import styles from './information.module.scss';

export const Information = observer(() => {

  return (
    <div className={styles.container}>
      <Profile></Profile>
      <br></br>
      <ListProjects></ListProjects>
    </div>
  )
});