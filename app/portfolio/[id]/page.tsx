// app/portfolio/[id]/page.tsx
import { getFullPortfolio } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { findUserById } from '@/lib/db/users';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Folder, 
  ChevronLeft, 
  ChevronRight,
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
  User,
  Code,
  Settings,
  Edit,
  Trash2,
  Home,
  Menu,
  X
} from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import MobileMenu from '@/components/MobileMenu';

export default async function PortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const portfolioId = parseInt(id);
  
  if (isNaN(portfolioId)) {
    notFound();
  }

  const userId = await getCurrentUser();
  
  if (!userId) {
    redirect('/login');
  }
  
  const user = await findUserById(userId);
  const data = await getFullPortfolio(portfolioId);

  if (!data) {
    notFound();
  }

  const { portfolio, projects, experience, education } = data;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white shadow-lg p-6 flex-col fixed h-screen overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            <Home size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">PortfolioHub</span>
        </Link>

        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider px-3">
            PORTFOLIO INFO
          </p>
          <div className="space-y-2 px-3">
            <div className="flex items-center gap-3 text-gray-700">
              <User size={18} className="flex-shrink-0" />
              <span className="text-sm truncate">{portfolio.title}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Briefcase size={18} className="flex-shrink-0" />
              <span className="text-sm">Projects: {projects.length}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Award size={18} className="flex-shrink-0" />
              <span className="text-sm">Experience: {experience.length}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar size={18} className="flex-shrink-0" />
              <span className="text-sm">Education: {education.length}</span>
            </div>
          </div>
        </div>

        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="mb-8 px-3">
            <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider">
              TOP SKILLS
            </p>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.slice(0, 5).map((skill: string, i: number) => (
                <span key={i} className="bg-gray-500 px-2 py-1 rounded text-xs text-gray-50">
                  {skill.length > 15 ? skill.slice(0, 12) + '...' : skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-100 rounded-xl p-4 mt-auto mx-3">
          <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wider">
            CONNECTIONS
          </p>
          <div className="flex gap-2 flex-wrap">
            {portfolio.social_links && Object.keys(portfolio.social_links).length > 0 ? (
              Object.keys(portfolio.social_links).map((key) => {
                const Icon = key === 'github' ? Github : 
                            key === 'linkedin' ? Linkedin :
                            key === 'twitter' ? Twitter : Globe;
                return (
                  <a
                    key={key}
                    href={portfolio.social_links[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                  >
                    <Icon size={18} />
                  </a>
                );
              })
            ) : (
              <p className="text-xs text-gray-400">No social links</p>
            )}
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 transition-colors mt-6 mx-3"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        <div className="mt-4 mx-3 p-4 bg-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-semibold shadow-md flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
            <Link href="/settings" className="flex-shrink-0">
              <Settings className="text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
            </Link>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg p-4 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">
              <Home size={16} />
            </div>
            <span className="text-lg font-bold text-gray-900">PortfolioHub</span>
          </Link>
          <MobileMenu user={user} />
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-72 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        {/* Header with Actions */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
              {/* Profile Image */}
              {portfolio.profile_image_url ? (
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur opacity-30" />
                  <img 
                    src={portfolio.profile_image_url} 
                    alt={portfolio.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-white shadow-lg relative"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl font-bold shadow-lg mx-auto sm:mx-0 flex-shrink-0">
                  {portfolio.title?.charAt(0) || 'P'}
                </div>
              )}
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{portfolio.title}</h1>
                {portfolio.subtitle && (
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-2 sm:mb-3">{portfolio.subtitle}</p>
                )}
                {portfolio.bio && (
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl line-clamp-3">{portfolio.bio}</p>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Link
                href={`/portfolio/${portfolio.id}/edit`}
                className="flex-1 sm:flex-initial bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Edit size={16} />
                <span className="hidden xs:inline">Edit</span>
              </Link>
              <button
                className="flex-1 sm:flex-initial bg-red-50 text-red-600 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Trash2 size={16} />
                <span className="hidden xs:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        {(portfolio.email || portfolio.phone || portfolio.location) && (
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6">
            {portfolio.email && (
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <Mail className="text-primary-600 flex-shrink-0" size={18} />
                <a href={`mailto:${portfolio.email}`} className="hover:text-primary-600 truncate">
                  {portfolio.email}
                </a>
              </div>
            )}
            {portfolio.phone && (
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <Phone className="text-primary-600 flex-shrink-0" size={18} />
                <a href={`tel:${portfolio.phone}`} className="hover:text-primary-600 truncate">
                  {portfolio.phone}
                </a>
              </div>
            )}
            {portfolio.location && (
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <MapPin className="text-primary-600 flex-shrink-0" size={18} />
                <span className="truncate">{portfolio.location}</span>
              </div>
            )}
          </div>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Code className="text-primary-600 flex-shrink-0" size={20} />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Briefcase className="text-primary-600" size={20} />
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project: any) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-4 sm:p-5 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-3">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded text-xs text-gray-600 shadow-sm">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-white px-2 py-0.5 rounded text-xs text-gray-600 shadow-sm">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Award className="text-primary-600" size={20} />
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp: any) => (
                  <div key={exp.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{exp.position}</h3>
                      <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap">
                        {exp.start_date ? new Date(exp.start_date).getFullYear() : ''} - {exp.current ? 'Present' : exp.end_date ? new Date(exp.end_date).getFullYear() : ''}
                      </span>
                    </div>
                    <p className="text-primary-600 font-medium text-xs sm:text-sm mb-2">{exp.company}</p>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="text-primary-600" size={20} />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu: any) => (
                  <div key={edu.id} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{edu.institution}</h3>
                    <p className="text-primary-600 font-medium text-xs sm:text-sm mb-1">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {edu.start_date ? new Date(edu.start_date).getFullYear() : ''} - {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}