import React from "react";

interface SkillsSectionProps {
    title: string;
    subtitle: string;
    skills: string[];
}

export default function SkillsSection({ title, subtitle, skills }: SkillsSectionProps) {
    return (
        <section className="py-20 px-4 relative">
            {/* Background Aura for Skills (Purple/Magenta) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-900/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 uppercase tracking-widest text-white neon-text-purple">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-sm tracking-wider font-bold">{subtitle}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="group relative px-6 py-3 rounded-sm overflow-hidden border border-[var(--neon-purple)] glass-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_var(--neon-purple)]"
                        >
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[var(--neon-purple)] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                            <span className="relative text-white font-bold tracking-wide z-10 text-shadow-sm">
                                {skill}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
