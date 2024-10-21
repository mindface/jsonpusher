import type { StorybookConfig } from "@storybook/nextjs";
import type { UserConfig as ViteConfig } from "vite";

interface CustomStorybookConfig extends StorybookConfig {
	viteFinal?: (config: ViteConfig) => ViteConfig | Promise<ViteConfig>;
}

const config: CustomStorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	async viteFinal(config: ViteConfig) {
		return config;
	},
};
export default config;
