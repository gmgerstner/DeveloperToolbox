import { Link } from 'react-router';
import type { ReactNode } from 'react';
import './Home.css';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  path: string;
  badge?: string;
  icon: ReactNode;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'data-parser',
    title: 'Data Parser',
    description: 'Transform and convert raw delimited data into C#, JSON, XML, SQL, LaTeX, or HTML tables with customizable mappings.',
    path: '/data-parser',
    badge: 'Converter',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m3 15 2 2 4-4" />
        <path d="m3 20 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'qr-codes',
    title: 'QR Code Generator',
    description: 'Create high-resolution custom QR codes for URLs, WiFi networks, vCards, SMS, direct phone dials, emails, and map coordinates.',
    path: '/qr-codes',
    badge: 'Generator',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
        <path d="M21 21v.01" />
        <path d="M12 7v3a2 2 0 0 1-2 2H7" />
        <path d="M3 12h.01" />
        <path d="M12 3h.01" />
        <path d="M12 16v.01" />
        <path d="M16 12h1" />
        <path d="M21 12v.01" />
        <path d="M12 21v-1" />
      </svg>
    ),
  },
  {
    id: 'string-encoder',
    title: 'String Encoder / Decoder',
    description: 'Encode, decode, and hash strings seamlessly with Base64, Base32, URL encoding, HTML entities, SHA-512, and line sorting.',
    path: '/string-encoder',
    badge: 'Security & Text',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
  {
    id: 'guid-generator',
    title: 'GUID Generator',
    description: 'Generate bulk cryptographically secure RFC 4122 Version 4 UUIDs and GUIDs formatted with standard hyphens, braces, or uppercase.',
    path: '/guid-generator',
    badge: 'Utility',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M9 18h6" />
        <path d="M10 7h4" />
        <path d="M12 7v5" />
      </svg>
    ),
  },
  {
    id: 'bootstrap-forms',
    title: 'Bootstrap Form Generator',
    description: 'Quickly scaffold responsive Bootstrap 5 HTML forms, input groups, floating labels, check boxes, and validation markup.',
    path: '/bootstrap-forms',
    badge: 'UI Scaffold',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: 'string-length',
    title: 'String Length & Analysis',
    description: 'Inspect comprehensive real-time statistics including character counts, word density, line totals, and UTF-8 byte calculations.',
    path: '/string-length',
    badge: 'Analysis',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
        <path d="m14.5 12.5 2-2" />
        <path d="m11.5 9.5 2-2" />
        <path d="m8.5 6.5 2-2" />
        <path d="m17.5 15.5 2-2" />
      </svg>
    ),
  },
  {
    id: 'string-builder',
    title: 'String Builder',
    description: 'Process and assemble multi-line strings with automated prefixing, suffixing, quotation enclosing, and custom delimiter joins.',
    path: '/string-builder',
    badge: 'Text Tool',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="10" y1="20" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: 'relative-path',
    title: 'Relative Path Calculator',
    description: 'Calculate and normalize relative path navigation between two absolute file system paths or directory URLs with cross-platform support.',
    path: '/relative-path',
    badge: 'Filesystem',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        <path d="M8 13h8" />
        <path d="m12 9 4 4-4 4" />
      </svg>
    ),
  },
  {
    id: 'lorem-ipsum',
    title: 'Lorem Ipsum Generator',
    description: 'Generate customizable placeholder text by paragraph, sentence, or word count with optional HTML tag wrapping and clipboard export.',
    path: '/lorem-ipsum',
    badge: 'Placeholder',
    icon: (
      <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="container home">
      <header className="row justify-content-center text-center mb-4">
        <div className="col-lg-8">
          <h1 className="home-title">Developer Toolbox</h1>
          <p className="home-subtitle">
            An offline-first, client-side suite of productivity utilities for software engineers and data analysts.
            Select a tool below to get started.
          </p>
        </div>
      </header>

      <section className="row g-4 justify-content-center" aria-label="Developer Tools">
        {FEATURE_CARDS.map((tool) => (
          <div key={tool.id} className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="card feature-card position-relative h-100 w-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="feature-icon-wrapper" aria-hidden="true">
                    {tool.icon}
                  </div>
                  {tool.badge && (
                    <span className="badge feature-badge rounded-pill">{tool.badge}</span>
                  )}
                </div>
                <h2 className="card-title feature-card-title h5 mb-2">{tool.title}</h2>
                <p className="card-text feature-card-description flex-grow-1 text-muted mb-4">
                  {tool.description}
                </p>
                <div className="mt-auto">
                  <Link
                    to={tool.path}
                    className="btn btn-outline-primary stretched-link w-100 feature-action-btn d-inline-flex align-items-center justify-content-center gap-2"
                  >
                    <span>Open {tool.title}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}