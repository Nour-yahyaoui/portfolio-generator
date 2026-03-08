// app/portfolio/[id]/page.tsx
import { getFullPortfolio } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { findUserById } from '@/lib/db/users';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Folder, 
  ChevronLeft, 
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
  LogOut,
  Edit,
  Trash2,
  Home
} from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg p-6 flex flex-col">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-black to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
          <Home size={20} />
          </div>
          <span className="text-xl font-bold text-gray-900">PortfolioHub</span>
        </Link>

        {/* Portfolio Info */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider">
            PORTFOLIO INFO
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-gray-700">
              <User size={18} />
              <span className="text-sm truncate">{portfolio.title}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Briefcase size={18} />
              <span className="text-sm">Projects: {projects.length}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Award size={18} />
              <span className="text-sm">Experience: {experience.length}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar size={18} />
              <span className="text-sm">Education: {education.length}</span>
            </div>
          </div>
        </div>

        {/* Skills Preview in Sidebar */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-4 tracking-wider">
              TOP SKILLS
            </p>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.slice(0, 5).map((skill: string, i: number) => (
                <span key={i} className="bg-gray-500 px-2 py-1 rounded text-xs text-gray-50">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Decorative Icons */}
        <div className="bg-gray-100 rounded-xl p-4 mt-auto">
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
                    className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:bg-primary-600 hover:text-white transition-all cursor-pointer shadow-sm"
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

        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 transition-colors mt-6"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        {/* User Profile */}
        <div className="mt-4 p-4 bg-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-semibold shadow-md">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
            <Link href="/settings">
              <Settings className="text-gray-400 cursor-pointer hover:text-gray-600" size={18} />
            </Link>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header with Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-6">
              {/* Profile Image */}
              {portfolio.profile_image_url ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur opacity-30" />
                  <img 
                    src={portfolio.profile_image_url} 
                    alt={portfolio.title}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg relative"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {portfolio.title?.charAt(0) || 'P'}
                </div>
              )}
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{portfolio.title}</h1>
                {portfolio.subtitle && (
                  <p className="text-lg text-gray-600 mb-3">{portfolio.subtitle}</p>
                )}
                {portfolio.bio && (
                  <p className="text-gray-600 max-w-2xl">{portfolio.bio}</p>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link
                href={`/portfolio/${portfolio.id}/edit`}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <Edit size={16} />
                Edit
              </Link>
              <button
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-all flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        {(portfolio.email || portfolio.phone || portfolio.location) && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-8 flex flex-wrap gap-6">
            {portfolio.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="text-primary-600" size={18} />
                <a href={`mailto:${portfolio.email}`} className="hover:text-primary-600">
                  {portfolio.email}
                </a>
              </div>
            )}
            {portfolio.phone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="text-primary-600" size={18} />
                <a href={`tel:${portfolio.phone}`} className="hover:text-primary-600">
                  {portfolio.phone}
                </a>
              </div>
            )}
            {portfolio.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="text-primary-600" size={18} />
                <span>{portfolio.location}</span>
              </div>
            )}
          </div>
        )}

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="text-primary-600" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="text-primary-600" />
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project: any) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech: string, i: number) => (
                        <span key={i} className="bg-white px-2 py-1 rounded text-xs text-gray-600 shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Layout for Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="text-primary-600" />
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp: any) => (
                  <div key={exp.id} className="bg-gray-50 rounded-lg p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                        {exp.start_date ? new Date(exp.start_date).getFullYear() : ''} - {exp.current ? 'Present' : exp.end_date ? new Date(exp.end_date).getFullYear() : ''}
                      </span>
                    </div>
                    <p className="text-primary-600 font-medium text-sm mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="text-primary-600" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu: any) => (
                  <div key={edu.id} className="bg-gray-50 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-1">{edu.institution}</h3>
                    <p className="text-primary-600 font-medium text-sm mb-1">
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