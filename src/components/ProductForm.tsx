"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { ReactSortable } from "react-sortablejs";

import { useAppSelector, useAppDispatch } from '@/reducers/hooks'
import { setLoading } from '@/reducers/slices/loadingSlice';

import { Product } from "@/interfaces/interfaces";
import * as actions from "@/actions/actions";

import Loading from "@/components/Loading";
import CachedIcon from '@mui/icons-material/Cached';

export default function ProductForm(props: Product) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Product>({
    _id: props._id || undefined,
    title: props.title || "",
    description: props.description || "",
    price: props.price || 0,
    images: props.images || []
  });

  function getProduct() {
    actions.getProduct(dispatch, formData._id)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error.message);
      });
  }

  function editProduct(e: any) {
    e.preventDefault();

    if (formData._id) {
      actions.editProduct(dispatch, formData._id, formData)
        .then(() => {
          router.push("/products");
        })
        .catch((error) => {
          console.error('Error editing product:', error.message);
        });
    } else {
      actions.addProduct(dispatch, formData)
        .then(() => {
          router.push("/products");
        })
        .catch((error) => {
          console.error('Error adding product:', error.message);
        });
    }
  }

  function getImages() {
    actions.getImages(dispatch, formData._id)
      .then((res) => {
        setFormData({ ...formData, images: res });
      })
      .catch((error) => {
        console.error('Error getting images:', error.message);
      });
  }

  function uploadImages(e: any) {
    const files = Array.from(e.target?.files);

    actions.uploadImages(dispatch, formData._id, files)
      .then((res) => {
      })
      .catch((error) => {
        console.error('Error uploading images:', error.message);
      });
  }

  function updateImagesOrder(images: any) {
    setFormData(prevFormData => ({ ...prevFormData, images: images }));
  }

  async function deleteImage(image: string) {
    actions.deleteImage(dispatch, formData._id, image)
      .then((res) => {
      })
      .catch((error) => {
        console.error('Error uploading images:', error.message);
      });
  }

  return (
    <>
      {formData._id && <button onClick={() => { getProduct(), getImages() }} className="btn-primary"><CachedIcon /></button>}

      <form onSubmit={editProduct}>
        <label className="label">Product Name</label>
        <input type="text" placeholder="product name" onChange={(e) => setFormData({ ...formData, title: e.target.value })} value={formData.title} className="basicInput" />

        <label className="label">Description</label>
        <textarea placeholder="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} value={formData.description} className="basicTextarea" />

        <label className="label">Photos</label>
        <div className="mb-2 flex flex-wrap gap-2">
          <ReactSortable list={formData.images} setList={updateImagesOrder} className="flex flex-wrap gap-2">
            {formData.images?.map(image => {
              return (
                <div key={image} className="h-24 relative">
                  <img src={`data:image/jpeg;base64,${image}`} alt={formData.title} className="img" />
                  <svg onClick={() => deleteImage(image)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 absolute top-0 right-0 bg-white m-1 rounded-sm border-2 border-black hover:cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
              )
            })}
          </ReactSortable>

          <label className="w-24 h-24 cursor-pointer flex flex-col items-center justify-center text-gray-500 text-sm rounded-lg bg-gray-200 duration-300 hover:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <div>
              Upload
            </div>
            <input disabled={formData._id ? false : true} type="file" multiple onChange={uploadImages} className="hidden" />
          </label>

          {!formData.images?.length && <div>No photos in this product</div>}
        </div>


        <label className="label">Price (in €)</label>
        <input type="number" placeholder="price" onChange={(e) => setFormData({ ...formData, price: isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value) })} value={formData.price} className="basicInput" />

        <button type="submit" className="btn-primary">{formData._id ? "Save" : "Create"}</button>
      </form>

      <Loading />
    </>
  )
}