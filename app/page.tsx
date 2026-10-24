import "./site.css";
import { CutDemo } from "./_components/CutDemo";
import { ExportSheet } from "./_components/ExportSheet";
import { HexhadLockup } from "./_components/Hexhad";
import { JoinDemo } from "./_components/JoinDemo";
import { LocalTime } from "./_components/LocalTime";
import { Questions } from "./_components/Questions";
import { MaskedLines, Reveal } from "./_components/Reveal";
import { SpliceIcon } from "./_components/SpliceIcon";
import { Stages } from "./_components/Stages";
import { ToolList } from "./_components/ToolList";
import { CONTACT_EMAIL, PLAY_URL } from "@/lib/links";

const FAMILY = [
  { name: "NotchPal", href: "https://notch-pal-nine.vercel.app" },
  { name: "BarQR", href: "https://barqr-site.vercel.app" },
  { name: "Droid Transfer", href: "https://droid-transfer-web.vercel.app" },
  { name: "MirrorMe", href: "https://mirror-me-web.vercel.app" },
  { name: "DiskKeeper", href: "https://disk-keeper-web.vercel.app" },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="top">
        <div className="bar glass">
        <a href="/" className="wordmark" aria-label="Splice, home">
          <SpliceIcon size={32} className="wordmark-icon" />
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
        </div>
      </header>

      <main id="main">
        <section className="hero wrap">
          <div className="hero-words">
            <MaskedLines className="display" lines={["Mark the parts.", "Cut them at once."]} />
            <Reveal onLoad delay={0.42} y={12} className="hero-copy">
              <p className="statement hero-sentence">
                Splice is an audio editor for Android that works entirely on your phone. No internet, no account, and the
                microphone only when you record.
              </p>
              <div className="hero-actions">
                <a className="btn" href={PLAY_URL}>
                  Get it on Google Play
                </a>
                <a className="link" href="#how">
                  See how it works
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal onLoad delay={0.5} y={32} className="hero-demo">
            <CutDemo />
            <p className="small soft hero-try">Try it: drag across the recording, then press Delete.</p>
          </Reveal>
        </section>

        <section aria-label="Joining files" className="show">
          <JoinDemo />
        </section>

        <section id="tools" className="tools-sec wrap" aria-label="Tools">
          <Reveal>
            <ToolList />
          </Reveal>
        </section>

        <section id="how" className="how" aria-label="How it works">
          <Stages />
        </section>

        <section id="questions" className="qa-sec wrap" aria-label="Questions">
          <Questions />
        </section>

        <section className="close" aria-label="Get Splice">
          <div className="close-words">
            <Reveal as="h2" className="close-line">
              Your file,
              <br />
              your phone.
            </Reveal>
            <Reveal as="p" className="close-sentence" delay={0.09}>
              Splice installs from Google Play and runs on Android 8.0 and newer. Nothing to sign up for.
            </Reveal>
          </div>
          <Reveal className="close-sheet" delay={0.16} y={40}>
            <ExportSheet />
          </Reveal>
        </section>
      </main>

      <footer className="tiles" aria-label="Footer">
        <Reveal as="div" className="tile glass tile-statement" delay={0.0}>
          <p className="tile-big">
            Splice is made by HEXHAD, a small studio of tools for people who ship apps.
          </p>
          <p className="small soft">© 2026 HEXHAD Studios. Android is a trademark of Google LLC.</p>
        </Reveal>
        <Reveal as="nav" className="tile glass tile-nav" delay={0.06} aria-label="Footer">
          <a href="#tools">Tools</a>
          <a href="#how">How it works</a>
          <a href="#questions">Questions</a>
          <a href="/privacy">Privacy policy</a>
        </Reveal>
        <Reveal as="div" className="tile glass tile-family" delay={0.12}>
          <p className="small soft">Also from HEXHAD</p>
          <ul>
            {FAMILY.map((p) => (
              <li key={p.name}>
                <a href={p.href}>{p.name}</a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal as="div" className="tile glass tile-mail" delay={0.18}>
          <p className="small soft">
            Sri Lanka, <LocalTime />
          </p>
          <a className="tile-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </Reveal>
        <Reveal as="div" className="tile glass tile-word" delay={0.09}>
          <HexhadLockup size={40} className="tile-lockup" />
          <span className="tile-splice" aria-hidden>
            <SpliceIcon className="tile-splice-icon" />
            Splice
          </span>
        </Reveal>
        <Reveal as="a" className="tile glass tile-go" delay={0.18} href={PLAY_URL}>
          <span>Get Splice on Google Play</span>
          <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden>
            <path d="M12 36 36 12M16 12h20v20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Reveal>
      </footer>
    </>
  );
}
