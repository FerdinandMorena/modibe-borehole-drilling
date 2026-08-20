"use client";

import { useEffect, useRef, useState } from "react";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";
import {
  WORKS,
  formatDuration,
  workPoster,
  workSrc,
  type Work,
} from "@/lib/works";

/**
 * Gallery of real site footage. One clip plays at a time — seven phone videos
 * running at once would be unwatchable and would hammer the connection.
 *
 * `preload="none"` means only the poster JPEGs load up front (~380KB total);
 * the ~33MB of video is fetched on demand, when someone actually presses play.
 */
export default function WorksGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {WORKS.map((work, index) => (
        <Reveal key={work.id} delay={(index % 3) * 0.08}>
          <WorkCard
            work={work}
            isActive={activeId === work.id}
            onActivate={() =>
              setActiveId((current) => (current === work.id ? null : work.id))
            }
          />
        </Reveal>
      ))}
    </div>
  );
}

function WorkCard({
  work,
  isActive,
  onActivate,
}: {
  work: Work;
  isActive: boolean;
  onActivate: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [wasActive, setWasActive] = useState(isActive);

  // Every clip starts silent again once it stops, so playing a second one
  // never blasts audio unexpectedly. Adjusting during render rather than in
  // an effect avoids a wasted render pass with the old mute state.
  if (wasActive !== isActive) {
    setWasActive(isActive);
    if (!isActive) setMuted(true);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // Autoplay policies only allow this because the element starts muted and
      // the play is user-initiated; a rejected promise is not an error worth
      // surfacing, so the card just falls back to showing its poster.
      void video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <TiltCard className="rounded-panel" max={5}>
      {/*
        The card *is* the frame. The clips are 9:16 phone video, and a 9:16
        card plus a text block ran to ~820px in a three-up grid — far too tall
        to scan. Cropping to 4:5 and lifting the caption into the frame brings
        it to ~435px, and the copy gets out of the way while a clip plays.
      */}
      <article className="relative aspect-4/5 overflow-hidden rounded-panel border border-ocean-soft/15 bg-ocean-deep">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={workPoster(work.id)}
          preload="none"
          playsInline
          loop
          muted={muted}
        >
          <source src={workSrc(work.id)} type="video/mp4" />
          Your browser cannot play this video.
        </video>

        {/* Scrim behind the caption, cleared while the clip is playing. */}
        <div
          aria-hidden
          className={[
            "absolute inset-0 bg-linear-to-t from-ocean-deep via-ocean-deep/35 to-transparent",
            "transition-opacity duration-500 ease-water",
            isActive ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />

        {/* Press-to-play surface, covering the whole frame. */}
        <button
          type="button"
          onClick={onActivate}
          aria-label={isActive ? `Pause: ${work.title}` : `Play: ${work.title}`}
          className="group/play absolute inset-0 grid place-items-center focus-visible:outline-none"
        >
          <span
            className={[
              "grid h-14 w-14 place-items-center rounded-full border border-white/25",
              "bg-ocean-deep/55 text-white backdrop-blur-sm",
              "transition-all duration-400 ease-water",
              "group-hover/play:scale-110 group-hover/play:border-aqua group-hover/play:bg-ocean-deep/75",
              "group-focus-visible/play:ring-2 group-focus-visible/play:ring-aqua",
              isActive ? "scale-0 opacity-0" : "scale-100 opacity-100",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          </span>
        </button>

        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-ocean-deep/70 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[1.8px] text-aqua backdrop-blur-sm">
          {work.stage}
        </span>

        {isActive ? (
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-ocean-deep/70 text-white backdrop-blur-sm transition-colors hover:border-aqua hover:text-aqua"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5 6 9H3v6h3l5 4V5z" />
              {muted ? (
                <path d="M17 9l4 6m0-6l-4 6" />
              ) : (
                <path d="M15.5 8.5a5 5 0 010 7M18.5 6a9 9 0 010 12" />
              )}
            </svg>
          </button>
        ) : (
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ocean-deep/70 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white/80 backdrop-blur-sm">
            {formatDuration(work.duration)}
          </span>
        )}

        {/* Caption, in the frame. Steps aside while the clip plays. */}
        <div
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6",
            "transition-all duration-500 ease-water",
            isActive
              ? "translate-y-2 opacity-0"
              : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          <h3 className="font-display text-[19px] leading-snug text-white">
            {work.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-white/65">
            {work.caption}
          </p>
        </div>
      </article>
    </TiltCard>
  );
}
