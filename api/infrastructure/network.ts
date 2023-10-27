export type ResponseType<T> = {
  status: 200 | 500; // We are only handling success and internal errors at the moment
  error?: string;
  data?: T;
};

export type Success<T> = {
  status: 200;
  data: T;
};

export type Failure = {
  status: 500;
  error: string;
};

/**
 * Asynchronously executes a function and returns a ResponseType simulating
 * a HTTP response.
 * @param executionFn The function to execute. Must return a Promise.
 * @param resourceName Optionally a resource name can be provided for logging purposes.
 * @returns A ResponseType object, either with a data property or an error property.
 */
export async function evaluateAndReturn<T>(
  executionFn: () => Promise<T>,
  resourceName?: string
): Promise<ResponseType<T>> {
  try {
    return {
      status: 200,
      data: await executionFn(),
    };
  } catch (e) {
    return {
      status: 500,
      error: `Unable to retrieve ${resourceName ?? "data"}, ${e.message}`,
    };
  }
}
