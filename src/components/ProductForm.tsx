"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

import { Product } from "@/interfaces/interfaces";

export default function ProductForm(props: Product) {
  const router = useRouter();

  const [formData, setFormData] = useState<Product>({
    _id: props._id || undefined,
    title: props.title || "",
    description: props.description || "",
    price: props.price || 0,
    images: props.images || []
  });

  async function saveProduct(e: any) {
    e.preventDefault();

    if (formData._id) {
      await axios.put(`/api/products/${formData._id}`, formData).then((res) => {
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

  async function getImages() {
    try {
      axios
        .get(`/api/products/${formData._id}/uploadImages`, {
          responseType: 'arraybuffer'
        })
        .then((res) => {
          if (res.status === 200) {
            const uint8Array = new Uint8Array(res.data);

            // Convert the Uint8Array to a binary string
            const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');

            // Convert the binary string to base64
            const base64String = btoa(binaryString);

            setFormData({ ...formData, images: [...(formData.images || []), base64String] });
          }
        });
    }
    catch (error) {
      console.error("Error getting images:", error);
    }
  }

  async function uploadImages(e: any) {
    const files = Array.from(e.target?.files);

    if (files?.length > 0) {
      const data = new FormData();
      files.forEach((file: any) => data.append("images", file));
      //console.log("FormData object:", data.getAll("images")); // Log the FormData object

      try {
        await axios
          .post(`/api/products/${formData._id}/uploadImages`, data, {
            headers: { "content-type": "multipart/form-data" }
          })
          .then((res) => {
            if (res.status === 200) {
              getImages();
            }
          });
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label className="label">Product Name</label>
      <input type="text" placeholder="product name" onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} className="basicInput" />

      <label className="label">Description</label>
      <textarea placeholder="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description} className="basicTextarea" />

      <label className="label">Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {formData.images?.map(image => {
          return (
            <div key={image} className="h-24">
              <img src={`data:image/jpeg;base64,${image}`} alt={formData.title} className="img" />
            </div>
          )
        })}

        <label className="w-24 h-24 cursor-pointer flex flex-col items-center justify-center text-gray-500 text-sm rounded-lg bg-gray-200 duration-300 hover:bg-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>
            Upload
          </div>
          <input type="file" multiple onChange={uploadImages} className="hidden" />
        </label>

        {!formData.images?.length && <div>No photos in this product</div>}
      </div>


      <label className="label">Price (in €)</label>
      <input type="number" placeholder="price" onChange={(e) => setFormData({ ...formData, price: isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) })} value={formData.price} className="basicInput" />

      <button type="submit" className="btn-primary">{formData._id ? "Save" : "Create"}</button>
    </form>
  )
}