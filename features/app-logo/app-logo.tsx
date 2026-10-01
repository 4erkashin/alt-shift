import type { SVGProps } from "react";

import Logomark from "./logomark.svg";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return <Logomark {...props} aria-hidden />;
}
