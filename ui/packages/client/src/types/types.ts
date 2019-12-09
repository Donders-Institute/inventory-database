export interface Item {
    id: number;
    description: string;
}

export type ItemList = Item[] | null;

export interface Category {
    id: number;
    description: string;
}

export type CategoryList = Category[] | null;

export interface User {
    userName: string;
    displayName: string;
}

export type UserList = User[] | null;