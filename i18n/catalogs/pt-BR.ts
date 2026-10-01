import app from "../../app/[locale]/messages/pt-BR.json";
import errorWidget from "../../features/error-widget/messages/pt-BR.json";
import theme from "../../features/theme-switcher/messages/pt-BR.json";

// Same owners as en.ts, for Brazilian Portuguese.
const messages = {
  ...app,
  ...errorWidget,
  ...theme,
};

export default messages;
