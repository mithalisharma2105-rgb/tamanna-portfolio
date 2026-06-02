import React, { useState, useRef } from 'react';

export default function App() {
  const [playingReel, setPlayingReel] = useState(null);
  const [mutedReels, setMutedReels] = useState({ 0: false, 1: false, 2: false, 3: false });
  
  // Video element references for your 4 custom reels
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoClick = (index) => {
    const currentVideo = videoRefs[index].current;
    if (!currentVideo) return;

    if (playingReel === index) {
      currentVideo.pause();
      setPlayingReel(null);
    } else {
      // Pause all other videos automatically
      videoRefs.forEach((ref, idx) => {
        if (ref.current && idx !== index) {
          ref.current.pause();
        }
      });
      currentVideo.play().catch(err => console.log("Playback interrupted:", err));
      setPlayingReel(index);
    }
  };

  const toggleMute = (e, index) => {
    e.stopPropagation(); // Stops video from pausing when clicking mute
    const video = videoRefs[index].current;
    if (video) {
      video.muted = !video.muted;
      setMutedReels(prev => ({ ...prev, [index]: video.muted }));
    }
  };

  const handleMailLaunch = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=tanishaupadhyay21@gmail.com', '_blank');
  };

  // CORRECTED: Pointing exactly to public/videos/ using simple renamed paths
  const reelsData = [
    { 
      src: '/videos/pcos-strength.mp4', 
      title: 'PCOS Strength Training', 
      desc: 'High-retention rhythmic cuts & text styling.' 
    },
    { 
      src: '/videos/pcos-swaps.mp4', 
      title: 'Hormonal Diet Swaps', 
      desc: 'Seamless visual matching and micro sound engineering.' 
    },
    { 
      src: '/videos/pcos-mood.mp4', 
      title: 'Mind & Mood Narrative', 
      desc: 'Emotive slow pacing and heavy engagement hooks.' 
    },
    { 
      src: '/videos/pcos-wins.mp4', 
      title: 'PCOS Tiny Wins Timeline', 
      desc: 'Dynamic text tracking built for high watch times.' 
    }
  ];

  return (
    <>
      {/* CREATIVE VISUALS & ANIMATION ENGINE */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        body {
          background-color: #040108;
          color: #f3f4f6;
          overflow-x: hidden;
        }

        /* Ambient Pulsing Background Orbs */
        .ambient-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .orb-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(0,0,0,0) 70%);
          top: -100px;
          left: -100px;
          animation: floatOrb 10s ease-in-out infinite alternate;
        }

        .orb-2 {
          position: absolute;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(0,0,0,0) 70%);
          bottom: -100px;
          right: -100px;
          animation: floatOrb 15s ease-in-out infinite alternate-reverse;
        }

        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 30px) scale(1.1); }
        }

        /* FLOATING CREATIVE PLATFORM BADGES - LAYERED BEHIND TEXT */
        .badges-container-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .badge-floating {
          position: absolute;
          padding: 10px 18px;
          background: rgba(15, 7, 25, 0.6);
          border: 1px solid rgba(147, 51, 234, 0.25);
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          backdrop-filter: blur(8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        .badge-canva {
          top: 15%;
          left: 5%;
          border-color: rgba(0, 196, 204, 0.4);
          animation: floatAnimation 5s ease-in-out infinite alternate;
        }

        .badge-capcut {
          top: 25%;
          right: 5%;
          border-color: rgba(255, 255, 255, 0.3);
          animation: floatAnimation 6s ease-in-out infinite alternate 0.5s;
        }

        .badge-instagram {
          bottom: 20%;
          left: 8%;
          border-color: rgba(225, 48, 108, 0.4);
          animation: floatAnimation 5.5s ease-in-out infinite alternate 1s;
        }

        .badge-reels {
          bottom: 15%;
          right: 7%;
          border-color: rgba(168, 85, 247, 0.4);
          animation: floatAnimation 7s ease-in-out infinite alternate 0.2s;
        }

        .badge-camera {
          top: 45%;
          left: 3%;
          border-color: rgba(192, 132, 252, 0.4);
          animation: floatAnimation 4.8s ease-in-out infinite alternate 0.7s;
        }

        @keyframes floatAnimation {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(3deg); }
        }

        /* Header Entrance Animation */
        .animate-entrance {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Glassmorphic Navigation bar */
        .premium-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(4, 1, 8, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(147, 51, 234, 0.12);
          padding: 22px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
        }

        .nav-button {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          margin-left: 32px;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-button:hover { color: #c084fc; }
        .nav-button::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(90deg, #7c3aed, #c084fc);
          transition: transform 0.3s ease;
        }
        .nav-button:hover::after { transform: scaleX(1); }

        /* Premium Buttons */
        .action-btn-primary {
          padding: 14px 34px;
          border-radius: 50px;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: #ffffff;
          border: none;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 4px 25px rgba(124, 58, 237, 0.25);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .action-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 35px rgba(124, 58, 237, 0.45);
        }

        .action-btn-secondary {
          padding: 14px 34px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.02);
          color: #e5e7eb;
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(168, 85, 247, 0.3);
          transform: translateY(-3px);
        }

        /* 9:16 Vertical Responsive Layout */
        .reels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 25px;
          margin-top: 50px;
        }

        .reel-viewport {
          background: #000;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 9 / 16;
          border: 1px solid rgba(147, 51, 234, 0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
        }

        .reel-viewport:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(168, 85, 247, 0.5);
        }

        .reel-native-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* HUD Overlays */
        .video-hud-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.8));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
          opacity: 1;
          transition: background 0.3s ease;
        }

        .active-playback .video-hud-overlay {
          background: linear-gradient(transparent, rgba(0,0,0,0.65));
        }

        .playback-state-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          transition: transform 0.2s, opacity 0.3s;
        }
        .active-playback .playback-state-icon { opacity: 0; transform: scale(0.8); }

        .mute-toggle-widget {
          align-self: flex-end;
          background: rgba(4, 1, 8, 0.6);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          backdrop-filter: blur(4px);
          transition: background 0.2s;
        }
        .mute-toggle-widget:hover { background: rgba(147, 51, 234, 0.8); }

        .layout-container-block {
          padding: 100px 30px;
          max-width: 1140px;
          margin: 0 auto;
          position: relative;
        }

        .hero-text-content-wrap {
          position: relative;
          z-index: 10; /* Keeps text layered above background graphics */
          max-width: 800px;
          margin: 0 auto;
        }

        .glass-contact-plate {
          background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(147, 51, 234, 0.15);
          border-radius: 24px;
          padding: 50px 30px;
          backdrop-filter: blur(10px);
          max-width: 700px;
          margin: 40px auto 0 auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, rgba(147, 51, 234, 0) 0%, rgba(147, 51, 234, 0.25) 50%, rgba(147, 51, 234, 0) 100%);
          max-width: 900px;
          margin: 0 auto;
        }
      `}</style>

      {/* BACKGROUND GRAPHICS */}
      <div className="ambient-bg">
        <div className="orb-1"></div>
        <div className="orb-2"></div>
      </div>

      <div style={{ position: 'relative', minHeight: '100vh', zIndex: 5 }}>
        
        {/* PREMIUM FIXED NAVBAR */}
        <nav className="premium-navbar">
          <div 
            onClick={() => scrollToSection('hero')} 
            style={{ fontWeight: '800', fontSize: '22px', letterSpacing: '0.5px', color: '#ffffff', cursor: 'pointer' }}
          >
            TAMANNA<span style={{ color: '#a855f7' }}>VISUALS</span>
          </div>
          <div>
            <button onClick={() => scrollToSection('about')} className="nav-button">About</button>
            <button onClick={() => scrollToSection('projects')} className="nav-button">Work</button>
            <button onClick={() => scrollToSection('contact')} className="nav-button">Contact</button>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section id="hero" className="layout-container-block animate-entrance" style={{ paddingTop: '190px', textAlign: 'center', position: 'relative' }}>
          
          {/* SAFE FLOATING BADGES FIELD */}
          <div className="badges-container-layer">
            <div className="badge-floating badge-canva">✨ Canva</div>
            <div className="badge-floating badge-capcut">🎬 CapCut</div>
            <div className="badge-floating badge-instagram">📸 Instagram</div>
            <div className="badge-floating badge-reels">⚡ Reels</div>
            <div className="badge-floating badge-camera">📷 Camera</div>
          </div>

          <div className="hero-text-content-wrap">
            <div style={{
              display: 'inline-block',
              padding: '6px 18px',
              borderRadius: '100px',
              backgroundColor: 'rgba(147, 51, 234, 0.08)',
              border: '1px solid rgba(147, 51, 234, 0.25)',
              color: '#c084fc',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Available for Strategic Video Scaling
            </div>
            
            <h1 style={{ fontSize: '58px', fontWeight: '800', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-1px', color: '#ffffff' }}>
              Bringing Stories To Life Through <br />
              <span style={{ background: 'linear-gradient(90deg, #c084fc, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Cinematic Editing
              </span>
            </h1>
            
            <p style={{ color: '#9ca3af', fontSize: '19px', maxWidth: '640px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
              High-retention video editor specializing in transforming raw footage into engaging, professional, and scroll-stopping digital experiences.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button onClick={() => scrollToSection('projects')} className="action-btn-primary">View My Work</button>
              <button onClick={() => scrollToSection('contact')} className="action-btn-secondary">Let's Talk</button>
            </div>
          </div>
        </section>

        <div className="divider-line"></div>

        {/* ABOUT PROFILE SECTION */}
        <section id="about" className="layout-container-block" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '13px', color: '#a855f7', letterSpacing: '3px', marginBottom: '12px', fontWeight: '700' }}>
            // BACKGROUND
          </h2>
          <h3 style={{ fontSize: '34px', fontWeight: '700', color: '#ffffff', marginBottom: '24px' }}>
            Crafting visual rhythm out of chaos.
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '17px', lineHeight: '1.8', maxWidth: '760px', margin: '0 auto' }}>
            I am a passionate Video Editor and Digital Creator dedicated to helping creators, brands, and agencies scale their online presence. By mixing calculated pacing, rich sound design, and crisp styling, I make sure every project grabs attention instantly.
          </p>
        </section>

        <div className="divider-line"></div>

        {/* WORKING PORTFOLIO GRID WINDOW */}
        <section id="projects" className="layout-container-block">
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '13px', color: '#a855f7', letterSpacing: '3px', marginBottom: '12px', fontWeight: '700' }}>
              // PORTFOLIO
            </h2>
            <h3 style={{ fontSize: '34px', fontWeight: '700', color: '#ffffff' }}>Featured Cinematic Edits</h3>
            <p style={{ color: '#9ca3af', marginTop: '10px', fontSize: '15px' }}>Click on any vertical card below to seamlessly run or pause video playback.</p>
          </div>

          <div className="reels-grid">
            {reelsData.map((reel, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  className={`reel-viewport ${playingReel === index ? 'active-playback' : ''}`}
                  onClick={() => handleVideoClick(index)}
                >
                  <video 
                    ref={videoRefs[index]}
                    className="reel-native-video"
                    src={reel.src}
                    loop 
                    playsInline
                    preload="metadata"
                  />
                  <div className="video-hud-overlay">
                    <button className="mute-toggle-widget" onClick={(e) => toggleMute(e, index)}>
                      {mutedReels[index] ? '🔇' : '🔊'}
                    </button>
                    
                    <div className="playback-state-icon">
                      {playingReel === index ? (
                        <div style={{ width: '14px', height: '14px', display: 'flex', gap: '4px' }}>
                          <div style={{ width: '4px', height: '100%', background: '#fff' }}></div>
                          <div style={{ width: '4px', height: '100%', background: '#fff' }}></div>
                        </div>
                      ) : (
                        <div style={{ width: '0', height: '0', borderStyle: 'solid', borderWidth: '8px 0 8px 14px', borderColor: 'transparent transparent transparent #fff', marginLeft: '3px' }}></div>
                      )}
                    </div>

                    <div style={{ padding: '4px 0' }}>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>{reel.title}</div>
                      <div style={{ fontSize: '12px', color: '#cbd5e1', opacity: 0.9 }}>{reel.desc}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider-line"></div>

        {/* SECURE CONTACT HUD */}
        <section id="contact" className="layout-container-block" style={{ paddingBottom: '160px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '13px', color: '#a855f7', letterSpacing: '3px', marginBottom: '12px', fontWeight: '700' }}>
            // CONNECTION HUB
          </h2>
          <h3 style={{ fontSize: '38px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
            Let’s Build Something Iconic
          </h3>
          
          <div className="glass-contact-plate">
            <p style={{ color: '#e5e7eb', fontSize: '17px', marginBottom: '35px', lineHeight: '1.6' }}>
              Ready to elevate your conversion or scale your content production values? Reach out directly via the connection nodes below.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#a855f7', fontSize: '18px' }}>✉</span>
                <a href="mailto:tanishaupadhyay21@gmail.com" style={{ color: '#c084fc', fontSize: '18px', fontWeight: '600', textDecoration: 'none' }}>
                  tanishaupadhyay21@gmail.com
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#a855f7', fontSize: '18px' }}>📞</span>
                <a href="tel:+919347988964" style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', textDecoration: 'none', letterSpacing: '0.5px' }}>
                  +91 93479 88964
                </a>
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <button 
                onClick={handleMailLaunch} 
                className="action-btn-primary"
              >
                Launch Direct Mail
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}