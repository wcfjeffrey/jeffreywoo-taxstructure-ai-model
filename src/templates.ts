import { EntityType, RelationshipType, StructureData } from "./types";

export const HK_HOLDING_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Founder", incorporationJurisdiction: "Hong Kong", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "HK HoldCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK OpCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const HK_OFFSHORE_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Investor", incorporationJurisdiction: "International", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "BVI HoldCo", incorporationJurisdiction: "BVI", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK OpCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const HK_TRUST_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Settlor", incorporationJurisdiction: "Hong Kong", x: 400, y: 50 },
    { id: "2", type: EntityType.DISCRETIONARY_TRUST, name: "Family Trust", incorporationJurisdiction: "Hong Kong", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK HoldCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
    { id: "4", type: EntityType.INDIVIDUAL, name: "Beneficiaries", incorporationJurisdiction: "Hong Kong", x: 600, y: 200 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.TRUSTEE, label: "Settles" },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r3", fromId: "2", toId: "4", type: RelationshipType.BENEFICIARY, label: "Beneficiaries" },
  ],
};

export const HK_CAYMAN_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Investor", incorporationJurisdiction: "International", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Cayman HoldCo", incorporationJurisdiction: "Cayman Islands", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK OpCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const HK_DELAWARE_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Investor", incorporationJurisdiction: "USA", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Delaware Corp", incorporationJurisdiction: "USA (Delaware)", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK OpCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const HK_SINGAPORE_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Investor", incorporationJurisdiction: "International", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "SG HoldCo", incorporationJurisdiction: "Singapore", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK OpCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const HK_LUXEMBOURG_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Investor", incorporationJurisdiction: "EU", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Lux Sarl", incorporationJurisdiction: "Luxembourg", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK OpCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const HK_MAURITIUS_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Investor", incorporationJurisdiction: "International", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Mauritius GBC", incorporationJurisdiction: "Mauritius", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK OpCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const HK_NETHERLANDS_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Investor", incorporationJurisdiction: "International", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Dutch BV", incorporationJurisdiction: "Netherlands", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "HK OpCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const DOUBLE_IRISH_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.JOINT_STOCK_COMPANY, name: "US Parent", incorporationJurisdiction: "USA", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Irish Co 1 (IP)", incorporationJurisdiction: "Ireland", taxResidency: "Bermuda", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "Irish Co 2 (OpCo)", incorporationJurisdiction: "Ireland", taxResidency: "Ireland", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.ROYALTY, label: "IP License" },
    { id: "r3", fromId: "1", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const DUTCH_SANDWICH_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.JOINT_STOCK_COMPANY, name: "US Parent", incorporationJurisdiction: "USA", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Irish Co 1 (IP)", incorporationJurisdiction: "Ireland", taxResidency: "Bermuda", x: 200, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "Dutch BV", incorporationJurisdiction: "Netherlands", x: 400, y: 200 },
    { id: "4", type: EntityType.JOINT_STOCK_COMPANY, name: "Irish Co 2 (OpCo)", incorporationJurisdiction: "Ireland", taxResidency: "Ireland", x: 600, y: 200 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.ROYALTY, label: "IP License" },
    { id: "r3", fromId: "3", toId: "4", type: RelationshipType.ROYALTY, label: "IP License" },
    { id: "r4", fromId: "1", toId: "4", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const LUX_FINANCING_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.JOINT_STOCK_COMPANY, name: "Group Parent", incorporationJurisdiction: "International", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Lux FinCo", incorporationJurisdiction: "Luxembourg", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "EU OpCo 1", incorporationJurisdiction: "Germany", x: 250, y: 350 },
    { id: "4", type: EntityType.JOINT_STOCK_COMPANY, name: "EU OpCo 2", incorporationJurisdiction: "France", x: 550, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.INTEREST, label: "Loan" },
    { id: "r3", fromId: "2", toId: "4", type: RelationshipType.INTEREST, label: "Loan" },
  ],
};

export const SWISS_PRINCIPAL_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.JOINT_STOCK_COMPANY, name: "Group HQ", incorporationJurisdiction: "International", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Swiss Principal", incorporationJurisdiction: "Switzerland", x: 400, y: 200 },
    { id: "3", type: EntityType.BRANCH, name: "EU Sales Branch", incorporationJurisdiction: "Germany", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.MANAGEMENT, label: "Branch Office" },
  ],
};

export const SG_IP_BOX_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.JOINT_STOCK_COMPANY, name: "Global Parent", incorporationJurisdiction: "USA", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "SG IP Co", incorporationJurisdiction: "Singapore", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "ASEAN OpCo", incorporationJurisdiction: "Vietnam", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.ROYALTY, label: "IP License" },
  ],
};

export const MAURITIUS_CYPRUS_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Investor", incorporationJurisdiction: "EU", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "Cyprus HoldCo", incorporationJurisdiction: "Cyprus", x: 250, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "Mauritius GBC", incorporationJurisdiction: "Mauritius", x: 550, y: 200 },
    { id: "4", type: EntityType.JOINT_STOCK_COMPANY, name: "India OpCo", incorporationJurisdiction: "India", x: 550, y: 350 },
    { id: "5", type: EntityType.JOINT_STOCK_COMPANY, name: "Russia OpCo", incorporationJurisdiction: "Russia", x: 250, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "1", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r3", fromId: "3", toId: "4", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r4", fromId: "2", toId: "5", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const DUTCH_CV_BV_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.JOINT_STOCK_COMPANY, name: "US Parent", incorporationJurisdiction: "USA", x: 400, y: 50 },
    { id: "2", type: EntityType.PARTNERSHIP, name: "Dutch CV", incorporationJurisdiction: "Netherlands", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "Dutch BV", incorporationJurisdiction: "Netherlands", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.PARTNERSHIP, label: "Partner" },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const DELAWARE_LLC_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Non-US Investor", incorporationJurisdiction: "International", x: 400, y: 50 },
    { id: "2", type: EntityType.PARTNERSHIP, name: "Delaware LLC", incorporationJurisdiction: "USA (Delaware)", x: 400, y: 200 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "US OpCo", incorporationJurisdiction: "USA", x: 400, y: 350 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.PARTNERSHIP, label: "Member" },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};

export const OFFSHORE_CHAIN_TEMPLATE: StructureData = {
  entities: [
    { id: "1", type: EntityType.INDIVIDUAL, name: "Founder", incorporationJurisdiction: "Hong Kong", x: 400, y: 50 },
    { id: "2", type: EntityType.JOINT_STOCK_COMPANY, name: "BVI HoldCo", incorporationJurisdiction: "BVI", x: 400, y: 180 },
    { id: "3", type: EntityType.JOINT_STOCK_COMPANY, name: "Cayman TopCo", incorporationJurisdiction: "Cayman Islands", x: 400, y: 310 },
    { id: "4", type: EntityType.JOINT_STOCK_COMPANY, name: "HK MidCo", incorporationJurisdiction: "Hong Kong", x: 400, y: 440 },
    { id: "5", type: EntityType.JOINT_STOCK_COMPANY, name: "China OpCo", incorporationJurisdiction: "China", x: 400, y: 570 },
  ],
  relationships: [
    { id: "r1", fromId: "1", toId: "2", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r2", fromId: "2", toId: "3", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r3", fromId: "3", toId: "4", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
    { id: "r4", fromId: "4", toId: "5", type: RelationshipType.EQUITY, label: "Equity", percentage: 100 },
  ],
};
