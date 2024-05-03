'use client'
import React from "react"
import { signIn } from "next-auth/react"

const OAuth = () => {
  return (
    <div className="flex gap-4">
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  )
}

export default OAuth
