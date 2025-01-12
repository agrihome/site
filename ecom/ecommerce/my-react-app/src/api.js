import axios from 'axios';

const API_URL = 'https://refactored-fortnight-v5px6v46jpgc6pp4-8000.app.github.dev/archon'; 

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/token/`, credentials);
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getMeta = async (model_name) => {
  try {
    const accessToken = localStorage.getItem('access_token'); // Retrieve the token

    // Sending POST request to the backend
    const response = await axios.post(
      `${API_URL}/meta/`, 
      { model_name },  // Send model_name as JSON in the request body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,  // Send the Bearer token
        },
      }
    );


    return response.data;  // Return the metadata from the response

  } catch (error) {
    // Improved error handling
    console.error('Error fetching model metadata:', error.response ? error.response.data : error.message);
    throw error;  // Rethrow error for further handling
  }
};

export const getProducts = async (filter = null) => {
  try {
    const accessToken = localStorage.getItem('access_token'); // Retrieve the token

    // Prepare the request body with the filter
    const requestBody = {
      filter: filter,
    };

    const response = await axios.post(
      `${API_URL}/product/table`,  // Endpoint for product table
      requestBody,  // Send the filter in the body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the Authorization header
        },
      }
    );

    return response.data;  // Return the response data

  } catch (error) {
    console.error('Error fetching products:', error); // Log any errors
    throw error;  // Propagate the error
  }
};
  
export const getOrders = async (filter = null) => {
  try {
    const accessToken = localStorage.getItem('access_token'); // Retrieve the token

    // Prepare the request body with the filter
    const requestBody = {
      filter: filter,
    };

    const response = await axios.post(
      `${API_URL}/order/table`,  // Endpoint for order table
      requestBody,  // Send the filter in the body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the Authorization header
        },
      }
    );

    return response.data;  // Return the response data

  } catch (error) {
    console.error('Error fetching orders:', error); // Log any errors
    throw error;  // Propagate the error
  }
};

export const getDetail = async (model,id) => {
  try {
    const accessToken = localStorage.getItem('access_token'); 

    const response = await axios.get(
      `${API_URL}/api/${model}/${id}/`,  // Use productId instead of 'id'
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; 

  } catch (error) {
    console.error('Error fetching order:', error); 
    throw error; 
  }
};

export const postNew = async (model, data) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    const response = await axios.post(
      `${API_URL}/api/${model}/`, // Dynamic endpoint for the model
      data, // The data for the new object
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Bearer token for authentication
          "Content-Type": "application/json", // Ensure JSON content type
        },
      }
    );

    console.log("Successfully created new object:", response.data);

    return response.data; // Return the created object from the server

  } catch (error) {
    console.error(
      "Error while creating new object:",
      error.response?.data || error.message
    );

    // Optionally, format and re-throw the error for the caller
    throw new Error(
      error.response?.data?.detail || "Failed to create the object."
    );
  }
};

export const updateDetail = async (model, id, data) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.put(
      `${API_URL}/api/${model}/${id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; // Return the updated data
  } catch (error) {
    console.error('Error updating detail:', error);
    throw error;
  }
};

export const deleteDetail = async (model, id) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.delete(
      `${API_URL}/api/${model}/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.status === 204; // Return `true` if deletion was successful
  } catch (error) {
    console.error('Error deleting detail:', error);
    throw error;
  }
};


export const getOrderItems = async (filter = null) => {
  try {
    const accessToken = localStorage.getItem('access_token'); // Retrieve the token

    // Prepare the request body with the filter
    const requestBody = {
      filter: filter,
    };

    const response = await axios.post(
      `${API_URL}/order_item/table`,  // Endpoint for order_item table
      requestBody,  // Send the filter in the body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the Authorization header
        },
      }
    );

    console.log(response.data)

    return response.data;  // Return the response data

  } catch (error) {
    console.error('Error fetching order items:', error); // Log any errors
    throw error;  // Propagate the error
  }
};


  
  

  
  














  
  
