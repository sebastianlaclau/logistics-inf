import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, getMobbexOrderData, getShipnowOrderData } from '../api/Api';
import { Grid } from '@material-ui/core';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { paymentMethodsSettings, settleAsTitleCase, longFormatDate, shortFormatDateAndTime, statusesSettings, orderDetailsSetting, filtersShipnowTimestamps } from '../utils';
import shipnowLogo from '../assets/shipnow.png';
import CircularProgress from '@mui/material/CircularProgress';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MobbexRecordsTable from '../components/MobbexRecordsTable';
import SingleProductDescription from '../components/SingleProductDescription';

// two mobbex payment intents example 141882
// order 134394 status completed, lists all shipnow steps but these are empty

const SingleOrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [orderIsLoading, setOrderIsLoading] = useState(true);
    const [mobbexIsLoading, setMobbexIsLoading] = useState(true);
    const [shipnowIsLoading, setShipnowIsLoading] = useState(true);
    const [mobbexData, setMobbexData] = useState('');
    const [shipnowSteps, setShipnowSteps] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(async () => {
        setOrderIsLoading(true);
        setMobbexIsLoading(true);
        setShipnowIsLoading(true);
        const order = await getOrder(id);
        //console.log(order);
        setOrder(order);
        setOrderIsLoading(false);
        if (paymentMethodsSettings[order.payment_method_title].title === 'Mobbex') {
            const mobbexData = await getMobbexOrderData(id);
            setMobbexData(mobbexData);
        }
        setMobbexIsLoading(false);
        const shipnowData = await getShipnowOrderData(id);
        const shipnowSteps = filtersShipnowTimestamps(shipnowData[0].timestamps);
        setShipnowSteps(shipnowSteps);
        const completedSteps = shipnowSteps.map((i) => i[1]).indexOf('...') > -1 ? shipnowSteps.indexOf(shipnowSteps.find((i) => i[1] === '...')) - 1 : shipnowSteps.length - 1;
        //console.log(shipnowSteps);
        //console.log(completedSteps);
        setActiveStep(completedSteps);
        setShipnowIsLoading(false);
    }, []);

    return (
        <>
            <Grid container spacing={3} style={{ width: '100%' }}>
                {orderIsLoading ? (
                    <Box sx={{ width: '100%', height: '100vh', justifyContent: 'center' }}>
                        <CircularProgress style={{ position: 'relative', top: '30%', left: '50%' }} />
                    </Box>
                ) : (
                    <>
                        <Grid item style={{ width: '95%' }}>
                            <Card>
                                <CardContent>
                                    <Grid container alignItems={'center'}>
                                        <Grid item xs={12} md={9}>
                                            <Box style={{ width: '100%' }} py={5}>
                                                <Typography mx={1} variant="h5" style={{ display: 'inline' }}>
                                                    #{order.id}
                                                </Typography>
                                                <Typography mb={1} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{ display: 'inline' }}>
                                                    {`${settleAsTitleCase(longFormatDate(order.date_created))}`}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={3} pr={2}>
                                            <Box py={5} pr={3}>
                                                <Stack direction="row" justifyContent="end">
                                                    <Chip
                                                        label={order.status}
                                                        key={order.status}
                                                        variant={'filled'}
                                                        sx={{
                                                            bgcolor: statusesSettings[order.status].color,
                                                            ml: 3,
                                                        }}
                                                    />
                                                </Stack>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box paddingY={5} paddingX={5} width={'100%'}>
                                        <Divider textAlign="left">Datos de facturacion y contacto</Divider>
                                    </Box>
                                    <Box paddingY={5} paddingX={5} width={'100%'}>
                                        <Grid container>
                                            {orderDetailsSetting(order)
                                                .filter((i) => i.section === 'Datos de contacto')
                                                .map((detail, i) => {
                                                    return (
                                                        <Grid item key={i} xs={12} md={6} lg={4}>
                                                            <Stack direction={'row'} alignItems={'center'}>
                                                                <Box pt={0.5} pb={1} pr={4} pl={2} alignItems={'center'}>
                                                                    {detail.icon}
                                                                </Box>
                                                                <Typography fontSize={14}>{detail.value ? detail.value : '...'}</Typography>
                                                            </Stack>
                                                        </Grid>
                                                    );
                                                })}
                                        </Grid>
                                    </Box>
                                    {/* PAYMENT SECTION */}
                                    <Box paddingY={5} paddingX={5} width={'100%'}>
                                        <Divider textAlign="left">Informacion del pago</Divider>
                                    </Box>
                                    <Box paddingY={5} paddingX={5} width={'100%'}>
                                        <Grid container pt={3} px={3}>
                                            {orderDetailsSetting(order)
                                                .filter((i) => i.section === 'Informacion del pago')
                                                .map((detail, i) => {
                                                    const logo = detail.logo;
                                                    return (
                                                        <Grid item key={i} xs={12} md={logo ? 12 : 6} lg={logo ? 12 : 4} pb={logo ? 5 : 1}>
                                                            <Stack direction={'row'} alignItems={'center'}>
                                                                <Box my={logo ? 5 : 1} pt={0.5} pb={1} pr={4} pl={2} alignItems={'center'} src={logo ? logo : null} component={logo ? 'img' : 'div'} sx={{ height: 36.7 }}>
                                                                    {!logo ? detail.icon : null}
                                                                </Box>
                                                                {!logo && <Typography fontSize={14}>{detail.value ? detail.value : '...'}</Typography>}
                                                            </Stack>
                                                            {detail.value === 'Mobbex' &&
                                                                (mobbexIsLoading ? (
                                                                    <Box sx={{ width: '100%', justifyContent: 'center' }}>
                                                                        <CircularProgress style={{ position: 'relative', top: '30%', left: '50%' }} />
                                                                    </Box>
                                                                ) : (
                                                                    <Grid container justifyContent={'center'}>
                                                                        <Grid item>
                                                                            <MobbexRecordsTable mobbexData={mobbexData} />
                                                                        </Grid>
                                                                    </Grid>
                                                                ))}
                                                        </Grid>
                                                    );
                                                })}
                                        </Grid>
                                    </Box>

                                    {/* LOGISTIC */}
                                    <Box paddingY={5} paddingX={5} width={'100%'}>
                                        <Divider textAlign="left">Informacion logistica</Divider>
                                    </Box>
                                    <Box paddingY={5} paddingX={5} width={'100%'}>
                                        <Grid container>
                                            {orderDetailsSetting(order)
                                                .filter((i) => i.section === 'Informacion logistica')
                                                .map((detail, i) => {
                                                    return (
                                                        <Grid item key={i} xs={12} md={6} lg={4}>
                                                            <Stack direction={'row'} alignItems={'center'}>
                                                                <Box pt={0.5} pb={1} pr={4} pl={2} alignItems={'center'}>
                                                                    {detail.icon}
                                                                </Box>
                                                                <Typography fontSize={14}>{detail.value ? detail.value : '...'}</Typography>
                                                            </Stack>
                                                        </Grid>
                                                    );
                                                })}

                                            {shipnowIsLoading ? (
                                                <Box my={5} py={5} width="100%">
                                                    <CircularProgress style={{ position: 'relative', top: '30%', left: '50%' }} />
                                                </Box>
                                            ) : (
                                                activeStep > 0 && (
                                                    <>
                                                        <Grid container>
                                                            <Box my={5} ml={1} pt={0.5} pb={1} pr={4} pl={1} alignItems={'flex-end'} src={shipnowLogo} component={'img'} sx={{ height: 36.7 }} />
                                                        </Grid>
                                                        <Grid container justifyContent="center" mt={'1'} mb={'5'} sx={{ mt: '1', mb: '5' }}>
                                                            <Grid item xs={12} md={6} lg={4} mt={'1'} sx={{ mt: '1' }}>
                                                                <Box mt={1}>
                                                                    <Stepper activeStep={activeStep} orientation="vertical">
                                                                        {shipnowSteps.map((step, index) => {
                                                                            return (
                                                                                <Step key={index}>
                                                                                    <StepLabel optional={new Date(step[1]) < new Date() ? <Typography variant="caption">{shortFormatDateAndTime(step[1])}</Typography> : '...'}>{step[0]}</StepLabel>
                                                                                </Step>
                                                                            );
                                                                        })}
                                                                    </Stepper>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )
                                            )}
                                        </Grid>
                                    </Box>
                                    {/* PRODUCTS DATA */}
                                    <Box paddingY={5} paddingX={5} width={'100%'}>
                                        <Divider textAlign="left">Detalle de la compra</Divider>
                                    </Box>
                                    <Box paddingY={5} paddingX={5} width={'100%'}>
                                        <Grid container>
                                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                                {order.line_items.map((item, i) => {
                                                    //console.log(item.product_data);
                                                    return (
                                                        <div key={i}>
                                                            <SingleProductDescription product={item} />
                                                            {i < order.line_items.length - 1 && <Divider variant="inset" component="li" />}
                                                        </div>
                                                    );
                                                })}
                                            </List>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );
};

export default SingleOrderPage;
