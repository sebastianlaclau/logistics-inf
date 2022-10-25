import * as React from 'react';

import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

function StatusChipsFilter(props) {
    const { statusToFetch, setStatusToFetch } = props;

    const handleClick = (name) => {
        setStatusToFetch({
            ...statusToFetch,
            [name]: {
                ...statusToFetch[name],
                status: !statusToFetch[name]['status'],
            },
        });
    };

    return (
        <>
            {Object.keys(statusToFetch)
                .filter((item) => statusToFetch[item].status)
                .map((status) => {
                    return (
                        <Grid item key={status}>
                            <Chip label={status} key={status} onDelete={() => handleClick(status)} variant={'filled'} sx={{ bgcolor: statusToFetch[status].color }} />
                        </Grid>
                    );
                })}
        </>
    );
}

export default StatusChipsFilter;
