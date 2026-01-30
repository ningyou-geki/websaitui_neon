import React from "react";

interface ProfileHeroProps {
    name: string;
    university: string;
    description: string;
    onUpdateName: (value: string) => void;
    onUpdateUniversity: (value: string) => void;
    onUpdateDescription: (value: string) => void;
}

export default function ProfileHero({
    name,
    university,
    description,
    onUpdateName,
    onUpdateUniversity,
    onUpdateDescription
}: ProfileHeroProps) {
    return (
        <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
            {/* Dynamic Background Elements - Reinforced for Depth */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[80px] -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>

            <div className="mb-6 flex justify-center">
                <input
                    value={university}
                    onChange={(e) => onUpdateUniversity(e.target.value)}
                    className="inline-block py-1.5 px-4 rounded-full bg-cyan-950/50 border border-cyan-400/50 text-cyan-100 font-bold backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.3)] text-center w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
            </div>

            <div className="flex justify-center mb-8">
                <input
                    value={name}
                    onChange={(e) => onUpdateName(e.target.value)}
                    className="text-5xl md:text-7xl font-bold text-white bg-transparent text-center w-full max-w-4xl tracking-tight neon-text-blue focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all uppercase"
                />
            </div>

            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mb-10 rounded-full shadow-[0_0_15px_var(--neon-blue)]"></div>

            <div className="flex justify-center">
                <textarea
                    value={description}
                    onChange={(e) => onUpdateDescription(e.target.value)}
                    rows={2}
                    className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md bg-transparent text-center w-full focus:outline-none focus:bg-white/5 rounded p-2 transition-colors resize-none"
                />
            </div>

            {/* Neon Decorative Elements - Side Glows */}
            <div className="absolute top-1/2 left-0 w-[2px] h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-80 blur-[1px] hidden md:block shadow-[0_0_10px_var(--neon-blue)]"></div>
            <div className="absolute top-1/3 right-0 w-[2px] h-32 bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-80 blur-[1px] hidden md:block shadow-[0_0_10px_var(--neon-blue)]"></div>
        </section>
    );
}
