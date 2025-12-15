"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Save,
  MoveLeft,
  Eye,
} from "lucide-react";

import PortfolioPreview from "@/components/portfolio/PortfolioPreview/page";
import EditForm from "@/components/portfolio/EditForm/page";

/* ------------------------------------------------------------------ */
/*  SAFE UI TYPE (used everywhere in UI)                               */
/* ------------------------------------------------------------------ */
export interface Portfolio {
  _id?: string;
  userEmail?: string;
  slug?: string;
  name: string;
  title: string;
  email: string;
  about: string;
  status: string | null;
  skills: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  projects: {
    title: string;
    description: string;
    tech: string[];
    link: string | null;
  }[];
  socialLinks: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

/* ------------------------------------------------------------------ */
/*  UNSAFE INPUT TYPE (storage / backend only)                         */
/* ------------------------------------------------------------------ */
interface ParsedData {
  _id?: string;
  userEmail?: string;
  slug?: string;
  name: string;
  title: string;
  email: string;
  about: string;
  status?: string | null;
  skills?: string[];
  experience?: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education?: {
    degree: string;
    school: string;
    year: string;
  }[];
  projects?: {
    title: string;
    description: string;
    tech: string[];
    link?: string | null;
  }[];
  socialLinks?: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
  };
  createdAt?: string;
  updatedAt?: string;
}

/* ------------------------------------------------------------------ */
/*  NORMALIZER: ParsedData → Portfolio                                 */
/* ------------------------------------------------------------------ */
function toPortfolio(data: ParsedData): Portfolio {
  return {
    _id: data._id,
    userEmail: data.userEmail,
    slug: data.slug,
    name: data.name,
    title: data.title,
    email: data.email,
    about: data.about,
    status: data.status ?? null,
    skills: data.skills ?? [],
    experience: data.experience ?? [],
    education: data.education ?? [],
    projects:
      data.projects?.map((p) => ({
        title: p.title,
        description: p.description,
        tech: p.tech,
        link: p.link ?? null,
      })) ?? [],
    socialLinks: {
      github: data.socialLinks?.github ?? null,
      linkedin: data.socialLinks?.linkedin ?? null,
      twitter: data.socialLinks?.twitter ?? null,
    },
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function PreviewPortfolioPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Portfolio | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem("portfolioData");

    if (!storedData) {
      router.push("/create/portfolio");
      return;
    }

    const parsed: ParsedData = JSON.parse(storedData);
    const portfolio = toPortfolio(parsed);

    setFormData(portfolio);
  }, [router]);

  const handlePublish = async () => {
    if (!formData) return;

    setIsSaving(true);

    try {
      const res = await fetch("/api/v1/user/portfolio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      router.push(`/${data.slug}`);
    } catch (err) {
      console.error(err);
      alert("Failed to publish portfolio");
    } finally {
      setIsSaving(false);
    }
  };

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.push("/create/portfolio")}>
            <MoveLeft />
          </button>

          <div className="flex items-center gap-2 text-xs bg-black text-white px-4 py-1.5 rounded-full">
            <Eye size={14} />
            Preview mode
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon /> : <Sun />}
            </button>

            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg"
            >
              <Save size={16} />
              {isSaving ? "Publishing..." : "Publish Portfolio"}
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20 flex">
        <EditForm formData={formData} setFormData={setFormData} />

        <div className="flex-1 p-6">
          <PortfolioPreview portfolio={formData} theme={theme} />
        </div>
      </div>
    </div>
  );
}
