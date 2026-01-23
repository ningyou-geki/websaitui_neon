import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="text-xl font-bold tracking-widest text-white">
                    MIDILAND
                </div>
                <nav className="flex gap-6 text-sm font-medium text-gray-300">
                    <Link href="#" className="hover:text-white transition-colors">TOP</Link>
                    <Link href="#" className="hover:text-white transition-colors">NEW RELEASE</Link>
                    <Link href="#" className="hover:text-white transition-colors">POPULAR</Link>
                    <Link href="#" className="hover:text-white transition-colors">CREATORS</Link>
                </nav>
            </div>
        </header>
    );
}
