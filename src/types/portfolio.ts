export interface Project {
    title: string;
    techStack: string[];
    description: string;
    background?: string; // New field
    challenge?: string; // New field
}

export interface Profile {
    name: string;
    university: string;
    description: string;
    vision: string;
}

export interface PortfolioData {
    profile: Profile;
    qualifications: string[];
    skills: string[];
    projects: Project[];
}

export const initialPortfolioData: PortfolioData = {
    profile: {
        name: "TARO YAMADA",
        university: "Digital Hollywood University",
        description: "Webデザインとフロントエンド開発を学ぶ学生エンジニア。使いやすさと「カッコよさ」を両立したUIを目指しています。",
        vision: "",
    },
    qualifications: [
        "基本情報技術者試験 合格",
        "TOEIC 800点",
        "色彩検定 2級",
        "AWS Certified Cloud Practitioner"
    ],
    skills: [
        "HTML/CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Figma",
        "Vercel"
    ],
    projects: [
        {
            title: "Portfolio Site",
            techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
            description: "自身のポートフォリオサイト。アンチグラビティ機能を実装し、ユニークな体験を提供。",
            background: "就職活動において、他の学生と差別化できる印象的なポートフォリオが必要だと感じた。",
            challenge: "Framer Motionを使った複雑なアニメーションと、Reactのステート管理の両立に苦労した。"
        },
        {
            title: "Task Management App",
            techStack: ["React", "Firebase", "MUI"],
            description: "リアルタイムでタスクを共有できる管理アプリ。ドラッグ＆ドロップでステータス変更が可能。",
            background: "チーム開発でのタスク管理を効率化したいというニーズから開発。",
            challenge: "Firebaseのリアルタイムリスナーの最適化と、セキュリティルールの設計。"
        }
    ]
};
