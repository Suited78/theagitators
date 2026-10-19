import { caseStudies as allCaseStudies } from "./caseStudies";
import { prelaunch } from "./site";

/**
 * The case studies the site shows. Everything while prelaunch, so drafts can
 * be reviewed on the preview; only approved studies once the site is live.
 */
export const caseStudies = prelaunch
  ? allCaseStudies
  : allCaseStudies.filter((study) => study.status === "approved");
