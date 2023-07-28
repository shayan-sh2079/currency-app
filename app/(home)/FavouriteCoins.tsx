'use client';
import { Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CoinInfo {
  id: string;
  name: string;
  price: string;
  img: string;
}

const fetchCoinData = async (coinId: string) => {
  return await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=1&page=1&sparkline=false&locale=en`
  ).then((res) => res.json());
};

const FavouriteCoins = () => {
  const [favouriteCoins, setFavouriteCoins] = useState<CoinInfo[]>([]);

  useEffect(() => {
    (async () => {
      const storageValue = localStorage.getItem('favourite-coins')
      const favouriteCoinsIds = !!storageValue && JSON.parse(storageValue);
      const coinsData = [];
      if (!Array.isArray(favouriteCoinsIds)) return;
      favouriteCoinsIds.forEach((coin, idx) => {
        coinsData[idx] = fetchCoinData(coin);
      });

      const coins: CoinInfo[] = (await Promise.all(coinsData)).map((info) => ({
        id: info[0].id,
        name: info[0].name,
        img: info[0].image,
        price: info[0].current_price,
      }));
      setFavouriteCoins(coins);
    })();
  }, []);

  return (
    <Grid
      container
      spacing={10}
      sx={{
        position: 'fixed',
        bottom: '10vh',
        right: '10vw',
        justifyContent: 'flex-end',
      }}
    >
      {favouriteCoins.map((coin) => (
        <Grid item key={coin.id}>
          <Link
            href={`/coin-info/${coin.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Grid
              container
              sx={{
                border: (theme) => `1px solid ${theme.palette.common.white}`,
                borderRadius: 1,
                px: 2,
                py: 1,
              }}
            >
              <Image src={coin.img} alt={coin.name} height={45} width={45} />
              <Grid item pl={2}>
                <Typography color={'common.white'}>${coin.price}</Typography>
                <Typography color={'common.white'}>{coin.name}</Typography>
              </Grid>
            </Grid>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default FavouriteCoins;
