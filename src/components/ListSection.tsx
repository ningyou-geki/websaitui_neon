import React from "react";

interface ListSectionProps {
    title: string;
    subtitle: string;
    items: string[];
    color?: "blue" | "purple";
}

export default function ListSection({ title, subtitle, items, color = "blue" }: ListSectionProps) {
    const borderColor = color === "blue" ? "border-[var(--neon-blue)]" : "border-[var(--neon-purple)]";
    const shadowClass = color === "blue" ? "neon-box-blue" : "neon-box-purple";
    const titleColor = color === "blue" ? "text-[var(--neon-blue)]" : "text-[var(--neon-purple)]";
    const markerColor = color === "blue" ? "bg-[var(--neon-blue)]" : "bg-[var(--neon-purple)]";
    const textShadowClass = color === "blue" ? "neon-text-blue" : "neon-text-purple";

    return (
        <section className="py-20 px-4 relative">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-2 uppercase tracking-widest ${titleColor} ${textShadowClass}`}>
                        {title}
                    </h2>
                    <p className="text-gray-400 text-sm tracking-wider font-bold">{subtitle}</p>
                </div>

                <div className={`p-8 md:p-12 rounded-lg ${shadowClass} relative glass-card`}>
                    {/* Corner accents */}
                    <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${borderColor}`}></div>
                    <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${borderColor}`}></div>

                    {/* Radial Aura for Depth */}
                    <div className={`absolute inset-0 bg-${color}-500/5 blur-3xl rounded-full pointer-events-none -z-10`}></div>

                    <ul className="space-y-4 relative z-10">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-start gap-4 group">
                                <span className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${markerColor} shadow-[0_0_10px_currentColor] group-hover:scale-150 transition-transform duration-300`}></span>
                                <span className="text-white font-bold text-lg group-hover:text-[var(--neon-blue)] transition-colors tracking-wide">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
