import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import enFlag from './flags/us.jpg';
import russiaFlag from './flags/russia.jpg';

// get the languages
interface ILanguage {
  name: string;
  flag: string;
}

interface ILanguages {
  [key: string]: ILanguage;
}

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const Languages: ILanguages = React.useMemo(
    () => ({
      ru: {
        name: t('Russian'),
        flag: russiaFlag,
      },
      en: {
        name: t('English'),
        flag: enFlag,
      },
    }),
    [t]
  );
  const [defaultLang, setDefaultLang] = useState<ILanguage>(Languages['en']);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const normalizeLanguage = useCallback(() => {
    const language = i18n.language.split('-');
    return language[0];
  }, [i18n.language]);

  useEffect(() => {
    setDefaultLang(Languages[normalizeLanguage()]);
  }, [normalizeLanguage, Languages]);

  /*
   * toggle language-dropdown
   */

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    setDefaultLang(Languages[lang]);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-languages"
        as="a"
        onClick={toggleDropdown}
        className={classNames('nav-link waves-effect waves-light', {
          show: dropdownOpen,
        })}
      >
        <img src={defaultLang.flag} alt={defaultLang.name} height="16" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
        <div onClick={toggleDropdown}>
          {Object.keys(Languages).map((lang, i) => {
            return (
              <Link
                to="#"
                className="dropdown-item notify-item"
                key={i + '-lang'}
                onClick={() => changeLanguage(lang)}
              >
                <img
                  src={Languages[lang].flag}
                  alt={Languages[lang].name}
                  className="me-1"
                  height="12"
                />{' '}
                <span className="align-middle">{Languages[lang].name}</span>
              </Link>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
