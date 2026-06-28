import { renderHook, act } from '@testing-library/react';
import { useItems } from '../useItems';
import { useDataContext, useLoggingContext } from '../../../../clean-react/react';

// Mock the context hook
jest.mock('../../../../clean-react/react', () => ({
    useDataContext: jest.fn(),
    useLoggingContext: jest.fn(),
}));

describe('useItems', () => {
    const mockDataService = { list: jest.fn() };
    const mockLoggingService = { info: jest.fn(), error: jest.fn() };

    beforeEach(() => {
        jest.clearAllMocks();
        (useDataContext as jest.Mock).mockReturnValue({ dataService: mockDataService });
        (useLoggingContext as jest.Mock).mockReturnValue({ loggingService: mockLoggingService });
    });

    it('loads items on mount', async () => {
        mockDataService.list.mockResolvedValueOnce([
            { id: '1', text: 'A' },
            { id: '2', text: 'B' },
        ]);

        const { result } = renderHook(() => useItems());

        expect(result.current.loading).toBe(true);

        await act(async () => {
            await Promise.resolve();
        });

        expect(result.current.items).toEqual([
            { id: '1', text: 'A' },
            { id: '2', text: 'B' },
        ]);
        expect(result.current.loading).toBe(false);
    });

    it('reload fetches new items', async () => {
        mockDataService.list.mockResolvedValueOnce([{ id: '1', text: 'A' }]);

        const { result } = renderHook(() => useItems());

        await act(async () => Promise.resolve());

        mockDataService.list.mockResolvedValueOnce([{ id: '2', text: 'C' }]);

        await act(async () => {
            await result.current.reload();
        });

        expect(result.current.items).toEqual([{ id: '2', text: 'C' }]);
    });
});
