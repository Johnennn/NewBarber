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
  { id:2, name:'Camila R.',    spec:'Corte + Barba Femenino',  rating:'5.0', cuts:'980',   img:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80&auto=format&fit=crop&crop=faces', bio:'Primera maestra barbera del equipo. Especialista en diseños de barba y coloración.' },
  { id:3, name:'Sebastián M.', spec:'Diseño & Textura',        rating:'4.8', cuts:'1.560', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=faces', bio:'Referente en cortes de textura y técnicas internacionales. Ex-instructor.' },
];
const SCHEDULE = [
  { day:'L', name:'LUN', h:'09:00 — 19:00', open:true },
  { day:'M', name:'MAR', h:'09:00 — 19:00', open:true },
  { day:'M', name:'MIÉ', h:'09:00 — 19:00', open:true },
  { day:'J', name:'JUE', h:'09:00 — 19:00', open:true },
  { day:'V', name:'VIE', h:'09:00 — 20:00', open:true },
  { day:'S', name:'SÁB', h:'09:00 — 19:00', open:true },
  { day:'D', name:'DOM', h:'Cerrado',         open:false },
];
const TIME_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const EMAIL_CONFIGS_DEFAULT = [
  { name:'Confirmación de reserva',   on:true },
  { name:'Recordatorio 24h antes',    on:true },
  { name:'Recordatorio 1h antes',     on:false },
  { name:'Encuesta post-servicio',    on:false },
  { name:'Recordatorio de fidelidad', on:true },
];
const APPOINTMENTS_DEFAULT = [
  { id:1, client:'Martín Riquelme', service:'Corte Clásico',   pro:'Andrés F.',    date:'17/05/2026', time:'10:00', status:'confirmado', total:12000, email:'martin@email.cl' },
  { id:2, client:'Diego Soto',      service:'Corte + Barba',   pro:'Camila R.',    date:'17/05/2026', time:'11:30', status:'pendiente',  total:18000, email:'diego@email.cl' },
  { id:3, client:'Felipe Mora',     service:'Corte Premium',   pro:'Sebastián M.', date:'18/05/2026', time:'14:00', status:'confirmado', total:25000, email:'felipe@email.cl' },
  { id:4, client:'Ignacio Vega',    service:'Diseño de Barba', pro:'Andrés F.',    date:'19/05/2026', time:'16:30', status:'cancelado',  total:9000,  email:'ignacio@email.cl' },
  { id:5, client:'Tomás Herrera',   service:'Corte Clásico',   pro:'Sebastián M.', date:'20/05/2026', time:'09:00', status:'confirmado', total:12000, email:'tomas@email.cl' },
];

function fmt(n: number) {
  return new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(n);
}

// ─── NOTIFICATION ────────────────────────────────────────────────────
function useNotif() {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>|null>(null);
  const notify = (m: string) => {
    setMsg(m); setShow(true);
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setShow(false), 3500);
  };
  return { msg, show, notify };
}

// ─── APP ─────────────────────────────────────────────────────────────
export default function App() {
  const { msg, show, notify } = useNotif();
  const [navScrolled, setNavScrolled] = useState(false);

  // Cursor
  const curRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x:0, y:0 });
  const ring    = useRef({ x:0, y:0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (curRef.current) { curRef.current.style.left = e.clientX+'px'; curRef.current.style.top = e.clientY+'px'; }
    };
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    let raf: number;
    const animRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = ring.current.x+'px'; ringRef.current.style.top = ring.current.y+'px'; }
      raf = requestAnimationFrame(animRing);
    };
    animRing();

    // Intersection observer for fade-in
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.service-card, .team-card, .kpi, .admin-card, .schedule-day').forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'opacity .7s ease, transform .7s ease';
      obs.observe(el);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <>
      <div id="cursor" ref={curRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
      <div id="notif" className={show ? 'show' : ''}>{msg}</div>

      {/* NAV */}
      <nav id="nav" className={navScrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>
          <div className="nav-logo-mark">N</div>
          <span className="nav-logo-text">NOIR<span>&amp;</span>CO</span>
        </a>
        <ul className="nav-links">
          <li><a href="#services" onClick={e=>{e.preventDefault();scrollTo('services')}}>Servicios</a></li>
          <li><a href="#team"     onClick={e=>{e.preventDefault();scrollTo('team')}}>Equipo</a></li>
          <li><a href="#gallery"  onClick={e=>{e.preventDefault();scrollTo('gallery')}}>Galería</a></li>
          <li><a href="#schedule" onClick={e=>{e.preventDefault();scrollTo('schedule')}}>Horarios</a></li>
          <li><a href="#location" onClick={e=>{e.preventDefault();scrollTo('location')}}>Ubicación</a></li>
          <li><a href="#admin"    onClick={e=>{e.preventDefault();scrollTo('admin')}}>Admin</a></li>
          <li><a href="#booking"  className="nav-cta" onClick={e=>{e.preventDefault();scrollTo('booking')}}>Reservar</a></li>
        </ul>
        <button className="nav-hamburger"><span/><span/><span/></button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div>
            <div className="hero-badge"><span className="hero-badge-dot"></span>Abierto Lun–Sáb · 09:00–19:00</div>
            <h1 className="hero-title">THE<br/><em>Art of</em><br/><span className="outline">GROOMING</span></h1>
            <p className="hero-desc">Barbería de lujo con técnica artesanal. Donde cada corte es una obra de precisión y cada visita, una experiencia irrepetible.</p>
            <div className="hero-actions">
              <a href="#booking" className="btn-primary" onClick={e=>{e.preventDefault();scrollTo('booking')}}><span>✦ Agendar mi hora</span></a>
              <button className="btn-secondary" onClick={()=>scrollTo('team')}>↓ Conoce el equipo</button>
            </div>
            <div className="hero-stats">
              {[['1.2K+','Clientes'],['4.9★','Valoración'],['8','Años'],['3','Maestros']].map(([n,l])=>(
                <div key={l}><div className="hero-stat-num">{n}</div><div className="hero-stat-label">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-image-stack">
            <img className="hero-img-main" src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85&auto=format" alt="Barbero profesional"/>
            <img className="hero-img-secondary" src="https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&q=85&auto=format" alt="Detalle corte"/>
            <div className="hero-img-accent"><span className="hero-img-accent-inner">✦</span></div>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="hero-scroll-line"></div></div>
      </section>

      {/* MARQUEE */}
      <Marquee/>

      {/* SERVICES */}
      <ServicesSection notify={notify} scrollTo={scrollTo}/>

      {/* TEAM */}
      <TeamSection notify={notify} scrollTo={scrollTo}/>

      {/* GALLERY */}
      <GallerySection/>

      {/* BOOKING */}
      <BookingSection notify={notify}/>

      {/* SCHEDULE */}
      <ScheduleSection/>

      {/* LOCATION */}
      <LocationSection/>

      {/* ADMIN */}
      <AdminSection notify={notify}/>

      {/* FOOTER */}
      <Footer scrollTo={scrollTo}/>
    </>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Cortes Clásicos','✦','Diseño de Barba','✦','Fade Perfecto','✦','Afeitado con Navaja','✦','Barbería Premium','✦','Est. 2016','✦','Las Condes, Santiago','✦'];
  const all = [...items,...items,...items,...items];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {all.map((t,i) => (
          <span className="marquee-item" key={i}>
            {t==='✦' ? <span className="marquee-sep">✦</span> : t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────
function ServicesSection({ notify, scrollTo }: { notify:(m:string)=>void, scrollTo:(id:string)=>void }) {
  const selectAndScroll = (id: number) => {
    scrollTo('booking');
    setTimeout(() => {
      const el = document.getElementById('sopt_'+id);
      el?.click();
    }, 700);
  };
  return (
    <section id="services" className="section-full">
      <div className="services-inner">
        <div className="services-header">
          <div>
            <div className="section-label">Lo que hacemos</div>
            <h2 className="section-title">Nuestros<br/><em>Servicios</em></h2>
          </div>
          <p style={{maxWidth:'380px',color:'var(--muted)',fontWeight:300,fontSize:'1rem'}}>
            Cada servicio es realizado con productos de primera línea y técnicas desarrolladas a lo largo de años de práctica.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="service-card" key={s.id}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
              <div className="service-meta">
                <div className="service-price">{fmt(s.price)}</div>
                <div className="service-duration">{s.duration}</div>
              </div>
              <button className="service-cta" onClick={()=>selectAndScroll(s.id)}>→</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ─────────────────────────────────────────────────────────────
function TeamSection({ notify, scrollTo }: { notify:(m:string)=>void, scrollTo:(id:string)=>void }) {
  return (
    <section id="team">
      <div className="section-label">Nuestro equipo</div>
      <h2 className="section-title">Los<br/><em>Maestros</em></h2>
      <div className="team-grid">
        {PROS.map(p => (
          <div className="team-card" key={p.id}>
            <div className="team-card-img-wrap">
              <img className="team-card-img" src={p.img} alt={p.name}/>
              <div className="team-card-overlay"></div>
              <div className="team-card-badge">{p.rating} ★</div>
            </div>
            <div className="team-card-content">
              <div className="team-name">{p.name}</div>
              <div className="team-specialty">{p.spec}</div>
              <div className="team-bio">{p.bio}</div>
              <div className="team-stats">
                <div className="team-stat"><div className="team-stat-n">{p.cuts}</div><div className="team-stat-l">Cortes</div></div>
                <div className="team-stat"><div className="team-stat-n">{p.rating}★</div><div className="team-stat-l">Rating</div></div>
              </div>
              <button className="team-book-btn" onClick={()=>scrollTo('booking')}>
                Reservar con {p.name.split(' ')[0]} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────
function GallerySection() {
  const imgs = [
    { src:'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1000&q=85&auto=format', label:'Corte Premium' },
    { src:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85&auto=format',  label:'El Maestro' },
    { src:'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=85&auto=format',  label:'Herramientas' },
    { src:'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=85&auto=format',  label:'Diseño de Barba' },
    { src:'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=800&q=85&auto=format',  label:'El Ambiente' },
  ];
  return (
    <section id="gallery" className="section-full">
      <div className="gallery-header">
        <div className="section-label">Nuestro trabajo</div>
        <h2 className="section-title">La <em>Galería</em></h2>
      </div>
      <div className="gallery-grid">
        {imgs.map((img,i) => (
          <div className="gallery-item" key={i}>
            <img src={img.src} alt={img.label}/>
            <div className="gallery-item-label">{img.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── BOOKING ─────────────────────────────────────────────────────────
type Booking = { service: typeof SERVICES[0]|null, pro: typeof PROS[0]|null, date: Date|null, time: string|null };

function BookingSection({ notify }: { notify:(m:string)=>void }) {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<Booking>({ service:null, pro:null, date:null, time:null });
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(4);
  const [fname, setFname] = useState('');
  const [femail, setFemail] = useState('');
  const [fphone, setFphone] = useState('');

  const stepLabels = ['Servicio','Profesional','Fecha','Datos'];

  const goStep = (n: number) => {
    if (n===2 && !booking.service) { notify('Selecciona un servicio primero'); return; }
    if (n===3 && !booking.pro)     { notify('Selecciona un profesional primero'); return; }
    if (n===4 && (!booking.date || !booking.time)) { notify('Selecciona fecha y hora'); return; }
    setStep(n);
  };

  const confirmBooking = () => {
    if (!fname.trim() || !femail.includes('@') || fphone.length < 7) {
      notify('Completa todos los campos correctamente'); return;
    }
    setStep(5);
    notify('✉️ Email de confirmación enviado a ' + femail);
  };

  const reset = () => {
    setBooking({ service:null, pro:null, date:null, time:null });
    setFname(''); setFemail(''); setFphone('');
    setStep(1);
  };

  // Calendar
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const firstDayAdj = firstDay===0 ? 6 : firstDay-1;
  const today = new Date();

  const selectDate = (d: number) => {
    setBooking(b => ({ ...b, date: new Date(calYear, calMonth, d), time: null }));
  };

  const dateStr = booking.date
    ? booking.date.toLocaleDateString('es-CL',{day:'numeric',month:'long',year:'numeric'})
    : '-';

  return (
    <section id="booking" className="section-full">
      <div className="booking-inner">
        <div className="booking-grid">
          <div className="booking-left">
            <div className="section-label">Reserva online</div>
            <h2 className="section-title" style={{color:'#111'}}>Agenda<br/><em>Tu hora</em></h2>
            <div className="booking-info">
              {[
                { icon:'📍', label:'Dirección',    value:'Av. Apoquindo 4501, Las Condes' },
                { icon:'📅', label:'Horario',      value:'Lunes a Sábado, 09:00–19:00' },
                { icon:'✉️', label:'Confirmación', value:'Email + WhatsApp automático' },
                { icon:'🔔', label:'Recordatorio', value:'24 horas antes de tu cita' },
              ].map(item => (
                <div className="booking-info-item" key={item.label}>
                  <div className="booking-info-icon">{item.icon}</div>
                  <div>
                    <div className="booking-info-label">{item.label}</div>
                    <div className="booking-info-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="booking-form-wrap">
              {/* Steps */}
              <div className="booking-steps">
                {stepLabels.map((l,i) => (
                  <div key={l} className={`booking-step ${step===i+1?'active':''} ${step>i+1?'done':''}`}>
                    <div className="booking-step-num">{step>i+1 ? '✓' : i+1}</div>
                    <div className="booking-step-label">{l}</div>
                  </div>
                ))}
              </div>

              {/* Step 1 */}
              {step===1 && (
                <div>
                  <div className="form-title">¿Qué servicio quieres?</div>
                  <div className="form-grid">
                    {SERVICES.map(s => (
                      <div key={s.id} id={'sopt_'+s.id}
                        className={`service-option ${booking.service?.id===s.id?'selected':''}`}
                        onClick={()=>setBooking(b=>({...b,service:s}))}>
                        <div className="service-opt-name">{s.icon} {s.name}</div>
                        <div className="service-opt-meta">{s.duration}</div>
                        <div className="service-opt-price">{fmt(s.price)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="form-btns">
                    <span/>
                    <button className="btn-next" onClick={()=>goStep(2)}><span>Continuar</span> →</button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step===2 && (
                <div>
                  <div className="form-title">¿Con qué maestro?</div>
                  <div style={{display:'grid',gap:'1rem'}}>
                    {PROS.map(p => (
                      <div key={p.id}
                        className={`pro-option ${booking.pro?.id===p.id?'selected':''}`}
                        style={{display:'flex',alignItems:'center',gap:'1.25rem'}}
                        onClick={()=>setBooking(b=>({...b,pro:p}))}>
                        <img className="pro-opt-avatar" src={p.img} alt={p.name}/>
                        <div>
                          <div className="pro-opt-name">{p.name}</div>
                          <div className="pro-opt-spec">{p.spec}</div>
                          <div className="pro-opt-rating">{p.rating} ★</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="form-btns">
                    <button className="btn-back" onClick={()=>setStep(1)}>← Atrás</button>
                    <button className="btn-next" onClick={()=>goStep(3)}><span>Continuar</span> →</button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step===3 && (
                <div>
                  <div className="form-title">¿Cuándo te acomoda?</div>
                  <div className="calendar">
                    <div className="calendar-header">
                      <button className="calendar-nav" onClick={()=>{if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1);}}>‹</button>
                      <div className="calendar-title">{MONTHS[calMonth]} {calYear}</div>
                      <button className="calendar-nav" onClick={()=>{if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1);}}>›</button>
                    </div>
                    <div className="calendar-grid">
                      {['LU','MA','MI','JU','VI','SÁ','DO'].map(d=><div key={d} className="cal-day-label">{d}</div>)}
                      {Array(firstDayAdj).fill(null).map((_,i)=><div key={'e'+i} className="cal-day empty"/>)}
                      {Array.from({length:daysInMonth},(_,i)=>i+1).map(d=>{
                        const thisDate = new Date(calYear,calMonth,d);
                        const isPast = thisDate < new Date(today.getFullYear(),today.getMonth(),today.getDate());
                        const isSun = thisDate.getDay()===0;
                        const isSel = booking.date?.getDate()===d && booking.date?.getMonth()===calMonth && booking.date?.getFullYear()===calYear;
                        const isTod = today.getDate()===d && today.getMonth()===calMonth && today.getFullYear()===calYear;
                        let cls = 'cal-day';
                        if (isPast||isSun) cls+=' disabled';
                        else if (isSel) cls+=' selected';
                        else if (isTod) cls+=' today';
                        return <div key={d} className={cls} onClick={()=>!(isPast||isSun)&&selectDate(d)}>{d}</div>;
                      })}
                    </div>
                  </div>
                  {booking.date && (
                    <div className="time-slots">
                      {TIME_SLOTS.map(t=>(
                        <div key={t} className={`time-slot ${booking.time===t?'selected':''}`}
                          onClick={()=>setBooking(b=>({...b,time:t}))}>{t}</div>
                      ))}
                    </div>
                  )}
                  <div className="form-btns">
                    <button className="btn-back" onClick={()=>setStep(2)}>← Atrás</button>
                    {booking.date && booking.time && (
                      <button className="btn-next" onClick={()=>goStep(4)}><span>Continuar</span> →</button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step===4 && (
                <div>
                  <div className="form-title">Tus datos</div>
                  <div className="field"><label>Nombre completo *</label><input value={fname} onChange={e=>setFname(e.target.value)} placeholder="Juan Pérez"/></div>
                  <div className="field-row">
                    <div className="field"><label>Email *</label><input type="email" value={femail} onChange={e=>setFemail(e.target.value)} placeholder="juan@email.cl"/></div>
                    <div className="field"><label>Teléfono *</label><input type="tel" value={fphone} onChange={e=>setFphone(e.target.value)} placeholder="+56 9 1234 5678"/></div>
                  </div>
                  <div className="booking-summary">
                    {[['Servicio',booking.service?.name||'-'],['Profesional',booking.pro?.name||'-'],['Fecha',dateStr],['Hora',booking.time||'-']].map(([k,v])=>(
                      <div key={k} className="summary-row"><span style={{color:'#888'}}>{k}</span><span>{v}</span></div>
                    ))}
                    <div className="summary-row"><span>Total</span><span className="summary-total">{fmt(booking.service?.price||0)}</span></div>
                  </div>
                  <div className="form-btns">
                    <button className="btn-back" onClick={()=>setStep(3)}>← Atrás</button>
                    <button className="btn-next" onClick={confirmBooking}><span>✦ Confirmar Reserva</span></button>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {step===5 && (
                <div className="booking-confirm">
                  <div className="confirm-icon">✓</div>
                  <div className="confirm-title">¡Reserva confirmada!</div>
                  <div className="confirm-sub">Te enviamos los detalles por email y recibirás un recordatorio por WhatsApp 24h antes.</div>
                  <div className="booking-summary">
                    {[['Servicio',booking.service?.name||'-'],['Profesional',booking.pro?.name||'-'],['Fecha',dateStr],['Hora',booking.time||'-']].map(([k,v])=>(
                      <div key={k} className="summary-row"><span style={{color:'#888'}}>{k}</span><span>{v}</span></div>
                    ))}
                    <div className="summary-row"><span>Total</span><span className="summary-total">{fmt(booking.service?.price||0)}</span></div>
                  </div>
                  <button className="btn-next" onClick={reset} style={{margin:'1.5rem auto 0',display:'flex'}}><span>✦ Hacer otra reserva</span></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SCHEDULE ─────────────────────────────────────────────────────────
function ScheduleSection() {
  const todayDow = new Date().getDay();
  return (
    <section id="schedule" className="section-full">
      <div className="schedule-inner">
        <div className="section-label">Cuándo abrimos</div>
        <h2 className="section-title">Horario<br/><em>Semanal</em></h2>
        <div className="schedule-grid">
          {SCHEDULE.map((d,i) => {
            const isToday = i===6 ? todayDow===0 : todayDow===i+1;
            return (
              <div key={i} className={`schedule-day ${!d.open?'closed':''} ${isToday?'today-col':''}`}>
                {isToday && <div className="today-badge">HOY</div>}
                <div className="sched-day-letter">{d.day}</div>
                <div className="sched-day-name">{d.name}</div>
                <div className="sched-hours">{d.h}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION ─────────────────────────────────────────────────────────
function LocationSection() {
  return (
    <section id="location" style={{padding:0,maxWidth:'none'}}>
      <div className="location-grid">
        <div className="location-info">
          <div className="section-label">Dónde estamos</div>
          <h2 className="section-title">Nuestra<br/><em>Ubicación</em></h2>
          <div className="contact-items">
            {[
              { icon:'📍', label:'Dirección', value:'Av. Apoquindo 4501, Las Condes' },
              { icon:'📞', label:'Teléfono',  value:'+56 2 1234 5678' },
              { icon:'✉️', label:'Email',     value:'hola@noirbarberia.cl' },
            ].map(item=>(
              <div className="contact-item" key={item.label}>
                <div className="contact-item-icon">{item.icon}</div>
                <div>
                  <div className="contact-item-l">{item.label}</div>
                  <div className="contact-item-v">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="whatsapp-btn">💬 Escribir por WhatsApp</button>
        </div>
        <div className="location-map-placeholder">
          <div className="location-map-grid"></div>
          <div className="location-pin">
            <div className="location-pin-dot"><div className="location-pin-dot-inner">N</div></div>
            <div className="location-address">Av. Apoquindo 4501</div>
            <div className="location-sub">Las Condes, Santiago</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────
type Appt = { id:number, client:string, service:string, pro:string, date:string, time:string, status:string, total:number, email:string };

function AdminSection({ notify }: { notify:(m:string)=>void }) {
  const [appts, setAppts] = useState<Appt[]>(APPOINTMENTS_DEFAULT);
  const [filter, setFilter] = useState('todos');
  const [search, setSearch] = useState('');
  const [emailConfigs, setEmailConfigs] = useState(EMAIL_CONFIGS_DEFAULT.map(e=>({...e})));

  const updateStatus = (id: number, status: string) =>
    setAppts(a => a.map(x => x.id===id ? {...x,status} : x));
  const deleteAppt = (id: number) => { setAppts(a=>a.filter(x=>x.id!==id)); notify('Cita eliminada del sistema'); };
  const sendReminder = (id: number) => { const a=appts.find(x=>x.id===id); if(a) notify(`📱 Recordatorio enviado a ${a.client}`); };
  const toggleEmail = (i: number) => setEmailConfigs(c => c.map((e,j)=>j===i?{...e,on:!e.on}:e));

  const filtered = appts
    .filter(a => filter==='todos' || a.status===filter)
    .filter(a => !search || a.client.toLowerCase().includes(search.toLowerCase()) || a.service.toLowerCase().includes(search.toLowerCase()));

  const confirmed = appts.filter(a=>a.status==='confirmado');
  const pending   = appts.filter(a=>a.status==='pendiente');
  const revenue   = confirmed.reduce((s,a)=>s+a.total,0);
  const kpis = [
    { icon:'📅', val:appts.length,      label:'Total citas',  change:'+3 esta semana' },
    { icon:'✅', val:confirmed.length,  label:'Confirmadas',  change:`${Math.round(confirmed.length/appts.length*100)}% del total` },
    { icon:'⏳', val:pending.length,    label:'Pendientes',   change:'Requieren atención' },
    { icon:'💰', val:fmt(revenue),      label:'Ingresos',     change:'+12% vs semana anterior' },
  ];
  const barDays = ['Lun','Mar','Mié','Jue','Vie','Sáb'];
  const barVals = [3,5,2,7,6,4];
  const barMax  = Math.max(...barVals);

  return (
    <section id="admin" className="section-full">
      <div className="admin-inner">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'2rem'}}>
          <div>
            <div className="section-label">Panel de control</div>
            <h2 className="section-title">Admin<em>istración</em></h2>
          </div>
          <div style={{fontFamily:'var(--ff-mono)',fontSize:'0.7rem',color:'var(--muted)'}}>Simulación de backend Python (Flask/FastAPI)</div>
        </div>

        {/* KPIs */}
        <div className="admin-kpis">
          {kpis.map(k=>(
            <div className="kpi" key={k.label}>
              <div className="kpi-icon">{k.icon}</div>
              <div className="kpi-value">{k.val}</div>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-change">{k.change}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="admin-controls">
          <input className="admin-search" placeholder="Buscar cliente, servicio..." value={search} onChange={e=>setSearch(e.target.value)}/>
          {['todos','confirmado','pendiente','cancelado'].map(f=>(
            <button key={f} className={`admin-filter ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>
              {f==='todos'?'Todos':f.charAt(0).toUpperCase()+f.slice(1)+'s'}
            </button>
          ))}
          <button className="btn-primary" style={{padding:'.7rem 1.5rem',fontFamily:'var(--ff-mono)',fontSize:'0.65rem',letterSpacing:'.15em',textTransform:'uppercase',cursor:'none'}}
            onClick={()=>notify('⚡ Script Python ejecutado: 3 recordatorios enviados')}>
            <span>⚡ Ejecutar Python</span>
          </button>
        </div>

        {/* Table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {['Cliente','Servicio','Profesional','Fecha','Hora','Estado','Total','Acciones'].map(h=><th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.length===0
                ? <tr><td colSpan={8} style={{textAlign:'center',padding:'3rem',color:'var(--muted)'}}>No hay citas</td></tr>
                : filtered.map(a=>(
                  <tr key={a.id}>
                    <td><div style={{fontWeight:700,color:'var(--text)'}}>{a.client}</div><div style={{fontSize:'.75rem',color:'var(--muted)'}}>{a.email}</div></td>
                    <td style={{color:'var(--muted)'}}>{a.service}</td>
                    <td style={{color:'var(--muted)'}}>{a.pro}</td>
                    <td style={{color:'var(--muted)'}}>{a.date}</td>
                    <td style={{color:'var(--gold)',fontFamily:'var(--ff-mono)',fontSize:'.8rem'}}>{a.time}</td>
                    <td>
                      <select className={`status-badge ${a.status}`}
                        value={a.status} onChange={e=>updateStatus(a.id,e.target.value)}
                        style={{cursor:'none',background:'transparent',border:'none',outline:'none',fontFamily:'var(--ff-mono)',fontSize:'.6rem',letterSpacing:'.1em',textTransform:'uppercase',padding:'.3rem .75rem'}}>
                        <option value="confirmado">✓ Confirmado</option>
                        <option value="pendiente">⏳ Pendiente</option>
                        <option value="cancelado">✕ Cancelado</option>
                      </select>
                    </td>
                    <td style={{fontFamily:'var(--ff-serif)',color:'var(--gold)',fontWeight:700}}>{fmt(a.total)}</td>
                    <td>
                      <button className="action-btn" onClick={()=>sendReminder(a.id)}>📱</button>
                      <button className="action-btn del" onClick={()=>deleteAppt(a.id)}>✕</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* Charts */}
        <div className="admin-grid">
          <div className="admin-card">
            <div className="admin-card-title">📊 Ingresos por día</div>
            <div className="bar-chart">
              {barDays.map((d,i)=>(
                <div className="bar-wrap" key={d}>
                  <div className="bar-value">{barVals[i]}</div>
                  <div className="bar" style={{height:`${Math.round(barVals[i]/barMax*100)}%`}}>
                    <div className="bar-fill" style={{height:'100%'}}></div>
                  </div>
                  <div className="bar-label">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-title">✉️ Correos & recordatorios automáticos</div>
            <ul className="email-list">
              {emailConfigs.map((e,i)=>(
                <li className="email-item" key={e.name}>
                  <button className={`email-toggle ${e.on?'on':''}`} onClick={()=>toggleEmail(i)}>
                    <div className="email-toggle-dot"></div>
                  </button>
                  <span className="email-name">{e.name}</span>
                  <span className="email-status" style={{fontFamily:'var(--ff-mono)',fontSize:'.6rem',letterSpacing:'.1em'}}>{e.on?'ACTIVO':'INACTIVO'}</span>
                  {e.on && <button className="reminder-send-btn" onClick={()=>notify(`✉️ ${e.name} enviado manualmente`)}>Enviar</button>}
                </li>
              ))}
            </ul>
            <div style={{marginTop:'1.5rem',padding:'1rem',background:'var(--ash)',fontFamily:'var(--ff-mono)',fontSize:'0.65rem',color:'var(--muted)',lineHeight:1.8}}>
              <span style={{color:'var(--gold)'}}># Python backend simulado</span><br/>
              <span style={{color:'#a8ff78'}}>import</span> smtplib, schedule<br/>
              reminder_service.send_24h_reminder(<span style={{color:'var(--gold)'}}>&#39;appointments&#39;</span>)<br/>
              <span style={{color:'var(--muted)'}}># → Ejecutado: Lun–Sáb 09:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────
function Footer({ scrollTo }: { scrollTo:(id:string)=>void }) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{display:'inline-flex',alignItems:'center',gap:'.75rem',marginBottom:'.5rem'}}>
              <div className="nav-logo-mark">N</div>
              <span className="nav-logo-text">NOIR<span>&amp;</span>CO</span>
            </div>
            <p>Barbería de lujo. Precisión artesanal. Experiencia irrepetible. Est. 2016, Santiago de Chile.</p>
          </div>
          <div>
            <div className="footer-col-title">Navegar</div>
            <ul className="footer-links">
              {[['services','Servicios'],['team','Equipo'],['gallery','Galería'],['booking','Reservar']].map(([id,label])=>(
                <li key={id}><a href={'#'+id} onClick={e=>{e.preventDefault();scrollTo(id)}}>{label}</a></li>
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
              <li><a href="#">Av. Apoquindo 4501</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Noir &amp; Co. Todos los derechos reservados.</span>
          <div className="footer-social">
            {['ig','fb','tw'].map(s=><a key={s} href="#" className="social-link">{s}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}