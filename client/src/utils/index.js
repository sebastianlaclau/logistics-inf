import React from 'react'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Person3Icon from '@mui/icons-material/Person3';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EventIcon from '@mui/icons-material/Event';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CommentIcon from '@mui/icons-material/Comment';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';

import Mobbex from '../assets/mobbex.png';
import Prisma from '../assets/prisma.png';


export const firstOrderDate = new Date('2019-08-02T05:42:56');

export const paymentMethodsSettings = {
    'Hasta 18 cuotas sin interes! Visa, Mastercard, Cabal (bancarias)': { title: 'Tarjeta sin interes', icon: <PaymentIcon color="action" />, logo: Prisma },
    'Hasta 12 cuotas sin interes! Visa, Mastercard, Cabal (bancarias)': { title: 'Tarjeta sin interes', icon: <PaymentIcon color="action" />, logo: Prisma },
    'Visa y Mastercard Bancarias, seleccioná la cantidad de cuotas:': { title: 'Tarjeta sin interes', icon: <PaymentIcon color="action" />, logo: Prisma },
    'Visa a través de Mobbex': { title: 'Mobbex', icon: <PaymentIcon color="action" />, logo: Mobbex },
    'Mastercard a través de Mobbex': { title: 'Mobbex', icon: <PaymentIcon color="action" />, logo: Mobbex },
    'Cabal a través de Mobbex': { title: 'Mobbex', icon: <PaymentIcon color="action" />, logo: Mobbex },
    'Pago en efectivo contra entrega (descuento 10%) ': { title: 'Efectivo contra entrega.', icon: <LocalAtmIcon />, logo: null },
    'Pago en efectivo contra entrega ': { title: 'Efectivo contra entrega.', icon: <LocalAtmIcon color="action" />, logo: null },
    'Transferencia / depósito bancario ': { title: 'Transferencia.', icon: <AccountBalanceIcon color="action" />, logo: null },
    'MercadoPago (Todas las Tarjetas de Crédito hasta 3 Cuotas, Débito y Efectivo)': { title: 'MercadoPago', logo: null, icon: <PaymentIcon color="action" /> },
    'Mercado Pago (Tarjeta de Crédito, Débito y Efectivo)': { title: 'MercadoPago', logo: null, icon: <PaymentIcon color="action" /> },
    'Mercado Pago (tarjeta de credito, debito y efectivo)': { title: 'MercadoPago', logo: null, icon: <PaymentIcon color="action" /> },
};

export const statusesSettings = {
    'cancelled': { status: true, color: '#ffe0b2' },
    'failed': { status: true, color: '#ffe0b2' },
    'refunded': { status: true, color: '#ffe0b2' },
    'on-hold': { status: true, color: '#fff9c4' },
    'pending': { status: true, color: '#fff9c4' },
    'processing': { status: true, color: '#f0f4c3' },
    'completed': { status: true, color: '#f0f4c3' },
};

export const replaceCharacters = (string) => {
    return string
        .replaceAll('</a>', '')
        .replaceAll('<li>', '')
        .replaceAll('</li>', '')
        .replaceAll('<p>', '')
        .replaceAll('</p>', '')
        .replaceAll('<ul>', '')
        .replaceAll('</ul>', '')
        .replaceAll(':', '.')
        .replaceAll(/ *\<[^)]*\> */g, '');
};

export const longFormatDate = (date) =>
    new Date(date).toLocaleDateString('ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    });

export const shortFormatDate = (date) =>
    new Date(date).toLocaleDateString('ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

export const shortFormatDateAndTime = (date) =>
    new Date(date).toLocaleDateString('ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

export const settleAsTitleCase = (str) => {
    return str
        .split(' ')
        .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');
};

export const statesDict = {
    C: { name: 'Ciudad Autónoma de Buenos Aires' },
    B: { name: 'Buenos Aires' },
    K: { name: 'Catamarca' },
    H: { name: 'Chaco' },
    U: { name: 'Chubut' },
    X: { name: 'Córdoba' },
    W: { name: 'Corrientes' },
    E: { name: 'Entre Ríos' },
    P: { name: 'Formosa' },
    Y: { name: 'Jujuy' },
    L: { name: 'La Pampa' },
    F: { name: 'La Rioja' },
    M: { name: 'Mendoza' },
    N: { name: 'Misiones' },
    Q: { name: 'Neuquén' },
    R: { name: 'Río Negro' },
    A: { name: 'Salta' },
    J: { name: 'San Juan' },
    D: { name: 'San Luis' },
    Z: { name: 'Santa Cruz' },
    S: { name: 'Santa Fe' },
    G: { name: 'Santiago del Estero' },
    V: { name: 'Tierra del Fuego' },
    T: { name: 'Tucumán' },
};

export function orderDetailsSetting(order) {
    return [
        {
            name: 'nombre',
            value: `${settleAsTitleCase(`${order.billing.first_name} ${order.billing.last_name}`)}`,
            icon: <Person3Icon color={'action'} />,
            section: 'Datos de contacto',
            seenInSummary: true,
        },

        {
            name: 'documento',
            value: `${order.meta_data.filter((i) => i.key === '_billing_documento').length > 0 ? order.meta_data.find((i) => i.key === '_billing_documento').value : 'ND'}`,
            icon: <AssignmentIndIcon color={'action'} />,
            section: 'Datos de contacto',
            seenInSummary: false,
        },

        {
            name: 'telefono',
            value: `${order.billing.phone}`,
            icon: <LocalPhoneIcon color={'action'} />,
            section: 'Datos de contacto',
            seenInSummary: true,
        },

        {
            name: 'movil',
            value: `${order.meta_data.filter((i) => i.key === '_billing_mobile').length > 0 ? order.meta_data.find((i) => i.key === '_billing_mobile').value : 'ND'}`,
            icon: <PhoneIphoneIcon color={'action'} />,
            section: 'Datos de contacto',
            seenInSummary: false,
        },

        {
            name: 'email',
            value: `${order.billing.email}`,
            icon: <AlternateEmailIcon color={'action'} />,
            section: 'Datos de contacto',
            seenInSummary: false,
        },

        {
            name: 'direccion',
            value: `${settleAsTitleCase(order.billing.address_1)} ${order.billing.address_2 ? settleAsTitleCase(order.billing.address_2) : ''} (${order.billing.postcode}) ${settleAsTitleCase(order.billing.city)},
                        ${settleAsTitleCase(statesDict[order.billing.state].name)}`,
            icon: <HomeIcon color={'action'} />,
            section: 'Datos de contacto',
            seenInSummary: true,
        },

        {
            name: 'fechaCreacion',
            value: `${shortFormatDate(order.date_created)}`,
            icon: <EventIcon color={'action'} />,
            section: '',
            seenInSummary: false,
        },

        {
            name: 'fechaModificacion',
            value: `${shortFormatDate(order.date_modified)}`,
            icon: <EventIcon color={'action'} />,
            section: '',
            seenInSummary: false,
        },

        {
            name: 'fechaCompleto',
            value: `${shortFormatDate(order.date_completed)}`,
            icon: <EventIcon color={'action'} />,
            section: '',
            seenInSummary: false,
        },

        {
            name: 'cuponDescuento',
            value: `${order.coupon_lines[0] ? `$${order.total} ($${Number(order.total) + Number(order.coupon_lines[0].discount)} -${order.coupon_lines[0].meta_data[0].value.amount}%)` : `$${order.total}`}`,
            icon: <ShoppingCartIcon color={'action'} />,
            section: 'Informacion del pago',
            seenInSummary: false,
        },

        {
            name: 'fechaPago',
            value: `pagado el ${shortFormatDate(order.date_paid)}`,
            icon: <CalendarMonthIcon color={'action'} />,
            section: order.date_paid ? 'Informacion del pago' : null,
            section: 'Informacion del pago',
            seenInSummary: false,
        },

        {
            name: 'metodoPago',
            value: `${paymentMethodsSettings[order.payment_method_title] ? paymentMethodsSettings[order.payment_method_title].title : 'not listed'}`,
            icon: paymentMethodsSettings[order.payment_method_title] ? paymentMethodsSettings[order.payment_method_title].icon : null,
            logo: paymentMethodsSettings[order.payment_method_title] ? paymentMethodsSettings[order.payment_method_title].logo : null,
            section: 'Informacion del pago',
            seenInSummary: true,
        },

        {
            name: 'metodoEntrega',
            value: `${order.shipping_lines[0].method_title}`,
            icon: <LocalShippingIcon color={'action'} />,
            section: 'Informacion logistica',
            seenInSummary: false,
        },

        {
            name: 'costoEntrega',
            value: `${order.shipping_total}`,
            icon: <AttachMoneyIcon color={'action'} />,
            section: `${Number(order.shipping_total) > 0 ? 'Informacion logistica' : null}`,
            seenInSummary: false,
        },

        {
            name: 'notaCliente',
            value: `${order.customer_note}`,
            icon: order.customer_note.length > 0 ? <CommentIcon color={'action'} /> : <SpeakerNotesOffIcon color={'action'} />,
            section: 'Informacion logistica',
            seenInSummary: false,
        },
    ];
}

export function filtersShipnowTimestamps (timestamps) {

    const shipnowStatusDic = {
        created_at: { label: 'Creado', alwaysVisible: true, neverVisible: false },
        updated_at: { label: 'Actualizado', alwaysVisible: false, neverVisible: true },
        ready_to_pick_at: { label: 'Listo para preparar', alwaysVisible: true, neverVisible: false },
        packing_slip_at: { label: 'En preparacion', alwaysVisible: true, neverVisible: false }, 
        picking_list_at: { label: 'Listado de picking', alwaysVisible: false, neverVisible: false },
        ready_to_ship_at: { label: 'Preparado', alwaysVisible: true, neverVisible: false },
        shipped_at: { label: 'Despachado', alwaysVisible: true, neverVisible: false },
        delivered_at: { label: 'Entregado', alwaysVisible: true, neverVisible: false },
        not_delivered_at: { label: 'No entregado', alwaysVisible: false, neverVisible: false },
        on_hold_at: { label: 'En espera', alwaysVisible: false, neverVisible: false },
        cancelled_at: { label: 'Cancelado', alwaysVisible: false, neverVisible: false },
    };

    return Object.entries(timestamps)
        .filter( i => (shipnowStatusDic[i[0]].alwaysVisible || i[1] !== null) && !shipnowStatusDic[i[0]].neverVisible)
        .map(i=> i[1] === null? [shipnowStatusDic[i[0]].label, '...'] : [shipnowStatusDic[i[0]].label, shortFormatDateAndTime(i[1])])
        .sort((a, b)=> new Date(a[1])- new Date(b[1]))
}
