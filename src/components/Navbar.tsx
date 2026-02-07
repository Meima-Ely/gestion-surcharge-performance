import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(); // ← Ajout de cette ligne

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="Azouggi Logo"
              className="h-12 w-auto"
            />
            <span className="text-2xl font-bold text-gray-900">AzouggiTech</span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('nav.services')}
            </button>
            <button onClick={() => scrollToSection('caracteristiques')} className="text-gray-400 hover:text-blue-600 transition-colors font-medium">
              {t('nav.features')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium">
              {t('nav.contact')}
            </button>

            {/* Sélecteur de langue Desktop */}
            <LanguageSwitcher />
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Sélecteur de langue Mobile */}
            <LanguageSwitcher />

            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu déroulant Mobile */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                {t('nav.home')}
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                {t('nav.services')}
              </button>
              <button onClick={() => scrollToSection('caracteristiques')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
                {t('nav.features')}
              </button>
              <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all text-left font-medium">
                {t('nav.contact')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;