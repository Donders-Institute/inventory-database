import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { Item, ItemType, ItemList } from "../../types/types";

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Fake fetcher for testing purposes
export const fetchDummyItemList = async (Itemname: string, password: string) => {
    console.log("Fetching borrow items ...");
    await timeout(2000);
    const ItemList = [
        {
            count: 1,
            id: "12345",
            serialNumber: "010101010",
            itemType: ItemType.UserItem,
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
            itemType: ItemType.UserItem,
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
            itemType: ItemType.UserItem,
            categoryCount: 2,
            category: "Product B",
            userName: "testuser",
            userEmail: "testuser@mail.com",
            roomId: "00.010",
            roomNumber: "00.010",
            hostName: "hostname",
            comment: "",
            dateOutOfGuarantee: "2022-11-11"
        },
        {
            count: 4,
            id: "45123",
            serialNumber: " 010101010",
            itemType: ItemType.LabItem,
            categoryCount: 2,
            category: "Product B",
            userName: "testuser",
            userEmail: "testuser@mail.com",
            roomId: "00.010",
            roomNumber: "00.010",
            hostName: "hostname",
            comment: "",
            dateOutOfGuarantee: "2022-11-11"
        },
        {
            count: 5,
            id: "51234",
            serialNumber: " 010101010",
            itemType: ItemType.BorrowItem,
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
    serial_number: string;
    description: string;
    product_type_id: string;
    user_id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    room_id: string;
    technical_room_number: string;
    project_code: string;
    order_number: string;
    supplier: string;
    date_of_supply: string;
    guarantee_period: string;
    date_out_of_guarantee: string;
    purchase_value: string;
    hostname: string;
    raw_memory: string;
    number_of_cpus: string;
    cpu_type: string;
    manufacturer: string;
    intranet_id: string;
    comment: string;
}

export const fetchItemList = async (username: string, password: string) => {
    console.log("Fetching borrow items ...");
    const result = await handleGetItemsRequest(username, password);
    let itemList = [] as unknown as ItemList;
    if (isAxiosResponse(result)) {
        if (result.data) {
            if (result.data.data) {
                const data = result.data.data;
                for (let i = 0; i < data.length; i++) {
                    const itemElement: SQLQueryItemElement = data[i];
                    console.log(JSON.stringify(itemElement));
                    const categoryCount = parseInt(itemElement.product_type_id);
                    const category = itemElement.description;
                    const userDisplayName = [itemElement.firstName, itemElement.middleName, itemElement.lastName].join(" ");
                    const dateOutOfGuarantee = (itemElement.date_out_of_guarantee).split("T")[0];
                    const guaranteePeriodMonths = parseInt(itemElement.guarantee_period);
                    const item = {
                        count: i,
                        id: itemElement.id,
                        serialNumber: itemElement.serial_number,
                        itemType: ItemType.UserItem,
                        categoryCount: categoryCount,
                        category: category,
                        userName: itemElement.user_id,
                        userDisplayName: userDisplayName,
                        userEmail: itemElement.email,
                        roomId: itemElement.room_id,
                        roomNumber: itemElement.technical_room_number,
                        projectCode: itemElement.project_code,
                        orderNumber: itemElement.order_number,
                        supplier: itemElement.supplier,
                        dateOfSupply: itemElement.date_of_supply,
                        guaranteePeriodMonths: guaranteePeriodMonths,
                        dateOutOfGuarantee: dateOutOfGuarantee,
                        purchaseValueEuros: itemElement.purchase_value,
                        hostName: itemElement.hostname,
                        rawMemory: itemElement.raw_memory,
                        numberOfCpus: itemElement.number_of_cpus,
                        cpuType: itemElement.cpu_type,
                        manufacturer: itemElement.manufacturer,
                        intranetId: itemElement.intranet_id,
                        comment: itemElement.comment
                    } as Item;
                    itemList!.push(item);
                }
            }
        }
    }
    return itemList;
};