"use client"

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAppDispatch } from '@/reducers/hooks'

import { Product } from "@/interfaces/interfaces";
import * as actions from "@/actions/actions";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

export default function DeleteProduct() {
  const router = useRouter();
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

  function deleteProduct() {
    actions.deleteProduct(dispatch, id)
      .then((res) => {
        setProduct(res.data);
        router.push("/products");
      })
      .catch((error) => {
        console.error('Error deleting product:', error.message);
      });
  }

  useEffect(() => {
    getProduct();
  }, [id])

  return (
    <>
      <Layout>
        <h1 className="h1 text-center py-2"> Do you really want to delete product <b>{product?.title}</b> ? </h1>
        <div className="flex gap-2 justify-center">
          <button onClick={deleteProduct} className="btn-red">Yes</button>
          <button onClick={() => router.push("/products")} className="btn-default">No</button>
        </div>
      </Layout>

      <Loading />
    </>
  )
}