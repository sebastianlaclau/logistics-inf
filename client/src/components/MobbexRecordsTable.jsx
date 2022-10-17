import React from 'react';
import { shortFormatDateAndTime } from '../utils';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DenseTable({ mobbexData }) {
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
