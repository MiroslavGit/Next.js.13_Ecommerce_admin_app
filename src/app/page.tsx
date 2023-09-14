"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Layout from "@/components/Layout"

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between items-center">
        <h2>
          Hello, <b> {session?.user?.name ?? "visitor"}</b>
        </h2>

        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image ?? "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=100"} alt={session?.user?.name ?? "visitor"} className="w-8 h-8" />
          <span className="py-1 px-2">
            {session?.user?.name ?? "visitor"}
          </span>
        </div>
      </div>
    </Layout>
  )
}
