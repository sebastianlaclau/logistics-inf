import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getOrders } from '../api/Api';
import PaginationApp from './PaginationApp';
import DateSelectionModal from './DatesSelectionModal';
import StatusesChips from './StatusChipsFilter';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import OrderSummaryCard from '../components/OrderSummaryCard';
import { firstOrderDate, statusesSettings, paymentMethodsSettings } from '../utils';

function OrdersListPage({ onLogout }) {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [totalOrdersCount, setTotalOrdersCount] = useState(null);
    const [sinceDate, setSinceDate] = useState(firstOrderDate);
    const [untilDate, setUntilDate] = useState(new Date());
    const [statusesToFetch, setStatusesToFetch] = useState(statusesSettings);
    const [pagesCount, setPagesCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [per_page, setPer_page] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    //const [uno, setUno] = useState(1);
    //const [dos, setDos] = useState(2);
    //const [tres, setTres] = useState(3);
    //const [cuatro, setCuatro] = useState(4);
    //const [cinco, setCinco] = useState(5);
    //const [pagination, setPagination] = useState(firstPaginationStatus);
    //console.log({ sinceDate, untilDate, pagination, statusesToFetch });

    const updateOrders = async () => {
        //console.log('hizo un updateOrders');
        setIsLoading(true);
        const activeStatuses = Object.keys(statusesToFetch).filter((status) => statusesToFetch[status].status);
        //console.log({ pagination });
        //const { page, per_page, count } = pagination;
        const { orders, totalOrdersCount } = await getOrders(sinceDate, untilDate, activeStatuses, currentPage, per_page, searchTerm);
        //const { orders, totalOrdersCount } = response;
        setOrders(orders);
        console.log({ orders });
        setTotalOrdersCount(totalOrdersCount);
        setIsLoading(false);
    };

    const updateTotalPages = () => {
        setPagesCount(Math.ceil(totalOrdersCount / per_page));
    };

    /*
    useEffect(() => {
        console.log('se activo el effect 1');
        setDos(22);
    }, [uno]);
    useEffect(() => {
        console.log('se activo el effect 2');
        setTres(33);
    }, [dos]);
    useEffect(() => {
        console.log('se activo el effect 3');
        setUno(11);
    }, [tres]);
    useEffect(() => {
        console.log('se activo el effect 4');
        setTres(33);
    }, [cuatro]);
*/

    useEffect(() => {
        //console.log('entro en el effect de since, update y perpage');
        setCurrentPage(1);
        setStatusesToFetch(statusesSettings);
        updateOrders();
        updateTotalPages();
    }, [sinceDate, untilDate, per_page, searchTerm]);

    useEffect(() => {
        //console.log('entro en el effect de currentPage');
        updateOrders();
        updateTotalPages();
    }, [currentPage]);

    useEffect(() => {
        //console.log('entro en el effect de statusesToFetch');
        setCurrentPage(1);
        updateOrders();
        updateTotalPages();
    }, [statusesToFetch]);

    useEffect(() => {
        //console.log('entro en el effect de totalOrdersCount y perpage');
        setPagesCount(Math.ceil(totalOrdersCount / per_page));
    }, [totalOrdersCount, per_page]);

    //    useEffect(() => console.log({ searchTerm }), [searchTerm]);

    const refreshDashboard = () => {
        setCurrentPage(1);
        setStatusesToFetch(statusesSettings);
        updateOrders();
    };

    const removeSpecificOrder = (number) => {
        const updatedOrders = orders.filter((item) => item.number !== number);
        setOrders(updatedOrders);
    };

    const handlePageChange = (_, page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Grid container spacing={3}>
                {/* ORDERS LIST  */}
                <Grid item xs={12} pl={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Grid container sx={{ alignItems: 'center' }}>
                            {/* HEADER */}
                            <Grid container justifyContent={'space-between'}>
                                <Grid item xs={12} md="auto" sx={{ ml: '3%', mt: 3, mb: 5 }}>
                                    <DateSelectionModal sinceDate={sinceDate} untilDate={untilDate} setUntilDate={setUntilDate} setSinceDate={setSinceDate} />
                                </Grid>
                                <Grid item xs={12} md="auto" sx={{ pr: 2 }}>
                                    <IconButton onClick={() => refreshDashboard()} aria-label="refresh">
                                        <RefreshIcon color={'primary'} fontSize={'medium'} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container sx={{ mt: 3, mb: 4 }} justifyContent={'center'}>
                                <Paper sx={{ p: '2px 4px', display: 'flex', width: '50%' }}>
                                    <InputBase value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ ml: 1, flex: 1 }} placeholder="Search puto..." inputProps={{ 'aria-label': 'search...' }} />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                            {/* STATUS CHIPS */}
                            <Grid sx={{ pb: 2, pl: 3, pt: 2, mt: 2 }} container columnSpacing={1} rowSpacing={1} justifyContent={'center'} alignItems="center">
                                <StatusesChips statusesSettings={statusesSettings} statusesToFetch={statusesToFetch} setStatusesToFetch={setStatusesToFetch} />
                            </Grid>
                        </Grid>
                        <Grid item alignItems={'center'} justifyContent={'center'}>
                            {isLoading ? (
                                <Box
                                    sx={{
                                        width: '90%',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LinearProgress />
                                </Box>
                            ) : (
                                <>
                                    <Grid container rowSpacing={2} mt={2} justifyContent={'center'}>
                                        {orders.length > 0 ? (
                                            orders.map((order, i) => <OrderSummaryCard key={i} order={order} removeSpecificOrder={removeSpecificOrder} statusesSettings={statusesSettings} />)
                                        ) : (
                                            <div className="row pt-4">
                                                <h6>No orders</h6>
                                            </div>
                                        )}
                                    </Grid>

                                    <PaginationApp pagesCount={pagesCount} currentPage={currentPage} handlePageChange={handlePageChange} />
                                </>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default function Dashboard({ onLogout }) {
    return <OrdersListPage onLogout={onLogout} />;
}
