"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/interfaces/interfaces";

export default function EditProduct() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [productInfo, setProductInfo] = useState<Product>();

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      if (res.status === 200) {
        setProductInfo(res.data.product)
      }
    });
  }, [id]);

  return (
    <Layout>
      <h1 className="h1">Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  )
}