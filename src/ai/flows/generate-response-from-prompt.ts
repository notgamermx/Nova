'use server';

/**
 * @fileOverview A Genkit flow that takes a prompt as input and returns a response from the AI chatbot.
 *
 * - generateResponse - A function that handles the AI chatbot response generation.
 * - GenerateResponseInput - The input type for the generateResponse function.
 * - GenerateResponseOutput - The return type for the generateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseInputSchema = z.object({
  prompt: z.string().describe('The prompt to send to the AI chatbot.'),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

// Offline, rule-based responses
const offlineResponses: {keywords: string[]; response: string}[] = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello there! I'm Nova, running in offline mode. How can I assist you today?",
  },
  {
    keywords: ['how are you', 'how is it going'],
    response: "I'm a computer program, so I don't have feelings, but I'm operating at full capacity! Thanks for asking.",
  },
  {
    keywords: ['help', 'support'],
    response: "I can help with some basic questions while offline. Try asking me about what I can do or who created me.",
  },
  {
    keywords: ['who are you', 'what are you'],
    response: "I am Nova, an AI assistant. I'm currently running in a special offline mode, so my abilities are a bit limited.",
  },
  {
    keywords: ['who made you', 'who created you', 'developer'],
    response: 'I was created by a talented developer using Firebase and Genkit. Connect me to the internet to see my full potential!',
  },
  {
    keywords: ['joke', 'funny'],
    response: "Why don't scientists trust atoms? Because they make up everything! (Offline humor has its limits!)",
  },
];

const defaultOfflineResponse =
  "I'm currently running in offline mode, so I can only have a basic conversation. Please connect to the internet to chat with the full-power Nova AI.";

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  const prompt = input.prompt.toLowerCase();

  for (const rule of offlineResponses) {
    for (const keyword of rule.keywords) {
      if (prompt.includes(keyword)) {
        return Promise.resolve({ response: rule.response });
      }
    }
  }

  // If no keyword is matched, return a default offline response.
  return Promise.resolve({
    response: defaultOfflineResponse
  });
}
