import { useState } from 'react'
import {
  ArrowDownToLine, ArrowRight, Check, Copy, ExternalLink, Facebook,
  Globe2, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck,
  UserRound, Youtube, MessageCircle, CreditCard, MapPinned
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { CardProfile, SocialKey } from './profiles'
import { profiles } from './profiles'

function TikTokIcon({ size = 24, ...props }: LucideProps) {
  const path = 'M12.53 2h3.2c.17 1.45.83 2.74 1.87 3.68 1.02.94 2.38 1.44 3.83 1.49v3.24a10.7 10.7 0 0 1-5.42-1.55v7.04a6.9 6.9 0 1 1-6.9-6.9c.48 0 .95.05 1.4.15v3.4a3.58 3.58 0 1 0 2.03 3.23V2Z'
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d={path} fill="#25F4EE" transform="translate(-1 1)"/>
    <path d={path} fill="#FE2C55" transform="translate(1 -0.5)"/>
    <path d={path} fill="currentColor"/>
  </svg>
}

function MessengerIcon({ size = 24, ...props }: LucideProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path fill="#0866FF" d="M12 2C6.48 2 2 6.15 2 11.27c0 2.91 1.45 5.43 3.72 7.08.2.15.34.39.35.65l.08 2.14c.02.53.57.87 1.05.65l2.39-1.05c.2-.09.42-.1.63-.04.57.16 1.17.24 1.78.24 5.52 0 10-4.15 10-9.27S17.52 2 12 2Z"/>
    <path fill="#fff" d="m5.6 13.95 5.1-5.4c.44-.47 1.19-.41 1.55.12l1.7 2.54c.3.45.93.59 1.39.29l3.02-1.96-5.1 5.4c-.44.47-1.19.41-1.55-.12l-1.7-2.54c-.3-.45-.93-.59-1.39-.29L5.6 13.95Z"/>
  </svg>
}

const socialMeta: Record<SocialKey, { label: string; Icon: typeof Facebook | typeof TikTokIcon }> = {
  facebook: { label: 'Facebook', Icon: Facebook },
  instagram: { label: 'Instagram', Icon: Instagram },
  tiktok: { label: 'TikTok', Icon: TikTokIcon },
  linkedin: { label: 'LinkedIn', Icon: Linkedin },
  youtube: { label: 'YouTube', Icon: Youtube },
  whatsapp: { label: 'WhatsApp', Icon: MessageCircle },
  googleBusiness: { label: 'Google Business', Icon: MapPinned },
}
const safeLink = (raw?: string) => {
  if (!raw) return undefined
  try { const u = new URL(raw); return ['https:', 'http:'].includes(u.protocol) ? u.toString() : undefined }
  catch { return undefined }
}
const escapeVcf = (value: string) => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
const vcard = (p: CardProfile) => {
  const parts = p.name.trim().split(/\s+/)
  const last = parts.length > 1 ? parts.pop()! : ''
  const first = parts.join(' ')
  return [
    'BEGIN:VCARD', 'VERSION:3.0',
    `N:${escapeVcf(last)};${escapeVcf(first)};;;`,
    `FN:${escapeVcf(p.name)}`,
    `ORG:${escapeVcf(p.company)}`,
    `TITLE:${escapeVcf(p.role)}`,
    ...(p.phone ? [`TEL;TYPE=CELL:${p.phone}`] : []),
    ...(p.email ? [`EMAIL;TYPE=INTERNET:${p.email}`] : []),
    ...(safeLink(p.website) ? [`URL:${safeLink(p.website)}`] : []),
    'END:VCARD', ''
  ].join('\r\n')
}
const downloadContact = (p: CardProfile) => {
  const blob = new Blob([vcard(p)], { type: 'text/vcard;charset=utf-8' })
  const href = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = href
  a.download = `${p.slug}.vcf`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(href), 500)
}
function Brand({ light = false }: { light?: boolean }) {
  return <img className={`brand-logo ${light ? 'brand-logo-light' : ''}`} src="/tapiq-logo.png" alt="Tapiq" />
}
function Profile({ p }: { p: CardProfile }) {
  const [copied, setCopied] = useState(false)
  // Show configured social links in a predictable order.
  const featured: SocialKey[] = ['facebook', 'tiktok', 'instagram', 'googleBusiness', 'whatsapp', 'linkedin', 'youtube']
  const socials = featured.filter(key => safeLink(p.socials[key]))
  const website = safeLink(p.website)
  const phone = p.phone?.replace(/[^\d+]/g, '')
  const messenger = 'https://m.me/stevenclaude.jumaoas.1'
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(()=>setCopied(false), 2200) }
    catch { setCopied(false) }
  }
  return <div className="profile-page" style={{ '--accent': p.accent } as React.CSSProperties}>
    <header className="profile-nav"><span className="brand-spacer" aria-hidden="true"/><Brand light/><button className="share-button" onClick={share} title="Copy profile link">{copied ? <Check size={17}/> : <Copy size={17}/>}<span>{copied ? 'Copied!' : 'Copy link'}</span></button></header>
    <main className="profile-wrap"><div className="profile-card">
      <div className="cover" style={p.coverUrl ? { backgroundImage:`url(${p.coverUrl})` } : undefined}>
        {p.avatarUrl && <img className="cover-portrait" src={p.avatarUrl} alt={`${p.name} profile portrait`} />}
      </div>
      <div className="profile-body">
        {!p.avatarUrl && <div className="avatar">{p.initials}</div>}
        <div className="profile-heading"><div className="verified"><ShieldCheck size={14}/> DIGITAL PROFILE</div><h1>{p.name}</h1><p className="job-title">{p.role}</p>{p.location && <p className="location"><MapPin size={14}/>{p.location}</p>}</div>
        <p className="bio">{p.bio}</p>
        <button className="primary-cta" onClick={()=>downloadContact(p)}><UserRound size={18}/> Save to contacts <ArrowDownToLine size={16}/></button>
        <section className="section"><div className="section-head"><h2>Get in touch</h2><span>LET'S CONNECT</span></div><div className="action-list">
          {phone && <a href={`tel:${phone}`} className="action-row"><span className="action-icon"><Phone size={19}/></span><span className="action-text"><strong>Call</strong><small>{p.phone}</small></span><ArrowRight className="action-arrow" size={18}/></a>}
          {phone && <a href={`sms:${phone}`} className="action-row"><span className="action-icon"><MessageCircle size={19}/></span><span className="action-text"><strong>Text / SMS</strong><small>{p.phone}</small></span><ArrowRight className="action-arrow" size={18}/></a>}
          {p.email && <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(p.email)}`} target="_blank" rel="noopener noreferrer" className="action-row"><span className="action-icon"><Mail size={19}/></span><span className="action-text"><strong>Send email</strong><small>{p.email}</small></span><ArrowRight className="action-arrow" size={18}/></a>}
          <a href={messenger} target="_blank" rel="noopener noreferrer" className="action-row"><span className="action-icon"><MessengerIcon size={21}/></span><span className="action-text"><strong>Messenger</strong><small>Message me on Facebook</small></span><ArrowRight className="action-arrow" size={18}/></a>
          {website && <a href={website} target="_blank" rel="noopener noreferrer" className="action-row"><span className="action-icon"><Globe2 size={19}/></span><span className="action-text"><strong>Visit website</strong><small>{new URL(website).hostname}</small></span><ExternalLink className="action-arrow" size={18}/></a>}
          {!phone && !p.email && !website && <div className="empty-message">Contact details coming soon.</div>}
        </div></section>
        <section className="section social-section"><div className="section-head"><h2>Socials</h2><span>FIND ME ONLINE</span></div>
          {socials.length ? <div className="social-grid">{socials.map((key)=>{
            const {Icon,label}=socialMeta[key]
            const url = safeLink(p.socials[key])
            return url
              ? <a key={key} className="social-tile" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${label}`}><Icon size={22} aria-hidden="true"/></a>
              : <div key={key} className="social-tile social-tile-disabled" role="img" aria-label={`${label} — link not configured`}><Icon size={22} aria-hidden="true"/></div>
          })}</div> : <div className="empty-message">Add social link fields in src/profiles.ts to show buttons.</div>}
        </section>
      </div><div className="card-footer"><span>Connected with</span><Brand/><span className="footer-tagline">ONE TAP. ENDLESS CONNECTIONS.</span></div>
    </div><p className="privacy-note"><CreditCard size={15}/> Contact information is shared by the profile owner.</p></main>
  </div>
}
export function App() {
  // Every NFC card opens this person's profile immediately at the root URL.
  // No profile picker, directory, or intermediate click.
  return <Profile p={profiles[0]}/>
}
