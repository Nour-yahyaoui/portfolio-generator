// app/debug/portfolios/page.tsx
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function DebugPortfoliosPage() {
  // Get all portfolios with user info
  const portfolios = await sql`
    SELECT 
      p.id,
      p.title,
      p.subtitle,
      u.name as user_name,
      u.email
    FROM portfolios p
    JOIN users u ON p.user_id = u.id
    ORDER BY u.name, p.title
  `;

  // Get all users
  const users = await sql`
    SELECT id, name, email FROM users
  `;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Debug</h1>
        
        {/* Users Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Users ({users.length})</h2>
          <div className="space-y-2">
            {users.map((user: any) => (
              <div key={user.id} className="p-3 bg-gray-50 rounded-lg">
                <p><span className="font-medium">ID:</span> {user.id}</p>
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolios Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Portfolios ({portfolios.length})</h2>
          {portfolios.length === 0 ? (
            <p className="text-gray-500">No portfolios found</p>
          ) : (
            <div className="space-y-4">
              {portfolios.map((p: any) => (
                <div key={p.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary-600">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{p.title || '(No title)'}</h3>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">ID: {p.id}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">User:</span> {p.user_name} (ID: {p.user_id})
                  </p>
                  {p.subtitle && (
                    <p className="text-sm text-gray-500 mb-2">📝 {p.subtitle}</p>
                  )}
                  <div className="mt-3 text-sm">
                    <p className="font-medium mb-1">Try these URLs:</p>
                    <div className="space-y-1 font-mono text-xs">
                      <div>
                        <span className="text-gray-500">Option 1:</span>{' '}
                        <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          /public/{p.user_name}/{p.title}
                        </code>
                      </div>
                      <div>
                        <span className="text-gray-500">Option 2:</span>{' '}
                        <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          /public/{encodeURIComponent(p.user_name)}/{encodeURIComponent(p.title || '')}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}