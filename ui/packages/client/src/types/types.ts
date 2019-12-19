export enum ItemType {
    UserItem = "User item",
    LabItem = "Lab item",
    BorrowItem = "Borrow item",
}

export interface Item {
    count: number;
    id: string;
    serialNumber: string;
    description: string;
    itemType: ItemType;
    categoryCount: number;
    category: string;
    userName: string;
    userDisplayName: string;
    userEmail: string;
    roomId: string;
    roomNumber: string;
    projectCode: string;
    orderNumber: string;
    supplier: string;
    dateOfSupply: string;
    guaranteePeriodMonths: number;
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

export type ItemList = Item[] | null;

export interface Category {
    count: number;
    description: string;
}

export type CategoryList = Category[] | null;

export interface User {
    userName: string;
    displayName: string;
    email: string;
}

export type UserList = User[] | null;