import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: '⚡',
      title: t('features.items.agile.title'),
      description: t('features.items.agile.description')
    },
    {
      icon: '👨‍💻',
      title: t('features.items.team.title'),
      description: t('features.items.team.description')
    },
    {
      icon: '🛟',
      title: t('features.items.support.title'),
      description: t('features.items.support.description')
    },
    {
      icon: '✨',
      title: t('features.items.code.title'),
      description: t('features.items.code.description')
    },
    {
      icon: '🔄',
      title: t('features.items.cicd.title'),
      description: t('features.items.cicd.description')
    },
    {
      icon: '🔍',
      title: t('features.items.testing.title'),
      description: t('features.items.testing.description')
    }
  ];

  return (
    <section id="caracteristiques" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative animate-fade-in-left">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
            <img src="/images/azougui.jpg" alt="Pourquoi choisir Azougui" className="relative rounded-3xl shadow-2xl w-full h-auto object-cover" />
          </div>

          <div className="space-y-8 animate-fade-in-right">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('features.title')}</h2>
              <p className="text-xl text-gray-600">
                {t('features.subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white transition-all hover:shadow-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ))}
            </div>

            <div className="bg-white/70 backdrop-blur-sm border-l-4 border-blue-600 p-6 rounded-r-xl">
              <p className="text-gray-700 italic">
                "{t('features.quote')}"
              </p>
              <p className="text-blue-600 font-semibold mt-2">— {t('features.quoteAuthor')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;