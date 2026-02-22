import { Type } from "@google/genai";

export enum EntityType {
  JOINT_STOCK_COMPANY = "JOINT_STOCK_COMPANY",
  INDIVIDUAL = "INDIVIDUAL",
  PARTNERSHIP = "PARTNERSHIP",
  FOUNDATION = "FOUNDATION",
  JOINT_VENTURE = "JOINT_VENTURE",
  BRANCH = "BRANCH",
  REPRESENTATIVE_OFFICE = "REPRESENTATIVE_OFFICE",
  SPV = "SPV",
  SOCIETY = "SOCIETY",
  SOLE_PROPRIETORSHIP = "SOLE_PROPRIETORSHIP",
  LISTED_COMPANY = "LISTED_COMPANY",
  LIMITED_COMPANY = "LIMITED_COMPANY",
  UNLIMITED_COMPANY = "UNLIMITED_COMPANY",
  COOPERATIVE = "COOPERATIVE",
  LPF = "LPF",
  OFC = "OFC",
  UNIT_TRUST = "UNIT_TRUST",
  DISCRETIONARY_TRUST = "DISCRETIONARY_TRUST",
  HYBRID_TRUST = "HYBRID_TRUST",
  CHARITABLE_TRUST = "CHARITABLE_TRUST",
  CHARITABLE_COMPANY = "CHARITABLE_COMPANY",
  VENTURE_CAPITAL = "VENTURE_CAPITAL",
}

export enum RelationshipType {
  EQUITY = "EQUITY",
  DEBT = "DEBT",
  TRUSTEE = "TRUSTEE",
  BENEFICIARY = "BENEFICIARY",
  PARTNERSHIP = "PARTNERSHIP",
  MANAGEMENT = "MANAGEMENT",
  SERVICES = "SERVICES",
  LICENSING = "LICENSING",
  DIVIDEND = "DIVIDEND",
  INTEREST = "INTEREST",
  ROYALTY = "ROYALTY",
  RENTAL_INCOME = "RENTAL_INCOME",
  CAPITAL_GAIN = "CAPITAL_GAIN",
  PENSION_ANNUITY = "PENSION_ANNUITY",
  SOCIAL_SECURITY = "SOCIAL_SECURITY",
  INDEPENDENT_SERVICE = "INDEPENDENT_SERVICE",
  BUSINESS_PROFIT = "BUSINESS_PROFIT",
}

export enum EntityShape {
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
  TRIANGLE = "TRIANGLE",
  DIAMOND = "DIAMOND",
}

export interface Entity {
  id: string;
  type: EntityType;
  shape?: EntityShape;
  name: string;
  incorporationJurisdiction: string;
  registrationLocation?: string;
  industry?: string;
  status?: string;
  taxNumber?: string;
  taxStatus?: string;
  isCTC?: boolean;
  isFamilyOffice?: boolean;
  isCFC?: boolean;
  isDLRI?: boolean;
  isSection88?: boolean;
  x: number;
  y: number;
  taxResidency?: string;
  notes?: string;
}

export enum LineType {
  SOLID = "SOLID",
  DASHED = "DASHED",
  DOTTED = "DOTTED",
}

export interface Relationship {
  id: string;
  fromId: string;
  toId: string;
  type: RelationshipType;
  label: string;
  percentage?: number;
  amount?: string;
  color?: string;
  lineType?: LineType;
  notes?: string;
}

export interface StructureData {
  entities: Entity[];
  relationships: Relationship[];
}

export interface Structure {
  id: string;
  name: string;
  data: StructureData;
  updated_at?: string;
}

export const TAX_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    investorConsiderations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key considerations for investors in this structure.",
    },
    structureConsiderations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Technical tax considerations regarding the entities and their jurisdictions.",
    },
    downstreamImplications: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Potential tax implications for distributions or exits.",
    },
    stepPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.NUMBER },
          action: { type: Type.STRING },
          taxImpact: { type: Type.STRING },
        },
        required: ["step", "action", "taxImpact"],
      },
      description: "A step-by-step plan to implement this structure.",
    },
    refinements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Suggested improvements based on HK tax rules.",
    },
  },
  required: ["investorConsiderations", "structureConsiderations", "downstreamImplications", "stepPlan", "refinements"],
};
