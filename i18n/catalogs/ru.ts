import app from "../../app/[locale]/messages/ru.json";
import errorWidget from "../../features/error-widget/messages/ru.json";
import theme from "../../features/theme-switcher/messages/ru.json";

// Same owners as en.ts, for Russian.
const messages = {
  ...app,
  ...errorWidget,
  ...theme,
};

export default messages;
