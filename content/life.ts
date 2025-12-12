export type LifeHobby = {
  title: string;
  description: string;
};

export const life = {
  intro:
    "Outside of work, I recharge with games, sports, and family time — still chasing tiny improvements, just with more laughter.",
  hobbies: [
    {
      title: "Video games",
      description:
        "From chill co-op nights to skill-based grinds. I love the mix of strategy, mechanics, and flow.",
    },
    {
      title: "Board games",
      description:
        "Full-on board game fanatic. If it has clever rules and great interaction, I’m in.",
    },
    {
      title: "Chess",
      description:
        "My favorite tiny universe: simple rules, infinite depth. Always learning (always blundering).",
    },
    {
      title: "Tennis",
      description:
        "Fast feet, fast decisions. It’s the perfect mental reset after a long day of problem-solving.",
    },
    {
      title: "Snowboarding",
      description:
        "Chasing clean lines, cold air, and that one perfect run that makes the whole trip worth it.",
    },
  ] satisfies LifeHobby[],
  family: {
    headline: "My favorite team",
    copy: "My lovely wife is Reut, my son is Or, and my daughter is Lia — I love them all very much.",
    photo: {
      /**
       * Place your family photo at: `personal-website/public/life/family.jpg`
       * (we don’t commit binary files from this environment).
       */
      src: "/life/family.jpg",
      alt: "Harel with his family outdoors",
    },
  },
} as const;
