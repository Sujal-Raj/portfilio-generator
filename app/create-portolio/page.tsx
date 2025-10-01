"use client";

import { useState } from "react";

interface ParsedData {
  name: string;
  about: string;
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
  socialLinks: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
    portfolio: string | null;
  };
}

export default function CreatePortfolioPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<ParsedData>({
    name: "",
    about: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    socialLinks: {
      github: null,
      linkedin: null,
      twitter: null,
      portfolio: null,
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleParseResume = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("resume", file);

      const response = await fetch("/api/v1/ai/parse", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to parse resume");
      }

      const data = await response.json();
      setParsedData(data);
      setFormData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ParsedData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field: keyof ParsedData, index: number, value: string) => {
    const array = [...(formData[field] as string[])];
    array[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: array,
    }));
  };

  const handleAddArrayItem = (field: keyof ParsedData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const handleRemoveArrayItem = (field: keyof ParsedData, index: number) => {
    const array = [...(formData[field] as string[])];
    array.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      [field]: array,
    }));
  };

  const handleSocialLinkChange = (platform: keyof ParsedData["socialLinks"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value || null,
      },
    }));
  };

  const handleCreatePortfolio = async () => {
    // TODO: Implement portfolio creation logic
    console.log("Creating portfolio with data:", formData);
    alert("Portfolio creation logic to be implemented!");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-8 text-center">
          Create Your Portfolio
        </h1>

        {!parsedData ? (
          <div className="space-y-6">
            {/* Dropbox */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
                isDragging
                  ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-xl font-semibold text-black dark:text-white mb-2">
                  Drop your resume here
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  or click to browse (PDF only)
                </p>
                {file && (
                  <p className="text-sm text-black dark:text-white font-medium">
                    Selected: {file.name}
                  </p>
                )}
              </label>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              onClick={handleParseResume}
              disabled={!file || isLoading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Parsing Resume..." : "Parse Resume"}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Editable Form */}
            <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              {/* Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              {/* About */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  About
                </label>
                <textarea
                  value={formData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Skills
                </label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleArrayChange("skills", index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                    <button
                      onClick={() => handleRemoveArrayItem("skills", index)}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("skills")}
                  className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  + Add Skill
                </button>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Experience
                </label>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      value={exp}
                      onChange={(e) => handleArrayChange("experience", index, e.target.value)}
                      rows={2}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                    <button
                      onClick={() => handleRemoveArrayItem("experience", index)}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("experience")}
                  className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  + Add Experience
                </button>
              </div>

              {/* Education */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Education
                </label>
                {formData.education.map((edu, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={edu}
                      onChange={(e) => handleArrayChange("education", index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                    <button
                      onClick={() => handleRemoveArrayItem("education", index)}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("education")}
                  className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  + Add Education
                </button>
              </div>

              {/* Projects */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Projects
                </label>
                {formData.projects.map((project, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      value={project}
                      onChange={(e) => handleArrayChange("projects", index, e.target.value)}
                      rows={2}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                    <button
                      onClick={() => handleRemoveArrayItem("projects", index)}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddArrayItem("projects")}
                  className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  + Add Project
                </button>
              </div>

              {/* Social Links */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Social Links
                </label>
                <div className="space-y-3">
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={formData.socialLinks.github || ""}
                    onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={formData.socialLinks.linkedin || ""}
                    onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                  <input
                    type="url"
                    placeholder="Twitter URL"
                    value={formData.socialLinks.twitter || ""}
                    onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                  <input
                    type="url"
                    placeholder="Portfolio URL"
                    value={formData.socialLinks.portfolio || ""}
                    onChange={(e) => handleSocialLinkChange("portfolio", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setParsedData(null);
                  setFile(null);
                  setFormData({
                    name: "",
                    about: "",
                    skills: [],
                    experience: [],
                    education: [],
                    projects: [],
                    socialLinks: {
                      github: null,
                      linkedin: null,
                      twitter: null,
                      portfolio: null,
                    },
                  });
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-800 text-black dark:text-white py-4 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                Start Over
              </button>
              <button
                onClick={handleCreatePortfolio}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                Create Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}