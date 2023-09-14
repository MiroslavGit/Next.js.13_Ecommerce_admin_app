"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

import { Product } from "@/interfaces/interfaces";

export default function ProductForm(props: Product) {
  const router = useRouter();

  const [formData, setFormData] = useState<Product>({
    title: props.title || "",
    description: props.description || "",
    price: props.price || 0,
  });

  async function saveProduct(e: any) {
    e.preventDefault();

    if (props._id) {
      await axios.put(`/api/products/${props._id}`, formData).then((res) => {
        if (res.status === 200) {
          router.push("/products");
        }
      });
    } else {
      await axios.post("/api/products", formData).then((res) => {
        if (res.status === 200) {
          router.push("/products");
        }
      });
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label className="label">Product Name</label>
      <input type="text" placeholder="product name" onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} />

      <label className="label">Description</label>
      <textarea placeholder="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description} />

      <label className="label">Price (in €)</label>
      <input type="number" placeholder="price" onChange={(e) => setFormData({ ...formData, price: isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) })} value={formData.price} />

      <button type="submit" className="btn-primary">Save</button>
    </form>
  )
}