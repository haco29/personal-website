import { profile } from "../content/profile";
import { writing } from "../content/writing";
import { life } from "../content/life";

/**
 * Builds a comprehensive system prompt containing Harel's content.
 * This prompt is used by the LLM to answer questions about Harel.
 */
export function buildSystemPrompt(): string {
  const sections: string[] = [];

  // Introduction
  sections.push("You are a helpful assistant that answers questions about Harel Coman.");
  sections.push(
    "Answer questions about Harel's background, experience, skills, writing, and interests.",
  );
  sections.push(
    "When possible, cite specific sources (e.g., mention specific articles, companies, or experiences).",
  );
  sections.push("Be helpful, concise, and accurate.\n");

  // About
  sections.push("## About Harel");
  sections.push(`Name: ${profile.name}`);
  sections.push(`Title: ${profile.title}`);
  sections.push(`Location: ${profile.location}`);
  sections.push(`Experience: ${profile.yearsExperience}\n`);
  sections.push(`Tagline: ${profile.tagline}\n`);

  sections.push("Bio:");
  profile.bio.forEach((paragraph) => {
    sections.push(`- ${paragraph}`);
  });
  sections.push("");

  sections.push("Key Focus Areas:");
  profile.highlights.forEach((highlight) => {
    sections.push(`- ${highlight}`);
  });
  sections.push("");

  // Experience
  sections.push("## Professional Experience");
  profile.experience.forEach((exp) => {
    sections.push(`\n${exp.title} at ${exp.company}`);
    sections.push(`${exp.start} - ${exp.end}`);
    if (exp.bullets.length > 0) {
      exp.bullets.forEach((bullet) => {
        sections.push(`- ${bullet}`);
      });
    }
  });
  sections.push("");

  // Skills
  sections.push("## Skills");
  profile.skills.forEach((group) => {
    sections.push(`\n${group.label}:`);
    group.items.forEach((item) => {
      sections.push(`- ${item}`);
    });
  });
  sections.push("");

  // Education
  sections.push("## Education");
  profile.education.forEach((edu) => {
    sections.push(`${edu.degree} from ${edu.school}`);
  });
  sections.push("");

  // Writing
  sections.push("## Writing");
  sections.push(`\nSeries: ${writing.series.title}`);
  sections.push(`Description: ${writing.series.note}`);
  sections.push(`URL: ${writing.series.href}\n`);

  sections.push("Featured Articles:");
  writing.featured.forEach((article) => {
    sections.push(`\n- ${article.title}`);
    if (article.note) {
      sections.push(`  ${article.note}`);
    }
    sections.push(`  URL: ${article.href}`);
  });
  sections.push("");

  // Interests & Life
  sections.push("## Personal Interests");
  sections.push(`\n${life.intro}\n`);

  sections.push("Hobbies:");
  life.hobbies.forEach((hobby) => {
    sections.push(`- ${hobby.title}: ${hobby.description}`);
  });
  sections.push("");

  sections.push(`Family: ${life.family.copy}`);
  sections.push("");

  // Links
  sections.push("## Links");
  profile.links.forEach((link) => {
    sections.push(`- ${link.label}: ${link.href}`);
  });

  return sections.join("\n");
}
