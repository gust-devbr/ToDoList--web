import { getToken } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await getToken()

  if (!token) {
    redirect("/screens/login")
  }

  redirect("/screens/home")
}
