import {BASE_PATH} from "../utils/constants";

export async function getLastProductsApi(limit){

    try {
        const limitItems = `_limit=${limit}`;
        const sortItem = "_sort=createdAt:desc";
        const url = `${BASE_PATH}/products?${limitItems}&${sortItem}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}



export async function getProductsPlatformApi(platform, limit, start) {
    try {
      const limitItems = `_limit=${limit}`;
      const sortItems = `_sort=createdAt:desc`;
      const startItems = `_start=${start}`;
      const url = `${BASE_PATH}/products?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  export async function getTotalProductsPlatformApi(platform) {
    try {
      const url = `${BASE_PATH}/products/count?platform.url=${platform}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  export async function getProductByUrlApi(path) {
    try {
      const url = `${BASE_PATH}/products?url=${path}`;
      const response = await fetch(url);
      const result = await response.json();
      return result[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  export async function searchProductsApi(title) {
    try {
      const url = `${BASE_PATH}/products?_q=${title}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }