"use client";

import { useEffect, useState } from "react";
import { Briefcase, GraduationCap, Code2, Mail, Github, Linkedin, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";

export default function PortfolioPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fetch portfolio by slug
  const getPortfolio = async () => {
    try {
      const res = await fetch(`/api/v1/user/${slug}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch portfolio");
      }
      setPortfolio(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPortfolio();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</p>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen  bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-500">
      {/* Cursor follower gradient */}
      <div 
        className="fixed w-96 h-96 pointer-events-none opacity-0 md:opacity-20 dark:opacity-10 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 z-0"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm' : ''}`}>
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className={`font-semibold transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'}`}>
            {portfolio?.name?.split(' ')[0]}
          </div>
          <div className="flex gap-2">
            {portfolio?.socialLinks?.github && (
              <a href={portfolio.socialLinks.github} target="_blank" rel="noopener noreferrer" 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            )}
            {portfolio?.socialLinks?.linkedin && (
              <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            )}
            <a href={`mailto:${portfolio?.userEmail}`}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group">
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-24">
        {/* Hero Section */}
        <section className="pt-12 pb-24 sm:pt-16 sm:pb-32 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full mb-6 border border-blue-100 dark:border-blue-900/50">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Open to opportunities</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
              {portfolio?.name}
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-6">
            {portfolio?.about}
          </p>
          
          {portfolio?.userEmail && (
            <a href={`mailto:${portfolio.userEmail}`} 
              className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
              <span className="text-sm">{portfolio.userEmail}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </section>

        {/* Work Experience */}
        {portfolio?.experience && portfolio.experience.length > 0 && (
          <section className="mb-24 sm:mb-32">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Experience</h2>
            </div>
            
            <div className="space-y-4">
              {portfolio.experience.map((exp: string, i: number) => {
                const parts = exp.split(' - ');
                const hasDateRange = parts.length > 1;
                
                return (
                  <div key={i} 
                    className="group relative p-5 sm:p-6 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20 animate-fade-in-up"
                    style={{ animationDelay: `${i * 50}ms` }}>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <p className="text-base leading-relaxed flex-1">{hasDateRange ? parts[0] : exp}</p>
                      {hasDateRange && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{parts[1]}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio?.projects && portfolio.projects.length > 0 && (
          <section className="mb-24 sm:mb-32">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
            </div>
            
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {portfolio.projects.map((proj: string, i: number) => (
                <div key={i}
                  className="group relative p-5 sm:p-6 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-900 transition-all duration-300 hover:shadow-lg hover:shadow-purple-100 dark:hover:shadow-purple-900/20 cursor-pointer overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="leading-relaxed flex-1 text-base">{proj}</p>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {portfolio?.education && portfolio.education.length > 0 && (
          <section className="mb-24 sm:mb-32">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
            </div>
            
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {portfolio.education.map((edu: string, i: number) => (
                <div key={i}
                  className="group p-5 sm:p-6 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-900 transition-all duration-300 hover:shadow-lg hover:shadow-green-100 dark:hover:shadow-green-900/20 animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <p className="leading-relaxed text-base">{edu}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {portfolio?.skills && portfolio.skills.length > 0 && (
          <section className="mb-24 sm:mb-32">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {portfolio.skills.map((skill: string, i: number) => (
                <span key={i}
                  className="px-4 py-2 text-sm rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default animate-fade-in"
                  style={{ animationDelay: `${i * 30}ms` }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className="pb-24 sm:pb-32">
          <div className="relative rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-900/50 p-8 sm:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-purple-100/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's work together</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Have an exciting project or opportunity? I'd love to hear about it.
              </p>
              
              <a href={`mailto:${portfolio?.userEmail || ''}`}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition-all duration-200 group">
                <Mail className="w-5 h-5" />
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </main>
  );
}