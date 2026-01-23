import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileHero from "@/components/ProfileHero";
import ListSection from "@/components/ListSection";
import SkillsSection from "@/components/SkillsSection";

// =================================================================================================
// ▼▼▼ 設定エリア：ここを書き換えて、自分のポートフォリオを完成させてください ▼▼▼
// =================================================================================================

const portfolio = {
  // 1. あなたの名前（ローマ字または漢字）
  name: "TARO YAMADA",

  // 2. 所属・大学名など（肩書き）
  university: "Digital Hollywood University",

  // 3. 自己紹介文（1行〜2行程度）
  description: "Webデザインとフロントエンド開発を学ぶ学生エンジニア。使いやすさと「カッコよさ」を両立したUIを目指しています。",

  // 4. 保有資格リスト（箇条書きで表示されます）
  qualifications: [
    "基本情報技術者試験 合格",
    "TOEIC 800点",
    "色彩検定 2級",
    "AWS Certified Cloud Practitioner"
  ],

  // 5. スキル・技術スタック（タグのように表示されます）
  skills: [
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Figma",
    "Vercel"
  ]
};

// =================================================================================================
// ▲▲▲ 設定エリア終了：これ以降のコードは変更不要です ▲▲▲
// =================================================================================================

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500 selection:text-white pb-0">
      <Header />

      {/* 自己紹介セクション */}
      <ProfileHero
        name={portfolio.name}
        university={portfolio.university}
        description={portfolio.description}
      />

      {/* 資格セクション */}
      <ListSection
        title="QUALIFICATIONS"
        subtitle="保有資格"
        items={portfolio.qualifications}
        color="blue"
      />

      {/* スキルセクション */}
      <SkillsSection
        title="SKILLS"
        subtitle="技術スタック"
        skills={portfolio.skills}
      />

      <Footer />
    </main>
  );
}
