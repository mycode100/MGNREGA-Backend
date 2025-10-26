import axios from 'axios';

export const createApiInstance = (baseURL, timeout = 10000) => {
  return axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
};

export const handleApiError = (error, context = 'API') => {
  if (error.response) {
    console.error(`${context} Error [${error.response.status}]:`, error.response.data);
    return {
      success: false,
      error: error.response.data.message || 'External API error',
      statusCode: error.response.status,
    };
  } else if (error.request) {
    console.error(`${context} No Response:`, error.message);
    return {
      success: false,
      error: 'No response from external API',
      statusCode: 503,
    };
  } else {
    console.error(`${context} Request Error:`, error.message);
    return {
      success: false,
      error: error.message,
      statusCode: 500,
    };
  }
};

export const retryRequest = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};
