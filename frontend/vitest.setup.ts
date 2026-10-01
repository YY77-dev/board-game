import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// globals を使わない設定なので、テストごとの後片付けを明示的に登録する
afterEach(() => {
    cleanup();
});

// 以下は jsdom にない API の代わり。Mantine の一部コンポーネントが必要とする。
// 内容は Mantine 公式の Vitest ガイドに沿っている。
const { getComputedStyle } = window;
window.getComputedStyle = (elt: Element) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

if (!document.fonts) {
    Object.defineProperty(document, 'fonts', {
        writable: true,
        value: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
    });
}

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
