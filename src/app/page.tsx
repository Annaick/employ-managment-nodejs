import Footer from "@/components/footer";
import Header from "@/components/header";
import Main from "@/components/main";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[50px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Main />
      <Footer/>
    </div>
  );
}
