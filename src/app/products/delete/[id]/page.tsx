"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

import { useAppSelector, useAppDispatch } from '@/reducers/hooks'
import { setLoading } from "@/reducers/slices/loadingSlice";

import { Product } from "@/interfaces/interfaces";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";


export default function DeleteProduct() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [productInfo, setProductInfo] = useState<Product>();

  function goBack() {
    router.push("/products");
  }

  useEffect(() => {
    dispatch(setLoading(true));

    axios.get(`/api/products/${id}`).then((res) => {
      if (res.status === 200) {
        setProductInfo(res.data.product);
        dispatch(setLoading(false));
      }
    });

  }, [id])

  async function deleteProduct() {
    dispatch(setLoading(true));

    await axios.delete(`/api/products/${id}`).then((res) => {
      if (res.status === 200) {
        goBack();
      }
    });

    dispatch(setLoading(false));
  }

  return (
    <>
      <Layout>
        <h1 className="h1 text-center py-2"> Do you really want to delete product <b>{productInfo?.title}</b> ? </h1>
        <div className="flex gap-2 justify-center">
          <button onClick={deleteProduct} className="btn-red">Yes</button>
          <button onClick={goBack} className="btn-default">No</button>
        </div>
      </Layout>

      <Loading />
    </>
  )
}