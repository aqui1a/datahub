import ar from 'antd/lib/locale/ar_EG';
import az from 'antd/lib/locale/az_AZ';
import bg from 'antd/lib/locale/bg_BG';
import bn from 'antd/lib/locale/bn_BD';
import by from 'antd/lib/locale/by_BY';
import ca from 'antd/lib/locale/ca_ES';
import cs from 'antd/lib/locale/cs_CZ';
import da from 'antd/lib/locale/da_DK';
import de from 'antd/lib/locale/de_DE';
import el from 'antd/lib/locale/el_GR';
import en from 'antd/lib/locale/en_GB';
import es from 'antd/lib/locale/es_ES';
import et from 'antd/lib/locale/et_EE';
import fa from 'antd/lib/locale/fa_IR';
import fi from 'antd/lib/locale/fi_FI';
import fr from 'antd/lib/locale/fr_FR';
import ga from 'antd/lib/locale/ga_IE';
import gl from 'antd/lib/locale/gl_ES';
import he from 'antd/lib/locale/he_IL';
import hi from 'antd/lib/locale/hi_IN';
import hr from 'antd/lib/locale/hr_HR';
import hu from 'antd/lib/locale/hu_HU';
import hy from 'antd/lib/locale/hy_AM';
import id from 'antd/lib/locale/id_ID';
import it from 'antd/lib/locale/it_IT';
import is from 'antd/lib/locale/is_IS';
import ja from 'antd/lib/locale/ja_JP';
import ka from 'antd/lib/locale/ka_GE';
import kn from 'antd/lib/locale/kn_IN';
import kk from 'antd/lib/locale/kk_KZ';
import km from 'antd/lib/locale/km_KH';
import ko from 'antd/lib/locale/ko_KR';
import lt from 'antd/lib/locale/lt_LT';
import lv from 'antd/lib/locale/lv_LV';
import mk from 'antd/lib/locale/mk_MK';
import ml from 'antd/lib/locale/ml_IN';
import mn from 'antd/lib/locale/mn_MN';
import ms from 'antd/lib/locale/ms_MY';
import nb from 'antd/lib/locale/nb_NO';
import ne from 'antd/lib/locale/ne_NP';
import nl from 'antd/lib/locale/nl_BE';
import pl from 'antd/lib/locale/pl_PL';
import pt from 'antd/lib/locale/pt_BR';
import ro from 'antd/lib/locale/ro_RO';
import ru from 'antd/lib/locale/ru_RU';
import si from 'antd/lib/locale/si_LK';
import sk from 'antd/lib/locale/sk_SK';
import sr from 'antd/lib/locale/sr_RS';
import sl from 'antd/lib/locale/sl_SI';
import sv from 'antd/lib/locale/sv_SE';
import ta from 'antd/lib/locale/ta_IN';
import th from 'antd/lib/locale/th_TH';
import tr from 'antd/lib/locale/tr_TR';
import tk from 'antd/lib/locale/tk_TK';
import ur from 'antd/lib/locale/ur_PK';
import uk from 'antd/lib/locale/uk_UA';
import vi from 'antd/lib/locale/vi_VN';
import zh from 'antd/lib/locale/zh_CN';
import { Locale } from 'antd/es/locale-provider';

export function getTranslationForAntd(locale: string): Locale {
    switch (locale) {
        case 'ar':
            return ar;
        case 'az':
            return az;
        case 'bg':
            return bg;
        case 'bn':
            return bn;
        case 'by':
            return by;
        case 'ca':
            return ca;
        case 'cs':
            return cs;
        case 'da':
            return da;
        case 'de':
            return de;
        case 'el':
            return el;
        case 'en':
            return en;
        case 'es':
            return es;
        case 'et':
            return et;
        case 'fa':
            return fa;
        case 'fi':
            return fi;
        case 'fr':
            return fr;
        case 'ga':
            return ga;
        case 'gl':
            return gl;
        case 'he':
            return he;
        case 'hi':
            return hi;
        case 'hr':
            return hr;
        case 'hu':
            return hu;
        case 'hy':
            return hy;
        case 'id':
            return id;
        case 'it':
            return it;
        case 'is':
            return is;
        case 'ja':
            return ja;
        case 'ka':
            return ka;
        case 'kn':
            return kn;
        case 'kk':
            return kk;
        case 'km':
            return km;
        case 'ko':
            return ko;
        case 'lt':
            return lt;
        case 'lv':
            return lv;
        case 'mk':
            return mk;
        case 'ml':
            return ml;
        case 'mn':
            return mn;
        case 'ms':
            return ms;
        case 'nb':
            return nb;
        case 'ne':
            return ne;
        case 'nl':
            return nl;
        case 'pl':
            return pl;
        case 'pt':
            return pt;
        case 'ro':
            return ro;
        case 'ru':
            return ru;
        case 'si':
            return si;
        case 'sk':
            return sk;
        case 'sr':
            return sr;
        case 'sl':
            return sl;
        case 'sv':
            return sv;
        case 'ta':
            return ta;
        case 'th':
            return th;
        case 'tr':
            return tr;
        case 'tk':
            return tk;
        case 'ur':
            return ur;
        case 'uk':
            return uk;
        case 'vi':
            return vi;
        case 'zh':
            return zh;
        default:
            return en;
    }
}
