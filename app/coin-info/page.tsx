import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import SearchCoins from './SearchCoins';

export interface CoinInfo {
  id: string;
  name: string;
  symbol: string;
  img: string;
  marketCap: string;
  priceChange: number;
  price: string;
}

export const metadata = {
  title: 'currency search page',
};

export const revalidate = 1500;

const CoinsListPage = async ({
  searchParams: { page, search },
}: {
  searchParams: { page: string | undefined; search: string | undefined };
}) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${
    search ? `&ids=${search}` : ''
  }&order=market_cap_desc&per_page=5&page=${
    page || 1
  }&sparkline=false&locale=en`;
  const data = await fetch(url).then((res) => res.json());

  const coinsInfo: CoinInfo[] = data.map((info: any) => ({
    id: info.id,
    name: info.name,
    symbol: info.symbol,
    img: info.image,
    marketCap: info.market_cap,
    priceChange: info.price_change_24h,
    price: info.current_price,
  }));

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        width: '100vw',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <Image src={'/banner.jpg'} alt={'coins info'} fill sizes="100vw" />
      </Box>
      <Grid
        container
        direction={'column'}
        alignItems={'center'}
        zIndex={2}
        position={'relative'}
        justifyContent={'space-between'}
        height={1}
      >
        <Grid item>
          <Typography variant={'h1'} mt={4} mb={2} color={'common.white'}>
            search coin
          </Typography>
          <Typography variant={'h4'} color={'common.white'}>
            get information from here
          </Typography>
        </Grid>
        <SearchCoins
          coinsInfo={coinsInfo}
          page={page ? +page : undefined}
          initialSearch={search}
        />
      </Grid>
    </Box>
  );
};

export default CoinsListPage;
