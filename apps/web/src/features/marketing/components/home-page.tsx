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
import { JourneyFrame } from "./journey-frame";
import { LifecycleChaptersSection } from "./lifecycle-chapters";

/**
 * Scroll journey — payment lifecycle under premium dining setting.
 * Programmable money is the protagonist; dining is context.
 */
export function HomePage() {
  return (
    <MarketingShell>
      <HeroSection />

      <JourneyFrame index={1} label="Why programmable money">
        <ProductValueSection />
        <ProblemSection />
      </JourneyFrame>

      <JourneyFrame index={2} label="How value moves">
        <SolutionSection />
        <LifecycleChaptersSection />
      </JourneyFrame>

      <JourneyFrame index={3} label="Core MVP">
        <FeaturesSection />
        <UseCasesSection />
      </JourneyFrame>

      <JourneyFrame index={4} label="Value Streams">
        <WorkflowDemoSection />
      </JourneyFrame>

      <JourneyFrame index={5} label="Built on Arc">
        <ArchitectureSection />
        <WhyArcSection />
      </JourneyFrame>

      <JourneyFrame index={6} label="Trust & scale">
        <EnterpriseSection />
        <FaqSection />
        <CtaSection />
      </JourneyFrame>
    </MarketingShell>
  );
}
