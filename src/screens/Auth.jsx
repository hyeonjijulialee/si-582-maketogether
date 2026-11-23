import React, { useState } from 'react'
import { useApp, Icon, Img, Back, Field, Dots } from '../ui.jsx'

const Logo = ({ size = 96 }) => <img src="logo.svg" width={size} height={size} alt="MakeTogether logo" style={{ borderRadius: size * 0.27 }} />

export function Landing() {
  const { go } = useApp()
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="center pad" style={{ paddingTop: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><Logo size={104} /></div>
        <h1 className="blue" style={{ font: '600 40px/48px var(--font-head)', marginTop: 20 }}>MakeTogether</h1>
        <p className="p4 muted" style={{ marginTop: 8, whiteSpace: 'nowrap', fontSize: 'min(16px, 4.1vw)' }}>Learn new tools. Borrow with confidence.<br />Make things together.</p>
      </div>
      <div style={{ position: 'relative', marginTop: 28, flex: 1, minHeight: 280 }}>
        <svg viewBox="0 0 402 90" preserveAspectRatio="none" style={{ position: 'absolute', top: -1, left: 0, width: '100%', height: 70, zIndex: 1 }}>
          <path d="M0 0 H402 V40 C330 85 260 20 190 50 C120 80 60 30 0 60 Z" fill="var(--bg)" />
        </svg>
        <Img src="img/landing-makerspace.jpg" icon="handyman" h="100%" style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div className="pad stack" style={{ '--gap': '12px', padding: '24px 24px 40px', background: 'var(--bg)' }}>
        <button className="btn btn-primary" onClick={() => go('welcome')}>Sign Up</button>
        <button className="btn btn-outline" onClick={() => go('login')}>Log In</button>
      </div>
    </div>
  )
}

export function Welcome() {
  const { go } = useApp()
  const features = [
    ['search', 'Find step-by-step guides', 'Setup help for every tool you borrow.'],
    ['forum', 'See comments and tips', 'Advice from fellow library makers.'],
    ['smart_display', 'Videos and articles', 'Short tutorials for first-timers.'],
    ['favorite', 'Favorite guides', 'Save tools and guides for later.'],
    ['help', 'Help', 'Get unstuck when something goes wrong.'],
  ]
  return (
    <div className="pad" style={{ paddingBottom: 40 }}>
      <h1 className="h1" style={{ marginTop: 8 }}>Welcome to <span className="blue">MakeTogether!</span></h1>
      <Img src="img/welcome-community.jpg" icon="groups" h={180} r={22} style={{ marginTop: 16 }} />
      <div className="list" style={{ marginTop: 18 }}>
        {features.map(([icon, title, sub]) => (
          <div key={title} className="list-row" style={{ padding: '13px 16px' }}>
            <span className="section-icon"><Icon name={icon} /></span>
            <div className="grow"><p className="h6">{title}</p><p className="p6 faint">{sub}</p></div>
          </div>
        ))}
      </div>
      <div style={{ margin: '22px 0 16px' }}><Dots at={0} /></div>
      <button className="btn btn-primary" onClick={() => go('signup')}>Let’s Go <Icon name="arrow_forward" /></button>
    </div>
  )
}

export function SignUp() {
  const { go } = useApp()
  const [agree, setAgree] = useState(true)
  return (
    <div className="pad" style={{ paddingBottom: 40 }}>
      <Back />
      <p className="label blue" style={{ marginTop: 8 }}>MakeTogether</p>
      <h1 className="h1">Create Account</h1>
      <p className="p4 muted" style={{ marginTop: 4 }}>Find tools. Plan projects. Build more together.</p>
      <div className="stack" style={{ marginTop: 24 }}>
        <Field label="Name" icon="person" placeholder="Jane Doe" />
        <Field label="Email" icon="mail" type="email" placeholder="example@gmail.com" />
        <Field label="New Password" icon="lock" type="password" placeholder="Create a password" />
      </div>
      <button className="row" style={{ marginTop: 18, alignItems: 'flex-start', gap: 12, textAlign: 'left' }} onClick={() => setAgree(!agree)}>
        <span className={`checkbox ${agree ? 'on' : ''}`}>{agree && <Icon name="check" />}</span>
        <span className="p6 muted"><b>Disclosure Statement:</b> MakeTogether is a student prototype. It does not connect to your Ann Arbor District Library account or confirm tool availability.</span>
      </button>
      <div style={{ margin: '26px 0 16px' }}><Dots at={1} /></div>
      <button className="btn btn-primary" onClick={() => go('library?onboarding=1')}>Sign Up</button>
      <p className="p5 center muted" style={{ marginTop: 18 }}>Already have an account? <button className="link" onClick={() => go('login')}>Log In</button></p>
    </div>
  )
}

export function LogIn() {
  const { go, replace } = useApp()
  return (
    <div className="pad" style={{ paddingBottom: 40 }}>
      <Back />
      <div className="center" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><Logo size={72} /></div>
        <h1 className="h1" style={{ marginTop: 16 }}>Welcome Back!</h1>
        <p className="p4 muted">Log in to continue</p>
      </div>
      <div className="stack" style={{ marginTop: 28 }}>
        <Field label="Email" icon="mail" type="email" placeholder="you@example.com" />
        <Field label="Password" icon="lock" type="password" placeholder="Enter your password" />
      </div>
      <div style={{ textAlign: 'right', marginTop: 12 }}><button className="link" style={{ fontSize: 14 }} onClick={() => go('forgot')}>Forgot Password?</button></div>
      <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => replace('home')}>Log In</button>
      <div className="divider" style={{ margin: '24px 0' }}>or</div>
      <p className="p4 center muted">New here? <button className="link" onClick={() => go('welcome')}>Create Account</button></p>
    </div>
  )
}

export function Forgot() {
  const { back } = useApp()
  const [sent, setSent] = useState(false)
  return (
    <div className="pad" style={{ paddingBottom: 40 }}>
      <Back />
      <div className="center" style={{ marginTop: 28 }}>
        <div style={{ width: 132, height: 132, borderRadius: '50%', background: 'var(--cream)', margin: '0 auto', display: 'grid', placeItems: 'center' }}>
          <Icon name={sent ? 'mark_email_read' : 'lock_reset'} size={64} className="blue" />
        </div>
        <h1 className="h1" style={{ marginTop: 24 }}>{sent ? 'Check Your Email' : 'Forgot Password'}</h1>
        <p className="p4 muted" style={{ marginTop: 6 }}>
          {sent ? 'We sent reset instructions to jane.doe@example.com.' : 'No worries, we’ll send you reset instructions.'}
        </p>
      </div>
      {!sent && <div style={{ marginTop: 28 }}><Field label="Email" icon="mail" type="email" placeholder="jane.doe@example.com" /></div>}
      <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => (sent ? back() : setSent(true))}>
        {sent ? 'Back to Log In' : 'Send Reset Link'}
      </button>
      {!sent && <p className="center" style={{ marginTop: 20 }}><button className="link" onClick={back}>Back to Log In</button></p>}
    </div>
  )
}
