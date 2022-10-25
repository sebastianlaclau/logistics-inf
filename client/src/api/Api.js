// LOGIN

export async function login({ email, password }) {
    return await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }

            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
}

// WOOCOMMERCE

export async function getOrders(
    sinceDate,
    untilDate,
    statuses,
    page,
    per_page,
    search
) {
    let url = `/api/orders/getorders?sinceDate=${sinceDate}&untilDate=${untilDate}`;
    url += `&status=${statuses}&page=${page}&per_page=${per_page}&search=${search}`;

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }

            const json = response.json();
            return json;
        })
        .catch((err) => {
            console.log(err);
        });
}


export async function getOrder(id) {
    try {
        const response = await fetch(`/api/orders/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }

        const json = await response.json();

        return json;
    } catch (e) {
        console.log(e);
    }
}

// MOBBEX

export async function getMobbexOrderData(id) {

    try {
        const response = await fetch(`/api/orders/mobbex/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
       
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }

        const json = await response.json();

        return json;
    } catch (e) {
        console.log(e);
    }
}

// SHIPNOW

export async function getShipnowOrderData(id) {
    try {
        const response = await fetch(`/api/orders/shipnow/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }

        const json = await response.json();

        return json;
    } catch (e) {
        console.log(e);
    }
}