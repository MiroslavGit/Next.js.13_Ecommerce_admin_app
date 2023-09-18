"use client"

import { useAppDispatch, useAppSelector } from '@/reducers/hooks';

export default function Loader() {
  const isLoading = useAppSelector((state) => state.loadingSlice.isLoading);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-400 opacity-40">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-950"></div>
        </div>
      )}

    </>
  )
}
