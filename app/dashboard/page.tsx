// 'use client'
import React from "react"
import directus from "@/lib/directus"
import { readMe, withToken } from "@directus/sdk"
import { useSession, getSession } from "next-auth/react"
import { getCurrentUser } from "../api/auth/[...nextauth]/options"

const Dashboard = async () => {
  const session = await getCurrentUser()
  console.log("---session:", session)

  const result = await directus.request(
    withToken(
      session.user.accessToken as string,
      readMe({
        fields: ["id", "first_name", "last_name", "email"],
      })
    )
  )
  console.log("---readme result:", result)

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}

export default Dashboard
