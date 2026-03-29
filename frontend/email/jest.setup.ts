import "@testing-library/jest-dom";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

global.requestAnimationFrame = (cb: FrameRequestCallback): number => {
  return window.setTimeout(() => cb(Date.now()), 0);
};

global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};
