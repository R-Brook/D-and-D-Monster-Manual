import type { Meta, StoryObj } from "@storybook/react";
import { Attribute as AttributeComponent } from ".";

const meta: Meta<typeof AttributeComponent> = {
  title: "Attribute",
  component: AttributeComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AttributeComponent>;

export const Attribute: Story = {
  args: {
    icon: (
      <svg
        role="img"
        viewBox="0 0 1280.000000 1189.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,1189.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M2980 11763 c-848 -26 -1656 -457 -2177 -1163 -739 -1002 -839 -2418
-277 -3927 742 -1992 2563 -4072 5324 -6084 234 -171 529 -379 545 -385 18 -7
441 293 890 630 1976 1483 3442 3004 4339 4499 570 950 892 1837 993 2742 21
188 24 685 5 855 -52 462 -163 855 -343 1214 -166 330 -337 565 -602 823 -215
209 -424 359 -687 492 -449 228 -892 322 -1410 299 -991 -43 -1937 -632 -2597
-1618 -171 -255 -391 -672 -513 -972 -35 -87 -67 -155 -71 -150 -4 4 -35 77
-70 162 -82 201 -255 547 -362 727 -626 1046 -1484 1677 -2483 1828 -114 17
-375 32 -504 28z"
          />
        </g>
        <title>Hit points</title>
      </svg>
    ),
    copy: "199",
  },
};
