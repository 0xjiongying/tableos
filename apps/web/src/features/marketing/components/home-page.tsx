import { HeroSection } from "./hero";
import {
  ProblemSection,
  ProductValueSection,
  SolutionSection,
} from "./problem-solution";
import { WorkflowDemoSection } from "./workflow-demo";
import { ArchitectureSection } from "./architecture";
import {
  CtaSection,
  EnterpriseSection,
  FaqSection,
  FeaturesSection,
  UseCasesSection,
  WhyArcSection,
} from "./home-sections";
import { MarketingShell } from "./marketing-shell";

export function HomePage() {
  return (
    <MarketingShell>
      <HeroSection />
      <ProductValueSection />
      <ProblemSection />
      <SolutionSection />
      <WorkflowDemoSection />
      <ArchitectureSection />
      <WhyArcSection />
      <FeaturesSection />
      <UseCasesSection />
      <EnterpriseSection />
      <FaqSection />
      <CtaSection />
    </MarketingShell>
  );
}
