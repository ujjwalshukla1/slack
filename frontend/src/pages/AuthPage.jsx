import { SignInButton } from "@clerk/clerk-react";
import "../styles/auth.css";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-hero">
          <div className="brand-container">
            <img src="/logo.png" alt="Slap" className="brand-logo" />
            <span className="brand-name">Slap</span>
          </div>
          <h1 className="hero-title">Where Work Happens✨</h1>
          <p className="hero-subtitle">
            All-in-one workspace for your team. Connect with your team instantly
            through secure, real-time messaging.
          </p>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span className="feature-text">Real-time Messaging</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span className="feature-text">Secure Communication</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📁</span>
              <span className="feature-text">File Sharing</span>
            </div>
          </div>
          <SignInButton mode="modal">
            <button className="cta-button">
              Get Started with Slap
              <span className="button-arrow">🚀</span>
            </button>
          </SignInButton>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-image-container">
          <img
            src="/auth-i.png"
            alt="Team Collaboration"
            className="auth-image"
          />
          <div className="image-overlay" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
