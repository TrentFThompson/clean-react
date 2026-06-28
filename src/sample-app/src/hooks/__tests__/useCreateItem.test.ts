import { renderHook, act } from '@testing-library/react';
import { useCreateItem } from '../useCreateItem';
import { useDataContext, useLoggingContext } from '../../../../clean-react/react';

// Mock the context hooks
jest.mock('../../../../clean-react/react', () => ({
    useDataContext: jest.fn(),
    useLoggingContext: jest.fn(),
}));

describe('useCreateItem', () => {
    const mockDataService = { create: jest.fn() };
    const mockLoggingService = { info: jest.fn(), error: jest.fn() };

    beforeEach(() => {
        jest.clearAllMocks();
        (useDataContext as jest.Mock).mockReturnValue({ dataService: mockDataService });
        (useLoggingContext as jest.Mock).mockReturnValue({ loggingService: mockLoggingService });
    });

    it('creates an item, logs success, reloads, and toggles creating', async () => {
        mockDataService.create.mockResolvedValueOnce(undefined);
        const reload = jest.fn();

        const { result } = renderHook(() => useCreateItem());

        expect(result.current.creating).toBe(false);

        await act(async () => {
            await result.current.create('hello', reload);
        });

        expect(mockDataService.create).toHaveBeenCalledWith('items', { text: 'hello' });
        expect(mockLoggingService.info).toHaveBeenCalledWith('Created item', { text: 'hello' });
        expect(reload).toHaveBeenCalled();
        expect(result.current.creating).toBe(false);
    });

    it('logs error when creation fails', async () => {
        const error = new Error('boom');
        mockDataService.create.mockRejectedValueOnce(error);

        const reload = jest.fn();
        const { result } = renderHook(() => useCreateItem());

        await act(async () => {
            await result.current.create('fail', reload);
        });

        expect(mockLoggingService.error).toHaveBeenCalledWith('Failed to create item', {
            err: error,
        });
        expect(reload).not.toHaveBeenCalled();
    });
});
