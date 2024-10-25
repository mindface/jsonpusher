import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/Textarea",
	component: Textarea,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
			description: "Sets the size of the textarea",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "medium" },
			},
		},
		label: {
			control: "text",
			description: "Label for the textarea",
			table: {
				type: { summary: "string" },
			},
		},
		value: {
			control: "text",
			description: "Value of the textarea",
			table: {
				type: { summary: "string" },
			},
		},
		onChange: {
			action: "changed",
			description: "Callback when the textarea value changes",
			table: {
				type: { summary: "(value: string) => void" },
			},
		},
	},
	args: {
		value: "Default text",
		onChange: (value: string) => console.log(value),
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		label: "Textarea",
	},
};

export const Secondary: Story = {
	args: {
		label: "Textarea",
	},
};

export const Large: Story = {
	args: {
		size: "large",
		label: "Textarea",
	},
};

export const Small: Story = {
	args: {
		size: "small",
		label: "Textarea",
	},
};
