import axios from 'axios';
import { UpdateRequestModel, BulkUpdateRequestModel, GetResponseModel } from '@/types';

const baseUrl = 'http://localhost:3000';
// Function to fetch data from the JSON file
export async function getData(): Promise<GetResponseModel> {
  try {
    const response = await axios.get(baseUrl + '/api/tabs');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

// Function to post data to the server
export async function updateData(request: UpdateRequestModel): Promise<void> {
  try {
    const response = await axios.put(baseUrl +'/api/tabs', request);
    return response.data;
  } catch (error) {
    throw new Error('Failed to put data');
  }
}

// Function to post data to the server
export async function bulkUpdate(request: BulkUpdateRequestModel): Promise<void> {
  try {
    const response = await axios.post(baseUrl +'/api/tabs', request);
    return response.data;
  } catch (error) {
    throw new Error('Failed to put data');
  }
}

export async function getStatus(): Promise<boolean> {
  try {
    const response = await axios.get(baseUrl +'/api/tabs/status');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch status');
  }
}
