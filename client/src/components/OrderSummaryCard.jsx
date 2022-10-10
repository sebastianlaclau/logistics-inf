import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { orderDetailsSetting, statusesSettings } from '../utils';

function OrderSummaryCard(props) {
    const { order } = props;

    return (
        <>
            <Grid item width={'95%'}>
                <Card>
                    <CardContent p={1}>
                        <Grid container>
                            <Grid item xs={12} md={9}>
                                <Typography mx={1} variant="h5" style={{ display: 'inline' }}>
                                    #{order.number}
                                </Typography>
                                <Typography mb={1} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{ display: 'inline' }}>
                                    {`${order.date_created}`}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={3} pr={2}>
                                <Stack direction="row" justifyContent="end">
                                    <Chip label={order.status} key={order.status} variant={'filled'} sx={{ bgcolor: statusesSettings[order.status].color, ml: 3 }} />
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid container pt={3} px={3}>
                            {orderDetailsSetting(order)
                                .filter((i) => i.seenInSummary)
                                .map((item, i) => {
                                    console.log(item);
                                    return (
                                        <Grid key={i} item xs={12} md={6} lg={4}>
                                            <Stack direction={'row'} alignItems={'center'}>
                                                <Box pt={0.5} pb={1} pr={4} pl={2} alignItems={'center'}>
                                                    {item.icon}
                                                </Box>
                                                <Typography fontSize={14}>{item.value}</Typography>
                                            </Stack>
                                        </Grid>
                                    );
                                })}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Grid item pr={3}>
                                <Button size="small" href={`order/${order.number}`}>
                                    ver mas
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
}

export default OrderSummaryCard;
