import React from 'react';

export const metadata = {
  title: 'Our Team | CORE EEE Hub',
  description: 'Meet the developer and administrators behind CORE EEE Student Hub.',
};

export default function TeamPage() {
  const developer = {
    name: "Madhu Sailesh Sasamal",
    role: "Lead Full-Stack Developer",
    branch: "EEE, VSSUT Burla (2024 - 2028)",
    bio: "Passionate full-stack developer dedicated to building high-performance web applications and digital tools for students.",
    image: "https://i.ibb.co/jPs8Wscs/IMG-20250907-223807893-AE-2.png",  
    linkedin: "https://www.linkedin.com/in/madhu-sailesh-sasamal-6918912a4/",
    github: "https://github.com/madhusailesh",  
  };

  const admins = [
    {
      name: "Satyaprakash Mishra",
      role: "Admin",
      branch: "EEE Department (2024 - 2028)",
      bio: "Overseeing course material uploads, PYQs, and student announcements.",
      image: "/satyaprakash.png",  
      email: "satyaprakash551043@gmail.com",
    },
    // {
    //   name: "Biswaranjan Mohapatra",
    //   role: "Admin",
    //   branch: "EEE Department (2024 - 2028)",
    //   bio: "handling student queries, feedback, and ensuring smooth communication within the hub.",
    //   image: "/biswa.png",  
    //   email: "bishwaranjanmohapatra05@gmail.com",
    // },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 tracking-tight">
            Meet the Team
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
            The minds behind building and managing CORE EEE Student Hub.
          </p>
        </div>

        {/* Developer Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center sm:text-left text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            🚀 Lead Developer
          </h2>

          <div className="relative group bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl dark:shadow-cyan-500/5 transition-all duration-300">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 right-0 -z-10 w-48 h-48 bg-cyan-500/10 dark:bg-cyan-500/20 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-500" />

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
              {/* Developer Photo */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-cyan-500 p-1 shadow-xl shrink-0">
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Bio & Details */}
              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {developer.name}
                    </h3>
                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800 rounded-full">
                      Creator & Dev
                    </span>
                  </div>
                  <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-1">
                    {developer.role} • {developer.branch}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {developer.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                  <a
                    href={developer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    LinkedIn
                  </a>

                  <a
                    href={developer.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admins Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center sm:text-left text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            🛡️ CORE Administrators
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {admins.map((admin, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Admin Photo (Enlarged to w-28 h-28 sm:w-32 sm:h-32) */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-purple-500/60 p-1 mb-5 shadow-md shrink-0">
                  <img
                    src={admin.image}
                    alt={admin.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {admin.name}
                </h3>
                <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-2">
                  {admin.role} • {admin.branch}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {admin.bio}
                </p>

                <a
                  href={`mailto:${admin.email}`}
                  className="mt-auto text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 002 2v10a2 2 0 002 2z" />
                  </svg>
                  {admin.email}
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}