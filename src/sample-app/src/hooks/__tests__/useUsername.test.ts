import { renderHook, act } from '@testing-library/react';
import { useUsername } from '../useUsername';
import { useAuthContext } from '../../../../clean-react/react';

// Mock the context hook
jest.mock('../../../../clean-react/react', () => ({
    useAuthContext: jest.fn(),
}));

describe('useUsername', () => {
    const mockAuthService = { getSession: jest.fn() };

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuthContext as jest.Mock).mockReturnValue({ authService: mockAuthService });
    });

    it('loads username from authService.getSession', async () => {
        mockAuthService.getSession.mockResolvedValueOnce({
            user: { name: 'Trent' },
        });

        const { result } = renderHook(() => useUsername());

        expect(result.current).toBe('');

        await act(async () => Promise.resolve());

        expect(result.current).toBe('Trent');
    });

    it('falls back to empty string when no user exists', async () => {
        mockAuthService.getSession.mockResolvedValueOnce(null);

        const { result } = renderHook(() => useUsername());

        await act(async () => Promise.resolve());

        expect(result.current).toBe('');
    });

    it('does not update state after unmount', async () => {
        mockAuthService.getSession.mockResolvedValueOnce({
            user: { name: 'Ghost' },
        });

        const { result, unmount } = renderHook(() => useUsername());
        unmount();

        await act(async () => Promise.resolve());

        expect(result.current).toBe('');
    });

    it('handles missing user.name gracefully', async () => {
        mockAuthService.getSession.mockResolvedValueOnce({
            user: {},
        });

        const { result } = renderHook(() => useUsername());

        await act(async () => Promise.resolve());

        expect(result.current).toBe('');
    });
});
