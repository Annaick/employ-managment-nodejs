import { ThemeToggle } from "./ui/theme-toggle";

export default function Header() {
    return(
        <header className="w-full grid grid-cols-1 md:grid-cols-[1fr_400px] gap-[32px]">
            <div className="flex justify-between items-center">
                <h1 className="font-extrabold text-2xl underline-offset-4">Projet NodeJS</h1>
                <ThemeToggle />
            </div>
        </header>
    )
}