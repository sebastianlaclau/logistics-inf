import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { shortFormatDateAndTime } from '../utils/functions';

export default function DenseTable({ mobbexData }) {
    const titles = ['Creacion', 'Titular', 'Identificacion', 'Tarjeta', 'Plan', 'Codigo', 'Respuesta'];
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {titles.map((title) => (
                            <TableCell key={title} align={'right'}>
                                {title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(mobbexData).map((item) => {
                        const data = mobbexData[item];
                        const payment = data.riskInfo.data.transaction.payment;
                        return (
                            <TableRow key={item} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {shortFormatDateAndTime(payment.created)}
                                </TableCell>
                                <TableCell align="right">{payment.source.cardholder.name}</TableCell>
                                <TableCell align="right">{payment.source.cardholder.identification}</TableCell>
                                <TableCell align="right">{payment.source.name}</TableCell>
                                <TableCell align="right">{payment.source.installment.description}</TableCell>
                                <TableCell align="right">{data.status}</TableCell>
                                <TableCell align="right">{payment.status.text}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
