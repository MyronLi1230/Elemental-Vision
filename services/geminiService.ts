import { ElementData } from "../types";
import { elementsDB } from "../data/elements";

// Simulate an async fetch to match previous behavior, though it's instant offline
export const fetchElementData = async (elementName: string): Promise<ElementData> => {
  return new Promise((resolve, reject) => {
    // Artificial delay for better UX (loading state visibility)
    setTimeout(() => {
      const query = elementName.trim().toLowerCase();
      
      const found = elementsDB.find(e => 
        e.name.toLowerCase() === query || 
        e.symbol.toLowerCase() === query ||
        e.nameCN === elementName.trim()
      );

      if (found) {
        resolve(found);
      } else {
        // Fallback for demo purposes if not in our DB
        if (query === 'demo') {
            resolve(elementsDB[0]);
            return;
        }
        
        reject(new Error("Element not found in offline database"));
      }
    }, 600); 
  });
};
