import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


// Utility function that merges class names using the clsx and twMerge libraries.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to get and parse localStorage data
export const getFromLocalStorage = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};



//  Converts a URL to a Blob object.
export async function urlToBlob(url: string): Promise<Blob | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the audio. Status: ${response.statusText}`
      );
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error converting URL to Blob:", error);
    return null;
  }
}
