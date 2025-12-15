import {
  Mail,
  Github,
  Linkedin,
  Briefcase,
  Code2,
  GraduationCap,
  Award,
  Calendar,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type SocialLinks = {
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
};

type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string | null;
};

type Education = {
  degree: string;
  school: string;
  year: string;
};

type Portfolio = {
  name: string;
  title: string | null;
  email: string | null;
  about: string;
  status: string | null;
  userEmail?: string;

  socialLinks: SocialLinks;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: string[];
};

interface PortfolioPreviewProps {
  portfolio: Portfolio;
  theme: "light" | "dark";
}

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

export default function PortfolioPreview({
  portfolio,
  theme,
}: PortfolioPreviewProps) {
  const isDark = theme === "dark";

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      } transition-colors duration-300 border rounded-2xl p-2`}
    >
      {/* Header */}
      <header
        className={`top-0 z-50 ${
          isDark ? "bg-black/80" : "bg-white/80"
        } backdrop-blur-xl border-b ${
          isDark ? "border-gray-900" : "border-gray-100"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="font-bold text-lg tracking-tight">
            {portfolio.name}
          </div>
          <div className="flex items-center gap-3">
            {portfolio.socialLinks.github && (
              <a
                href={portfolio.socialLinks.github}
                className={`p-2 ${
                  isDark ? "hover:bg-gray-900" : "hover:bg-gray-100"
                } rounded-lg transition-all`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {portfolio.socialLinks.linkedin && (
              <a
                href={portfolio.socialLinks.linkedin}
                className={`p-2 ${
                  isDark ? "hover:bg-gray-900" : "hover:bg-gray-100"
                } rounded-lg transition-all`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${portfolio.email}`}
              className={`ml-2 px-5 py-2 ${
                isDark
                  ? "bg-white text-black"
                  : "bg-gray-900 text-white"
              } rounded-lg text-sm font-medium hover:opacity-90 transition-all`}
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Hero */}
        <section className="pt-16 pb-32">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-50 border-gray-200"
            } rounded-full mb-8 border`}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" />
            <span className="text-xs font-medium">
              {portfolio.status || "Available for opportunities"}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-2">
            {portfolio.name}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-500">
            {portfolio.title}
          </h2>

          <p className="max-w-2xl mb-6 text-gray-500">{portfolio.about}</p>

          <a
            href={`mailto:${portfolio.email}`}
            className={`inline-flex items-center gap-2 px-6 py-3 ${
              isDark
                ? "bg-white text-black"
                : "bg-gray-900 text-white"
            } rounded-lg font-medium`}
          >
            <Mail className="w-4 h-4" />
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </section>

        {/* Experience */}
        {portfolio.experience.length > 0 && (
          <section className="mb-32">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Briefcase /> Experience
            </h2>
            <div className="space-y-6">
              {portfolio.experience.map(
                (exp: Experience, i: number) => (
                  <div
                    key={i}
                    className="p-8 border rounded-xl"
                  >
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {exp.role}
                        </h3>
                        <p className="text-gray-500">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-gray-500">
                      {exp.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <section className="mb-32">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Code2 /> Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.projects.map(
                (proj: Project, i: number) => (
                  <div
                    key={i}
                    className="p-8 border rounded-xl cursor-pointer"
                    onClick={() =>
                      proj.link && window.open(proj.link, "_blank")
                    }
                  >
                    <div className="flex justify-between mb-4">
                      <h3 className="text-xl font-semibold">
                        {proj.title}
                      </h3>
                      {proj.link && <ExternalLink />}
                    </div>
                    <p className="mb-4 text-gray-500">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((tech: string, j: number) => (
                        <span
                          key={j}
                          className="px-3 py-1 text-xs border rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* Education */}
        {portfolio.education.length > 0 && (
          <section className="mb-32">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <GraduationCap /> Education
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.education.map(
                (edu: Education, i: number) => (
                  <div key={i} className="p-8 border rounded-xl">
                    <h3 className="font-semibold">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-500">
                      {edu.school}
                    </p>
                    <p className="text-sm text-gray-400">
                      {edu.year}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <section className="mb-32">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Award /> Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map(
                (skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 border rounded-lg"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
