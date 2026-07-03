import { config } from "@/services/config";

interface RedisResponse {
  result: unknown;
  error?: string;
}

export async function redisCommand(
  command: string,
  ...args: (string | number)[]
): Promise<RedisResponse> {
  if (!config.redis.url || !config.redis.token) {
    return { result: null, error: "Redis not configured" };
  }

  try {
    const response = await fetch(`${config.redis.url}/${command}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.redis.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args.map(String)),
    });

    if (!response.ok) {
      return {
        result: null,
        error: `Redis error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { result: data.result ?? data };
  } catch (err) {
    return {
      result: null,
      error: err instanceof Error ? err.message : "Redis connection failed",
    };
  }
}

export async function checkRedisHealth() {
  const { result, error } = await redisCommand("PING");
  if (error) return { healthy: false, error };
  return { healthy: result === "PONG" };
}
