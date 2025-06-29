import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { 
  isStaticDeployment, 
  getBasePath,
  exampleDevices, 
  exampleDocuments, 
  exampleAlerts, 
  exampleApiKeys, 
  exampleStats 
} from "./staticData";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

// Static data query function for GitHub Pages deployment
const getStaticData = (endpoint: string): any => {
  switch (endpoint) {
    case "/api/dashboard/stats":
      return exampleStats;
    case "/api/devices":
      return exampleDevices;
    case "/api/documents":
      return exampleDocuments;
    case "/api/alerts":
      return exampleAlerts;
    case "/api/api-keys":
      return exampleApiKeys;
    default:
      // Handle device-specific endpoints
      if (endpoint.startsWith("/api/devices/")) {
        const deviceId = parseInt(endpoint.split("/")[3]);
        return exampleDevices.find(d => d.id === deviceId);
      }
      if (endpoint.startsWith("/api/documents/device/")) {
        const deviceId = parseInt(endpoint.split("/")[4]);
        return exampleDocuments.filter(d => d.deviceId === deviceId);
      }
      if (endpoint.startsWith("/api/alerts/unread")) {
        return exampleAlerts.filter(a => !a.isRead);
      }
      throw new Error(`Unknown endpoint: ${endpoint}`);
  }
};

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const endpoint = queryKey[0] as string;
    
    // Use static data for GitHub Pages deployment
    if (isStaticDeployment()) {
      // Try JSON files first, then fallback to in-memory data
      try {
        const basePath = getBasePath();
        const staticPath = basePath + endpoint.replace('/api', '/api') + '.json';
        const res = await fetch(staticPath);
        
        if (res.ok) {
          const data = await res.json();
          // Handle new JSON structure with comments and nested data
          if (endpoint === '/api/devices' && data.devices) return data.devices;
          if (endpoint === '/api/documents' && data.documents) return data.documents;
          if (endpoint === '/api/alerts' && data.alerts) return data.alerts;
          if (endpoint === '/api/api-keys' && data.apiKeys) return data.apiKeys;
          if (endpoint === '/api/dashboard/stats' && data.stats) return data.stats;
          
          // Handle device-specific endpoints
          if (endpoint.startsWith('/api/devices/') && data.devices) {
            const deviceId = parseInt(endpoint.split('/')[3]);
            return data.devices.find((d: any) => d.id === deviceId);
          }
          if (endpoint.startsWith('/api/documents/device/') && data.documents) {
            const deviceId = parseInt(endpoint.split('/')[4]);
            return data.documents.filter((d: any) => d.deviceId === deviceId);
          }
          if (endpoint.startsWith('/api/alerts/unread') && data.alerts) {
            return data.alerts.filter((a: any) => !a.isRead);
          }
          
          // Fallback to original data if no nested structure
          return data;
        }
      } catch (error) {
        // Fallback to in-memory data
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
      return getStaticData(endpoint);
    }

    // Original API fetch for development/backend deployment
    const res = await fetch(endpoint, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
