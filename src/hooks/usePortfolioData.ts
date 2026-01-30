"use client";

import { useState, useEffect, useCallback } from "react";
import { PortfolioData, initialPortfolioData } from "@/types/portfolio";

const STORAGE_KEY = "antigravity_portfolio_data_v1";

export function usePortfolioData() {
    const [data, setData] = useState<PortfolioData>(initialPortfolioData);
    const [isAntigravity, setIsAntigravity] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount and merge with initialData
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge parsed data with initial data to ensure all fields exist
                // This handles migration from flat structure to nested profile structure and new fields
                const mergedData = {
                    ...initialPortfolioData,
                    ...parsed,
                    profile: {
                        ...initialPortfolioData.profile,
                        ...(parsed.profile || {})
                    },
                    // Ensure arrays are at least empty arrays if missing
                    projects: parsed.projects || initialPortfolioData.projects,
                    skills: parsed.skills || initialPortfolioData.skills,
                    qualifications: parsed.qualifications || initialPortfolioData.qualifications
                };
                setData(mergedData);
            }
        } catch (e) {
            console.error("Failed to load portfolio data", e);
        }
        setIsLoaded(true);
    }, []);

    // Auto-save to localStorage whenever data changes
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (e) {
                console.error("Failed to auto-save", e);
            }
        }
    }, [data, isLoaded]);

    // Back Button Trap
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        const handlePopState = (event: PopStateEvent) => {
            window.history.pushState(null, "", window.location.href);
            setIsAntigravity(true);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    // Escape to exit Antigravity
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsAntigravity(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const updateData = useCallback((newData: Partial<PortfolioData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    }, []);

    const saveToStorage = useCallback(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            alert("保存しました！");
        } catch (e) {
            console.error("Failed to save", e);
            alert("保存に失敗しました。");
        }
    }, [data]);

    const resetData = useCallback(() => {
        if (confirm("データを初期化しますか？")) {
            setData(initialPortfolioData);
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const exportData = useCallback(() => {
        try {
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "portfolio-data.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Export failed", e);
            alert("エクスポートに失敗しました。");
        }
    }, [data]);

    const importData = useCallback((file: File) => {
        if (!confirm("現在のデータは上書きされます。インポートしますか？")) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = e.target?.result as string;
                const parsed = JSON.parse(json) as PortfolioData;

                // Simple structure check
                if (!parsed.profile || !parsed.profile.name || !parsed.projects) {
                    throw new Error("Invalid format");
                }

                setData(parsed);
                alert("インポートが完了しました！");
            } catch (e) {
                console.error("Import failed", e);
                alert("ファイルの読み込みに失敗しました。形式を確認してください。");
            }
        };
        reader.readAsText(file);
    }, []);

    return {
        data,
        updateData,
        saveToStorage,
        resetData,
        exportData,
        importData,
        isAntigravity,
        setIsAntigravity,
        isLoaded
    };
}
