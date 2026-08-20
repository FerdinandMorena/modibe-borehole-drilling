import { POLICY_PAYMENT, POLICY_QUALITY } from "./site";

export type FaqItem = { q: string; a: string };

/**
 * Answers are written by us, but every fact in them comes from the client's
 * real figures — package inclusions, the R850/m steel casing rate, the
 * R5,000 pressure pump, free transport to 65km, and the policy line.
 *
 * The two halves of the flyer's policy line get one question each. Rolling
 * them into a single answer made both of them mushy, and the payment half in
 * particular deserves a plain sentence rather than a hedge.
 *
 * "No money, no drilling" is payment terms — drilling is paid for before the
 * rig comes out. Confirmed by the client. It is NOT a no-water-no-charge
 * guarantee and must not be implied to be one anywhere on this site.
 *
 * The "what if you don't find water" question leads deliberately: it is the
 * thing people are most afraid to ask, and answering it plainly is the whole
 * point of putting it here rather than in a banner.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What happens if you don't find water?",
    a: `Nobody can see through rock, and we will not pretend otherwise — our flyer says it plainly: "${POLICY_QUALITY}" The survey is how we shorten those odds rather than guess at them, and it is done before you commit to anything. When we drill, we tell you exactly what we hit at every depth, and once the bore is down we test it and report the real yield. Whatever the ground gives us, you will hear it from us straight.`,
  },
  {
    q: "How does payment work?",
    a: `Straightforwardly, and this is the other half of what our flyer means by "${POLICY_PAYMENT}" — drilling is arranged and paid for before the rig comes out to you. Nothing is asked for while we are still surveying and working out which depth package fits your property. Once that is settled you will have the figure in front of you, and it is the same figure published on our pricing page.`,
  },
  {
    q: "What is actually included in the package price?",
    a: "Every one of the sixteen depth packages covers three things: the drilling itself, the PVC casing, and the pump. The total shown is the total for that work. Extras like a pressure pump or steel casing are priced separately and always quoted before anything begins.",
  },
  {
    q: "How deep will my borehole need to be?",
    a: "That depends on the ground under your property, which is why we survey before we quote. Across Limpopo we drill anywhere from 30 metres to 120 metres. Once the survey is done we will tell you which package we expect to be drilling to, and why.",
  },
  {
    q: "Do you charge for travel?",
    a: "Not within 65km. Transport is free from 0 to 65km. Beyond that we quote the travel up front so it is agreed before anyone gets in a truck.",
  },
  {
    q: "What if the ground needs steel casing instead of PVC?",
    a: "Some ground calls for steel rather than PVC. Extra steel casing is R850 per metre, charged only for what is actually fitted — so you are never paying for steel the bore did not need.",
  },
  {
    q: "Do I need a pressure pump as well?",
    a: "Only if you want strong, steady pressure at the taps or on an irrigation line. The pressure pump on its own is R5,000. If your tank sits high and close to the house you may not need one at all, and we will say so.",
  },
  {
    q: "Which areas do you cover?",
    a: "Polokwane and greater Limpopo. We are based here, we drill here, and the people we work for are our neighbours.",
  },
  {
    q: "How do I get a quote?",
    a: "WhatsApp us on 060 710 5939 with your location and what you need water for. It is the fastest way to reach us, and you will be talking to the people who will actually be on your site.",
  },
];
