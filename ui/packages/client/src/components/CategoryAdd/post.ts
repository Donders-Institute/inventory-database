import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { Category, CategoryList } from "../../types/types";

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Fake poster for testing purposes
export const postDummyCategoryList = async (username: string, password: string, categoryList: CategoryList) => {
    console.log("Adding categories ...");
    await timeout(2000);
    return categoryList;
};

const handleAddCategoriesResponse = (response: AxiosResponse) => {
    return response;
};

const handleAddCategoriesError = (error: AxiosError) => {
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

const handleAddCategoriesRequest = (username: string, password: string, categoryList: CategoryList) => {
    return new Promise<AxiosResponse | AxiosError>((resolve) => {
        const config: AxiosRequestConfig = {
            url: "/add_categories",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
                "categoryList": categoryList
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
                .then(handleAddCategoriesResponse)
                .catch(handleAddCategoriesError));
    });
};

function isAxiosResponse(result: AxiosResponse | AxiosError): result is AxiosResponse {
    return (result as AxiosResponse).data !== undefined;
}

interface SQLQueryCategoryElement {
    description: string;
}

export const postCategoryList = async (username: string, password: string, categoryList: CategoryList) => {
    console.log("Adding categories ...");
    const result = await handleAddCategoriesRequest(username, password, categoryList);
    let resultCategoryList = [] as unknown as CategoryList;
    if (isAxiosResponse(result)) {
        if (result.data) {
            if (result.data.data) {
                const data = result.data.data;
                for (let i = 0; i < data.length; i++) {
                    const categoryElement: SQLQueryCategoryElement = data[i];
                    const category = {
                        count: i,
                        description: categoryElement.description
                    } as Category;
                    resultCategoryList!.push(category);
                }
            }
        }
    }
    return resultCategoryList;
};