import type { AudioTrack, CourseLessonProps, LessonLang } from './CourseLesson';
import m01l01 from './lessons/m01-l01.json';
import m01l01Audio from './lessons/m01-l01.audio.json';
import m01l02 from './lessons/m01-l02.json';
import m01l02Audio from './lessons/m01-l02.audio.json';
import m01l03 from './lessons/m01-l03.json';
import m01l03Audio from './lessons/m01-l03.audio.json';

type Lesson = { id: string; pl: LessonLang; en: LessonLang };
type Audio = { pl: AudioTrack; en: AudioTrack };

// iLens PRO: 4 modules × 3 lessons. Short-lesson drafts of module 01 live in ./lessons-archive.
const LESSONS = [
  [m01l01, m01l01Audio], [m01l02, m01l02Audio], [m01l03, m01l03Audio],
] as unknown as [Lesson, Audio][];

/** Light theme: Course-M01-L01-PL, Course-M01-L01-EN (+ "-Cover" stills). */
export const courseLessons: { id: string; props: CourseLessonProps }[] = LESSONS.flatMap(([lesson, audio]) =>
  (['pl', 'en'] as const).map((lang) => ({
    id: `Course-${lesson.id}-${lang.toUpperCase()}`,
    props: { lesson: lesson[lang], audio: audio[lang], light: true },
  })),
);
