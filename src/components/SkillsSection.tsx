import React from "react";
import { Plus, X } from "lucide-react";

interface SkillsSectionProps {
    title: string;
    subtitle: string;
    skills: string[];
    onUpdateSkills: (skills: string[]) => void;
}

export default function SkillsSection({ title, subtitle, skills, onUpdateSkills }: SkillsSectionProps) {
    const handleUpdate = (index: number, value: string) => {
        const newSkills = [...skills];
        newSkills[index] = value;
        onUpdateSkills(newSkills);
    };

    const handleDelete = (index: number) => {
        const newSkills = skills.filter((_, i) => i !== index);
        onUpdateSkills(newSkills);
    };

    const handleAdd = () => {
        onUpdateSkills([...skills, "New Skill"]);
    };

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
                            className="group relative px-6 py-3 rounded-sm overflow-hidden border border-[var(--neon-purple)] glass-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_var(--neon-purple)] flex items-center gap-2"
                        >
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[var(--neon-purple)] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>

                            <input
                                value={skill}
                                onChange={(e) => handleUpdate(index, e.target.value)}
                                className="relative z-10 bg-transparent text-white font-bold tracking-wide text-shadow-sm text-center min-w-[3rem] focus:outline-none focus:border-b border-white"
                                style={{ width: `${Math.max(skill.length, 3)}ch` }}
                            />

                            <button
                                onClick={() => handleDelete(index)}
                                className="relative z-10 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={handleAdd}
                        className="px-4 py-3 rounded-sm border border-dashed border-gray-600 hover:border-white hover:text-white text-gray-400 transition-all flex items-center gap-2 bg-transparent/50"
                    >
                        <Plus size={16} /> Add Skill
                    </button>
                </div>
            </div>
        </section>
    );
}
