import { useMemo } from "react";
import merge from "lodash/merge";

import CssBaseline from "@mui/material/CssBaseline";
import type { ThemeOptions } from "@mui/material/styles";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// system
import { palette } from "@/shared/theme/palette";
import { shadows } from "@/shared/theme/shadows";
import { typography } from "@/shared/theme/typography";
// options

import { customShadows } from "@/shared/theme/custom-shadows";
import { componentsOverrides } from "@/shared/theme/overrides";
import { createPresets } from "@/shared/theme/options/presets";
import { createContrast } from "@/shared/theme/options/contrast";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const presets = createPresets("default");

  const contrast = createContrast("default", "light");

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette("light"),
        ...presets.palette,
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows("light"),
        ...presets.customShadows,
      },
      direction: "rtl",
      shadows: shadows("light"),
      shape: { borderRadius: 8 },
      typography,
    }),
    ["light", "rtl", presets.palette, presets.customShadows, contrast.palette]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(componentsOverrides(theme), contrast.components);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
