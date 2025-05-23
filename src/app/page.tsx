'use client'
import Footer from "@/components/footer";
import Header from "@/components/header";
import Main from "@/components/main";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  useEffect(()=>{
    toast.message("Bienvenue sur l'application!")
  }, [])
  return (
    <div className="grid grid-rows-[50px_1fr_20px] justify-items-center max-h-screen p-8 pb-20 gap-4 sm:p-4 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
