import { redirect } from "next/navigation";

/* /login — merkbarer Alias auf das Studio (Text-CMS mit Passwortschutz).
   Dort ist jede Headline und jeder Text der Seite ohne Deploy editierbar. */
export default function LoginPage() {
  redirect("/studio");
}
