import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./stories/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0.5)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        scaleDown: {
          '0%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'scale-up': 'scaleUp 0.5s ease-in-out',
        'scale-down': 'scaleDown 0.5s ease-in-out',
      },
		},
	},
	plugins: [],
};
export default config;
