import React from 'react';
import { Box, Pagination } from '@mui/material';

const PaginationApp = (props) => {
    return (
        <Box justifyContent="center" alignItems="center" display="flex" sx={{ margin: '20px 0px' }}>
            <Pagination count={props.pagesCount} page={props.currentPage} onChange={props.handlePageChange} />
        </Box>
    );
};

export default PaginationApp;
