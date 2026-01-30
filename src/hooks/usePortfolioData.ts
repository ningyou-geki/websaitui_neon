"use client";

import { useState, useEffect, useCallback } from "react";
import { PortfolioData, initialPortfolioData } from "@/types/portfolio";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const STORAGE_KEY = "antigravity_portfolio_data_v1";

export function usePortfolioData() {
    const [data, setData] = useState<PortfolioData>(initialPortfolioData);
    const [isAntigravity, setIsAntigravity] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Helper to merge data safely
    const mergeData = (loadedData: any): PortfolioData => {
        return {
            ...initialPortfolioData,
            ...loadedData,
            profile: {
                ...initialPortfolioData.profile,
                ...(loadedData.profile || {})
            },
            // Ensure arrays are at least empty arrays if missing
            projects: loadedData.projects || initialPortfolioData.projects,
            skills: loadedData.skills || initialPortfolioData.skills,
            qualifications: loadedData.qualifications || initialPortfolioData.qualifications
        };
    };

    const loadFromCloud = useCallback(async () => {
        try {
            console.log("Loading from cloud...");
            const docRef = doc(db, "portfolios", "default-user");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const cloudData = docSnap.data();
                const merged = mergeData(cloudData);
                setData(merged);
                console.log("Cloud data loaded");
            } else {
                console.log("No cloud data found");
            }
        } catch (e) {
            console.error("Failed to load from cloud", e);
        }
    }, []);

    // Load from localStorage on mount and merge with initialData, then check cloud
    useEffect(() => {
        const init = async () => {
            try {
                // 1. Local Storage (Fast)
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setData(mergeData(parsed));
                }
            } catch (e) {
                console.error("Failed to load local data", e);
            }
            setIsLoaded(true);

            // 2. Cloud Storage (Source of Truth)
            // Only load from cloud if we are online/connected - simplistic check by just trying
            await loadFromCloud();
        };
        init();
    }, [loadFromCloud]);

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

    const saveToCloud = useCallback(async () => {
        if (!data) return;
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            await setDoc(doc(db, "portfolios", "default-user"), data);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000); // Reset after 3s
        } catch (e) {
            console.error("Failed to save to cloud", e);
            alert("クラウド保存に失敗しました");
        } finally {
            setIsSaving(false);
        }
    }, [data]);

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
        saveToCloud,
        isSaving,
        saveSuccess,
        resetData,
        exportData,
        importData,
        isAntigravity,
        setIsAntigravity,
        isLoaded
    };
}
