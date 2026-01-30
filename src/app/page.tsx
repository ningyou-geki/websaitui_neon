"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileHero from "@/components/ProfileHero";
import ListSection from "@/components/ListSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import ControlPanel from "@/components/Antigravity/ControlPanel";
import FloatingWrapper from "@/components/Antigravity/FloatingWrapper";

export default function Home() {
  const {
    data,               // ポートフォリオのデータ本体
    updateData,         // データを更新する関数
    exportData,         // JSONとして書き出す関数
    importData,         // JSONを読み込む関数
    isAntigravity,      // 無重力モードがONかどうかの状態
    setIsAntigravity,   // 無重力モードを切り替える関数
    isLoaded            // データの読み込みが完了したか
  } = usePortfolioData();

  // 読み込み中の表示
  if (!isLoaded) {
    return <div className="min-h-screen bg-transparent flex items-center justify-center text-white">読み込み中...</div>;
  }

  // プロフィール項目（名前、大学、自己紹介）をきれいに更新するためのヘルパー関数
  const updateProfile = (field: string, value: string) => {
    updateData({
      profile: {
        ...data.profile,
        [field]: value
      }
    });
  };

  return (
    <main className="min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500 selection:text-white pb-0 relative">

      {/* コントロールパネル（設定・書き出し・無重力スイッチ） */}
      <ControlPanel
        data={data}
        isAntigravity={isAntigravity}
        onToggleAntigravity={setIsAntigravity}
        onExport={exportData}
        onImport={importData}
      />

      {/* ヘッダーセクション */}
      <FloatingWrapper isAntigravity={isAntigravity}>
        <Header />
      </FloatingWrapper>

      {/* 自己紹介セクション：名前・大学・紹介文の編集が可能 */}
      <FloatingWrapper isAntigravity={isAntigravity} delay={0.2}>
        <ProfileHero
          name={data.profile?.name ?? ""}
          university={data.profile?.university ?? ""}
          description={data.profile?.description ?? ""}
          onUpdateName={(val) => updateProfile("name", val)}
          onUpdateUniversity={(val) => updateProfile("university", val)}
          onUpdateDescription={(val) => updateProfile("description", val)}
        />
      </FloatingWrapper>

      {/* 資格セクション：保有資格のリスト管理 */}
      <FloatingWrapper isAntigravity={isAntigravity} delay={0.5}>
        <ListSection
          title="QUALIFICATIONS"
          subtitle="保有資格"
          items={data.qualifications}
          onUpdateItems={(items) => updateData({ qualifications: items })}
          color="blue"
        />
      </FloatingWrapper>

      {/* スキルセクション：技術スタックの管理 */}
      <FloatingWrapper isAntigravity={isAntigravity} delay={0.8}>
        <SkillsSection
          title="SKILLS"
          subtitle="技術スタック"
          skills={data.skills}
          onUpdateSkills={(skills) => updateData({ skills })}
        />
      </FloatingWrapper>

      {/* 実績(Projects)セクション：開発した作品や経験の管理 */}
      <FloatingWrapper isAntigravity={isAntigravity} delay={1.0}>
        <ProjectsSection
          title="PROJECTS"
          subtitle="開発実績"
          projects={data.projects}
          onUpdateProjects={(projects) => updateData({ projects })}
        />
      </FloatingWrapper>

      {/* フッターセクション */}
      <FloatingWrapper isAntigravity={isAntigravity} delay={1.2}>
        <Footer />
      </FloatingWrapper>
    </main>
  );
}