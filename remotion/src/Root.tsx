import React from 'react';
import { Composition } from 'remotion';
import { ILensIntro, ILensIntroTikTok } from './ILensIntro';
import { ProductShowcase, SHOWCASE_DURATION } from './ProductShowcase/ProductShowcase';
import { productShowcaseSchema } from './ProductShowcase/schema';
import { casinoPreset, jewelryPreset, portofinoPreset, serumPreset } from './ProductShowcase/presets';
import { TipReel, tipReelDuration } from './TipReel/TipReel';
import { tipReels } from './TipReel/presets';
import { AiShowcase, AI_SHOWCASE_FRAMES } from './AiShowcase/AiShowcase';
import { aiShowcases } from './AiShowcase/presets';
import { DesignThinking, DESIGN_THINKING_FRAMES } from './DesignThinking/DesignThinking';
import { FollowReel, FOLLOW_REEL_FRAMES } from './FollowReel/FollowReel';
import { EbookReel, EBOOK_REEL_FRAMES } from './EbookReel/EbookReel';
import { ClaudeReel, ClaudeReelCover, CLAUDE_REEL_FRAMES } from './ClaudeReel/ClaudeReel';
import { claudeReels } from './ClaudeReel/presets';
import { ChatGPTAdsReel, CHATGPT_REEL_FRAMES } from './ChatGPTReel/ChatGPTReel';
import { CourseLesson, lessonDuration } from './Course/CourseLesson';
import { courseLessons } from './Course/lessons';

const SHOWCASES = [
  { id: 'ProductShowcase-Serum', props: serumPreset },
  { id: 'ProductShowcase-Jewelry', props: jewelryPreset },
  { id: 'ProductShowcase-Portofino', props: portofinoPreset },
  { id: 'ProductShowcase-Casino', props: casinoPreset },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ILensIntro"
        component={ILensIntro}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* TikTok cut: same vertical canvas, shorter 30f intro, 4s total (120f) */}
      <Composition
        id="ILensIntroTikTok"
        component={ILensIntroTikTok}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* ProductShowcase — 15s product reel template, one composition per demo preset */}
      {SHOWCASES.map(({ id, props }) => (
        <Composition
          key={id}
          id={id}
          component={ProductShowcase}
          schema={productShowcaseSchema}
          defaultProps={props}
          durationInFrames={SHOWCASE_DURATION}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
      {/* TipReel — 16s teaching reel (hook → 3 tips → DM us PROMPTS) for TikTok / Reels */}
      {tipReels.map(({ id, props }) => (
        <Composition
          key={id}
          id={id}
          component={TipReel}
          defaultProps={props}
          durationInFrames={tipReelDuration(props.tips.length)}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
      {/* Same reels on cream: TipReel-<name>-Light */}
      {tipReels.map(({ id, props }) => (
        <Composition
          key={`${id}-Light`}
          id={`${id}-Light`}
          component={TipReel}
          defaultProps={{ ...props, light: true }}
          durationInFrames={tipReelDuration(props.tips.length)}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
      {/* AiShowcase — 10s "Made with AI" clip around an AI-generated landscape video */}
      {aiShowcases.map(({ id, props }) => (
        <Composition
          key={id}
          id={id}
          component={AiShowcase}
          defaultProps={props}
          durationInFrames={AI_SHOWCASE_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
      {/* DesignThinking — ~37s reel: five design-thinking stages, each with a typed prompt → DM us PROMPTS */}
      <Composition
        id="DesignThinking"
        component={DesignThinking}
        durationInFrames={DESIGN_THINKING_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* FollowReel — 12s invite to follow @ilens.co: Reels/Stories (9:16) and a feed-post cut (4:5) */}
      <Composition id="ChatGPTAdsReel" component={ChatGPTAdsReel} defaultProps={{ light: false }} durationInFrames={CHATGPT_REEL_FRAMES} fps={30} width={1080} height={1920} />
      <Composition id="ChatGPTAdsReel-Light" component={ChatGPTAdsReel} defaultProps={{ light: true, hook: 'Get your business *recommended by ChatGPT.*' }} durationInFrames={CHATGPT_REEL_FRAMES} fps={30} width={1080} height={1920} />
      <Composition id="FollowReel" component={FollowReel} defaultProps={{ feed: false }} durationInFrames={FOLLOW_REEL_FRAMES} fps={30} width={1080} height={1920} />
      {/* EbookReel — ~16s launch reel for the Claude × Remotion guide (9:16 + 4:5) */}
      <Composition id="EbookReel" component={EbookReel} defaultProps={{ feed: false }} durationInFrames={EBOOK_REEL_FRAMES} fps={30} width={1080} height={1920} />
      <Composition id="EbookReel-Feed" component={EbookReel} defaultProps={{ feed: true }} durationInFrames={EBOOK_REEL_FRAMES} fps={30} width={1080} height={1350} />
      <Composition id="FollowReel-Feed" component={FollowReel} defaultProps={{ feed: true }} durationInFrames={FOLLOW_REEL_FRAMES} fps={30} width={1080} height={1350} />
      {/* ClaudeReel — ~30s: AI talking clip with word captions → Claude prompt → code → render → CTA */}
      {claudeReels.map(({ id, props, cover }) => (
        <React.Fragment key={id}>
          <Composition id={id} component={ClaudeReel} defaultProps={props} durationInFrames={CLAUDE_REEL_FRAMES} fps={30} width={1080} height={1920} />
          <Composition id={`${id}-Cover`} component={ClaudeReelCover} defaultProps={cover} durationInFrames={1} fps={30} width={1080} height={1920} />
        </React.Fragment>
      ))}
      {/* iLens Academy — 16:9 course lessons (PL + EN), narration-timed; -Cover = platform thumbnail */}
      {courseLessons.map(({ id, props }) => (
        <React.Fragment key={id}>
          <Composition id={id} component={CourseLesson} defaultProps={props} durationInFrames={lessonDuration(props)} fps={30} width={1920} height={1080} />
          <Composition id={`${id}-Cover`} component={CourseLesson} defaultProps={{ ...props, cover: true }} durationInFrames={1} fps={30} width={1920} height={1080} />
        </React.Fragment>
      ))}
    </>
  );
};
