import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'filevexa_recent_tools';
const MAX_RECENT = 4;

/**
 * Safely retrieve recent tools from localStorage (SSR-safe)
 */
export function getRecentTools() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Record a tool visit into localStorage and notify other components
 */
export function recordRecentTool(tool) {
  if (typeof window === 'undefined' || !tool || !tool.href) return;
  try {
    const existing = getRecentTools();
    const filtered = existing.filter((item) => item.href !== tool.href);
    const updated = [
      {
        id: tool.id || tool.href,
        title: tool.title,
        href: tool.href,
        icon: tool.icon || '⚡',
        category: tool.category || '',
      },
      ...filtered,
    ].slice(0, MAX_RECENT);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('recent-tools-updated', { detail: updated })
    );
  } catch {
    // Gracefully handle storage quotas or disabled storage
  }
}

/**
 * Clear all recent tools from localStorage
 */
export function clearRecentTools() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent('recent-tools-updated', { detail: [] })
    );
  } catch {
    // Ignore
  }
}

/**
 * React hook for consuming and reacting to recent tools state
 */
export function useRecentTools() {
  const [recentTools, setRecentTools] = useState([]);

  useEffect(() => {
    // Initialize on client mount to avoid SSR hydration mismatches
    setRecentTools(getRecentTools());

    const handleUpdate = (e) => {
      setRecentTools(e.detail || []);
    };

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setRecentTools(getRecentTools());
      }
    };

    window.addEventListener('recent-tools-updated', handleUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('recent-tools-updated', handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const clear = useCallback(() => {
    clearRecentTools();
  }, []);

  return {
    recentTools,
    clearRecentTools: clear,
    recordRecentTool,
  };
}
