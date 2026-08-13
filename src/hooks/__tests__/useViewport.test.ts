import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useViewport } from '../useViewport';

describe('useViewport', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should populate width on client mount', () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => useViewport());

    expect(result.current.width).toBe(1200);
  });

  it('should identify mobile layout when width < 768px', () => {
    window.innerWidth = 375;
    const { result } = renderHook(() => useViewport());

    expect(result.current.width).toBe(375);
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isDesktopLarge).toBe(false);
  });

  it('should identify tablet layout when 768px <= width < 1024px', () => {
    window.innerWidth = 768;
    const { result } = renderHook(() => useViewport());

    expect(result.current.width).toBe(768);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isDesktopLarge).toBe(false);
  });

  it('should identify desktop layout when 1024px <= width < 1440px', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useViewport());

    expect(result.current.width).toBe(1024);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isDesktopLarge).toBe(false);
  });

  it('should identify desktopLarge layout when width >= 1440px', () => {
    window.innerWidth = 1440;
    const { result } = renderHook(() => useViewport());

    expect(result.current.width).toBe(1440);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isDesktopLarge).toBe(true);
  });

  it('should update viewport state when window resize event is triggered', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useViewport());

    expect(result.current.isMobile).toBe(false);
    expect(result.current.isDesktop).toBe(true);

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });
});
