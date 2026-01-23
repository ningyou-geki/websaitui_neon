import Image from "next/image";
import React from "react";

export default function Footer() {
    return (
        <footer className="relative pt-20 pb-10 overflow-hidden">
            {/* Footer Aura */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-purple-900/40 to-transparent pointer-events-none -z-10"></div>
            <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>

            {/* Bottom Banner Section */}
            <div className="relative w-full h-64 overflow-hidden mb-10 group">
                {/* Gradient Overlay / Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Neon box container representation */}
                <div className="absolute inset-4 border border-[var(--neon-purple)] rounded-lg opacity-30 z-20 shadow-[inset_0_0_20px_rgba(188,19,254,0.1)]"></div>

                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <h2 className="text-4xl text-white font-bold tracking-[0.2em] neon-text-purple opacity-90">
                        MIDILAND
                    </h2>
                </div>

                {/* The floating circle button from the design */}
                <div className="absolute bottom-8 right-8 z-30">
                    <button className="bg-white/10 backdrop-blur-md rounded-full p-4 hover:bg-[var(--neon-purple)] hover:text-white transition-all border border-white/20 w-20 h-20 flex items-center justify-center group shadow-[0_0_15px_rgba(188,19,254,0.3)]">
                        {/* Search icon or refresh icon */}
                        <span className="block w-8 h-8 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                    </button>
                </div>

                {/* Label for floating button */}
                <div className="absolute bottom-32 right-6 z-30 text-[10px] text-purple-300 tracking-widest font-bold">
                    POINT OF MIDILAND
                </div>
            </div>

            <div className="border-t border-purple-500/20 py-8 text-center text-xs text-gray-400">
                <p>&copy; MIDILAND All Rights Reserved.</p>
            </div>
        </footer>
    );
}
