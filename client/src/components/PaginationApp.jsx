import React from 'react';

import { Box, Pagination } from '@mui/material';

const PaginationApp = ({ pagesCount, currentPage, handlePageChange }) => {
    return (
        <Box justifyContent="center" alignItems="center" display="flex" sx={{ margin: '20px 0px' }}>
            <Pagination count={pagesCount} page={currentPage} onChange={handlePageChange} />
        </Box>
    );
};

export default PaginationApp;
