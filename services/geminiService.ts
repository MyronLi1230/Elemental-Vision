import { ElementData } from "../types";
import { elementsDB } from "../data/elements";

// Service now strictly fetches from local DB
export const fetchElementData = async (elementName: string): Promise<ElementData> => {
  // Simulate a brief search delay for better UX interactions
  await new Promise(resolve => setTimeout(resolve, 300));

  const query = elementName.trim().toLowerCase();
  
  // Search by English Name, Symbol, or Chinese Name
  const found = elementsDB.find(e => 
    e.name.toLowerCase() === query || 
    e.symbol.toLowerCase() === query ||
    e.nameCN === elementName.trim()
  );

  if (found) {
    return found;
  }

  // If not found in local DB
  throw new Error("NOT_FOUND");
};