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

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  // Return a static response to simulate offline mode.
  return Promise.resolve({
    response:
      "I'm currently running in offline mode. Please connect to the internet to chat with Nova.",
  });
}
