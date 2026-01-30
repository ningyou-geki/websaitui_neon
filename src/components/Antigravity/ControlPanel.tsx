"use client";

import React, { useRef } from "react";
import { Download, Upload, Rocket, AlertTriangle, CloudUpload, Check } from "lucide-react";
import { PortfolioData } from "@/types/portfolio";
import { motion, AnimatePresence } from "framer-motion";

interface ControlPanelProps {
    onSave?: () => void; // Keeping for backward compatibility or explicit save if needed, though auto-save is implemented
    data: PortfolioData;
    isAntigravity: boolean;
    onToggleAntigravity: (val: boolean) => void;
    onExport: () => void;
    onImport: (file: File) => void;
    onSaveToCloud?: () => void;
    isSaving?: boolean;
    saveSuccess?: boolean;
}

export default function ControlPanel({
    data,
    isAntigravity,
    onToggleAntigravity,
    onExport,
    onImport,
    onSaveToCloud,
    isSaving,
    saveSuccess
}: ControlPanelProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImport(e.target.files[0]);
        }
        // Reset inputs
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex gap-3 flex-col sm:flex-row items-end sm:items-center">

            {/* Antigravity Indicator/Toggle */}
            <button
                onClick={() => onToggleAntigravity(!isAntigravity)}
                className={`p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md border ${isAntigravity
                    ? "bg-purple-600/80 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white"
                    }`}
                title="Toggle Antigravity (Press ESC to stop)"
            >
                <Rocket className={`w-5 h-5 ${isAntigravity ? "animate-pulse" : ""}`} />
            </button>

            {/* Main Controls - JSON I/O & Cloud */}
            <div className="flex bg-slate-900/90 border border-slate-700 rounded-xl p-2 shadow-2xl backdrop-blur-md gap-2">

                {onSaveToCloud && (
                    <motion.button
                        layout
                        onClick={onSaveToCloud}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm relative overflow-hidden ${saveSuccess
                                ? "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                                : "bg-blue-600 hover:bg-blue-500 text-white"
                            }`}
                        title="Save to Cloud"
                        animate={saveSuccess ? { scale: [1, 1.1, 1] } : {}}
                    >
                        <AnimatePresence mode="wait">
                            {saveSuccess ? (
                                <motion.span
                                    key="success"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    Success!
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="normal"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    {isSaving ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <CloudUpload className="w-4 h-4" />
                                    )}
                                    {isSaving ? "Saving..." : "Cloud Save"}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                )}

                <div className="w-[1px] bg-slate-700 mx-1" />

                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors text-sm"
                    title="Download JSON"
                >
                    <Download className="w-4 h-4" />
                    Export
                </button>

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors text-sm"
                    title="Upload JSON"
                >
                    <Upload className="w-4 h-4" />
                    Import
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".json"
                />
            </div>

            {isAntigravity && (
                <div className="fixed top-6 right-6 bg-red-500/90 text-white px-4 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-bounce flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> WARNING: ZERO GRAVITY DETECTED
                </div>
            )}
        </div>
    );
}
