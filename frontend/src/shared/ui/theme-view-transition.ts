type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Run theme DOM update inside a View Transition when supported (top → bottom wipe in CSS). */
export function runThemeViewTransition(applyTheme: () => void): void {
  if (prefersReducedMotion()) {
    applyTheme();
    return;
  }

  const doc = document as ViewTransitionDocument;
  if (!doc.startViewTransition) {
    applyTheme();
    return;
  }

  doc.startViewTransition(() => {
    applyTheme();
  });
}
