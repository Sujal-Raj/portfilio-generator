"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Save,
  MoveLeft,
  Eye,
  Edit3,
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
  const [showMobileEditor, setShowMobileEditor] = useState(false);

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
        <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <button onClick={() => router.push("/create/portfolio")} className="p-2">
            <MoveLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs bg-black text-white px-2 sm:px-4 py-1 sm:py-1.5 rounded-full">
            <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Preview mode</span>
            <span className="sm:hidden">Preview</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Edit Button */}
            {/* <button 
              onClick={() => setShowMobileEditor(!showMobileEditor)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all"
            >
              <Edit3 className="w-5 h-5" />
            </button> */}
            <button
  onClick={() => setShowMobileEditor(!showMobileEditor)}
  className="lg:hidden inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-sm hover:bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-600 transition-all"
>
  <Edit3 className="h-4 w-4 text-gray-700 dark:text-gray-200" />
  <span>Edit</span>
</button>


            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="p-2">
              {theme === "light" ? <Moon className="w-5 h-5 sm:w-6 sm:h-6" /> : <Sun className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs sm:text-base"
            >
              <Save size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{isSaving ? "Publishing..." : "Publish Portfolio"}</span>
              <span className="sm:hidden">{isSaving ? "Publishing..." : "Publish"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-14 sm:pt-20 flex flex-col lg:flex-row relative">
        {/* Desktop Editor - Always visible on lg+ */}
        <div className="hidden lg:block">
          <EditForm formData={formData} setFormData={setFormData} />
        </div>

        {/* Mobile Editor - Overlay/Modal */}
        {showMobileEditor && (
          <div className="lg:hidden fixed inset-0 z-40 pt-14 sm:pt-20">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileEditor(false)}
            />
            <div className="relative h-full bg-white dark:bg-black">
              <EditForm formData={formData} setFormData={setFormData} />
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="flex-1 p-3 sm:p-6">
          <PortfolioPreview portfolio={formData} theme={theme} />
        </div>
      </div>
    </div>
  );
}