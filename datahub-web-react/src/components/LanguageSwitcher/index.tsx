import { useTranslation } from "react-i18next";


const LanguageOptions = [
   {    name: "Português",
        value: "pt"
    },
    {
        name: "English",
        value: "en"
    },
    {
        name: "Français",
        value: "fr"
    }    
]

3
export const LanguageSwitcher = () => {
    const {t, i18n} = useTranslation();

    return(
        <div className="language-switcher">
            <span>{t("selectYourLanguage")}</span>

            {LanguageOptions.map((LanguageOption) => (
            <button 
                key={LanguageOption.value}
                onClick={() =>{
                    i18n.changeLanguage(LanguageOption.value);

            }}>
            <span>{LanguageOption.name}</span>

            </button>
            ))}


        </div>
    )
}