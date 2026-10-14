"use client";

import { useId, useState } from "react";
import { formatTime } from "@/lib/wave";

const START = `intro-music.m4a  0:18
interview-take-2.wav  4:36
room-tone.wav  0:06
outro.m4a  0:22`;

const COLOURS = ["#b14500", "#0f8a7e", "#c2305c", "#2675c4", "#4d7c0f", "#a3249a"];

type File = { name: string; seconds: number };

function parse(text: string): File[] {
  return text
    .split("\n")
    .map((line) => line.trim().match(/^(.+?)\s+(\d{1,2}):([0-5]\d)$/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => ({ name: m[1], seconds: Number(m[2]) * 60 + Number(m[3]) }))
    .filter((f) => f.seconds > 0)
    .slice(0, 6);
}

export function JoinDemo() {
  const [text, setText] = useState(START);
  const id = useId();
  const files = parse(text);
  const total = files.reduce((s, f) => s + f.seconds, 0);
  let at = 0;

  return (
    <div className="join">
      <div className="join-in">
        <label htmlFor={id} className="small join-label">
          Your files, in the order you pick them. Edit the names or lengths.
        </label>
        <textarea
          id={id}
          value={text}
          spellCheck={false}
          rows={6}
          onChange={(e) => setText(e.target.value)}
          className="join-text"
        />
        <h2 className="heading join-h join-h-left rise">
          Several files<span className="sr"> become one recording</span>
        </h2>
      </div>

      <div className="join-out">
        <div data-ui className="joined rise" style={{ ["--d" as string]: "120ms" }}>
          <div className="joined-head">
            <span>Main track</span>
            <span className="mono">{formatTime(total, false)}</span>
          </div>
          <div className="joined-bar" aria-label={`${files.length} files joined, ${formatTime(total, false)} in all`}>
            {files.map((f, i) => (
              <span
                key={`${f.name}-${i}`}
                style={{ flexGrow: f.seconds, background: COLOURS[i % COLOURS.length] }}
                title={f.name}
              />
            ))}
          </div>
          <ol className="joined-list">
            {files.map((f, i) => {
              const start = at;
              at += f.seconds;
              return (
                <li key={`${f.name}-${i}`}>
                  <i style={{ background: COLOURS[i % COLOURS.length] }} />
                  <span className="joined-name">{f.name}</span>
                  <span className="mono soft">from {formatTime(start, false)}</span>
                </li>
              );
            })}
          </ol>
          {files.length === 0 ? <p className="small soft">Write a line like “voice-note.m4a 1:20”.</p> : null}
          <p className="joined-foot small">Joined in order. Each seam gets a 2 ms fade, so nothing clicks.</p>
        </div>
        <p className="heading join-h join-h-right rise" aria-hidden>
          one recording
        </p>
      </div>
    </div>
  );
}
