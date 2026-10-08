"use client";

import { Drawer } from "@base-ui/react/drawer";
import * as stylex from "@stylexjs/stylex";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

import { AppLogo } from "@/features/app-logo";
import { LocaleSwitcher } from "@/features/locale-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { colors, grid, spacing } from "@/tokens/generated/tokens.stylex";

const landscapeQuery = "(orientation: landscape)";

function subscribeLandscape(onChange: () => void) {
  const media = window.matchMedia(landscapeQuery);

  media.addEventListener("change", onChange);

  return () => {
    media.removeEventListener("change", onChange);
  };
}

function readLandscape() {
  return window.matchMedia(landscapeQuery).matches;
}

/**
 * The server has no screen shape, so the swipe direction starts
 * as portrait. Placement itself is CSS, which is right on the
 * first paint.
 */
function serverIsLandscape() {
  return false;
}

function useLandscape() {
  return useSyncExternalStore(
    subscribeLandscape,
    readLandscape,
    serverIsLandscape,
  );
}

const styles = stylex.create({
  backdrop: {
    position: {
      default: "fixed",
      /**
       * On iOS a fixed layer can miss the visible screen.
       * Absolute covers that case.
       */
      "@supports (-webkit-touch-callout: none)": "absolute",
    },
    inset: 0,
    zIndex: 1,
    minHeight: "100dvh",
    backgroundColor: colors.foreground,
    opacity: {
      "[data-ending-style]": 0,
      "[data-starting-style]": 0,
      default: "calc(0.2 * (1 - var(--drawer-swipe-progress, 0)))",
    },
    transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
    transitionDuration: {
      "[data-ending-style]": "calc(var(--drawer-swipe-strength, 1) * 400ms)",
      "[data-swiping]": "0ms",
      default: "450ms",
    },
    transitionProperty: "opacity",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.lg,
    alignItems: "stretch",
  },
  logo: {
    display: "block",
    width: "min(40vw, 40dvh)",
    height: "auto",
  },
  main: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 0,
  },
  popup: {
    position: "relative",
    boxSizing: "border-box",
    width: {
      default: "100%",
      "@media (orientation: landscape)": "max-content",
    },
    height: {
      default: "auto",
      "@media (orientation: landscape)": "100%",
    },
    /**
     * Twelve modules (3rem) stay past the screen edge so a drag
     * can move the panel without opening a gap there.
     */
    maxHeight: {
      default: `calc(80dvh + ${grid.module} * 12)`,
      "@media (orientation: landscape)": "100%",
    },
    paddingTop: spacing.lg,
    paddingRight: spacing.lg,
    paddingBottom: {
      default: `calc(${spacing.lg} + env(safe-area-inset-bottom, 0px) + ${grid.module} * 12)`,
      "@media (orientation: landscape)": `calc(${spacing.lg} + env(safe-area-inset-bottom, 0px))`,
    },
    paddingLeft: {
      default: spacing.lg,
      "@media (orientation: landscape)": `calc(${spacing.lg} + env(safe-area-inset-left, 0px) + ${grid.module} * 12)`,
    },
    marginTop: 0,
    marginRight: 0,
    marginBottom: {
      default: `calc(${grid.module} * -12)`,
      "@media (orientation: landscape)": 0,
    },
    marginLeft: {
      default: 0,
      "@media (orientation: landscape)": `calc(${grid.module} * -12)`,
    },
    overflowY: "auto",
    overscrollBehavior: "contain",
    color: colors.foreground,
    outline: "none",
    backgroundColor: colors.background,
    borderColor: colors.foreground,
    borderStyle: "solid",
    borderWidth: 0,
    borderTopWidth: {
      default: spacing.px,
      "@media (orientation: landscape)": 0,
    },
    borderRightWidth: {
      default: 0,
      "@media (orientation: landscape)": spacing.px,
    },
    transform: {
      "[data-ending-style]": `translateY(calc(100% - ${grid.module} * 12 + ${spacing.px}))`,
      "[data-starting-style]": `translateY(calc(100% - ${grid.module} * 12 + ${spacing.px}))`,
      default: "translateY(var(--drawer-swipe-movement-y, 0px))",
      "@media (orientation: landscape)": {
        "[data-ending-style]": `translateX(calc(-100% + ${grid.module} * 12 - ${spacing.px}))`,
        "[data-starting-style]": `translateX(calc(-100% + ${grid.module} * 12 - ${spacing.px}))`,
        default: "translateX(var(--drawer-swipe-movement-x, 0px))",
      },
    },
    transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
    transitionDuration: {
      "[data-ending-style]": "calc(var(--drawer-swipe-strength, 1) * 400ms)",
      default: "450ms",
    },
    transitionProperty: "transform",
    willChange: "transform",
  },
  switcher: {
    flexDirection: "column",
    alignItems: "stretch",
    fontSize: `calc(${grid.module} * 4)`,
  },
  title: {
    position: "absolute",
    width: spacing.px,
    height: spacing.px,
    padding: 0,
    margin: `calc(-1 * ${spacing.px})`,
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderWidth: 0,
    clipPath: "inset(50%)",
  },
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    color: colors.homeIcon,
    cursor: "pointer",
    outlineWidth: spacing.px,
    outlineStyle: "solid",
    outlineColor: {
      default: "transparent",
      ":focus-visible": colors.foreground,
    },
    outlineOffset: spacing.sm,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  viewport: {
    position: "fixed",
    inset: 0,
    zIndex: 1,
    display: "flex",
    alignItems: {
      default: "flex-end",
      "@media (orientation: landscape)": "stretch",
    },
    justifyContent: {
      default: "center",
      "@media (orientation: landscape)": "flex-start",
    },
  },
});

export default function HomePage() {
  const t = useTranslations("HomePage");
  const landscape = useLandscape();

  return (
    <main {...stylex.props(styles.main)}>
      <Drawer.Root swipeDirection={landscape ? "left" : "down"}>
        <Drawer.Trigger
          aria-label={t("menu")}
          type="button"
          {...stylex.props(styles.trigger)}
        >
          <AppLogo {...stylex.props(styles.logo)} />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop {...stylex.props(styles.backdrop)} />
          <Drawer.Viewport {...stylex.props(styles.viewport)}>
            <Drawer.Popup {...stylex.props(styles.popup)}>
              <Drawer.Content {...stylex.props(styles.content)}>
                <Drawer.Title {...stylex.props(styles.title)}>
                  {t("menu")}
                </Drawer.Title>
                <LocaleSwitcher style={styles.switcher} />
                <ThemeSwitcher style={styles.switcher} />
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </main>
  );
}
