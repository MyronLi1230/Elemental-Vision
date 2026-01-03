import { GoogleGenAI } from "@google/genai";
import { ElementData } from "../types";
import { elementsDB } from "../data/elements";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchElementData = async (elementName: string): Promise<ElementData> => {
  // 1. Local Lookup (Fast path & Cache)
  const query = elementName.trim().toLowerCase();
  
  // Try to find in local DB first to save tokens and time
  const found = elementsDB.find(e => 
    e.name.toLowerCase() === query || 
    e.symbol.toLowerCase() === query ||
    e.nameCN === elementName.trim()
  );

  if (found) {
    return Promise.resolve(found);
  }

  // 2. AI Fetch (Gemini API) for unknown elements or deeper queries
  try {
    const prompt = `
      You are a chemistry expert. Provide detailed chemical and physical data for the element "${elementName}".
      
      You must return the data strictly as a valid JSON object matching the following TypeScript interface. 
      Ensure all numerical values (like meltingPoint) are numbers (use null if unknown), and strings are properly quoted.
      Ensure Chinese translations (CN fields) are accurate.
      
      Interface:
      {
        name: string; nameCN: string; pronunciation: string; symbol: string; atomicNumber: number; atomicMass: string;
        category: string; categoryCN: string;
        electronConfiguration: string; electronsPerShell: number[];
        oxidationStates: string; electronegativity: string; ionizationEnergy: string; electronAffinity: string; atomicRadius: string; isotopes: string[];
        phaseAtSTP: string; phaseAtSTPCN: string; 
        meltingPoint: number | null; // in Kelvin
        boilingPoint: number | null; // in Kelvin
        density: string; appearance: string; appearanceCN: string;
        description: string; descriptionCN: string;
        history: { discoveryYear: string; discoverer: string; discovererCN: string; nameOrigin: string; nameOriginCN: string; story: string; storyCN: string; };
        applications: string[]; applicationsCN: string[];
        biologicalRole: string; biologicalRoleCN: string;
        safety: { hazardLevel: "Low" | "Moderate" | "High" | "Extreme"; mainHazard: string; mainHazardCN: string; precautions: string; precautionsCN: string; };
        spectrumColors: string[]; // Array of hex color codes representing major emission lines (e.g. ["#FF0000", "#00FF00"])
        color: string; // A single hex color representing the element's typical display color
      }

      If the input "${elementName}" is not a recognized chemical element (real or theoretical), return a JSON object with a field "error" set to true, or just ensure the JSON is invalid so I can catch it, but preferably try to interpret it if it's a valid alias.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1 // Low temperature for factual accuracy
      }
    });

    const text = response.text;
    
    if (!text) {
      throw new Error("Empty response from AI");
    }

    const data = JSON.parse(text);

    // Basic validation to ensure it's an element
    if (!data.symbol || !data.atomicNumber) {
        throw new Error("Invalid element data returned");
    }

    return data as ElementData;

  } catch (error) {
    console.error("Error fetching element data:", error);
    throw new Error("Could not retrieve element data. Please check your internet connection or the element name.");
  }
};