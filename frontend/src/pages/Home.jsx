import Feed from '../components/Feed';
import React from 'react'

// inital global part

// const useStyle = makeStyles((theme) => ({
//   rightbar: {
//     [theme.breakpoints.down('sm')]: {
//       display: 'none',
//     },
//   },
// }));

function Home () {
  // const styles = useStyle();
  console.log('come to home component')
  return (
    <div>
      <Feed />
    </div>
  );
}

export default Home;
