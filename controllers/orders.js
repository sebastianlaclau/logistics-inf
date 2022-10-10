const fetch = require("cross-fetch")
const { response } = require("express")
var axios = require("axios")
var qs = require("qs")
var base64 = require("base-64")
const { header } = require("express/lib/request")

// WOOCOMMERCE DATA

const getOrders = async (req, res = response) => {
    const q = req.query
    let url = process.env.REACT_APP_WOO_ORDERS_URL
    url += "?consumer_key=" + process.env.REACT_APP_WOO_KEY
    url += "&consumer_secret=" + process.env.REACT_APP_WOO_SECRET
    url +=
        q.sinceDate !== "undefined"
            ? q.sinceDate !== q.untilDate
                ? "&after=" + new Date(q.sinceDate).toISOString()
                : ""
            : ""
    url +=
        q.untilDate !== "undefined"
            ? "&before=" + new Date(q.untilDate).toISOString()
            : ""
    url += q.status.length > 0 ? "&status=" + q.status : ""
    url += q.page !== "undefined" ? "&page=" + q.page : ""
    url += q.per_page !== "undefined" ? "&per_page=" + q.per_page : ""
    url += q.search !== 'undefined' ? "&search=" + q.search : ""


    try {
        const data = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        })

        if (data.status >= 400) {
            throw new Error("Bad response from server")
        }

        const totalOrdersCount = data.headers.get("x-wp-total")

        const orders = await data.json()

        res.send({ orders, totalOrdersCount })
    } catch (e) {
        console.log(e)
    }
}

const getSpecificOrder = async (req, res = response) => {
    const url = `${process.env.REACT_APP_WOO_ORDERS_URL}${req.params.id}?
    consumer_key=${process.env.REACT_APP_WOO_KEY}&consumer_secret=${process.env.REACT_APP_WOO_SECRET}`
    const woo_options = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    }

    try {
        const data = await fetch(url, woo_options )

        if (data.status >= 400) {
            throw new Error("Bad response from server")
        }

        const order = await data.json()

        for (item in order.line_items) {
            const product_data = await getProductData(
                order.line_items[item].product_id
            )
            order.line_items[item].product_data = product_data
        }

        console.log(order)
        res.send(order)
    } catch (e) {
        console.log(e)
    }
}

const getProductData = async (product) => {
    const url = `${process.env.REACT_APP_WOO_PRODUCTS_URL}${product}?
    consumer_key=${process.env.REACT_APP_WOO_KEY}&consumer_secret=${process.env.REACT_APP_WOO_SECRET}`

    try {
        const data = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        })

        if (data.status >= 400) {
            throw new Error("Bad response from server")
        }

        const product = await data.json()
        return product
    } catch (e) {
        console.log(e)
    }
}

// MOBBEX 

const getMobbexOrderData = async (req, res) => {
    const fetchingOptions = {
        redirect: "follow",
        method: "GET",
        headers: {
            "cache-control": "no-cache",
            "content-type": "application/json",
            "x-api-key": process.env.REACT_APP_MOB_K,
            "x-access-token": process.env.REACT_APP_MOB_S,
        },
    }

    const url = `${process.env.REACT_APP_MOB_URL}/coupons/${req.params.id}`

    try {
        const response = await fetch(url, fetchingOptions)
        const text = await response.text()
        const data = JSON.parse(text).data
        const mobbexInfo = {}

        const attempts = data.length

        for (let attempt in data) {
            const number = data[attempt].id
            const status = data[attempt].status
            let riskInfo = await getTransactionRisk(number)
            mobbexInfo[number] = {}
            mobbexInfo[number].status = status
            mobbexInfo[number].riskInfo = riskInfo
        }

        res.send(mobbexInfo)

    } catch (e) {
        console.log(e)
    }
}

async function getTransactionRisk(id) {
    const data = qs.stringify({
        id,
    })

    const config = {
        method: "post",
        url: "https://api.mobbex.com/2.0/transactions/status",
        headers: {
            "x-api-key": "k5y2~deOt1x7PX8qR6B13nkcrguY1d6sgjVyIytr",
            "x-access-token": "9a8c9abd-e69d-4cd5-9c87-b581a345af01",
            "cache-control": "no-cache",
            "Content-type": "application/x-www-form-urlencoded",
        },
        data,
    }

    try {
        const response = await axios(config)
        const data = response.data
        return data
    } catch (e) {
        console.log(e)
    }
}

// SHIPNOW

async function getShipnowData(req, res) {

    const options = {
        headers: {
            Authorization: "Token token=" + process.env.REACT_APP_SHIPNOW_TOKEN,
        },
    }
    const url = "https://api.shipnow.com.ar/orders?external_reference=" + req.params.id
    try {
        const response = await fetch(url, options)

        if (response.status >= 400) {
            throw new Error("Bad response from server")
        }
        const { results } = await response.json()
        
        res.send(results)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getOrders,
    getSpecificOrder,
    getMobbexOrderData,
    getShipnowData
}
