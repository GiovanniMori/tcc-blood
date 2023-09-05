import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cookies } from "next/headers"

export async function RecentSales() {
  // const { data: recent_orders } = await supabaseServer
  //   .from("Order")
  //   .select("*, user_uid(name, email)")
  //   .order("created_at", { ascending: false })
  //   .limit(5)(recent_orders)
  return <></>
  // if (recent_orders !== null) {
  //   return (
  //     <ul className="space-y-8">
  //       {recent_orders?.map((order) => (
  //         <li className="flex items-center" key={order.uuid}>
  //           <Avatar className="h-9 w-9">
  //             <AvatarImage src="/avatars/01.png" alt="Avatar" />
  //             <AvatarFallback>{`${
  //               order.user_uid.name && order.user_uid.name.charAt(0)
  //             }${
  //               order.user_uid.name && order.user_uid.name.split(" ")
  //             }`}</AvatarFallback>
  //           </Avatar>
  //           <div className="ml-4 space-y-1">
  //             <p className="text-sm font-medium leading-none">
  //               {order.user_uid.name}
  //             </p>
  //             <p className="text-sm text-muted-foreground">
  //               {order.user_uid.email}
  //             </p>
  //           </div>
  //           <div className="ml-auto font-medium">
  //             +
  //             {order.price.toLocaleString("pt-BR", {
  //               style: "currency",
  //               currency: "BRL",
  //             })}
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   )
  // }
}
