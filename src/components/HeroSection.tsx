import React from "react";

export default function HeroSection() {
    return (
        <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-widest uppercase">
                New Release
            </h2>
            <div className="w-10 h-1 bg-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-400 mb-16 text-sm tracking-wider">新着作品</p>

            {/* Neon Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Card 1 - Pink/Blue Gradient */}
                <HeroCard
                    color="pink"
                    title="ページタイトルがここに入ります"
                    author="作家名入る"
                    desc="ここに作品説明が入ります。ここに作品説明が入ります。ここに作品説明が入ります。ここに作品説明が入ります。"
                />
                {/* Card 2 - Blue/Purple Gradient */}
                <HeroCard
                    color="blue"
                    title="ページタイトルがここに入ります"
                    author="作家名入る"
                    desc="ここに作品説明が入ります。ここに作品説明が入ります。ここに作品説明が入ります。ここに作品説明が入ります。"
                />
                {/* Card 3 - Pink variation */}
                <HeroCard
                    color="pink"
                    title="ページタイトルがここに入ります"
                    author="作家名入る"
                    desc="ここに作品説明が入ります。ここに作品説明が入ります。ここに作品説明が入ります。ここに作品説明が入ります。"
                />
            </div>
        </section>
    );
}

function HeroCard({ color, title, author, desc }: { color: 'pink' | 'blue', title: string, author: string, desc: string }) {
    const borderColor = color === 'pink' ? 'border-[var(--neon-pink)]' : 'border-[var(--neon-blue)]';
    const shadowClass = color === 'pink' ? 'neon-box-pink' : 'neon-box-blue';

    return (
        <div className="flex flex-col text-left group cursor-pointer">
            {/* Neon Box Placeholder */}
            <div className={`aspect-[4/3] w-full bg-black mb-6 relative flex items-center justify-center rounded-sm ${shadowClass} transition-transform duration-300 group-hover:scale-[1.02]`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                {/* Neon corner accents specific to the image design could go here, but using basic border for now as requested by 'neon-box' class */}
                <span className="text-gray-500 font-medium tracking-widest text-sm z-10">MIDILAND</span>

                {/* Decorative corner brackets often seen in cyber designs */}
                <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${borderColor}`}></div>
                <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${borderColor}`}></div>
            </div>

            <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
            <div className="inline-block bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full w-max mb-3">
                {author}
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
