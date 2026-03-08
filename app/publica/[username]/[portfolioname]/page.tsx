// app/public/[username]/[portfolioname]/page.tsx
import { notFound } from 'next/navigation';
import { getPublicPortfolio } from '@/lib/db/public';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe,
  Briefcase,
  Award,
  Calendar,
  Code,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';

interface PageProps {
  params: Promise<{
    username: string;
    portfolioname: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { username, portfolioname } = await params;
  
  // Decode URL parameters
  const decodedUsername = decodeURIComponent(username);
  const decodedPortfolioname = decodeURIComponent(portfolioname);
  
  const data = await getPublicPortfolio(decodedUsername, decodedPortfolioname);
  
  if (!data) {
    return {
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found.'
    };
  }
  
  return {
    title: `${data.portfolio.title} - Portfolio`,
    description: data.portfolio.bio || `Check out ${data.portfolio.title}'s portfolio`,
    openGraph: {
      title: data.portfolio.title,
      description: data.portfolio.bio || `${data.portfolio.title}'s portfolio`,
      type: 'profile',
      ...(data.portfolio.profile_image_url && {
        images: [{ url: data.portfolio.profile_image_url }]
      })
    }
  };
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username, portfolioname } = await params;
  
  // Decode URL parameters
  const decodedUsername = decodeURIComponent(username);
  const decodedPortfolioname = decodeURIComponent(portfolioname);
  
  const data = await getPublicPortfolio(decodedUsername, decodedPortfolioname);

  if (!data) {
    notFound();
  }

  const { user, portfolio, projects, experience, education } = data;
  const socialLinks = portfolio.social_links || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Simple Header with Download Button */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link 
          href="/"
          className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          ← Back to Home
        </Link>
        <DownloadButton />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Profile Header */}
        <div className="text-center mb-12">
          {/* Profile Image */}
          {portfolio.profile_image_url ? (
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur-xl opacity-30" />
              <img 
                src={portfolio.profile_image_url} 
                alt={portfolio.title}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl relative"
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl mx-auto mb-6">
              {portfolio.title?.charAt(0) || 'P'}
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{portfolio.title}</h1>
          
          {portfolio.subtitle && (
            <p className="text-xl text-gray-600 mb-4">{portfolio.subtitle}</p>
          )}
          
          {portfolio.bio && (
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{portfolio.bio}</p>
          )}
          
          <p className="text-sm text-gray-400 mt-4">
            by {user.name}
          </p>
        </div>

        {/* Contact Bar */}
        {(portfolio.email || portfolio.phone || portfolio.location) && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-wrap justify-center gap-6 border border-gray-100">
            {portfolio.email && (
              <a 
                href={`mailto:${portfolio.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Mail size={18} className="text-primary-600" />
                <span>{portfolio.email}</span>
              </a>
            )}
            {portfolio.phone && (
              <a 
                href={`tel:${portfolio.phone}`}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Phone size={18} className="text-primary-600" />
                <span>{portfolio.phone}</span>
              </a>
            )}
            {portfolio.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} className="text-primary-600" />
                <span>{portfolio.location}</span>
              </div>
            )}
          </div>
        )}

        {/* Social Links */}
        {Object.keys(socialLinks).length > 0 && (
          <div className="flex justify-center gap-3 mb-12">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-all"
              >
                <Github size={18} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-all"
              >
                <Linkedin size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-all"
              >
                <Twitter size={18} />
              </a>
            )}
            {socialLinks.website && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-all"
              >
                <Globe size={18} />
              </a>
            )}
          </div>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Code size={24} className="text-primary-600" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase size={24} className="text-primary-600" />
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech: string, i: number) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium mt-4 hover:underline"
                    >
                      View Project <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award size={24} className="text-primary-600" />
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp: any) => (
                <div key={exp.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <div className="flex flex-wrap justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                      {exp.start_date ? new Date(exp.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - 
                      {exp.current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                    </span>
                  </div>
                  <p className="text-primary-600 font-medium text-sm mb-3">{exp.company}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar size={24} className="text-primary-600" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu: any) => (
                <div key={edu.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{edu.institution}</h3>
                  <p className="text-primary-600 font-medium text-sm mb-2">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-xs text-gray-400">
                    {edu.start_date ? new Date(edu.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} - 
                    {edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {portfolio.title}. All rights reserved.
          </p>
          <p className="text-xs text-gray-300 mt-1">
            Built with PortfolioHub
          </p>
        </div>
      </div>
    </div>
  );
}