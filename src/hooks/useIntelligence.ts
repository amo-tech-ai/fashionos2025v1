import { useState, useCallback } from 'react';
import { analyzeTrend } from '@/lib/gemini';

export interface IntelligenceReport {
  text: string;
  sources: Array<{ title: string; uri: string }>;
  timestamp: string;
}

export function useIntelligence() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<IntelligenceReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const performAnalysis = useCallback(async (query: string, depth: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH' = 'HIGH') => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeTrend(query, depth);
      setReport({
        ...result,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, report, error, performAnalysis };
}
