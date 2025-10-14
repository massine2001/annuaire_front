import { useState } from "react";

export function useMutation<TData = unknown, TVariables = unknown>(
  mutateFn: (variables: TVariables) => Promise<TData>
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const execute = async (variables: TVariables) => {
    console.time('Mutation execute');
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      console.timeLog('Mutation execute', 'Starting mutateFn');
      const result = await mutateFn(variables);
      console.timeLog('Mutation execute', 'mutateFn completed');
      setData(result);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
      console.timeEnd('Mutation execute');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return { 
    execute, 
    data, 
    loading, 
    error, 
    success, 
    reset 
  };
}
