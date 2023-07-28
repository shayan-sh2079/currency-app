'use client';
import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState, useTransition } from 'react';
import { CoinInfo } from './page';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

interface Props {
  coinsInfo: CoinInfo[];
  page: undefined | number;
  initialSearch: undefined | string;
}

const CustomTableCell = ({
  text,
  color,
  align,
}: {
  text: string | number;
  color?: string;
  align?: 'left';
}) => {
  return (
    <TableCell align={align}>
      <Typography textAlign={align} color={color ?? 'inherit'}>
        {text}
      </Typography>
    </TableCell>
  );
};

// components/MyChart.js contains the recharts chart
const TextField = dynamic(
  () => import('@mui/material').then((MyComponent) => MyComponent.TextField),
  { ssr: false }
);

const SearchCoins : React.FC<Props> = ({ coinsInfo, page, initialSearch }) => {
  const [search, setSearch] = useState(initialSearch ?? '');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const addToLocalStorage = (search : string) => {
    if (!search || coinsInfo.length === 0) return;
    const storageValue = localStorage.getItem('favourite-coins')
    const favouriteCoins = !!storageValue && JSON.parse(storageValue);
    const isAdded = favouriteCoins.some((item: string) => item === search);
    if (Array.isArray(favouriteCoins) && !isAdded) {
      favouriteCoins.push(search);
      if (favouriteCoins.length > 3) {
        favouriteCoins.shift();
      }
      localStorage.setItem('favourite-coins', JSON.stringify(favouriteCoins));
    } else if (!isAdded) {
      localStorage.setItem('favourite-coins', JSON.stringify([search]));
    }
  };

  const handleChangeRoute = (page: number, search: string) => {
    let newQuery = '';
    if (!!page && !!search) newQuery = `?page=${page}&search=${search}`;
    else if (!!page) newQuery = `?page=${page}`;
    else if (!!search) newQuery = `?search=${search}`;
    if (!!search) newQuery += ``;
    startTransition(() => router.push(pathname + newQuery));
  };

  useEffect(() => {
    const timeout = setTimeout(() => handleChangeRoute(1, search), 1000);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    addToLocalStorage(search);
  }, [JSON.stringify(coinsInfo)]);

  return (
    <Grid
      component={'section' as any}
      container
      direction={'column'}
      bgcolor="background.paper"
      p={3}
      pb={7}
    >
      <Typography variant={'h3'} sx={{ mb: 3 }}>
        crypto currency prices by market cap
      </Typography>
      <TextField
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: isPending && (
            <InputAdornment position="start">
              <CircularProgress />
            </InputAdornment>
          ),
        }}
      />
      {coinsInfo.length === 0 ? (
        <Typography color={'error.main'}>no results found</Typography>
      ) : (
        <>
          {' '}
          <TableContainer component={Paper as any} sx={{ mt: 3 }}>
            <Table
              sx={{ minWidth: 650, bgcolor: 'background.paper' }}
              aria-label="coins info"
            >
              <TableHead sx={{ bgcolor: 'warning.dark' }}>
                <TableRow>
                  <CustomTableCell align={'left'} text={'coin'} />
                  <CustomTableCell text={'price'} />
                  <CustomTableCell text={'24h change'} />
                  <CustomTableCell text={'market cap'} />
                </TableRow>
              </TableHead>
              <TableBody>
                {coinsInfo.map((coin) => (
                  <TableRow
                    key={coin.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Link
                        href={`/coin-info/${coin.id}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        <Grid container>
                          <Image
                            src={coin.img}
                            alt={coin.name}
                            height={35}
                            width={35}
                          />
                          <Grid item pl={1}>
                            <Typography variant={'body2'}>
                              {coin.name}
                            </Typography>
                            <Typography variant={'caption'}>
                              {coin.symbol}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Link>
                    </TableCell>
                    <CustomTableCell text={'$' + coin.price} />
                    <CustomTableCell
                      color={
                        coin.priceChange > 0 ? 'success.dark' : 'error.dark'
                      }
                      text={coin.priceChange}
                    />
                    <CustomTableCell text={coin.marketCap} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid
            item
            container
            justifyContent={'space-between'}
            direction={'row'}
          >
            {page && page > 1 && (
              <Button onClick={() => handleChangeRoute(page - 1, search)}>
                prev page
              </Button>
            )}
            <Grid item />
            <Button onClick={() => handleChangeRoute((page || 1) + 1, search)}>
              next page
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SearchCoins;
