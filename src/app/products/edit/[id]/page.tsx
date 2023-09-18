"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

import { useAppSelector, useAppDispatch } from '@/reducers/hooks'
import { setLoading } from "@/reducers/slices/loadingSlice";

import { Product } from "@/interfaces/interfaces";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import Loading from "@/components/Loading";

export default function EditProduct() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [productInfo, setProductInfo] = useState<Product>();

  useEffect(() => {
    dispatch(setLoading(true));

    axios.get(`/api/products/${id}`).then((res) => {
      if (res.status === 200) {
        setProductInfo(res.data.product);
        dispatch(setLoading(false));
      }
    });

  }, [id]);

  return (
    <Layout>
      <h1 className="h1">Edit Product</h1>
      {productInfo ? <ProductForm {...productInfo} /> : <Loading />}
    </Layout>
  )
}