import React from "react";
import Link from "next/link";

export default function PopularSection() {
    return (
        <section className="bg-white px-4 py-20 text-black dark:bg-white relative">
            {/* Note: The design has a white background for the popular section in the bottom half of the image? 
            Looking at the image, the Popular section text is dark on a light background?
            Wait, let me re-examine the image.
            The top half (New Release) is black with neon.
            The bottom half (Popular) has "POPULAR / 人気作品" text in black.
            The background seems to be white or very light grey.
            So I need to switch background color for this section. 
        */}

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Column 1 */}
                    <div>
                        <div className="flex items-baseline gap-4 mb-8">
                            <h2 className="text-2xl font-bold tracking-wide">POPULAR</h2>
                            <span className="text-gray-500 text-sm">/ 人気作品</span>
                        </div>

                        <div className="flex flex-col gap-6">
                            <PopularCard title="作品タイトルが入ります" price="¥0,000" date="2022年6月14日" />
                            <PopularCard title="作品タイトルが入ります" price="¥0,000" date="2022年6月14日" />
                            <PopularCard title="作品タイトルが入ります" price="¥0,000" date="2022年6月14日" />
                            <PopularCard title="作品タイトルが入ります" price="¥0,000" date="2022年6月14日" />
                        </div>

                        <div className="mt-8 text-right">
                            <Link href="#" className="text-sm font-medium hover:underline flex items-center justify-end gap-1">
                                人気作品一覧へ <span className="text-xs">＞</span>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2 (Identical for demo) */}
                    <div>
                        <div className="flex items-baseline gap-4 mb-8">
                            <h2 className="text-2xl font-bold tracking-wide">POPULAR</h2>
                            <span className="text-gray-500 text-sm">/ 人気作品</span>
                        </div>

                        <div className="flex flex-col gap-6">
                            <PopularCard title="作品タイトルが入ります" price="¥0,000" date="2022年6月14日" />
                            <PopularCard title="作品タイトルが入ります" price="¥0,000" date="2022年6月14日" />
                            <PopularCard title="作品タイトルが入ります" price="¥0,000" date="2022年6月14日" />
                            <PopularCard title="作品タイトルが入ります" price="¥0,000" date="2022年6月14日" />
                        </div>

                        <div className="mt-8 text-right">
                            <Link href="#" className="text-sm font-medium hover:underline flex items-center justify-end gap-1">
                                今週のクリエイター一覧へ <span className="text-xs">＞</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PopularCard({ title, price, date }: { title: string, price: string, date: string }) {
    return (
        <div className="flex gap-4 p-2 hover:bg-gray-50 transition-colors rounded-lg group cursor-pointer border-b border-gray-100 last:border-0 pb-6 last:pb-2">
            {/* Thumbnail */}
            <div className="w-32 h-20 bg-black flex-shrink-0 relative overflow-hidden rounded-sm border border-[var(--neon-blue)] box-shadow-[0_0_5px_var(--neon-blue)]">
                {/* Mini neon effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] text-gray-700 font-bold opacity-50">MIDILAND</span>
                </div>
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[var(--neon-blue)] opacity-70"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[var(--neon-blue)] opacity-70"></div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow">
                <div>
                    <span className="inline-block bg-[#00ffff] text-black text-[10px] font-bold px-2 py-[2px] rounded-sm mb-1">
                        作家名入る
                    </span>
                    <h3 className="font-bold text-base leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <span className="font-bold text-sm">{price}</span>
                    <span className="text-xs text-gray-400">{date}</span>
                </div>
            </div>
        </div>
    );
}
