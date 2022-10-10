import * as React from 'react';

import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { shortFormatDate } from '../utils';

function ConfirmationDialogRaw(props) {
    const { onClose, open, untilDate: until, sinceDate: since } = props;
    const [untilDate, setUntilDate] = React.useState(until);
    const [sinceDate, setSinceDate] = React.useState(since);

    React.useEffect(() => {
        if (!open) {
            setUntilDate(untilDate);
            setSinceDate(sinceDate);
        }
    }, [since, until, open]);

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(sinceDate, untilDate);
    };

    return (
        <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs">
            <Grid alignItems="center">
                <DialogTitle>{'Seleccione el rango de fechas'}</DialogTitle>
            </Grid>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Stack spacing={3}>
                        <DatePicker
                            label="Hasta"
                            value={untilDate}
                            inputFormat="DD-MM-YYYY"
                            onChange={(newValue) => {
                                setUntilDate(newValue._d);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="Desde"
                            value={sinceDate}
                            inputFormat="DD-MM-YYYY"
                            onChange={(newValue) => {
                                setSinceDate(newValue._d);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = { onClose: PropTypes.func.isRequired, open: PropTypes.bool.isRequired, sinceDate: PropTypes.instanceOf(Date), untilDate: PropTypes.instanceOf(Date) };

export default function ConfirmationDialog(props) {
    const { sinceDate, untilDate, setSinceDate, setUntilDate } = props;
    const [open, setOpen] = React.useState(false);

    const handleClose = (newSinceDate, newUntilDate) => {
        setOpen(false);
        if (newSinceDate) {
            setSinceDate(newSinceDate);
        }
        if (newUntilDate) {
            setUntilDate(newUntilDate);
        }
    };

    return (
        <>
            <Typography component="h2" variant="h6" color="primary">
                {`Ordenes desde el ${shortFormatDate(sinceDate)}
                     al ${shortFormatDate(untilDate)}`}
                <IconButton onClick={() => setOpen(true)} aria-haspopup="true" aria-controls="dates-menu" aria-label="dates selecting" sx={{ mb: 0.5, ml: 2 }}>
                    <FilterListRoundedIcon color="primary" fontSize="medium" />
                </IconButton>
            </Typography>
            <ConfirmationDialogRaw id="dates-menu" keepMounted open={open} onClose={handleClose} untilDate={untilDate} sinceDate={sinceDate} />
        </>
    );
}
