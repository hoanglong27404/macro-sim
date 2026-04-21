export type Ideology = 'free' | 'socialist' | 'vn';

export interface Choice {
  label: 'A' | 'B' | 'C';
  text: string;
  ideology: Ideology;
}

export interface Question {
  id: number;
  year: string;
  title: string;
  module: string;
  context: string;
  choices: Choice[];
}

export interface AnalyzeRequest {
  answers: string[];
  gender: 'male' | 'female';
  playerName?: string;
}

export interface AnalyzeResponse {
  analysis: string;
  dominantIdeology: Ideology;
  scores: {
    free: number;
    socialist: number;
    vn: number;
  };
  consistency: number;
}
