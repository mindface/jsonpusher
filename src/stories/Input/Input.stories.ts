import type { Meta, StoryObj } from "@storybook/react";

import { InputRange } from "./InputRange";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/InputRange",
	component: InputRange,
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
} satisfies Meta<typeof InputRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
    value: 0,
		label: "Range Primary",
	},
};

export const Large: Story = {
	args: {
    value: 0,
		size: "large",
		label: "Range Large",
	},
};

export const Small: Story = {
	args: {
    value: 0,
		size: "small",
		label: "Range Small",
	},
};
