export type SocialProofItem = {
  name: string;
  /**
   * Optional logo under `public/logos/*`, referenced as `"/logos/..."`.
   * Keep optional so we can ship names-first and add assets later.
   */
  logoSrc?: string;
};

export const socialProof = [
  // Mock data (replace with real customers/events when ready).
  { name: "Acme Corp" },
  { name: "Globex" },
  { name: "Initech" },
  { name: "Umbrella" },
  { name: "Stark Industries" },
  { name: "Wayne Enterprises" },
  { name: "TechConf (Guest Lecture)" },
  { name: "Frontend Meetup (Workshop)" },
  { name: "ProductOrg (Internal Talk)" },
] satisfies SocialProofItem[];
