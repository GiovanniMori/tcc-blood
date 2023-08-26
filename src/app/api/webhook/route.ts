import type { WebhookEvent } from "@clerk/nextjs/server"
import { Webhook } from "svix"
import { headers } from "next/headers"
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()
const webhookSecret: string = process.env.WEBHOOK_SECRET || ""

export async function POST(req: Request) {
  const payload = await req.json()
  const payloadString = JSON.stringify(payload)
  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixIdTimeStamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    return new Response("Error occured", {
      status: 400,
    })
  }
  // Create an object of the headers
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  }
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent
  } catch (_) {
    console.log("error")
    return new Response("Error occured", {
      status: 400,
    })
  }
  const { id, object } = evt.data

  // Handle the webhook
  const eventType = evt.type
  if (eventType === "user.created") {
    console.log(evt.data)
    // await prisma.user.create({
    //   data: {
    //     name: evt.data.first_name,
    //     id: evt.data.id,
    //     email: evt.data.email_addresses[0].email_address,
    //   },
    // })
    console.log(`User ${id} was ${eventType}`)
  }
  return new Response("", {
    status: 201,
  })
}
