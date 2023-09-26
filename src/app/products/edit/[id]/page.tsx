"use client"

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { useAppDispatch } from '@/reducers/hooks'

import { Product } from "@/interfaces/interfaces";
import * as actions from "@/actions/productsActions";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import Loading from "@/components/Loading";

export default function EditProduct() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [product, setProduct] = useState<Product>();

  function getProduct() {
    actions.getProduct(dispatch, id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error.message);
      });
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <Layout>
      <h1 className="h1">Edit Product</h1>
      {product ? <ProductForm {...product} /> : <Loading />}
    </Layout>
  )
}