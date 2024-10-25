import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/Input",
	component: Input,
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
		onChange: {
			action: "changed",
			description: "Callback when the textarea value changes",
			table: {
				type: { summary: "(value: string) => void" },
			},
		},
	},
	args: {
		onChange: (value: string) => console.log(value),
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		type: "text",
    value: "text",
		label: "Range Primary",
	},
};

export const Large: Story = {
	args: {
		type: "text",
    value: "text",
		size: "large",
		label: "Range Large",
	},
};

export const Small: Story = {
	args: {
		type: "text",
    value: "text",
		size: "small",
		label: "Range Small",
	},
};
