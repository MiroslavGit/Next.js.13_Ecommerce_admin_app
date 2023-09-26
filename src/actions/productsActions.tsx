import axios from "axios";
import { useAppDispatch } from "@/reducers/hooks";
import { Product } from "@/interfaces/interfaces";

import { setLoading } from "@/reducers/slices/loadingSlice";

/* All products */
export async function getProducts(dispatch: ReturnType<typeof useAppDispatch>) {
  try {
    dispatch(setLoading(true));

    const response = await axios.get('/api/products');

    if (response.status === 200) {
      dispatch(setLoading(false));
      return response.data;
    }

    throw new Error('Unexpected response status: ' + response.status);
  } catch (error: any) {
    dispatch(setLoading(false));

    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + error.message);
    }

    throw new Error('Unknown error occurred: ' + error);
  }
}

/* One product */
export async function getProduct(dispatch: ReturnType<typeof useAppDispatch>, id: string | undefined) {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/api/products/${id}`);

    if (response.status === 200) {
      dispatch(setLoading(false));
      return response.data;
    }

    throw new Error('Unexpected response status: ' + response.status);
  } catch (error: any) {
    dispatch(setLoading(false));

    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + error.message);
    }

    throw new Error('Unknown error occurred: ' + error);
  }
}

export async function editProduct(dispatch: ReturnType<typeof useAppDispatch>, id: string | undefined, formData: Product) {
  try {
    dispatch(setLoading(true));

    const response = await axios.put(`/api/products/${id}`, formData);

    if (response.status === 200) {
      dispatch(setLoading(false));
      return response.data;
    }

    throw new Error('Unexpected response status: ' + response.status);
  } catch (error: any) {
    dispatch(setLoading(false));

    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + error.message);
    }

    throw new Error('Unknown error occurred: ' + error);
  }
}

export async function deleteProduct(dispatch: ReturnType<typeof useAppDispatch>, id: string | undefined) {
  try {
    dispatch(setLoading(true));

    const response = await axios.delete(`/api/products/${id}`);

    if (response.status === 200) {
      dispatch(setLoading(false));
      return response.data;
    }

    throw new Error('Unexpected response status: ' + response.status);
  } catch (error: any) {
    dispatch(setLoading(false));

    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + error.message);
    }

    throw new Error('Unknown error occurred: ' + error);
  }
}

export async function addProduct(dispatch: ReturnType<typeof useAppDispatch>, formData: Product) {
  try {
    dispatch(setLoading(true));

    const response = await axios.post('/api/products', formData);

    if (response.status === 200) {
      dispatch(setLoading(false));
      return response.data;
    }

    throw new Error('Unexpected response status: ' + response.status);
  } catch (error: any) {
    dispatch(setLoading(false));

    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + error.message);
    }

    throw new Error('Unknown error occurred: ' + error);
  }
}

/* All product images */
export async function getImages(dispatch: ReturnType<typeof useAppDispatch>, id: string | undefined) {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/api/products/${id}/getImages`);

    if (response.status === 200) {
      dispatch(setLoading(false));
      return response.data;
    }

    throw new Error('Unexpected response status: ' + response.status);
  } catch (error: any) {
    dispatch(setLoading(false));

    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + error.message);
    }

    throw new Error('Unknown error occurred: ' + error);
  }
}

export async function uploadImages(dispatch: ReturnType<typeof useAppDispatch>, id: string | undefined, files: any) {
  try {
    dispatch(setLoading(true));

    const data = new FormData();
    files.forEach((file: any) => data.append("images", file));

    const response = await axios.post(`/api/products/${id}/images`, data, {
      headers: { "content-type": "multipart/form-data" }
    });

    if (response.status === 200) {
      dispatch(setLoading(false));
      return response.data;
    }

    throw new Error('Unexpected response status: ' + response.status);
  } catch (error: any) {
    dispatch(setLoading(false));

    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + error.message);
    }

    throw new Error('Unknown error occurred: ' + error);
  }
}

/* One product image */
export async function deleteImage(dispatch: ReturnType<typeof useAppDispatch>, id: string | undefined, image: string) {
  try {
    dispatch(setLoading(true));

    const response = await axios.delete(`/api/products/${id}/images`, image);

    if (response.status === 200) {
      dispatch(setLoading(false));
      return response.data;
    }

    throw new Error('Unexpected response status: ' + response.status);
  } catch (error: any) {
    dispatch(setLoading(false));

    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + error.message);
    }

    throw new Error('Unknown error occurred: ' + error);
  }
}