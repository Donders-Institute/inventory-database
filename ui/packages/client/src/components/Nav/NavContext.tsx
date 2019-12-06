import React from "react";

// Menu
export declare const KeyValues: [
    "NAV_HOME",
    "NAV_ITEMS",
    "NAV_ITEM_ADD",
    "NAV_ITEM_VIEW",
    "NAV_ITEM_EDIT",
    "NAV_CATEGORIES",
    "NAV_CATEGORY_ADD",
    "NAV_CATEGORY_VIEW",
    "NAV_CATEGORY_EDIT",
    "NAV_USERS",
    "NAV_USER_VIEW",
    "NAV_PROFILE",
    "NAV_PROFILE_LOGOUT"];

export interface INavContext {
    key: (typeof KeyValues)[number];
    setKey: (key: (typeof KeyValues)[number]) => void;
}

const NavContext = React.createContext<INavContext | null>(null);

const NavProvider = NavContext.Provider;

const NavConsumer = NavContext.Consumer;

export { NavContext, NavProvider, NavConsumer };