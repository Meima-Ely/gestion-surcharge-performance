import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* PARTIE GAUCHE - TEXTE */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
              <span className="text-blue-600 text-sm font-semibold">{t('hero.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {t('hero.title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToContact} className="group bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold flex items-center justify-center space-x-2">
                <span>{t('hero.ctaPrimary')}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button onClick={scrollToServices} className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all font-semibold">
                {t('hero.ctaSecondary')}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-4xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600 mt-1">{t('hero.stats.projects')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600 mt-1">{t('hero.stats.satisfaction')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-gray-600 mt-1">{t('hero.stats.experience')}</div>
              </div>
            </div>
          </div>

          {/* PARTIE DROITE - TERMINAL DE CODE (REMPLACE L'IMAGE) */}
          <div className="relative animate-fade-in-right">
            
            {/* TERMINAL */}
            <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 max-w-sm">
              
              {/* Header du terminal */}
              <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 text-xs ml-4 font-mono">azouggi-tech.js</span>
              </div>

              {/* CODE */}
              <div className="p-4 font-mono text-xs leading-relaxed">
                <div className="space-y-1">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">azouggiTech</span>{' '}
                    <span className="text-gray-300">=</span>{' '}
                    <span className="text-yellow-400">{'{'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-400">mission</span>
                    <span className="text-gray-300">:</span>{' '}
                    <span className="text-yellow-300">"Innovation"</span>
                    <span className="text-gray-300">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-400">vision</span>
                    <span className="text-gray-300">:</span>{' '}
                    <span className="text-yellow-300">"Excellence"</span>
                    <span className="text-gray-300">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-400">services</span>
                    <span className="text-gray-300">:</span>{' '}
                    <span className="text-yellow-400">[</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-yellow-300">"Web Development"</span>
                    <span className="text-gray-300">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-yellow-300">"Mobile Apps"</span>
                    <span className="text-gray-300">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-yellow-300">"Cybersecurity"</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-yellow-400">]</span>
                    <span className="text-gray-300">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">transform</span>
                    <span className="text-gray-300">:</span>{' '}
                    <span className="text-gray-300">() </span>
                    <span className="text-pink-400">=&gt;</span>{' '}
                    <span className="text-yellow-400">{'{'}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-pink-400">return</span>{' '}
                    <span className="text-yellow-300">"Succès"</span>
                    <span className="text-gray-300">;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-yellow-400">{'}'}</span>
                  </div>
                  <div>
                    <span className="text-yellow-400">{'}'}</span>
                    <span className="text-gray-300">;</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BADGES FLOTTANTS */}
            
            {/* Badge Dév Web */}
            <div className="absolute -top-4 -left-8 bg-white rounded-xl shadow-xl px-5 py-3 flex items-center space-x-3 animate-float">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900 text-sm">Dév Web</span>
            </div>

            {/* Badge App Mobile */}
            <div className="absolute top-8 -right-8 bg-white rounded-xl shadow-xl px-5 py-3 flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900 text-sm">App Mobile</span>
            </div>

            {/* Badge Sécurité */}
            <div className="absolute bottom-24 -left-8 bg-white rounded-xl shadow-xl px-5 py-3 flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900 text-sm">Sécurité</span>
            </div>

            {/* Badge Cloud */}
            <div className="absolute bottom-8 -right-4 bg-white rounded-xl shadow-xl px-5 py-3 flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900 text-sm">Cloud</span>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;