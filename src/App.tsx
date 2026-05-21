import { useEffect, useRef, useState } from 'react';
import './App.css';

// ─── DATA ────────────────────────────────────────────────────────────
const SERVICES = [
  { id:1, icon:'✂️', name:'Corte Clásico',   price:12000, duration:'30 min', desc:'Tijera y máquina. Perfilado impecable. El clásico que nunca falla.' },
  { id:2, icon:'🪒', name:'Corte + Barba',   price:18000, duration:'45 min', desc:'El pack completo. Corte y diseño de barba con navaja recta caliente.' },
  { id:3, icon:'🔥', name:'Diseño de Barba', price:9000,  duration:'30 min', desc:'Perfilado, definición y styling. Para una barba perfectamente esculpida.' },
  { id:4, icon:'👑', name:'Corte Premium',   price:25000, duration:'60 min', desc:'Ritual completo: lavado, corte, mascarilla facial, secado y styling.' },
];
const PROS = [
  { id:1, name:'Andrés F.',    spec:'Cortes Clásicos & Fade',  rating:'4.9', cuts:'1.240', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=faces', bio:'12 años de experiencia. Especialista en fades y cortes clásicos americanos.' },
  { id:2, name:'Camila R.',    spec:'Corte + Barba Femenino',  rating:'5.0', cuts:'980',   img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80&auto=format&fit=crop&crop=faces', bio:'Primera maestra barbera del equipo. Especialista en diseños de barba y coloración.' },
  { id:3, name:'Sebastián M.', spec:'Diseño & Textura',        rating:'4.8', cuts:'1.560', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=faces', bio:'Referente en cortes de textura y técnicas internacionales. Ex-instructor.' },
];
const SCHEDULE = [
  { day:'L', name:'LUN', h:'09:00 — 19:00', open:true  },
  { day:'M', name:'MAR', h:'09:00 — 19:00', open:true  },
  { day:'M', name:'MIÉ', h:'09:00 — 19:00', open:true  },
  { day:'J', name:'JUE', h:'09:00 — 19:00', open:true  },
  { day:'V', name:'VIE', h:'09:00 — 20:00', open:true  },
  { day:'S', name:'SÁB', h:'09:00 — 19:00', open:true  },
  { day:'D', name:'DOM', h:'Cerrado',         open:false },
];
const TIME_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];
const EMAIL_CONFIGS_DEFAULT = [
  { name:'Confirmación de reserva',   on:true  },
  { name:'Recordatorio 24h antes',    on:true  },
  { name:'Recordatorio 1h antes',     on:false },
  { name:'Encuesta post-servicio',    on:false },
  { name:'Recordatorio de fidelidad', on:true  },
];
const APPOINTMENTS_DEFAULT = [
  { id:1, client:'Martín Riquelme', service:'Corte Clásico',   pro:'Andrés F.',    date:'17/05/2026', time:'10:00', status:'confirmado', total:12000, email:'martin@email.cl'  },
  { id:2, client:'Diego Soto',      service:'Corte + Barba',   pro:'Camila R.',    date:'17/05/2026', time:'11:30', status:'pendiente',  total:18000, email:'diego@email.cl'   },
  { id:3, client:'Felipe Mora',     service:'Corte Premium',   pro:'Sebastián M.', date:'18/05/2026', time:'14:00', status:'confirmado', total:25000, email:'felipe@email.cl'  },
  { id:4, client:'Ignacio Vega',    service:'Diseño de Barba', pro:'Andrés F.',    date:'19/05/2026', time:'16:30', status:'cancelado',  total:9000,  email:'ignacio@email.cl' },
  { id:5, client:'Tomás Herrera',   service:'Corte Clásico',   pro:'Sebastián M.', date:'20/05/2026', time:'09:00', status:'confirmado', total:12000, email:'tomas@email.cl'   },
];

// ── Cambia esta contraseña por la que quieras ──
const ADMIN_PASSWORD = 'noir2026';

function fmt(n: number) {
  return new Intl.NumberFormat('es-CL', { style:'currency', currency:'CLP', maximumFractionDigits:0 }).format(n);
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = (document.getElementById('nav')?.offsetHeight ?? 64);
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 8, behavior:'smooth' });
}

// ─── NOTIFICATION ────────────────────────────────────────────────────
function useNotif() {
  const [msg,  setMsg]  = useState('');
  const [show, setShow] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = (m: string) => {
    setMsg(m); setShow(true);
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setShow(false), 3500);
  };
  return { msg, show, notify };
}

// ═══════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════

// Componente exclusivo para la pestaña admin — sin hooks condicionales
function AdminTabPage() {
  const { msg, show, notify } = useNotif();
  return (
    <>
      <div id="notif" className={show ? 'show' : ''}>{msg}</div>
      <AdminPanel
        notify={notify}
        onLogout={() => {
          localStorage.removeItem('adminAuth');
          notify('Sesión cerrada');
          setTimeout(() => window.close(), 1200);
        }}
      />
    </>
  );
}

export default function App() {
  const { msg, show, notify } = useNotif();
  const [navScrolled,    setNavScrolled]    = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminTab = new URLSearchParams(window.location.search).get('admin') === '1';
  const isAuthed   = localStorage.getItem('adminAuth') === 'true';

  useEffect(() => {
    if (isAdminTab) return; // no hace scroll ni observers en la pestaña admin
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.team-card,.kpi,.admin-card,.schedule-day').forEach(el => {
      const h = el as HTMLElement;
      h.style.opacity = '0';
      h.style.transform = 'translateY(20px)';
      h.style.transition = 'opacity .5s ease, transform .5s ease';
      obs.observe(h);
    });

    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect(); };
  }, [isAdminTab]);

  // Pestaña admin — todos los hooks ya fueron llamados arriba
  if (isAdminTab) {
    if (!isAuthed) {
      window.location.href = window.location.pathname;
      return null;
    }
    return <AdminTabPage />;
  }

  // NAVEGACIÓN SIMPLIFICADA - Sin galería
  const navLinks: [string, string][] = [
    ['team','Equipo'],
    ['booking','Reservar'],
    ['schedule','Horarios'],  ['location','Ubicación'], ['admin','Admin'],
  ];

  return (
    <>
      <div id="notif" className={show ? 'show' : ''}>{msg}</div>

      {/* ── NAV ── */}
      <nav id="nav" className={navScrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo"
          onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); setMobileMenuOpen(false); }}>
          <div className="nav-logo-mark">NB</div>
          <span className="nav-logo-text">NewBarber</span>
        </a>
        <ul className="nav-links">
          {navLinks.map(([id, label]) => (
            <li key={id}>
              <a href={'#' + id} onClick={e => { e.preventDefault(); scrollToId(id); }}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#booking" className="nav-cta"
              onClick={e => { e.preventDefault(); scrollToId('booking'); }}>
              Reservar
            </a>
          </li>
        </ul>
        <button className="nav-hamburger" aria-label="Menú"
          onClick={() => setMobileMenuOpen(v => !v)}>
          <span/><span/><span/>
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mobileMenuOpen && (
        <div style={{
          position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:400,
          background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)',
        }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{
            position:'absolute', top:0, right:0, width:'280px', height:'100%',
            background:'var(--white)', padding:'5rem 2rem 2rem',
            display:'flex', flexDirection:'column', gap:'0.25rem',
          }} onClick={e => e.stopPropagation()}>
            {navLinks.map(([id, label]) => (
              <a key={id} href={'#' + id}
                style={{
                  display:'block', padding:'0.9rem 0',
                  fontFamily:'var(--ff-mono)', fontSize:'0.7rem',
                  letterSpacing:'0.2em', textTransform:'uppercase',
                  color:'var(--gray-4)', textDecoration:'none',
                  borderBottom:'1px solid var(--gray-7)',
                }}
                onClick={e => {
                  e.preventDefault(); setMobileMenuOpen(false);
                  setTimeout(() => scrollToId(id), 50);
                }}>{label}</a>
            ))}
            <a href="#booking"
              style={{
                display:'block', marginTop:'1.5rem', padding:'0.9rem 1.5rem',
                fontFamily:'var(--ff-mono)', fontSize:'0.7rem',
                letterSpacing:'0.2em', textTransform:'uppercase',
                background:'var(--black)', color:'var(--white)',
                textDecoration:'none', borderRadius:'4px', textAlign:'center',
              }}
              onClick={e => {
                e.preventDefault(); setMobileMenuOpen(false);
                setTimeout(() => scrollToId('booking'), 50);
              }}>Reserva tu hora aquí</a>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Abierto Lun–Sáb · 09:00–19:00
          </div>
          <h1 className="hero-title">
            Barbería<br/>
            <em> de precisión</em><br/>
            artesanal.
          </h1>
          <p className="hero-desc">
            Donde cada corte es una obra de técnica y cada visita, una experiencia irrepetible.
            Conón, Valparaíso.
          </p>
          <div className="hero-actions">
            <a href="#booking" className="btn-primary"
              onClick={e => { e.preventDefault(); scrollToId('booking'); }}>
              ¡QUIERO AGENDAR! →
            </a>
            <button className="btn-secondary" onClick={() => scrollToId('team')}>
              Ver equipo
            </button>
          </div>
          <div className="hero-stats">
            {[['1.2K+','Clientes'],['4.9★','Valoración'],['8','Años'],['3','Maestros']].map(([n, l]) => (
              <div key={l}>
                <div className="hero-stat-num">{n}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="hero-scroll-line"></div>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85&auto=format"
            alt="Barbero profesional cortando cabello"
          />
        </div>
      </section>

      <MarqueeBar />
      <TeamSection />
      <BookingSection notify={notify} />
      <ScheduleSection />
      <LocationSection />
      <AdminSection />
      <FooterSection />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════════════════════════════
function MarqueeBar() {
  const items = ['Cortes Clásicos','·','Diseño de Barba','·','Fade Perfecto','·','Afeitado Navaja','·','Barbería Premium','·','Est. 2016','·','Conón','·'];
  const all = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {all.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t === '·' ? <span className="marquee-sep">·</span> : t}
          </span>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════
// TEAM
// ═══════════════════════════════════════════════════════════════════════
function TeamSection() {
  return (
    <section id="team">
      <div className="section-label">Nuestro equipo</div>
      <h2 className="section-title">Los<br/><em>Maestros</em></h2>
      <div className="team-grid">
        {PROS.map(p => (
          <div className="team-card" key={p.id}>
            <div className="team-card-img-wrap">
              <img className="team-card-img" src={p.img} alt={p.name} loading="lazy"/>
              <div className="team-card-overlay"></div>
              <div className="team-card-badge">{p.rating} ★</div>
            </div>
            <div className="team-card-content">
              <div className="team-name">{p.name}</div>
              <div className="team-specialty">{p.spec}</div>
              <div className="team-bio">{p.bio}</div>
              <div className="team-stats">
                <div>
                  <div className="team-stat-n">{p.cuts}</div>
                  <div className="team-stat-l">Cortes</div>
                </div>
                <div>
                  <div className="team-stat-n">{p.rating}★</div>
                  <div className="team-stat-l">Rating</div>
                </div>
              </div>
              <button className="team-book-btn" onClick={() => scrollToId('booking')}>
                Reservar con {p.name.split(' ')[0]} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// DATE + TIME PICKER
// ═══════════════════════════════════════════════════════════════════════
const DAY_NAMES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// Slots artificialmente ocupados para demostración
const TAKEN: Record<string, string[]> = {
  '2026-05-19': ['09:00','10:00','11:00','14:00'],
  '2026-05-20': ['09:30','10:30','15:00','16:00','17:00'],
  '2026-05-21': ['09:00','09:30','10:00','10:30','11:00'],
  '2026-05-22': ['14:00','14:30','15:00','15:30'],
  '2026-05-26': ['09:00','11:30','12:00','12:30'],
};

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function DateTimeStep({
  booking,
  setBooking,
}: {
  booking: { date: Date | null; time: string | null; service: typeof SERVICES[0] | null; pro: typeof PROS[0] | null };
  setBooking: (b: any) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const selectDate = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    setBooking({ ...booking, date: d, time: null });
  };

  const takenForDate = booking.date ? (TAKEN[dateKey(booking.date)] ?? []) : [];
  const availableSlots = booking.date
    ? TIME_SLOTS.filter(t => !takenForDate.includes(t))
    : [];
  const unavailableSlots = booking.date
    ? TIME_SLOTS.filter(t => takenForDate.includes(t))
    : [];

  // blanks before day 1 (week starts Monday)
  const blanks = (firstDay + 6) % 7;

  return (
    <div className="booking-step">
      <h3 className="step-title">Elige fecha y hora</h3>
      <div className="booking-datetime">

        {/* CALENDAR */}
        <div className="cal-wrap">
          <div className="cal-header">
            <button className="cal-nav" onClick={prevMonth}>‹</button>
            <span className="cal-month-label">{MONTH_NAMES[calMonth]} {calYear}</span>
            <button className="cal-nav" onClick={nextMonth}>›</button>
          </div>
          <div className="cal-grid">
            {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d => (
              <div key={d} className="cal-day-name">{d}</div>
            ))}
            {Array.from({ length: blanks }).map((_, i) => (
              <div key={'b' + i} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const d = new Date(calYear, calMonth, day);
              const isPast    = d < today;
              const isSunday  = d.getDay() === 0;
              const isSelected = booking.date ? dateKey(d) === dateKey(booking.date) : false;
              const isToday   = dateKey(d) === dateKey(today);
              const hasTaken  = TAKEN[dateKey(d)]?.length > 0;
              const fullyTaken = TAKEN[dateKey(d)]?.length >= TIME_SLOTS.length;
              const disabled  = isPast || isSunday;
              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() => selectDate(day)}
                  className={[
                    'cal-day',
                    isSelected  ? 'selected'   : '',
                    isToday     ? 'today'       : '',
                    disabled    ? 'disabled'    : '',
                    fullyTaken  ? 'fully-taken' : hasTaken ? 'partial' : '',
                  ].join(' ')}>
                  {day}
                  {!disabled && hasTaken && !fullyTaken && <span className="cal-dot" />}
                </button>
              );
            })}
          </div>
          <div className="cal-legend">
            <span><span className="legend-dot partial" />Parcialmente ocupado</span>
            <span><span className="legend-dot fully-taken" />Sin disponibilidad</span>
          </div>
        </div>

        {/* TIME SLOTS */}
        <div className="timeslots-wrap">
          {!booking.date ? (
            <div className="timeslots-placeholder">
              <span>←</span>
              <p>Selecciona una fecha para ver los horarios disponibles</p>
            </div>
          ) : (
            <>
              <div className="timeslots-date-label">
                {DAY_NAMES[booking.date.getDay()]}{' '}
                {booking.date.getDate()} de {MONTH_NAMES[booking.date.getMonth()]}
              </div>
              <div className="timeslots-group">
                <div className="timeslots-group-label">Disponibles ({availableSlots.length})</div>
                <div className="time-slots">
                  {availableSlots.map(t => (
                    <button key={t}
                      className={`time-slot ${booking.time === t ? 'selected' : ''}`}
                      onClick={() => setBooking({ ...booking, time: t })}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              {unavailableSlots.length > 0 && (
                <div className="timeslots-group">
                  <div className="timeslots-group-label">Ocupados</div>
                  <div className="time-slots">
                    {unavailableSlots.map(t => (
                      <button key={t} className="time-slot taken" disabled>{t}</button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// BOOKING - SIMPLIFICADO
// ═══════════════════════════════════════════════════════════════════════
type BookingState = {
  service: typeof SERVICES[0] | null;
  pro:     typeof PROS[0]     | null;
  date:    Date   | null;
  time:    string | null;
};

type ConfirmedBooking = {
  id: number;
  client: string;
  service: string;
  serviceIcon: string;
  serviceDuration: string;
  pro: string;
  proImg: string;
  date: string;
  time: string;
  total: number;
  email: string;
};

function BookingSection({ notify }: { notify:(m:string)=>void }) {
  const [step,      setStep]      = useState(1);
  const [booking,   setBooking]   = useState<BookingState>({ service:null, pro:null, date:null, time:null });
  const [fname,     setFname]     = useState('');
  const [femail,    setFemail]    = useState('');
  const [fphone,    setFphone]    = useState('');
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);

  const stepLabels = ['Servicio','Profesional','Fecha','Datos'];

  const goStep = (n: number) => {
    if (n === 2 && !booking.service) { notify('Selecciona un servicio primero'); return; }
    if (n === 3 && !booking.pro)     { notify('Selecciona un profesional primero'); return; }
    if (n === 4 && (!booking.date || !booking.time)) { notify('Selecciona fecha y hora'); return; }
    setStep(n);
  };

  const confirmBooking = () => {
    if (!fname.trim() || !femail.includes('@') || fphone.length < 7) {
      notify('Completa todos los campos correctamente'); return;
    }
    const newId = Date.now();
    const appt = {
      id: newId,
      client: fname,
      service: booking.service?.name ?? '',
      pro: booking.pro?.name ?? '',
      date: booking.date?.toLocaleDateString('es-CL') ?? '',
      time: booking.time ?? '',
      status: 'pendiente' as const,
      total: booking.service?.price ?? 0,
      email: femail,
    };
    const saved = JSON.parse(localStorage.getItem('appointments') ?? JSON.stringify(APPOINTMENTS_DEFAULT));
    saved.push(appt);
    localStorage.setItem('appointments', JSON.stringify(saved));

    setConfirmed({
      id: newId,
      client: fname,
      service: booking.service?.name ?? '',
      serviceIcon: booking.service?.icon ?? '',
      serviceDuration: booking.service?.duration ?? '',
      pro: booking.pro?.name ?? '',
      proImg: booking.pro?.img ?? '',
      date: booking.date?.toLocaleDateString('es-CL', { weekday:'long', day:'numeric', month:'long', year:'numeric' }) ?? '',
      time: booking.time ?? '',
      total: booking.service?.price ?? 0,
      email: femail,
    });
  };

  const cancelBooking = () => {
    if (!confirmed) return;
    const saved: any[] = JSON.parse(localStorage.getItem('appointments') ?? JSON.stringify(APPOINTMENTS_DEFAULT));
    const updated = saved.map(a => a.id === confirmed.id ? { ...a, status: 'cancelado' } : a);
    localStorage.setItem('appointments', JSON.stringify(updated));
    notify('Reserva cancelada');
    setConfirmed(null);
    setStep(1);
    setBooking({ service:null, pro:null, date:null, time:null });
    setFname(''); setFemail(''); setFphone('');
  };

  const newBooking = () => {
    setConfirmed(null);
    setStep(1);
    setBooking({ service:null, pro:null, date:null, time:null });
    setFname(''); setFemail(''); setFphone('');
  };

  // ── Pantalla de confirmación ──
  if (confirmed) {
    return (
      <section id="booking">
        <div className="booking-container">
          <div className="booking-confirmed">
            <div className="confirmed-check">✓</div>
            <h2 className="confirmed-title">¡Reserva confirmada!</h2>
            <p className="confirmed-sub">Te esperamos, <strong>{confirmed.client}</strong>. Recibirás un recordatorio en <em>{confirmed.email}</em>.</p>

            <div className="confirmed-card">
              <div className="confirmed-card-header">
                <span className="confirmed-card-label">Resumen de tu reserva</span>
                <span className="confirmed-badge">Pendiente de confirmación</span>
              </div>

              <div className="confirmed-rows">
                <div className="confirmed-row">
                  <span className="confirmed-row-icon">{confirmed.serviceIcon}</span>
                  <div>
                    <div className="confirmed-row-label">Servicio</div>
                    <div className="confirmed-row-value">{confirmed.service} · {confirmed.serviceDuration}</div>
                  </div>
                </div>

                <div className="confirmed-row">
                  <img src={confirmed.proImg} alt={confirmed.pro} className="confirmed-pro-img" />
                  <div>
                    <div className="confirmed-row-label">Profesional</div>
                    <div className="confirmed-row-value">{confirmed.pro}</div>
                  </div>
                </div>

                <div className="confirmed-row">
                  <span className="confirmed-row-icon">📅</span>
                  <div>
                    <div className="confirmed-row-label">Fecha</div>
                    <div className="confirmed-row-value" style={{ textTransform:'capitalize' }}>{confirmed.date}</div>
                  </div>
                </div>

                <div className="confirmed-row">
                  <span className="confirmed-row-icon">🕐</span>
                  <div>
                    <div className="confirmed-row-label">Hora</div>
                    <div className="confirmed-row-value">{confirmed.time} hrs</div>
                  </div>
                </div>

                <div className="confirmed-divider" />

                <div className="confirmed-row confirmed-total-row">
                  <span className="confirmed-row-icon">💳</span>
                  <div>
                    <div className="confirmed-row-label">Total a pagar</div>
                    <div className="confirmed-row-value confirmed-total-value">{fmt(confirmed.total)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="confirmed-actions">
              <button className="btn-next" onClick={newBooking}>
                + Nueva reserva
              </button>
              <button className="confirmed-cancel-btn" onClick={cancelBooking}>
                Cancelar esta reserva
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking">
      <div className="booking-container">
        <div className="booking-header">
          <div className="section-label">Agenda tu turno</div>
          <h2 className="section-title">Reservar<br/><em>Hora</em></h2>
        </div>

        {/* PROGRESS */}
        <div className="booking-progress">
          {stepLabels.map((l, i) => (
            <div key={i} className={`progress-step ${i + 1 <= step ? 'active' : ''} ${i + 1 === step ? 'current' : ''}`}>
              <div className="progress-dot">{i + 1}</div>
              <span className="progress-label">{l}</span>
            </div>
          ))}
        </div>

        <div className="booking-form-wrap">
          {/* STEP 1: SERVICIO */}
          {step === 1 && (
            <div className="booking-step">
              <h3 className="step-title">Selecciona un servicio</h3>
              <div className="services-select">
                {SERVICES.map(s => (
                  <button key={s.id}
                    id={'sopt_' + s.id}
                    className={`service-option ${booking.service?.id === s.id ? 'selected' : ''}`}
                    onClick={() => setBooking({ ...booking, service: s })}>
                    <div className="service-option-icon">{s.icon}</div>
                    <div className="service-option-info">
                      <div className="service-option-name">{s.name}</div>
                      <div className="service-option-price">{fmt(s.price)}</div>
                    </div>
                    <div className="service-option-duration">{s.duration}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: PROFESIONAL */}
          {step === 2 && (
            <div className="booking-step">
              <h3 className="step-title">Elige tu barbero preferido</h3>
              <div className="pros-select">
                {PROS.map(p => (
                  <button key={p.id}
                    className={`pro-option ${booking.pro?.id === p.id ? 'selected' : ''}`}
                    onClick={() => setBooking({ ...booking, pro: p })}>
                    <img src={p.img} alt={p.name} className="pro-option-img"/>
                    <div className="pro-option-info">
                      <div className="pro-option-name">{p.name}</div>
                      <div className="pro-option-spec">{p.spec}</div>
                      <div className="pro-option-rating">{p.rating} ★ · {p.cuts} cortes</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: FECHA Y HORA */}
          {step === 3 && (
            <DateTimeStep booking={booking} setBooking={setBooking} />
          )}

          {/* STEP 4: DATOS */}
          {step === 4 && (
            <div className="booking-step">
              <h3 className="step-title">Completa tus datos</h3>
              <div className="booking-form">
                <input type="text" placeholder="Tu nombre" value={fname} onChange={e => setFname(e.target.value)}/>
                <input type="email" placeholder="Tu email" value={femail} onChange={e => setFemail(e.target.value)}/>
                <input type="tel" placeholder="Tu teléfono" value={fphone} onChange={e => setFphone(e.target.value)}/>
              </div>
            </div>
          )}

          {/* BOTONES NAVEGACIÓN */}
          <div className="booking-actions">
            {step > 1 && (
              <button className="btn-back" onClick={() => setStep(step - 1)}>
                ← Atrás
              </button>
            )}
            {step < 4 && (
              <button className="btn-next" onClick={() => goStep(step + 1)}>
                Siguiente →
              </button>
            )}
            {step === 4 && (
              <button className="btn-confirm" onClick={confirmBooking}>
                ✓ Confirmar Reserva
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCHEDULE
// ═══════════════════════════════════════════════════════════════════════
function ScheduleSection() {
  return (
    <section id="schedule">
      <div className="section-label">Disponibilidad</div>
      <h2 className="section-title">Horarios de<br/><em>Atención</em></h2>
      <div className="schedule-grid">
        {SCHEDULE.map(d => (
          <div key={d.name} className={`schedule-day ${!d.open ? 'closed' : ''}`}>
            <div className="schedule-day-name">{d.name}</div>
            <div className="schedule-day-time">{d.h}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// LOCATION
// ═══════════════════════════════════════════════════════════════════════
function LocationSection() {
  return (
    <section id="location" style={{ padding:0, margin:0 }}>
      <div className="location-grid">
        <div className="location-info">
          <div className="section-label">Encuentranos</div>
          <h2 className="section-title">Ubicación</h2>
          <div className="location-details">
            <div className="location-item">
              <span className="location-icon">📍</span>
              <div>
                <div className="location-label">Dirección</div>
                <div className="location-value">Av. Valparaíso 1234, Conón, Valparaíso</div>
              </div>
            </div>
            <div className="location-item">
              <span className="location-icon">☎️</span>
              <div>
                <div className="location-label">Teléfono</div>
                <div className="location-value">+56 2 1234 5678</div>
              </div>
            </div>
            <div className="location-item">
              <span className="location-icon">✉️</span>
              <div>
                <div className="location-label">Email</div>
                <div className="location-value">hola@noirbarberia.cl</div>
              </div>
            </div>
          </div>
        </div>
        <div className="location-map-placeholder">
          <div style={{ padding:'2rem', textAlign:'center', color:'var(--gray-5)' }}>
            Mapa interactivo aquí
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ADMIN SECTION
// ═══════════════════════════════════════════════════════════════════════
function AdminSection() {
  return (
    <section id="admin" style={{ padding:0, maxWidth:'none', margin:0, width:'100%' }}>
      <AdminLogin />
    </section>
  );
}

function AdminLogin() {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (pass === ADMIN_PASSWORD) {
      setError(false);
      // Guarda sesión en localStorage y abre nueva pestaña
      localStorage.setItem('adminAuth', 'true');
      window.open(window.location.pathname + '?admin=1', '_blank');
    } else {
      setError(true);
      setPass('');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-wrap">
        <div className="admin-login-logo">
          <div className="nav-logo-mark" style={{ width:48, height:48, fontSize:'1.2rem' }}>N</div>
        </div>
        <h2>NOIR &amp; CO</h2>
        <p className="admin-login-sub">Panel de Administración</p>
        <div className="admin-login-field">
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={e => { setPass(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className={error ? 'error' : ''}
          />
          {error && <span className="admin-login-error">Contraseña incorrecta</span>}
        </div>
        <button onClick={handleLogin}>
          Acceder al panel →
        </button>
        <p className="admin-login-hint">Se abrirá en una nueva pestaña</p>
      </div>
    </div>
  );
}

function AdminPanel({ notify, onLogout }: { notify:(m:string)=>void, onLogout:()=>void }) {
  const [appointments, setAppointments] = useState(JSON.parse(localStorage.getItem('appointments') ?? JSON.stringify(APPOINTMENTS_DEFAULT)));
  const [emailConfigs, setEmailConfigs] = useState(EMAIL_CONFIGS_DEFAULT);
  const [searchFilter, setSearchFilter] = useState('');
  const [refreshing,   setRefreshing]   = useState(false);
  const [lastRefresh,  setLastRefresh]  = useState(new Date());

  const loadAppointments = () => {
    return JSON.parse(localStorage.getItem('appointments') ?? JSON.stringify(APPOINTMENTS_DEFAULT));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setAppointments(loadAppointments());
      setLastRefresh(new Date());
      setRefreshing(false);
      notify('✓ Datos actualizados');
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    onLogout();
  };

  const filtered = appointments.filter((a:any) => a.client.toLowerCase().includes(searchFilter.toLowerCase()) || a.email.includes(searchFilter));
  const updateStatus = (id: number, status: string) => { const upd = appointments.map((a:any) => a.id === id ? { ...a, status } : a); setAppointments(upd); localStorage.setItem('appointments', JSON.stringify(upd)); };
  const deleteAppt = (id: number) => { const upd = appointments.filter((a:any) => a.id !== id); setAppointments(upd); localStorage.setItem('appointments', JSON.stringify(upd)); notify('Cita eliminada'); };
  const sendReminder = (_id: number) => { notify('📱 Recordatorio enviado'); };
  const toggleEmail = (i: number) => { const upd = emailConfigs.map((e, j) => j === i ? { ...e, on: !e.on } : e); setEmailConfigs(upd); };

  const barDays = ['Lun','Mar','Mié','Jue','Vie','Sáb'];
  const barVals = [5, 7, 4, 6, 8, 5];
  const barMax = Math.max(...barVals);

  const timeStr = lastRefresh.toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit', second:'2-digit' });

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <div className="nav-logo-mark">N</div>
          <div>
            <h2>Dashboard</h2>
            <span className="admin-last-refresh">Actualizado a las {timeStr}</span>
          </div>
        </div>
        <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
          <button onClick={handleRefresh} className={`refresh-btn ${refreshing ? 'spinning' : ''}`} title="Refrescar datos">
            <span className="refresh-icon">↻</span>
            {refreshing ? 'Actualizando...' : 'Refrescar'}
          </button>
          <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
        </div>
      </div>

      <div className="admin-kpis">
        <div className="kpi">
          <div className="kpi-value">{appointments.length}</div>
          <div className="kpi-label">Citas Totales</div>
        </div>
        <div className="kpi">
          <div className="kpi-value">{appointments.filter((a:any) => a.status === 'confirmado').length}</div>
          <div className="kpi-label">Confirmadas</div>
        </div>
        <div className="kpi">
          <div className="kpi-value">{fmt(appointments.reduce((s:number, a:any) => s + a.total, 0))}</div>
          <div className="kpi-label">Ingresos</div>
        </div>
        <div className="kpi">
          <div className="kpi-value">{appointments.filter((a:any) => a.status === 'pendiente').length}</div>
          <div className="kpi-label">Pendientes</div>
        </div>
      </div>

      <div className="admin-section">
        <h3>Citas</h3>
        <input type="text" placeholder="Buscar cliente..." value={searchFilter} onChange={e => setSearchFilter(e.target.value)} className="search-input"/>
        <table className="admin-table">
          <thead>
            <tr>
              {['Cliente','Servicio','Profesional','Fecha','Hora','Estado','Total','Acciones'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign:'center', padding:'3rem', color:'var(--gray-5)' }}>
                  No hay citas que coincidan
                </td>
              </tr>
            ) : filtered.map((a:any) => (
              <tr key={a.id}>
                <td>
                  <div style={{ fontWeight:600 }}>{a.client}</div>
                  <div style={{ fontSize:'.75rem', color:'var(--gray-5)' }}>{a.email}</div>
                </td>
                <td style={{ color:'var(--gray-4)' }}>{a.service}</td>
                <td style={{ color:'var(--gray-4)' }}>{a.pro}</td>
                <td style={{ color:'var(--gray-4)' }}>{a.date}</td>
                <td style={{ fontFamily:'var(--ff-mono)', fontSize:'.8rem' }}>{a.time}</td>
                <td>
                  <select className={`status-select ${a.status}`} value={a.status}
                    onChange={e => updateStatus(a.id, e.target.value)}>
                    <option value="confirmado">✓ Confirmado</option>
                    <option value="pendiente">⏳ Pendiente</option>
                    <option value="cancelado">✕ Cancelado</option>
                  </select>
                </td>
                <td style={{ fontFamily:'var(--ff-display)', fontWeight:700 }}>{fmt(a.total)}</td>
                <td>
                  <button className="action-btn"     onClick={() => sendReminder(a.id)}>📱</button>
                  <button className="action-btn del" onClick={() => deleteAppt(a.id)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-title">Citas por día</div>
          <div className="bar-chart">
            {barDays.map((d, i) => (
              <div className="bar-wrap" key={d}>
                <div className="bar-value">{barVals[i]}</div>
                <div className="bar" style={{ height:`${Math.round(barVals[i] / barMax * 100)}%` }}>
                  <div className="bar-fill" style={{ height:'100%' }}></div>
                </div>
                <div className="bar-label">{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card-title">Correos automáticos</div>
          <ul className="email-list">
            {emailConfigs.map((e, i) => (
              <li className="email-item" key={e.name}>
                <button className={`email-toggle${e.on ? ' on' : ''}`}
                  onClick={() => toggleEmail(i)}>
                  <div className="email-toggle-dot"></div>
                </button>
                <span className="email-name">{e.name}</span>
                <span className="email-status">{e.on ? 'ACTIVO' : 'INACTIVO'}</span>
                {e.on && (
                  <button className="reminder-send-btn"
                    onClick={() => notify(`✉️ ${e.name} enviado manualmente`)}>
                    Enviar
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════
function FooterSection() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display:'inline-flex', alignItems:'center', gap:'.6rem', marginBottom:'.5rem' }}>
              <div className="nav-logo-mark">N</div>
              <span className="nav-logo-text nav-logo-text-inv">
                NOIR<span>&amp;</span>CO
              </span>
            </div>
            <p>Barbería de precisión artesanal. Est. 2016, Conón, Valparaíso.</p>
          </div>
          <div>
            <div className="footer-col-title">Navegar</div>
            <ul className="footer-links">
              {[['services','Servicios'],['team','Equipo'],['booking','Reservar']].map(([id, label]) => (
                <li key={id}>
                  <a href={'#' + id} onClick={e => { e.preventDefault(); scrollToId(id); }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Horarios</div>
            <ul className="footer-links">
              <li><a href="#">Lun–Vie: 09–19h</a></li>
              <li><a href="#">Sábado: 09–19h</a></li>
              <li><a href="#">Domingo: Cerrado</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contacto</div>
            <ul className="footer-links">
              <li><a href="#">+56 2 1234 5678</a></li>
              <li><a href="#">hola@noirbarberia.cl</a></li>
              <li><a href="#">Av. Valparaíso 1234</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Noir &amp; Co. Todos los derechos reservados.</span>
          <div className="footer-social">
            {['ig','fb','tw'].map(s => (
              <a key={s} href="#" className="social-link">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}