"use client";

import { useEffect, useRef, useState } from "react";

const events = [
  {
    label: "Reception",
    date: "Wednesday, 26 August 2026",
    time: "7:30 PM onwards",
  },
  {
    label: "Wedding Muhurtham",
    date: "Thursday, 27 August 2026",
    time: "10:40 AM – 11:40 AM",
    note: "Lunch at 12:00 noon",
    icon: "❋",
  },
];

function InvitationMark() {
  return <div className="mark" aria-hidden="true">❦</div>;
}

function LoveAmpersand() {
  return (
    <svg className="love-ampersand" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <path d="M28 47C24.6 43.7 8 33.5 8 20.2 8 12.1 14 7 21 7c3.5 0 6.1 1.8 7 4.9C28.9 8.8 31.5 7 35 7c7 0 13 5.1 13 13.2C48 33.5 31.4 43.7 28 47Z" />
      <text x="28" y="36" textAnchor="middle">&amp;</text>
    </svg>
  );
}

function InitialPattern() {
  return <div className="initial-pattern" aria-hidden="true"><span>R ♥ S</span><span>R ♥ S</span><span>R ♥ S</span><span>R ♥ S</span><span>R ♥ S</span><span>R ♥ S</span><span>R ♥ S</span><span>R ♥ S</span><span>R ♥ S</span></div>;
}

const muhurtham = new Date("2026-08-27T10:40:00+05:30").getTime();
const initialTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
const venueMapUrl = "https://www.google.com/maps/dir/?api=1&destination=Sai+Srinivasa+Garden%2C+Ramanjaneyapuram%2C+Kadapa%2C+Andhra+Pradesh";
const venueLocationUrl = "https://www.google.com/maps/search/?api=1&query=Sai+Srinivasa+Garden%2C+Ramanjaneyapuram%2C+Kadapa%2C+Andhra+Pradesh";
const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function getTimeLeft() {
  const remaining = Math.max(0, muhurtham - Date.now());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  };
}

export default function Home() {
  const [showTop, setShowTop] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isInvitationOpening, setIsInvitationOpening] = useState(false);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [revealStep, setRevealStep] = useState(0);
  const musicRef = useRef<HTMLAudioElement>(null);
  const openingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => {
    if (openingTimerRef.current !== null) window.clearTimeout(openingTimerRef.current);
  }, []);

  useEffect(() => {
    if (!isInvitationOpen) return;
    const timings = [0, 440, 1040, 1500, 1930, 2540, 3190, 3740, 4210, 4740, 5220];
    const timers = timings.map((delay, step) => window.setTimeout(() => setRevealStep(step + 1), delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isInvitationOpen]);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;
    audio.volume = 0.28;
    void audio.play().then(() => setIsMusicPlaying(true)).catch(() => setIsMusicPlaying(false));
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.16 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const toggleMusic = async () => {
    const audio = musicRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch {
        setIsMusicPlaying(false);
      }
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  const openInvitation = async () => {
    if (isInvitationOpening || isInvitationOpen) return;
    setIsInvitationOpening(true);
    openingTimerRef.current = window.setTimeout(() => setIsInvitationOpen(true), 2800);
    const audio = musicRef.current;
    if (!audio || !audio.paused) return;
    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  };

  return (
    <main>
      <audio ref={musicRef} autoPlay loop preload="metadata" onPlay={() => setIsMusicPlaying(true)} onPause={() => setIsMusicPlaying(false)}>
        <source src={assetPath("/wedding-celebration.mp3")} type="audio/mpeg" />
      </audio>
      <section className={`invitation-entry ${isInvitationOpening ? "is-opening" : ""}`} aria-label="Wedding invitation introduction">
        <div className="entry-signature" aria-label="A message from Rathan and Sushma">
          <span>A message from</span>
          <strong>Rathan <LoveAmpersand /> Sushma</strong>
        </div>
        <p className="entry-subtitle">A joyful surprise awaits.</p>
        <button className="open-invitation" onClick={openInvitation}><span className="button-heart button-floral" aria-hidden="true">✾</span><span>Click to open</span></button>
        <p className="entry-reveal-note">With joy, we invite you to share in our celebration.</p>
      </section>
      <div className={`invitation-shell ${isInvitationOpen ? "is-open" : ""}`}>
      <nav className="nav" aria-label="Page navigation">
        <a href="#home" className="nav-brand" aria-label="R love S"><span>R</span><i aria-hidden="true">♥</i><span>S</span></a>
        <div className="nav-links">
          <a href="#details">Wedding details</a>
          <a href="#venue">Venue</a>
          <a href="#couple">Our story</a>
        </div>
      </nav>

      <section className="hero" id="home" data-reveal-step={revealStep}>
        <div className="hero-glow" />
        <div className="portrait portrait-groom" aria-hidden="true">
          <img src={assetPath("/rathan-hero-original.png")} alt="" loading="eager" />
        </div>
        <div className="portrait portrait-bride" aria-hidden="true">
          <img src={assetPath("/sushma-hero-original-cropped.png")} alt="" loading="eager" />
        </div>
        <p className="eyebrow">Om Sri Ganeshaya Namaha</p>
        <InvitationMark />
        <p className="hero-invite">With the blessings of our parents and elders</p>
        <h1><span>Rathan</span><i>&amp;</i><span>Sushma</span></h1>
        <p className="getting-married">are getting married</p>
        <p className="hero-date">Thursday · 27 August 2026</p>
        <div className="countdown" aria-label="Countdown to wedding muhurtham">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div className="countdown-unit" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className="countdown-note">Until the Muhurtham · 10:40 AM IST</p>
        <div className="mouse-scroll" aria-label="Scroll down for celebration details"><span /></div>
      </section>

      <section className="blessing reveal-on-scroll" id="blessings" aria-labelledby="blessing-title">
        <InitialPattern />
        <div className="section-shell">
          <InvitationMark />
          <p className="eyebrow">A warm invitation</p>
          <h2 id="blessing-title">Your presence and blessings<br /><em>would mean the world to us.</em></h2>
          <div className="fancy-divider" aria-hidden="true"><span /></div>
          <p className="family-signature"><span>Pothireddy</span><b>&amp;</b><strong>Manyam</strong><small>request the pleasure of your company</small></p>
          <p className="body-copy">With joy and gratitude, we invite you to share in Rathan and Sushma&apos;s beautiful new chapter.</p>
        </div>
      </section>

      <section className="families reveal-on-scroll" id="families" aria-label="Families">
        <InitialPattern />
        <div className="families-intro">
          <p className="eyebrow">The bride and groom</p>
          <h2>Two families, one<br /><em>auspicious beginning.</em></h2>
          <div className="fancy-divider" aria-hidden="true"><span /></div>
        </div>
        <div className="family-card">
          <p className="card-kicker">The groom</p>
          <h3>Rathan</h3>
          <p>S/o</p>
          <strong>Smt. Pothireddy Vijaya Lakshmi<br />&amp; Sri. Pothireddy Chinnapa Reddy</strong>
        </div>
        <div className="joiner" aria-hidden="true">❦</div>
        <div className="family-card">
          <p className="card-kicker">The bride</p>
          <h3>Sushma</h3>
          <p>D/o</p>
          <strong>Smt. Manyam Prabhavathi<br />&amp; Sri. Manyam Venkata Subba Reddy</strong>
        </div>
      </section>

      <section className="couple-feature reveal-on-scroll" id="couple" aria-labelledby="gallery-title">
        <div className="couple-photo" aria-hidden="true"><img src={assetPath("/rathan-sushma.jpg")} alt="" /></div>
        <div className="couple-copy">
          <p className="eyebrow">Together, always</p>
          <h2 id="gallery-title">Rathan <i>×</i> Sushma</h2>
          <p>Hand in hand, into a beautiful new chapter.</p>
        </div>
      </section>

      <section className="details-page reveal-on-scroll" id="details" aria-labelledby="details-title">
        <InitialPattern />
        <div className="details-header">
          <p className="eyebrow">Wedding details</p>
          <h2 id="details-title">A golden promise<br /><em>under Kadapa skies</em></h2>
          <InvitationMark />
        </div>
        <div className="ceremony-card">
          <aside className="muhurtham-panel">
            <p className="eyebrow">Wedding Muhurtham</p>
            <strong>10:40 AM</strong>
            <span>to</span>
            <strong>11:40 AM</strong>
            <p>Thursday<br />27 August 2026</p>
          </aside>
          <div className="details-list">
            <div><span>Date</span><strong>Thursday, 27 August 2026</strong></div>
            <div><span>Time</span><strong>10:40 AM to 11:40 AM</strong></div>
            <div><span>Lunch</span><p><strong>12:00 noon onwards</strong><small>Lunch will be served following the wedding ceremony.</small></p></div>
            <div><span>Venue</span><p><strong>Sai Srinivasa Garden</strong><small>Ramanjaneyapuram, Kadapa, Andhra Pradesh.</small></p></div>
          </div>
        </div>
        <div className="reception-panel">
          <div><p className="eyebrow">Reception</p><h3>Wednesday, 26 August 2026</h3></div>
          <p><strong>7:30 PM onwards</strong><span>An evening of celebration and blessings</span></p>
        </div>
      </section>

      <section className="venue reveal-on-scroll" id="venue" aria-labelledby="venue-title">
        <div className="venue-image" aria-hidden="true" />
        <InitialPattern />
        <div className="venue-card">
          <p className="eyebrow">Our venue</p>
          <InvitationMark />
          <p className="venue-invite">Join us at</p>
          <h2 id="venue-title">Sai Srinivasa Garden</h2>
          <div className="fancy-divider" aria-hidden="true"><span /></div>
          <p>Ramanjaneyapuram, Kadapa,<br />Andhra Pradesh</p>
          <a className="button button-light" href={venueMapUrl} target="_blank" rel="noreferrer">Get directions ↗</a>
          <a className="map-location-link" href={venueLocationUrl} target="_blank" rel="noreferrer">View venue on map ↗</a>
          <div className="venue-qr">
            <img src={assetPath("/venue-directions.svg")} alt="QR code that opens Google Maps directions to Sai Srinivasa Garden" />
            <div><strong>Scan for directions</strong></div>
          </div>
        </div>
      </section>

      <section className="closing">
        <InitialPattern />
        <InvitationMark />
        <h2>We look forward to<br /><em>celebrating with you.</em></h2>
        <div className="closing-countdown" aria-label="Countdown to wedding muhurtham">
          <p>Counting down to the Muhurtham</p>
          <div>
            {Object.entries(timeLeft).map(([label, value]) => (
              <span key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></span>
            ))}
          </div>
          <em>27 August 2026 · 10:40 AM IST</em>
        </div>
        <p>With love, from the Pothireddy &amp; Manyam families</p>
        <nav className="closing-links" aria-label="Invitation navigation">
          <a href="#home">Home</a>
          <a href="#blessings">Blessings</a>
          <a href="#families">Families</a>
          <a href="#couple">Our story</a>
          <a href="#details">Details</a>
          <a href="#venue">Venue</a>
        </nav>
      </section>

      <button className="music-toggle" type="button" onClick={toggleMusic} aria-pressed={isMusicPlaying} aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}><span aria-hidden="true">{isMusicPlaying ? "❚❚" : "▶"}</span>{isMusicPlaying ? "Pause music" : "Play music"}</button>
      {showTop && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>}
      </div>
    </main>
  );
}
