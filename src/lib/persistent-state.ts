import { useCallback, useState, type Dispatch, type SetStateAction } from 'react';

/**
 * State that survives a page being unmounted, e.g. when the user switches to
 * another tool in the toolbar and comes back. Values are kept in memory and
 * mirrored to sessionStorage, so they also survive a reload of the browser tab
 * but are not shared with other tabs.
 */

const PREFIX = 'developer-toolbox:';
const memory = new Map<string, unknown>();

function read<T>(key: string, initial: T): T {
  if (memory.has(key)) {
    return memory.get(key) as T;
  }
  try {
    const raw = window.sessionStorage.getItem(PREFIX + key);
    if (raw !== null) {
      const value = JSON.parse(raw) as T;
      memory.set(key, value);
      return value;
    }
  } catch {
    // Storage unavailable or value unreadable: fall back to the default.
  }
  return initial;
}

function write(key: string, value: unknown): void {
  memory.set(key, value);
  try {
    window.sessionStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage unavailable or full: the in-memory copy still works.
  }
}

/** Like `useState`, but the value is remembered under `key` across unmounts. */
export function usePersistentState<T>(
  key: string,
  initial: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    read(key, typeof initial === 'function' ? (initial as () => T)() : initial),
  );

  const setPersistent = useCallback<Dispatch<SetStateAction<T>>>(
    (action) => {
      setValue((prev) => {
        const next =
          typeof action === 'function' ? (action as (prev: T) => T)(prev) : action;
        write(key, next);
        return next;
      });
    },
    [key],
  );

  return [value, setPersistent];
}

/**
 * Forgets every value stored under `prefix` (e.g. 'qr.' clears 'qr.type',
 * 'qr.text.content', ...). Components already mounted keep their current
 * state, so remount them (for example by changing their `key`) afterwards.
 */
export function clearPersistentState(prefix: string): void {
  for (const key of [...memory.keys()]) {
    if (key.startsWith(prefix)) {
      memory.delete(key);
    }
  }
  try {
    const storage = window.sessionStorage;
    for (let i = storage.length - 1; i >= 0; i--) {
      const key = storage.key(i);
      if (key?.startsWith(PREFIX + prefix)) {
        storage.removeItem(key);
      }
    }
  } catch {
    // Storage unavailable: nothing persisted there.
  }
}
