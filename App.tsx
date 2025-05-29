import React, { useState, useCallback, useEffect } from 'react';
import { SLIDES_DATA } from '@/constants';
import { SlideData } from '@/types';
import SlideCard from '@/components/SlideCard';

const styles = {
  app: 'min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-900 flex flex-col items-center justify-center p-2 sm:p-4 font-sans',
  main: 'w-full max-w-[min(95%,1280px)] mx-auto flex-grow min-h-[500px] sm:min-h-[600px] py-4 sm:py-6 flex items-center',
  footer: 'w-full max-w-[min(95%,1280px)] mx-auto py-2 sm:py-3 flex items-center justify-center',
  footerText: 'text-xs text-slate-500 dark:text-slate-400',
};

function useVerticalLayout(threshold = 4 / 3) {
  const getLayout = () => window.innerWidth / window.innerHeight <= threshold;
  const [isVertical, setIsVertical] = useState(
    typeof window !== 'undefined' ? getLayout() : true
  );

  useEffect(() => {
    const handleResize = () => setIsVertical(getLayout());
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [threshold]);

  return isVertical;
}

function useSlideKeyboardNavigation(onPrev: () => void, onNext: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext]);
}

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <p className={styles.footerText}>
      Use as setas do teclado para navegar.
    </p>
  </footer>
);

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = SLIDES_DATA.length;
  const isVerticalLayout = useVerticalLayout();

  const goToNextSlide = useCallback(
    () => setCurrentSlideIndex(idx => (idx + 1) % totalSlides),
    [totalSlides]
  );

  const goToPrevSlide = useCallback(
    () => setCurrentSlideIndex(idx => (idx - 1 + totalSlides) % totalSlides),
    [totalSlides]
  );

  useSlideKeyboardNavigation(goToPrevSlide, goToNextSlide);

  const currentSlide: SlideData = SLIDES_DATA[currentSlideIndex];

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <SlideCard
          key={currentSlide.id}
          slide={currentSlide}
          onPrev={goToPrevSlide}
          onNext={goToNextSlide}
          currentIndex={currentSlideIndex}
          totalSlides={totalSlides}
          isVerticalLayout={isVerticalLayout}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
