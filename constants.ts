import { MarketingInputs } from './types';

export const DEFAULT_INPUTS: MarketingInputs = {
  product: "e-commerce website for wine retail in Hong Hong - www.chaliceandcru.com",
  audience: "Wine enthusiasts, well-educated millennials and gen x, WSET students, locals and expats, english-speaking",
  launchGoal: "build awareness, generate sales",
  brandTone: "casual, educational, knowledgeable, like talking to bar-staff or a sommelier who knows their stuff but doesn't show off about it"
};

export const SYSTEM_INSTRUCTION = `You are Gemini 3, acting as a full-stack AI marketing strategist for a start-up.
Your output must be formatted in clean Markdown.
Use clear headers (##, ###).
Do not include conversational filler ("Here is your plan...").
Go straight to the high-quality output.`;

export const GENERATE_STRATEGY_PROMPT = (inputs: MarketingInputs) => `
# INPUTS
product:      ${inputs.product}
audience:     ${inputs.audience}
launch_goal:  ${inputs.launchGoal}
brand_tone:   ${inputs.brandTone}

# TASKS
1. Customer Insight
   • Build an Ideal Customer Profile (ICP).
   • List top pain points, desired gains, and buying triggers.
   • Suggest 3 positioning angles that will resonate.

2. Conversion Messaging
   • Craft a hook-driven landing page (headline, sub-headline, CTA).
   • Give 3 viral headline options.
   • Produce a Messaging Matrix: Pain → Promise → Proof → CTA.

3. Content Engine
   • Create a 7-day content plan for Facebook, Threads, IG and X
   • Include daily post titles, themes, and tone tips.
   • Add 1 short-form video idea that supports the plan.

4. Email Playbook
   • Write 3 cold-email variations:
     ① Value-first, ② Problem-Agitate-Solve, ③ Social-proof / case-study.

5. SEO Fast-Track
   • Propose 1 SEO topic cluster that aligns with the product.
   • Give 5 blog-post titles targeting mid → high-intent keywords.
   • Outline a “pillar + supporting posts” structure.

# OUTPUT RULES
• Use clear section headers (e.g. ## ICP, ## Landing Copy, ## SEO Titles).
• Format in Markdown for easy reading.
• No chain-of-thought or reasoning—deliver polished results only.
`;