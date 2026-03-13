import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: 'A joyful and cheerful female founder winning an award, holding a trophy, professional photography, high quality, inspiring, modern, tech startup context, cinematic lighting.',
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync('./public/hero-image.png', Buffer.from(base64Data, 'base64'));
        console.log('Image saved to public/hero-image.png');
        break;
      }
    }
  } catch (e) {
    console.error(e);
  }
}
generate();
