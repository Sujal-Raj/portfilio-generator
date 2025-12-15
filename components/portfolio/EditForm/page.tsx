import {
  Trash2,
  Plus,
  User,
  Wrench,
  Briefcase,
  Code2,
  GraduationCap,
  Link2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Portfolio } from "@/app/(web)/preview/portfolio/page"; // adjust path if needed

interface EditFormProps {
  formData: Portfolio;
  setFormData: React.Dispatch<React.SetStateAction<Portfolio | null>>;
}

type SectionKey =
  | "basic"
  | "skills"
  | "experience"
  | "projects"
  | "education"
  | "social";

export default function EditForm({ formData, setFormData }: EditFormProps) {
  const [activeSection, setActiveSection] = useState<SectionKey>("basic");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sections = [
    { key: "basic", icon: User, label: "Basic Info" },
    { key: "skills", icon: Wrench, label: "Skills", count: formData.skills.length },
    { key: "experience", icon: Briefcase, label: "Experience", count: formData.experience.length },
    { key: "projects", icon: Code2, label: "Projects", count: formData.projects.length },
    { key: "education", icon: GraduationCap, label: "Education", count: formData.education.length },
    { key: "social", icon: Link2, label: "Social" },
  ] as const;

  /* -------------------- Generic -------------------- */

  const handleInputChange = <K extends keyof Portfolio>(
    field: K,
    value: Portfolio[K]
  ) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  /* -------------------- Skills -------------------- */

  const handleSkillChange = (index: number, value: string) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            skills: prev.skills.map((s, i) => (i === index ? value : s)),
          }
        : prev
    );
  };

  const handleAddSkill = () => {
    setFormData((prev) =>
      prev ? { ...prev, skills: [...prev.skills, ""] } : prev
    );
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) =>
      prev
        ? { ...prev, skills: prev.skills.filter((_, i) => i !== index) }
        : prev
    );
  };

  /* -------------------- Experience -------------------- */

  const handleAddExperience = () => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            experience: [
              ...prev.experience,
              { role: "", company: "", duration: "", description: "" },
            ],
          }
        : prev
    );
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Portfolio["experience"][number],
    value: string
  ) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            experience: prev.experience.map((e, i) =>
              i === index ? { ...e, [field]: value } : e
            ),
          }
        : prev
    );
  };

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index),
          }
        : prev
    );
  };

  /* -------------------- Education -------------------- */

  const handleAddEducation = () => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            education: [
              ...prev.education,
              { degree: "", school: "", year: "" },
            ],
          }
        : prev
    );
  };

  const handleEducationChange = (
    index: number,
    field: keyof Portfolio["education"][number],
    value: string
  ) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            education: prev.education.map((e, i) =>
              i === index ? { ...e, [field]: value } : e
            ),
          }
        : prev
    );
  };

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
          }
        : prev
    );
  };

  /* -------------------- Projects -------------------- */

  const handleAddProject = () => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            projects: [
              ...prev.projects,
              { title: "", description: "", tech: [], link: null },
            ],
          }
        : prev
    );
  };

  const handleProjectChange = (
    index: number,
    field: keyof Portfolio["projects"][number],
    value: string
  ) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            projects: prev.projects.map((p, i) =>
              i === index
                ? {
                    ...p,
                    [field]:
                      field === "link" ? value || null : value,
                  }
                : p
            ),
          }
        : prev
    );
  };

  const handleProjectTechChange = (index: number, value: string) => {
    const techArray = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            projects: prev.projects.map((p, i) =>
              i === index ? { ...p, tech: techArray } : p
            ),
          }
        : prev
    );
  };

  const handleRemoveProject = (index: number) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
          }
        : prev
    );
  };

  /* -------------------- Social -------------------- */

  const handleSocialLinkChange = (
    platform: keyof Portfolio["socialLinks"],
    value: string
  ) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            socialLinks: {
              ...prev.socialLinks,
              [platform]: value || null,
            },
          }
        : prev
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "basic":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Professional Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Full Stack Developer"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Status</label>
              <input
                type="text"
                value={formData.status || ""}
                onChange={(e) => handleInputChange("status", e.target.value)}
                placeholder="e.g., Open to opportunities"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">About</label>
              <textarea
                value={formData.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                rows={6}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-3">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 group">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder="e.g., React, Node.js"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddSkill}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-3 group hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                  placeholder="Role"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                  placeholder="Company"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                  placeholder="Duration (e.g., Jan 2023 - Present)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                  placeholder="Description"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm resize-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="w-full flex items-center justify-center gap-2 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddExperience}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all"
            >
              <Plus size={18} />
              Add Experience
            </button>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-4">
            {formData.projects.map((project, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-3 group hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                  placeholder="Project Title"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                  placeholder="Description"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm resize-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  value={project.tech.join(", ")}
                  onChange={(e) => handleProjectTechChange(index, e.target.value)}
                  placeholder="Technologies (comma separated)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <input
                  type="url"
                  value={project.link || ""}
                  onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                  placeholder="Project Link (optional)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <button
                  onClick={() => handleRemoveProject(index)}
                  className="w-full flex items-center justify-center gap-2 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddProject}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all"
            >
              <Plus size={18} />
              Add Project
            </button>
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 space-y-3 group hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                  placeholder="Degree"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                  placeholder="School"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                  placeholder="Year"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                />
                <button
                  onClick={() => handleRemoveEducation(index)}
                  className="w-full flex items-center justify-center gap-2 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddEducation}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all"
            >
              <Plus size={18} />
              Add Education
            </button>
          </div>
        );

      case "social":
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">GitHub</label>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={formData.socialLinks.github || ""}
                onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">LinkedIn</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.socialLinks.linkedin || ""}
                onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Twitter</label>
              <input
                type="url"
                placeholder="https://twitter.com/username"
                value={formData.socialLinks.twitter || ""}
                onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full relative border-r-2 border-gray-700">
      {/* Sidebar - Fixed width 80px */}
      <div className="w-20 flex-shrink-0 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-6 gap-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-all duration-200 mb-2"
          title={isCollapsed ? "Show editor" : "Hide editor"}
        >
          {isCollapsed ? <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" /> : <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />}
        </button>
        
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.key;
          
          return (
            <button
  key={section.key}
  onClick={() => setActiveSection(section.key)}
  className="group"
  title={section.label}
>
  <div className="relative">     {/* <-- IMPORTANT */}
    <div
      className={`p-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-black dark:bg-white text-white dark:text-black scale-110"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:scale-105"
      }`}
    >
      <Icon size={20} />
    </div>

    {/* Tooltip */}
    {/* <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2
      px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black
      text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 
      pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50"
    > 
      {section.label} */}

      {/* Arrow */}
      {/* <div className="absolute right-full top-1/2 -translate-y-1/2 
        border-4 border-transparent border-r-black dark:border-r-white"
      ></div> */}
    {/* </div> */}
  </div>
</button>

          );
        })}
      </div>

      {/* Main Content - Fixed width 400px, smooth slide in/out */}
      <div 
        className={`flex flex-col bg-white dark:bg-black transition-all duration-500 ease-in-out overflow-hidden ${
          isCollapsed ? 'w-0 opacity-0' : 'w-[400px] opacity-100'
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black dark:text-white truncate">
            {sections.find(s => s.key === activeSection)?.label}
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
          transition: background 0.2s;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
        }

        .custom-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
          background: transparent;
        }

        .custom-scrollbar:not(:hover) {
          scrollbar-color: transparent transparent;
        }
      `}</style>
    </div>
  );
}