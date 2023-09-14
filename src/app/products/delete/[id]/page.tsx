"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Product } from "@/interfaces/interfaces";
import axios from "axios";

import Layout from "@/components/Layout";

export default function DeleteProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [productInfo, setProductInfo] = useState<Product>();

  function goBack() {
    router.push("/products");
  }

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      if (res.status === 200) {
        setProductInfo(res.data.product);
      }
    });
  }, [id])

  return (
    <Layout>
      <h1 className="h1 text-center py-2"> Do you really want to delete product <b>{productInfo?.title}</b> ? </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red">Yes</button>
        <button onClick={goBack} className="btn-default">No</button>
      </div>
    </Layout>
  )
}