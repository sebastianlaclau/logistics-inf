import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, getMobbexOrderData, getShipnowOrderData } from '../api/Api';
import { Row, Spinner } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { paymentMethodsSettings, settleAsTitleCase, longFormatDate, shortFormatDate, shortFormatDateAndTime, statusesSettings, orderDetailsSetting, replaceCharacters, filtersShipnowTimestamps } from '../utils';
import shipnowLogo from '../assets/shipnow.png';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// two mobbex payment intents example 141882

function DenseTable({ mobbexData }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Creacion</TableCell>
                        <TableCell align="right">Titular</TableCell>
                        <TableCell align="right">Identificacion</TableCell>
                        <TableCell align="right">Tarjeta</TableCell>
                        <TableCell align="right">Plan</TableCell>
                        <TableCell align="right">Codigo</TableCell>
                        <TableCell align="center">Respuesta</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(mobbexData).map((item) => {
                        const data = mobbexData[item];
                        return (
                            <TableRow key={item} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {shortFormatDateAndTime(data.riskInfo.data.transaction.payment.created)}
                                </TableCell>
                                <TableCell align="right">{data.riskInfo.data.transaction.payment.source.cardholder.name}</TableCell>
                                <TableCell align="right">{data.riskInfo.data.transaction.payment.source.cardholder.identification}</TableCell>
                                <TableCell align="right">{data.riskInfo.data.transaction.payment.source.name}</TableCell>
                                <TableCell align="right">{data.riskInfo.data.transaction.payment.source.installment.description}</TableCell>
                                <TableCell align="right">{data.status}</TableCell>
                                <TableCell align="right">{data.riskInfo.data.transaction.payment.status.text}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const SingleOrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [orderIsLoading, setOrderIsLoading] = useState(true);
    const [mobbexIsLoading, setMobbexIsLoading] = useState(true);
    const [shipnowIsLoading, setShipnowIsLoading] = useState(true);

    const [mobbexData, setMobbexData] = useState('');

    const [shipnowData, setShipnowData] = useState('');
    const [shipnowSteps, setShipnowSteps] = React.useState([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const [windowWidth, setWindowWidth] = useState('');

    useEffect(async () => {
        setOrderIsLoading(true);
        setMobbexIsLoading(true);
        setShipnowIsLoading(true);
        const order = await getOrder(id);
        setOrder(order);
        setOrderIsLoading(false);
        if (paymentMethodsSettings[order.payment_method_title].title === 'Mobbex') {
            const mobbexData = await getMobbexOrderData(id);
            setMobbexData(mobbexData);
        }
        setMobbexIsLoading(false);
        const shipnowData = await getShipnowOrderData(id);
        //console.log({ shipnowData });
        setShipnowData(shipnowData);
        const shipnowSteps = filtersShipnowTimestamps(shipnowData[0].timestamps);
        setShipnowSteps(shipnowSteps);
        const completedSteps = shipnowSteps.indexOf(shipnowSteps.find((i) => i[1] === '...')) - 1;
        setActiveStep(completedSteps);
        setShipnowIsLoading(false);
    }, []);

    /*  useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => {
            const myWidth = window.innerWidth;
            setWindowWidth(myWidth);
            console.log('my width :::', myWidth);
        });
        return () => window.removeEventListener('resize');
    }, [window]);
 */

    return (
        <>
            <Grid container spacing={3} style={{ width: '100%' }}>
                {orderIsLoading ? (
                    <Row>
                        <Spinner style={{ position: 'absolute', top: '50%', left: '50%' }} animation="border" variant="primary" />
                    </Row>
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
                                            <Box py={5}>
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
                                                                    <Row>
                                                                        <Spinner style={{ position: 'relative', top: '50%', left: '50%' }} animation="border" variant="primary" />
                                                                    </Row>
                                                                ) : (
                                                                    <Grid container justifyContent={'center'}>
                                                                        <Grid item>
                                                                            <DenseTable mobbexData={mobbexData} />
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
                                            <Grid container>
                                                <Box my={5} ml={3} pt={0.5} pb={1} pr={4} pl={2} alignItems={'center'} src={shipnowLogo} component={'img'} sx={{ height: 36.7 }} />
                                            </Grid>
                                            <Grid container justifyContent="center" my={'5'} sx={{ my: '5' }}>
                                                <Grid item xs={12} md={6} lg={4} my={'5'} sx={{ my: '5' }}>
                                                    <Box my={5}>
                                                        {shipnowIsLoading ? (
                                                            <Row>
                                                                <Spinner style={{ position: 'relative', top: '50%', left: '50%' }} animation="border" variant="primary" />
                                                            </Row>
                                                        ) : (
                                                            <>
                                                                <Stepper activeStep={activeStep} orientation="vertical">
                                                                    {shipnowSteps.map((step, index) => {
                                                                        return (
                                                                            <Step key={index}>
                                                                                <StepLabel optional={new Date(step[1]) < new Date() ? <Typography variant="caption">{shortFormatDateAndTime(step[1])}</Typography> : '...'}>{step[0]}</StepLabel>
                                                                            </Step>
                                                                        );
                                                                    })}
                                                                </Stepper>
                                                            </>
                                                        )}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    {/* PRODUCTS DATA */}
                                    <Divider textAlign="left">Detalle de la compra</Divider>
                                    <Grid container>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                            {console.log({ order })}
                                            {order.line_items.map((item, i) => {
                                                console.log(item);
                                                return (
                                                    <div key={i}>
                                                        <ListItem alignItems="flex-start">
                                                            <ListItemAvatar>
                                                                <Avatar alt="product image" src={item.image.src} />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={settleAsTitleCase(item.product_data.categories[0].name)}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                                                                            {settleAsTitleCase(item.name)}
                                                                        </Typography>
                                                                        {` — ${item.quantity} x $ ${item.price} `}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        {i < order.line_items.length - 1 && <Divider variant="inset" component="li" />}
                                                    </div>
                                                );
                                            })}
                                        </List>
                                    </Grid>
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
