
import React from 'react';
import { APP_NAME } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-quantum-accent font-display font-bold text-2xl mb-4">{APP_NAME}</p>
        <p className="text-gray-500 text-sm mb-8">
          {t('footer_risk')}
        </p>
        <div className="text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} {APP_NAME} Technologies. {t('footer_rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
