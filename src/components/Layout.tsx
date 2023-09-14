"use client"

import { useSession, signIn, signOut } from "next-auth/react"

import Nav from "@/components/Nav"

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => { signIn("google") }} className="bg-white p-2 px-4 rounded">Login with Google</button>
        </div>
      </div>
    )
  }
  else if (session.user) {
    return (
      <div className="bg-blue-900 min-h-screen flex">
        <Nav />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
      </div>
    )
  } else {
    return (
      <div className="bg-red-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          {<p>Unexpected session state</p>}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    )
  }
}
