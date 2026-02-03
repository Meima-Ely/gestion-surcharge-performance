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
    <section id="accueil" className="relative min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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

          <div className="relative animate-fade-in-right">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
            <img src="/images/azougui.jpg" alt="Équipe Azougui" className="relative rounded-3xl shadow-2xl w-full h-auto object-cover" />


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