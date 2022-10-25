import React, { useState, useEffect } from 'react';

import { useDebounce } from 'use-debounce';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';

import OrderSummaryCard from '../components/OrderSummaryCard';
import StatusChips from '../components/StatusChipsFilter';
import DateSelectionModal from '../components/DatesSelectionModal';
import PaginationApp from '../components/PaginationApp';

import { getOrders } from '../api/Api';

import { statusSettings } from '../utils/fieldSettings';
import { firstOrderDate } from '../utils/constants';

function OrdersListPage({ onLogout }) {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [sinceDate, setSinceDate] = useState(firstOrderDate);
    const [untilDate, setUntilDate] = useState(new Date());
    const [statusToFetch, setStatusToFetch] = useState(statusSettings);
    const [pagesCount, setPagesCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [per_page, setPer_page] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

    const updateOrders = async () => {
        setIsLoading(true);
        const activeStatus = Object.keys(statusToFetch).filter((status) => statusToFetch[status].status);
        const { orders, totalOrdersCount } = await getOrders(sinceDate, untilDate, activeStatus, currentPage, per_page, searchTerm);
        setOrders(orders);
        setPagesCount(Math.ceil(totalOrdersCount / per_page));
        setIsLoading(false);
    };

    useEffect(() => {
        updateOrders();
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        updateOrders();
    }, [statusToFetch]);

    useEffect(() => {
        setCurrentPage(1);
        setStatusToFetch(statusSettings);
        updateOrders();
    }, [sinceDate, untilDate, per_page, debouncedSearchTerm]);

    const handlePageChange = (_, page) => {
        setCurrentPage(page);
    };

    const refreshDashboard = () => {
        setCurrentPage(1);
        setStatusToFetch(statusSettings);
        setSinceDate(firstOrderDate);
        setUntilDate(new Date());
        setSearchTerm('');
        updateOrders();
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} pl={3}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Grid container sx={{ alignItems: 'center' }}>
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
                                    <InputBase value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ ml: 1, flex: 1 }} placeholder="Search..." inputProps={{ 'aria-label': 'search...' }} />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                            <Grid sx={{ pb: 2, pl: 3, pt: 2, mt: 2 }} container columnSpacing={1} rowSpacing={1} justifyContent={'center'} alignItems="center">
                                <StatusChips statusSettings={statusSettings} statusToFetch={statusToFetch} setStatusToFetch={setStatusToFetch} />
                            </Grid>
                        </Grid>
                        <Grid item alignItems={'center'} justifyContent={'center'}>
                            {isLoading ? (
                                <Box sx={{ width: '100%', height: '100vh', justifyContent: 'center' }}>
                                    <CircularProgress style={{ position: 'relative', top: '30%', left: '50%' }} />
                                </Box>
                            ) : (
                                <>
                                    <Grid container rowSpacing={2} mt={2} justifyContent={'center'}>
                                        {orders.length > 0 ? (
                                            orders.map((order, i) => <OrderSummaryCard key={i} order={order} statusSettings={statusSettings} />)
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
