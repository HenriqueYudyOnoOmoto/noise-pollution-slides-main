import React from 'react';
import { SlideData } from '@/types';
import { SoundWaveIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/IconComponents';

interface SlideCardProps {
  slide: SlideData;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalSlides: number;
  isVerticalLayout: boolean;
}

const getAccent = (prefix: string, color: string) => `${prefix}-${color}`;

const styles = {
  container: 'animation-fadeIn bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden w-full flex flex-col',
  imageWrapper: 'relative w-full flex-shrink-0',
  image: 'object-cover w-full aspect-[3/1]',
  content: 'flex flex-col flex-grow min-h-0',
  contentInner: {
    default: 'flex-grow overflow-y-auto text-slate-700 dark:text-slate-300 p-6 md:p-8',
    firstNoImage: 'flex flex-col items-center justify-center text-center pt-10 pb-6 px-6 md:pt-12 md:pb-8 md:px-8 text-slate-700 dark:text-slate-300 flex-grow overflow-y-auto'
  },
  title: 'font-bold text-slate-800 dark:text-white leading-tight',
  titleSize: 'text-[clamp(1.875rem,5vw,2.5rem)] md:text-[clamp(2.25rem,5.5vw,3rem)]',
  divider: 'h-px w-full my-3 md:my-4',
  slideNumber: 'text-[clamp(0.8rem,1.8vw,0.875rem)] font-semibold mt-1 mb-3',
  paragraph: 'text-[clamp(0.9rem,2.2vw,1rem)] sm:text-[clamp(1rem,2.5vw,1.125rem)] mb-6 leading-relaxed',
  pointsList: 'space-y-3',
  pointsListFirst: 'inline-block text-left text-base sm:text-lg',
  pointIcon: 'mr-3 mt-1 flex-shrink-0',
  pointText: 'text-[clamp(0.8rem,2vw,0.875rem)] sm:text-[clamp(0.875rem,2.2vw,1rem)] leading-relaxed',
  navBar: 'flex-shrink-0',
  navWrapper: 'p-3 sm:p-4 flex items-center justify-between',
  navBtn: 'flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800',
  navBtnPrev: 'bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 dark:hover:text-white text-slate-600 hover:text-slate-900 hover:bg-slate-200 focus:ring-sky-500',
  navBtnNext: 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500',
  navText: 'hidden sm:inline text-sm font-medium',
  navIndex: 'text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium',
};

const SlideCard: React.FC<SlideCardProps> = ({
  slide, onPrev, onNext, currentIndex, totalSlides, isVerticalLayout,
}) => {
  const accentBorderColor = getAccent('border', slide.accentColor);
  const accentTextColor = getAccent('text', slide.accentColor);
  const accentBgColor = getAccent('bg', slide.accentColor);

  const isFirst = currentIndex === 0;
  const hasImage = Boolean(slide.image);
  const isFirstNoImage = isFirst && !hasImage;

  return (
    <div className={styles.container}>
      {hasImage && (
        <div className={styles.imageWrapper}>
          <img
            src={slide.image}
            alt={slide.title}
            className={styles.image}
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        </div>
      )}
      <div className={styles.content}>
        <div
          className={
            isFirstNoImage
              ? styles.contentInner.firstNoImage
              : styles.contentInner.default
          }
        >
          <h1
            className={[
              styles.titleSize,
              styles.title,
              (!isFirst || hasImage) && 'mb-1',
              isFirst && hasImage && !isVerticalLayout && 'text-center'
            ].filter(Boolean).join(' ')}
          >
            {slide.title}
          </h1>

          {(!isFirst || isFirstNoImage) && (
            <div className={`${accentBgColor} ${styles.divider}`} />
          )}

          {!isFirst && (
            <p className={[
              styles.slideNumber,
              accentTextColor,
              isFirst && hasImage && !isVerticalLayout && 'text-center'
            ].filter(Boolean).join(' ')}
            >
              {slide.slideNumberText.toUpperCase()}
            </p>
          )}

          {slide.mainParagraph && (
            <p className={[
              styles.paragraph,
              isFirstNoImage && 'text-lg'
            ].filter(Boolean).join(' ')}
            >
              {slide.mainParagraph}
            </p>
          )}

          {slide.points && slide.points.length > 0 && (
            <ul className={[
              styles.pointsList,
              isFirstNoImage && styles.pointsListFirst
            ].filter(Boolean).join(' ')}
            >
              {slide.points.map((point, idx) => (
                <li key={idx} className="flex items-start">
                  <span className={`${styles.pointIcon} ${accentTextColor}`}>
                    <SoundWaveIcon className="w-5 h-5" />
                  </span>
                  <span className={styles.pointText}>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={`${accentBorderColor} border-t-4 bg-white dark:bg-slate-800 ${styles.navBar}`}>
        <div className={styles.navWrapper}>
          <button
            onClick={onPrev}
            className={[styles.navBtn, styles.navBtnPrev].join(' ')}
            aria-label="Slide Anterior"
          >
            <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className={styles.navText}>Anterior</span>
          </button>
          <div className={styles.navIndex}>
            {currentIndex + 1} / {totalSlides}
          </div>
          <button
            onClick={onNext}
            className={[styles.navBtn, styles.navBtnNext].join(' ')}
            aria-label="Próximo Slide"
          >
            <span className={styles.navText}>Próximo</span>
            <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
