import { redirect } from "next/navigation";

export default function AuthRedirectPage() {
  redirect("/public/auth");
}
