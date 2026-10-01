import app from "../../app/[locale]/messages/en.json";
import errorWidget from "../../features/error-widget/messages/en.json";
import theme from "../../features/theme-switcher/messages/en.json";

/**
 * English messages for every namespace.
 * `i18n/global.ts` uses this object's type for keys and ICU arguments.
 *
 * Owners, and the namespaces they hold:
 * - `app/[locale]/messages` — HomePage, Metadata, NotFound, and Error.
 *   Those screens share one route folder, so they share one catalog.
 * - `features/error-widget/messages` — ErrorWidget.
 * - `features/theme-switcher/messages` — Theme.
 *
 * The other files in this folder must import the same owners.
 */
const messages = {
  ...app,
  ...errorWidget,
  ...theme,
};

export default messages;
