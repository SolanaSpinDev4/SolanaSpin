import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        spinSlowFastSlow: {
          '0%': { transform: 'rotate(0deg)', animationTimingFunction: 'ease-in' },
          '50%': { transform: 'rotate(1000deg)', animationTimingFunction: 'linear' },
          '100%': { transform: 'rotate(2000deg)', animationTimingFunction: 'ease-out' },
        },
      },
      animation: {
        spinSlowFastSlow: 'spinSlowFastSlow 5s infinite',
      },
      height: {
        'screen-minus-80': 'calc(100vh - 80px)',
      },
    },
  },
  plugins: [nextui()],
};
export default config;
