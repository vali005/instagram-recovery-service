export declare const diagnosticPlatforms: string[];
export declare const diagnosticSituations: string[];
export interface SituationGuidance {
  advice: string;
  href: string;
  label: string;
}
export declare const situationGuidance: Record<string, SituationGuidance>;
export declare function getSituationGuidance(situation: string): SituationGuidance;
