export type Language = 'en' | 'zh';

export interface ElementHistory {
  discoveryYear: string;
  discoverer: string;
  discovererCN: string;
  nameOrigin: string;
  nameOriginCN: string;
  story: string; // Engaging discovery story/intro
  storyCN: string;
}

export interface SafetyData {
  hazardLevel: "Low" | "Moderate" | "High" | "Extreme";
  mainHazard: string;
  mainHazardCN: string;
  precautions: string;
  precautionsCN: string;
}

export interface ElementData {
  // Basic Identity
  name: string;
  nameCN: string; // Chinese Name
  pronunciation: string; // Pinyin/Phonetic
  symbol: string;
  atomicNumber: number;
  atomicMass: string;
  category: string;
  categoryCN: string;
  
  // Atomic Structure
  electronConfiguration: string;
  electronsPerShell: number[]; 
  oxidationStates: string;
  electronegativity: string;
  ionizationEnergy: string;
  electronAffinity: string;
  atomicRadius: string;
  isotopes: string[]; // List of main isotopes
  
  // Physical Properties
  phaseAtSTP: string;
  phaseAtSTPCN: string;
  meltingPoint: number | null; // Kelvin
  boilingPoint: number | null; // Kelvin
  density: string;
  appearance: string; // Color/texture description
  appearanceCN: string;
  
  description: string;
  descriptionCN: string;

  history: ElementHistory;
  
  // Usage & Safety
  applications: string[];
  applicationsCN: string[];
  biologicalRole: string; // Biological importance
  biologicalRoleCN: string;
  safety: SafetyData;
  
  // Visuals
  spectrumColors: string[]; 
  color: string; // UI Theme color
}

export interface SearchProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
  language: Language;
}

export interface ElementDisplayProps {
  data: ElementData;
  language: Language;
}
