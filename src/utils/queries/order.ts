import { ExtendedOrdenData } from "@utils/Examples/ExtendedOrdenData";
import { errorHandle } from "./cotizador";

// Fetch orders based on email
export const fetchOrderFromEmail = (emailToFetchOrders): Promise<ExtendedOrdenData[]> =>
    fetch(`/api/orders/obtain`, {
        method: "POST",
        body: JSON.stringify(emailToFetchOrders),
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    })
        .then((res) => (res.ok ? res.json() : errorHandle(res)))
        .catch((error) => {
            console.log("Broke here");
            throw error;
        });

// Fetch all orders
export const fetchAllOrders = (): Promise<ExtendedOrdenData[]> =>
    fetch(`/api/orders/obtain`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
    })
        .then((res) => (res.ok ? res.json() : errorHandle(res)))
        .catch((error) => {
            console.log("Broke bringing orders");
            throw error;
        });