import axios from 'axios';
import { getData, updateData, bulkUpdate, getStatus } from '@/services/api';

jest.mock('axios'); // Mock axios module

describe('API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update data on the server', async () => {
    const request = { 
        id: '1',
        tabId: 'tab-id',
        isActive: true
    };
    (axios.put as jest.Mock).mockResolvedValueOnce({});

    await updateData(request);

    expect(axios.put).toHaveBeenCalledWith('/api/tabs', request);
  });

  it('should perform bulk update on the server', async () => {
    const request = { 
        allEnabled: false
     };
    (axios.post as jest.Mock).mockResolvedValueOnce({});

    await bulkUpdate(request);

    expect(axios.post).toHaveBeenCalledWith('/api/tabs', request);
  });

  it('should fetch status from the server', async () => {
    const status = true; 
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: status });

    const result = await getStatus();

    expect(axios.get).toHaveBeenCalledWith('/api/tabs/status');
    expect(result).toEqual(status);
  });

  it('should throw an error when data fetch fails', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Test error'));

    await expect(getData()).rejects.toThrow('Failed to fetch data');
  });

});
