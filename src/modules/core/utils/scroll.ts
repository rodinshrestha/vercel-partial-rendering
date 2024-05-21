export const scrollToSection = (target: string, offset: number = 0) => {
  const element = document.querySelector(target);
  if (!element) {
    console.error('Target element not found');
    return;
  }
  const targetedSection =
    element.getBoundingClientRect().top + window.scrollY + offset;

  window.scrollTo({ top: targetedSection, behavior: 'smooth' });
};
