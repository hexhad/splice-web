import "./site.css";
import { CutDemo } from "./_components/CutDemo";
import { ExportSheet } from "./_components/ExportSheet";
import { HexhadLockup } from "./_components/Hexhad";
import { JoinDemo } from "./_components/JoinDemo";
import { LocalTime } from "./_components/LocalTime";
import { Motion } from "./_components/Motion";
import { Questions } from "./_components/Questions";
import { Stages } from "./_components/Stages";
import { ToolList } from "./_components/ToolList";
import { CONTACT_EMAIL, PLAY_URL, STUDIO_URL } from "@/lib/links";

const FAMILY = ["NotchPal", "BarQR", "Droid Transfer", "MirrorMe"];

export default function Home() {
  return (
    <>
      <Motion />
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="bar wrap">
        <a href="/" className="wordmark" aria-label="Splice, home">
          Splice
        </a>
        <nav aria-label="Main" className="bar-nav">
          <a href="#tools">Tools</a>
          <a href="#how">How it works</a>
          <a href="#questions">Questions</a>
          <a href="/privacy">Privacy</a>
        </nav>
        <a className="btn bar-btn" href={PLAY_URL}>
          Get Splice
        </a>
      </header>

      <main id="main">
        <section className="hero wrap" data-hero>
          <div className="hero-words">
            <h1 className="display">
              <span className="mask">
                <span>Mark the parts.</span>
              </span>
              <span className="mask">
                <span style={{ ["--d" as string]: "110ms" }}>Cut them at once.</span>
              </span>
            </h1>
            <div className="after-mask">
              <p className="statement hero-sentence">
                Splice is an audio editor for Android that works entirely on your phone. No permissions, no internet,
                no account.
              </p>
              <div className="hero-actions">
                <a className="btn" href={PLAY_URL}>
                  Get it on Google Play
                </a>
                <a className="link" href="#how">
                  See how it works
                </a>
              </div>
            </div>
          </div>
          <div className="hero-demo after-mask">
            <CutDemo />
            <p className="small soft hero-try">Try it: drag across the recording, then press Delete.</p>
          </div>
        </section>

        <section aria-label="Joining files" className="show">
          <JoinDemo />
        </section>

        <section id="tools" className="tools-sec wrap" aria-label="Tools">
          <div className="rise">
            <ToolList />
          </div>
        </section>

        <section id="how" className="how" aria-label="How it works">
          <Stages />
        </section>

        <section id="questions" className="qa-sec wrap" aria-label="Questions">
          <Questions />
        </section>

        <section className="close" aria-label="Get Splice">
          <div className="close-words">
            <h2 className="close-line rise">
              Your file,
              <br />
              your phone.
            </h2>
            <p className="close-sentence rise" style={{ ["--d" as string]: "90ms" }}>
              Splice installs from Google Play and runs on Android 8.0 and newer. Nothing to sign up for.
            </p>
          </div>
          <div className="close-sheet rise" style={{ ["--d" as string]: "160ms" }}>
            <ExportSheet />
          </div>
        </section>
      </main>

      <footer className="tiles" aria-label="Footer">
        <div className="tile tile-statement rise" style={{ ["--d" as string]: "0ms" }}>
          <p className="tile-big">
            Splice is made by HEXHAD, a small studio of tools for people who ship apps.
          </p>
          <p className="small soft">© 2026 HEXHAD Studios. Android is a trademark of Google LLC.</p>
        </div>
        <nav className="tile tile-nav rise" style={{ ["--d" as string]: "60ms" }} aria-label="Footer">
          <a href="#tools">Tools</a>
          <a href="#how">How it works</a>
          <a href="#questions">Questions</a>
          <a href="/privacy">Privacy policy</a>
        </nav>
        <div className="tile tile-family rise" style={{ ["--d" as string]: "120ms" }}>
          <p className="small soft">Also from HEXHAD</p>
          <ul>
            {FAMILY.map((p) => (
              <li key={p}>
                <a href={STUDIO_URL}>{p}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="tile tile-mail rise" style={{ ["--d" as string]: "180ms" }}>
          <p className="small soft">
            Sri Lanka, <LocalTime />
          </p>
          <a className="tile-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="tile tile-word rise" style={{ ["--d" as string]: "90ms" }}>
          <HexhadLockup size={40} className="tile-lockup" />
          <span className="tile-splice" aria-hidden>
            Splice
          </span>
        </div>
        <a className="tile tile-go rise" style={{ ["--d" as string]: "180ms" }} href={PLAY_URL}>
          <span>Get Splice on Google Play</span>
          <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden>
            <path d="M12 36 36 12M16 12h20v20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </footer>
    </>
  );
}
