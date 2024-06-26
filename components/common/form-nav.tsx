import { createClient } from "@/utils/supabase/server";
import AuthButton from "../AuthButton";
import MainLogo from "../MainLogo";
import Link from "next/link";

export default async function FormNav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <MainLogo />
        <div className="flex gap-4">
          <Link
            href={"/forms/"}
            className="text-foreground/60 hover:text-foreground/100"
          >
            Forms
          </Link>
          <Link
            href={"/forms/analytics"}
            className="text-foreground/60 hover:text-foreground/100"
          >
            Analytics
          </Link>
        </div>
        {user && <AuthButton />}
      </div>
    </nav>
  );
}
