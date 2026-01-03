import { GoogleGenAI, Type } from "@google/genai";
import { ElementData } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchElementData = async (elementName: string): Promise<ElementData> => {
  // Use gemini-3-pro-preview for complex STEM data extraction with structured JSON output
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Provide detailed scientific data for the chemical element: ${elementName}.
    Return the data in English and Chinese (CN fields).
    For 'history', provide the discovery details and an engaging story.
    For 'safety', assess the hazard level and provide precautions.
    Ensure all numerical values like melting/boiling points are in Kelvin.
    If a value is unknown or not applicable, provide a reasonable default or null.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          nameCN: { type: Type.STRING },
          pronunciation: { type: Type.STRING },
          symbol: { type: Type.STRING },
          atomicNumber: { type: Type.INTEGER },
          atomicMass: { type: Type.STRING },
          category: { type: Type.STRING },
          categoryCN: { type: Type.STRING },
          electronConfiguration: { type: Type.STRING },
          electronsPerShell: { type: Type.ARRAY, items: { type: Type.INTEGER } },
          oxidationStates: { type: Type.STRING },
          electronegativity: { type: Type.STRING },
          ionizationEnergy: { type: Type.STRING },
          electronAffinity: { type: Type.STRING },
          atomicRadius: { type: Type.STRING },
          isotopes: { type: Type.ARRAY, items: { type: Type.STRING } },
          phaseAtSTP: { type: Type.STRING },
          phaseAtSTPCN: { type: Type.STRING },
          meltingPoint: { type: Type.NUMBER },
          boilingPoint: { type: Type.NUMBER },
          density: { type: Type.STRING },
          appearance: { type: Type.STRING },
          appearanceCN: { type: Type.STRING },
          description: { type: Type.STRING },
          descriptionCN: { type: Type.STRING },
          history: {
            type: Type.OBJECT,
            properties: {
              discoveryYear: { type: Type.STRING },
              discoverer: { type: Type.STRING },
              discovererCN: { type: Type.STRING },
              nameOrigin: { type: Type.STRING },
              nameOriginCN: { type: Type.STRING },
              story: { type: Type.STRING },
              storyCN: { type: Type.STRING },
            },
          },
          applications: { type: Type.ARRAY, items: { type: Type.STRING } },
          applicationsCN: { type: Type.ARRAY, items: { type: Type.STRING } },
          biologicalRole: { type: Type.STRING },
          biologicalRoleCN: { type: Type.STRING },
          safety: {
            type: Type.OBJECT,
            properties: {
              hazardLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Extreme"] },
              mainHazard: { type: Type.STRING },
              mainHazardCN: { type: Type.STRING },
              precautions: { type: Type.STRING },
              precautionsCN: { type: Type.STRING },
            },
          },
          spectrumColors: { type: Type.ARRAY, items: { type: Type.STRING } },
          color: { type: Type.STRING },
        },
        required: ["name", "symbol", "atomicNumber"],
      },
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as ElementData;
  }
  
  throw new Error("No data returned from Gemini");
};