import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { Item, ItemList } from "../../types/types";

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Fake fetcher for testing purposes
export const fetchDummyItemList = async (Itemname: string, password: string) => {
    console.log("Fetching items ...");
    await timeout(2000);
    const ItemList = [] as unknown as ItemList;
    return ItemList;
};

const handleGetItemsResponse = (response: AxiosResponse) => {
    return response;
};

const handleGetItemsError = (error: AxiosError) => {
    var errorMessage = "";
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errorMessage = JSON.stringify(error.response.data, null, 2);
    } else {
        console.log(error.message);
        errorMessage = error.message;
    }
    console.log(errorMessage);
    alert(error);
    return error;
};

const handleGetItemsRequest = (username: string, password: string) => {
    return new Promise<AxiosResponse | AxiosError>((resolve) => {
        const config: AxiosRequestConfig = {
            url: "/items",
            method: "get",
            headers: { "Content-Type": "application/json" },
            data: {
            },
            timeout: 5000,
            withCredentials: true,
            auth: {
                username: username,
                password: password
            },
            responseType: "json"
        };

        resolve(
            axios(config)
                .then(handleGetItemsResponse)
                .catch(handleGetItemsError));
    });
};

function isAxiosResponse(result: AxiosResponse | AxiosError): result is AxiosResponse {
    return (result as AxiosResponse).data !== undefined;
}

interface SQLQueryItemElement {
    id: string;
    description: string;
}

export const fetchItemList = async (username: string, password: string) => {
    console.log("Fetching items ...");
    const result = await handleGetItemsRequest(username, password);
    let ItemList = [] as unknown as ItemList;
    if (isAxiosResponse(result)) {
        if (result.data) {
            if (result.data.data) {
                const data = result.data.data;
                for (let i = 0; i < data.length; i++) {
                    const ItemElement: SQLQueryItemElement = data[i];
                    const id = parseInt(ItemElement.id);
                    const description = ItemElement.description;
                    const Item = { id: id, description: description } as Item;
                    ItemList!.push(Item);
                }
            }
        }
    }
    return ItemList;
};