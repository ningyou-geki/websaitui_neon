import React from "react";
import { Plus, Trash2, Code, Lightbulb, TrendingUp } from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
    title: string;
    subtitle: string;
    projects: Project[];
    onUpdateProjects: (projects: Project[]) => void;
}

export default function ProjectsSection({ title, subtitle, projects, onUpdateProjects }: ProjectsSectionProps) {
    const safeProjects = projects || [];

    const handleUpdate = (index: number, field: keyof Project, value: string | string[]) => {
        const newProjects = [...safeProjects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        onUpdateProjects(newProjects);
    };

    const handleDelete = (index: number) => {
        if (confirm("このプロジェクトを削除しますか？")) {
            const newProjects = safeProjects.filter((_, i) => i !== index);
            onUpdateProjects(newProjects);
        }
    };

    const handleAdd = () => {
        onUpdateProjects([
            ...safeProjects,
            {
                title: "New Project",
                techStack: ["React", "TypeScript"],
                description: "プロジェクトの概要を入力してください。",
                background: "",
                challenge: ""
            }
        ]);
    };

    return (
        <section className="py-20 px-4 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-900/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 uppercase tracking-widest text-[var(--neon-blue)] neon-text-blue">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-sm tracking-wider font-bold">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {safeProjects.map((project, index) => (
                        <div key={index} className="relative p-6 md:p-8 rounded-lg neon-box-blue glass-card group transition-all duration-500">
                            {/* Decorative corners */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-blue)]"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--neon-blue)]"></div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-4 right-4 p-2 bg-red-900/20 text-red-500 rounded hover:bg-red-900/80 hover:text-white transition-all z-20 group-hover:opacity-100 opacity-50"
                                title="Delete Project"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Core Info */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs uppercase text-cyan-400 mb-2 font-bold tracking-wider">Project Title</label>
                                        <input
                                            value={project.title}
                                            onChange={(e) => handleUpdate(index, "title", e.target.value)}
                                            className="w-full bg-black/20 text-white font-bold text-2xl border border-white/10 rounded px-3 py-2 focus:border-cyan-400 focus:bg-black/40 focus:outline-none transition-all placeholder-white/20"
                                            placeholder="プロジェクト名"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase text-cyan-400 mb-2 font-bold tracking-wider flex items-center gap-2">
                                            <Code size={14} /> Tech Stack (comma separated)
                                        </label>
                                        <input
                                            value={project.techStack.join(", ")}
                                            onChange={(e) => handleUpdate(index, "techStack", e.target.value.split(",").map(s => s.trim()))}
                                            className="w-full bg-black/20 text-gray-300 text-sm border border-white/10 rounded px-3 py-2 focus:border-cyan-400 focus:bg-black/40 focus:outline-none transition-all placeholder-white/20"
                                            placeholder="React, Next.js, Firebase..."
                                        />
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {project.techStack.map((tech, i) => (
                                                tech && (
                                                    <span key={i} className="text-xs px-2 py-1 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-800 shadow-[0_0_5px_rgba(34,211,238,0.2)]">
                                                        {tech}
                                                    </span>
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase text-cyan-400 mb-2 font-bold tracking-wider">Overview / Description</label>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => handleUpdate(index, "description", e.target.value)}
                                            rows={6}
                                            className="w-full bg-black/20 text-gray-200 text-base resize-none border border-white/10 rounded px-3 py-2 focus:border-cyan-400 focus:bg-black/40 focus:outline-none transition-all leading-relaxed placeholder-white/20"
                                            placeholder="プロジェクトの概要や制作のきっかけ..."
                                        />
                                    </div>
                                </div>

                                {/* Right Column: Details (Background, Challenge) */}
                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500/50 to-transparent rounded-full"></div>
                                        <div className="pl-6">
                                            <label className="block text-xs uppercase text-yellow-400 mb-2 font-bold tracking-wider flex items-center gap-2">
                                                <Lightbulb size={14} /> Background / Context
                                            </label>
                                            <textarea
                                                value={project.background || ""}
                                                onChange={(e) => handleUpdate(index, "background", e.target.value)}
                                                rows={4}
                                                className="w-full bg-black/20 text-gray-300 text-sm resize-none border border-white/10 rounded px-3 py-2 focus:border-yellow-400 focus:bg-black/40 focus:outline-none transition-all leading-relaxed placeholder-white/20"
                                                placeholder="なぜこれを作ろうと思ったのか？背景や目的..."
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 to-transparent rounded-full"></div>
                                        <div className="pl-6">
                                            <label className="block text-xs uppercase text-purple-400 mb-2 font-bold tracking-wider flex items-center gap-2">
                                                <TrendingUp size={14} /> Challenge / Solution
                                            </label>
                                            <textarea
                                                value={project.challenge || ""}
                                                onChange={(e) => handleUpdate(index, "challenge", e.target.value)}
                                                rows={4}
                                                className="w-full bg-black/20 text-gray-300 text-sm resize-none border border-white/10 rounded px-3 py-2 focus:border-purple-400 focus:bg-black/40 focus:outline-none transition-all leading-relaxed placeholder-white/20"
                                                placeholder="技術的に苦労した点、工夫した点、解決策..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleAdd}
                        className="flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed border-cyan-900/50 hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all group min-h-[150px]"
                    >
                        <Plus className="w-10 h-10 text-cyan-900 group-hover:text-cyan-400 transition-colors mb-2" />
                        <span className="text-cyan-800 group-hover:text-cyan-300 font-bold tracking-widest uppercase text-sm">Add New Project</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
