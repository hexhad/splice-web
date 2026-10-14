import type { Metadata } from "next";
import "../site.css";
import "./privacy.css";
import { HexhadLockup } from "../_components/Hexhad";
import { CONTACT_EMAIL, PLAY_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Splice collects no personal data. It asks for no permissions and has no internet access.",
};

const UPDATED = "14 October 2026";

export default function Privacy() {
  return (
    <>
      <header className="bar wrap">
        <a href="/" className="wordmark" aria-label="Splice, home">
          Splice
        </a>
        <a className="btn bar-btn" href={PLAY_URL}>
          Get Splice
        </a>
      </header>

      <main className="policy wrap">
        <h1 className="display policy-title">Privacy policy</h1>
        <p className="statement policy-lede">
          Splice collects nothing about you. It asks for no permissions, it has no internet access, and your audio
          stays on your phone unless you choose to save or share it somewhere else.
        </p>
        <p className="small soft">
          For the Splice app for Android (com.hexhad.splice), made by HEXHAD Studios. Last updated {UPDATED}.
        </p>

        <div className="policy-body">
          <h2>What Splice collects</h2>
          <p>
            Nothing. Splice does not collect, store on a server, sell or share any personal or sensitive data. It has no
            accounts, no sign-in, no advertising, no analytics and no crash reporting, and it includes no third-party
            code that does any of these.
          </p>

          <h2>Permissions</h2>
          <p>
            Splice declares no Android permissions. It cannot read your storage, use the microphone or camera, see your
            location or contacts, or connect to the internet. The build of the app fails if any permission is added, so
            this cannot change by accident.
          </p>

          <h2>Your audio files</h2>
          <ul>
            <li>
              Files reach Splice only when you pick them in Android&rsquo;s system file picker, or open them with
              &ldquo;Edit in Splice&rdquo; from another app. Splice sees only the files you choose.
            </li>
            <li>
              To keep a project working if the original file moves, Splice keeps its own copy of the audio in the
              app&rsquo;s private storage on your phone. Other apps cannot read it.
            </li>
            <li>
              Your projects and settings are stored in the same private storage. They are excluded from Android
              backups, so they are not copied to Google Drive or another device.
            </li>
            <li>
              A file leaves Splice only when you export it and save it to a place you pick, or share it with an app you
              pick. What happens to it after that is governed by that place or app.
            </li>
          </ul>

          <h2>Deleting your data</h2>
          <p>
            Delete a project from the Splice home screen to remove it and its copy of the audio. Settings shows how much
            space imported audio and temporary files use, and lets you clear temporary files. Uninstalling Splice
            removes everything it stored. Because nothing is sent to us, there is nothing for us to delete on our side.
          </p>

          <h2>Google Play</h2>
          <p>
            Splice is installed through Google Play. Google may collect information about the download and install
            under its own privacy policy, which HEXHAD Studios does not control and does not receive personal data from.
          </p>

          <h2>Children</h2>
          <p>
            Splice collects no data from anyone, so it collects none from children.
          </p>

          <h2>Changes</h2>
          <p>
            If a future version of Splice ever handles data differently, this page will be updated before that version
            is released, and the date at the top will change.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy go to{" "}
            <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </main>

      <footer className="policy-foot wrap">
        <HexhadLockup size={26} />
        <p className="small soft">© 2026 HEXHAD Studios</p>
      </footer>
    </>
  );
}
