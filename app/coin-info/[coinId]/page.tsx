import Image from 'next/image';
import { NotFound } from 'next/dist/client/components/error';
import { Metadata } from 'next';
import { Grid, Typography } from '@mui/material';

interface Props {
  params: { coinId: string };
}

export const revalidate = 10;

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `${params.coinId} info`,
  };
}

const CoinInfoPage = async ({ params: { coinId } }: Props) => {
  let data;
  try {
    data = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
    ).then((res) => res.json());
    if (!!data.error) return NotFound();
  } catch (e: any) {
    throw new Error(`There is a problem: ${e.message}`);
  }

  const coinInfo = {
    description: data.description.en,
    price: data.market_data.current_price.usd,
    marketCap: data.market_data.market_cap.usd,
    rank: data.market_data.market_cap_rank,
    name: data.name as string,
    image: data.image.large,
  };

  return (
    <Grid
      component={"section" as any}
      container
      direction={'column'}
      alignItems={'center'}
      p={3}
    >
      <Grid item>
        <Image
          src={coinInfo.image}
          alt={coinInfo.name}
          width={300}
          height={300}
        />
      </Grid>
      <Typography variant={'h1'} mt={5}>
        {coinInfo.name}
      </Typography>
      <Typography
        variant={'body1'}
        dangerouslySetInnerHTML={{ __html: coinInfo.description }}
        mt={2}
      />
      <Typography variant={'h5'} mt={3}>
        Price: {coinInfo.price}
      </Typography>
      <Typography variant={'h5'} mt={3}>
        Market cap: {coinInfo.marketCap}
      </Typography>
      <Typography variant={'h5'} mt={3}>
        Rank: {coinInfo.rank}
      </Typography>
    </Grid>
  );
};

export default CoinInfoPage;
