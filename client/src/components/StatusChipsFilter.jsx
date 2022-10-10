import * as React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

function StatusChipsFilter(props) {
    const { statusesToFetch, setStatusesToFetch } = props;

    const handleClick = (name) => {
        setStatusesToFetch({
            ...statusesToFetch,
            [name]: {
                ...statusesToFetch[name],
                status: !statusesToFetch[name]['status'],
            },
        });
    };

    return (
        <>
            {Object.keys(statusesToFetch)
                .filter((item) => statusesToFetch[item].status)
                .map((status) => {
                    return (
                        <Grid item key={status}>
                            <Chip
                                label={status}
                                key={status}
                                onDelete={() => handleClick(status)}
                                variant={'filled'}
                                sx={{ bgcolor: statusesToFetch[status].color }}
                                /* size="small" */
                            />
                        </Grid>
                    );
                })}
        </>
    );
}

export default StatusChipsFilter;
