import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import FavouriteCoins from './FavouriteCoins';

export const metadata = {
  title: 'currency home page',
};

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: -1,
        }}
      >
        <Image
          src={'/background.png'}
          alt={'currency home'}
          fill
          sizes={'100vw'}
        />
      </Box>
      <Grid container>
        <Grid
          item
          container
          xs={5}
          direction={'column'}
          alignItems={'center'}
          pt={'20vh'}
        >
          <Typography variant={'h1'} color={'common.white'}>
            search & buy{' '}
            <Typography
              component={'span' as any}
              variant={'h1'}
              color={'warning.main'}
            >
              crypto
            </Typography>
          </Typography>
          <Typography
            variant={'h4'}
            color={'common.white'}
            sx={{ mt: 7, mb: 6 }}
          >
            Mohaymen ICT test project
          </Typography>
          <Link href={'/coin-info'}>
            <Button
              color={'warning'}
              variant={'contained'}
              sx={{ color: 'common.white', borderRadius: 5 }}
            >
              search more
            </Button>
          </Link>
        </Grid>
      </Grid>
      <FavouriteCoins />
    </>
  );
};

export default HomePage;
