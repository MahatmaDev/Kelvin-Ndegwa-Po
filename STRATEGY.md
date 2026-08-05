# Brand & Career Strategy — Kelvin Maina Ndegwa

> Living document. Every decision in this repo traces back to something here.
> Last reviewed: 2026-08-03

---

## 1. Honest situation assessment

**Who you are today:** Final-year BSc Information Technology, Dedan Kimathi University of
Technology (Nyeri, Kenya). Real, demonstrable skills in Kotlin/Android, Firebase +
Cloud Functions, NestJS, REST API design, and vanilla web. One substantial original
project (VibeWave). Certifications in networking, cybersecurity, IBM Full Stack.

**Who you want to be hired by:** NVIDIA, AWS, Microsoft, Anthropic — as a full-stack
software engineer.

**The gap, stated plainly.** Those four companies hire new grads almost entirely through
(a) regional campus pipelines and (b) internal referral. A Kenya-based candidate with no
industry experience applying cold to a US-based NVIDIA req is not competing on merit — the
application is filtered before a human reads it, mostly on work authorization. This is not
a statement about your ability. It is a statement about routing.

**The consequence for strategy:** we do not lower the ambition. We fix the routing.

---

## 2. Employer targeting — three concentric rings

The portfolio must serve all three rings simultaneously, because you will work Ring 1 and
Ring 2 while Ring 3 matures.

### Ring 1 — Reachable now (0–12 months). This is where you actually get hired.

| Target                                                     | Why it is real                                                                                                                                                                      |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Microsoft Africa Development Centre, Nairobi**           | ~570 engineers. Works on identity/network access, M365, mixed reality, Azure migration tooling. Hires locally, no visa needed. **This is a direct path to "Microsoft" on your CV.** |
| Safaricom / M-PESA engineering                             | Largest real-time payments system in Africa. Your Firebase + payments work is directly relevant.                                                                                    |
| Moniepoint, Flutterwave, Paystack, Chipper Cash            | African fintech, hires remote across the continent, values payments + reliability experience.                                                                                       |
| Remote-first global firms via Turing / Arc.dev / Crossover | Salary bands reported $6.9k–$23.3k/mo. Lower prestige, real money, real production experience.                                                                                      |
| Andela                                                     | Talent-marketplace routing into US/EU companies.                                                                                                                                    |

**Microsoft ADC is the single highest-leverage target on this list.** It converts your goal
("get hired by Microsoft") from improbable to plausible, without relocation. Everything in
the portfolio should be legible to an ADC hiring manager.

### Ring 2 — Reachable after 2–3 years of Ring 1 experience

AWS (Cape Town / Nairobi presence), Microsoft (internal transfer out of ADC — the single
most reliable route into Redmond), Google Nairobi, Visa/Mastercard Nairobi hubs, EU remote
contracts.

### Ring 3 — The stated dream

NVIDIA, Anthropic, AWS US, Microsoft Redmond. Realistic entry paths, in descending order of
probability:

1. **Internal transfer** from Microsoft ADC → Microsoft US (~2–4 yrs). Highest probability by a wide margin.
2. **Open-source contribution track.** A sustained, meaningful contribution history to a project these companies depend on is the one credential that routes around geography entirely. For Anthropic specifically: MCP servers, Claude Code plugins/skills, agent tooling. This is a live, under-crowded surface _right now_.
3. **Graduate study abroad** (MS in the US/EU) → campus pipeline → new-grad req.

> **Strategic note:** path (2) is the one most people never attempt, and the only one you can
> start this week at zero cost. Weight it accordingly.

---

## 3. Positioning

### The problem with "full-stack developer"

It is the single most crowded self-description in software. It communicates nothing. A
recruiter scanning 400 portfolios cannot distinguish you from 399 others.

### The positioning we take instead

> **Kelvin Ndegwa — I build real-time, event-driven systems where correctness under
> concurrency actually matters. Mobile, web, and the backend underneath both.**

Why this works:

- **It is narrow.** Narrow is memorable. Broad is invisible.
- **It is true.** VibeWave is genuinely a real-time concurrent system: simultaneous song requests, live vote tallies, payment state, event lifecycle. That is not a CRUD app.
- **It is respected by exactly the companies you named.** NVIDIA, AWS, and Anthropic are, at the infrastructure level, companies that care about concurrency, throughput, and state consistency. "I understand distributed state" is a language they speak. "I can center a div" is not.
- **It compounds.** Every future project can slot into this thesis.

### On dropping the DJ identity — a correction worth making

You asked to remove DJing entirely. Agreed, with one important distinction:

- **Remove the persona.** No "Mahatma_the_DJ", no decks, no event photos, no video reels, no nightlife aesthetic. Correct call. It reads as a hobby competing with the career, and it invites the reviewer to wonder which one you actually want.
- **Keep the domain.** VibeWave is your strongest asset precisely _because_ you understood live events from the inside. That is domain expertise, and domain expertise is what separates an engineer who ships a working product from one who ships a demo.

The reframe:

| Do not say                                | Say                                                                                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| "A DJ–fan engagement app I built as a DJ" | "A real-time event engagement platform — concurrent request queueing, live vote aggregation, and payment reconciliation under load" |
| "I'm a DJ and a developer"                | "I built for the live-events industry because I understood its operational constraints firsthand"                                   |

The second version is the same truth, spoken in the language of the job you want. **You lose
nothing and gain credibility.** The DJ fact never appears; the insight it gave you does all
the work.

---

## 4. Target audience — who actually reads this site

Design for these four readers, in priority order. Each needs something different from the
same page.

| #   | Reader                            | Time on site | What they need                                                              | Where they land                                     |
| --- | --------------------------------- | ------------ | --------------------------------------------------------------------------- | --------------------------------------------------- |
| 1   | **Technical recruiter / sourcer** | 15–40 sec    | Role fit, stack keywords, location, seniority, is-he-available              | Hero + skills. Must be scannable without scrolling. |
| 2   | **Hiring engineer / EM**          | 2–6 min      | Evidence of real engineering: architecture decisions, trade-offs, live code | Project case studies + GitHub                       |
| 3   | **Freelance/contract client**     | 1–3 min      | Can he ship my thing, what does it cost, how do I contact him               | Services + contact                                  |
| 4   | **Peer / future collaborator**    | varies       | Is he worth following, does he write, does he build in public               | Writing + GitHub                                    |

**The 15-second rule.** Reader #1 decides in under a minute. If the hero does not
communicate _name, role, stack, location/availability_ before any scroll, the site has
failed regardless of how good the rest is. Every animation must not delay this.

---

## 5. Competitive landscape

**Who you are actually competing with:**

- ~50,000 other African CS/IT new grads with a portfolio site
- Global bootcamp graduates with polished but identical Next.js template portfolios
- Self-taught developers with stronger GitHub histories than degrees

**What almost all of them do (and therefore what you must not do):**

| Everyone does this                         | You do this instead                                               |
| ------------------------------------------ | ----------------------------------------------------------------- |
| Template portfolio, obvious Vercel starter | Hand-built, distinctive, obviously not a template                 |
| Skill bars: "JavaScript ████░ 80%"         | Meaningless and slightly embarrassing. Show shipped work instead. |
| "Projects" = three tutorial to-do apps     | Two to four _real_ projects with written case studies             |
| Screenshot grid, no explanation            | Problem → architecture → trade-off → outcome, in prose            |
| Dead GitHub link                           | Pinned repos with real READMEs, commit history, tests             |
| Generic "passionate developer" copy        | Specific, verifiable claims                                       |

**Your genuine, defensible edges:**

1. **A real product with real users' problems** (VibeWave) — not a tutorial clone.
2. **Mobile + web + backend** — most portfolio-holders are frontend only. Kotlin is a real differentiator.
3. **Domain insight** into live events / payments in an African market context — genuinely rare and genuinely interesting to fintech.
4. **Multilingual** (English, Kiswahili, Kikuyu) — a real asset for any company operating in East Africa, including Microsoft ADC.

---

## 6. Content direction

### The core principle

**GitHub is your most important social platform.** Not X, not LinkedIn, not Instagram. A
hiring engineer will open your GitHub before they finish reading your site. A sparse or
messy GitHub silently kills more candidacies than a mediocre portfolio does.

Non-negotiables, in order:

1. Every pinned repo has a real README: what it does, why, how to run it, architecture diagram.
2. Commit history looks like engineering, not like a dump. Meaningful messages.
3. No committed `node_modules`. No committed secrets. _(This repo currently violates the first — fixed as part of the rebuild.)_
4. Tests exist somewhere, visibly.

### Publishing cadence — realistic for a final-year student

Do not commit to a schedule you will abandon in three weeks.

| Channel                           | Cadence          | Content                                                                                                                      |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **GitHub**                        | 3–5 commits/week | Real work. Consistency > volume.                                                                                             |
| **LinkedIn**                      | 1 post/week      | Where Kenyan tech recruiting actually happens. Highest ROI per unit effort for Ring 1.                                       |
| **Technical blog** (on this site) | 1 post/month     | Deep, specific, useful. Six excellent posts beat sixty thin ones.                                                            |
| **X/Twitter**                     | Opportunistic    | Where the global dev + AI community is. Reply to and engage with people building things you admire. Do not force a schedule. |

### What to write about — the four post types that work

1. **Build-in-public teardowns.** "How I handled 200 concurrent song requests without double-charging anyone." Specific problem, real code, honest trade-offs.
2. **The debugging story.** A hard bug, the wrong hypotheses, the actual cause. Engineers trust people who admit being wrong.
3. **Architecture decision records.** "Why I chose Firestore over Postgres for VibeWave — and where that decision hurt."
4. **Regional technical perspective.** "Building payment flows for M-PESA." Almost nobody writes this in depth. It is uncrowded, useful, and it is yours.

**Avoid entirely:** motivational content, "10 VS Code extensions" listicles, AI-generated
filler, engagement bait. It signals the opposite of seniority.

### Voice

Direct, specific, technically confident, no hype. Show the trade-off you made and what it
cost. Precision reads as senior; enthusiasm reads as junior.

---

## 7. Monetization

Sequenced. Do not attempt them all at once.

**Phase 1 — Now → employment (primary income: freelance)**

- Local/regional web + Android contracts. Realistic: KES 30k–150k per project.
- Positioning: not "cheap developer" — "engineer who ships production systems."
- Site needs: a Services section with clear scope, and a working contact path.

**Phase 2 — Employment (primary income: salary)**

- Ring 1 target. This is the actual goal; freelance is the bridge, not the destination.
- Site's job here is purely credibility.

**Phase 3 — Leverage (2–4 years out)**

- Productize VibeWave, or an adjacent SaaS, as a real business.
- Technical writing / consulting once you have a track record worth paying for.
- Open-source reputation → sponsorship, conference invitations, inbound recruiting.

**Deliberately not pursued:** courses, coaching, or "personal brand" monetization before you
have production experience. Selling expertise you have not yet earned is the fastest way to
lose the credibility this entire strategy is built on.

---

## 8. What this means for the website — build requirements

Derived directly from the above:

- [ ] **Zero DJ content.** No persona, no event imagery, no music-industry aesthetic.
- [ ] **Zero video.** Per instruction, and it also serves the 15-second rule.
- [ ] **Hero communicates name + role + stack + availability with no scroll.**
- [ ] **Project case studies, not a screenshot gallery.** Problem → architecture → trade-offs → outcome.
- [ ] **VibeWave reframed** as a real-time distributed system, with an architecture diagram.
- [ ] **No skill percentage bars.** Group by domain, show evidence.
- [ ] **Prominent, working GitHub links** to repos that survive inspection.
- [ ] **Services section** for Phase 1 monetization.
- [ ] **Blog/writing surface** — even if it launches with one post.
- [ ] **Resume download**, always current, one click from the hero.
- [ ] **Accessible and fast.** WCAG AA, Lighthouse 95+. A hiring engineer _will_ open DevTools. The site is itself a code sample.
- [ ] **The code quality is part of the pitch.** Someone will read the source. Write it accordingly.

---

## 9. Success metrics

Track monthly. Vanity metrics are excluded on purpose.

| Metric                                                       | 3 months | 12 months         |
| ------------------------------------------------------------ | -------- | ----------------- |
| Recruiter contacts via site                                  | 2–3      | 10+               |
| Freelance inquiries                                          | 1–2      | 6+                |
| Technical posts published                                    | 3        | 12                |
| GitHub weeks with meaningful commits                         | 10/12    | 44/52             |
| Meaningful OSS contributions (merged PRs, external projects) | 1        | 6+                |
| Ring 1 interviews reached                                    | 1        | 5+                |
| **Employment**                                               | —        | **Offer in hand** |

Follower counts are not on this list. Ten thousand followers who cannot hire you are worth
less than one Microsoft ADC engineer who read your VibeWave case study and replied.

---

## Sources

- [Microsoft Africa Development Centre](https://www.microsoft.com/en-us/madc)
- [Microsoft opens first Africa Development Centre in Kenya and Nigeria](https://news.microsoft.com/en-xm/features/furthering-our-investment-in-africa-microsoft-opens-first-africa-development-centre-in-kenya-and-nigeria/)
- [Microsoft jobs in Kenya — LinkedIn](https://ke.linkedin.com/jobs/microsoft-jobs)
- [Remote software engineer roles, Kenya — Arc.dev](https://arc.dev/en-ke/remote-jobs)
- [Remote software engineer roles, Kenya — Crossover](https://www.crossover.com/jobs/software-engineer/kenya)
