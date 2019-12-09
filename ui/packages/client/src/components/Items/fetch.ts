import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { Item, ItemList } from "../../types/types";

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Fake fetcher for testing purposes
export const fetchDummyItemList = async (Itemname: string, password: string) => {
    console.log("Fetching items ...");
    await timeout(2000);
    const ItemList = [
        {
            count: 1,
            id: "12345",
            serialNumber: "010101010",
            description: "",
            categoryCount: 1,
            category: "Product A",
            userName: "testuser",
            userEmail: "testuser@mail.com",
            roomId: "00.010",
            roomNumber: "00.010",
            hostName: "hostname",
            comment: "",
            dateOutOfGuarantee: "2022-11-11"
        },
        {
            count: 2,
            id: "23451",
            serialNumber: "010101010",
            description: "",
            categoryCount: 1,
            category: "Product A",
            userName: "testuser",
            userEmail: "testuser@mail.com",
            roomId: "00.010",
            roomNumber: "00.010",
            hostName: "hostname",
            comment: "",
            dateOutOfGuarantee: "2022-11-11"
        },
        {
            count: 3,
            id: "34512",
            serialNumber: " 010101010",
            description: "",
            categoryCount: 2,
            category: "Product B",
            userName: "testuser",
            userEmail: "testuser@mail.com",
            roomId: "00.010",
            roomNumber: "00.010",
            hostName: "hostname",
            comment: "",
            dateOutOfGuarantee: "2022-11-11"
        }
    ] as unknown as ItemList;
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
    serialNumber: string;
    description: string;
    categoryCount: string;
    category: string;
    userName: string;
    userFirstName: string;
    userMiddleName: string;
    userLastName: string;
    userEmail: string;
    roomId: string;
    roomNumber: string;
    projectCode: string;
    orderNumber: string;
    supplier: string;
    dateOfSupply: string;
    guaranteePeriodMonths: string;
    dateOutOfGuarantee: string;
    purchaseValueEuros: string;
    hostName: string;
    rawMemory: string;
    numberOfCpus: string;
    cpuType: string;
    manufacturer: string;
    intranetId: string;
    comment: string;
}

export const fetchItemList = async (username: string, password: string) => {
    console.log("Fetching items ...");
    const result = await handleGetItemsRequest(username, password);
    let itemList = [] as unknown as ItemList;
    if (isAxiosResponse(result)) {
        if (result.data) {
            if (result.data.data) {
                const data = result.data.data;
                for (let i = 0; i < data.length; i++) {
                    const itemElement: SQLQueryItemElement = data[i];
                    const categoryCount = parseInt(itemElement.categoryCount);
                    const userDisplayName = [itemElement.userFirstName, itemElement.userMiddleName, itemElement.userLastName].join(" ");
                    const guaranteePeriodMonths = parseInt(itemElement.guaranteePeriodMonths);
                    const item = {
                        count: i,
                        id: itemElement.id,
                        serialNumber: itemElement.serialNumber,
                        description: itemElement.description,
                        categoryCount: categoryCount,
                        category: itemElement.categoryCount,
                        userName: itemElement.userName,
                        userDisplayName: userDisplayName,
                        userEmail: itemElement.userEmail,
                        roomId: itemElement.roomId,
                        roomNumber: itemElement.roomNumber,
                        projectCode: itemElement.projectCode,
                        orderNumber: itemElement.orderNumber,
                        supplier: itemElement.supplier,
                        dateOfSupply: itemElement.dateOfSupply,
                        guaranteePeriodMonths: guaranteePeriodMonths,
                        dateOutOfGuarantee: itemElement.dateOutOfGuarantee,
                        purchaseValueEuros: itemElement.purchaseValueEuros,
                        hostName: itemElement.hostName,
                        rawMemory: itemElement.rawMemory,
                        numberOfCpus: itemElement.numberOfCpus,
                        cpuType: itemElement.cpuType,
                        manufacturer: itemElement.manufacturer,
                        intranetId: itemElement.intranetId,
                        comment: itemElement.comment
                    } as Item;
                    itemList!.push(item);
                }
            }
        }
    }
    return itemList;
};