/* ============================================================
   NAVRAS — Cultural Society of JEMTEC
   Vanilla JS interactions
   ============================================================ */

/* -------- NAVBAR scroll + mobile menu -------- */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// /* -------- HERO mouse parallax -------- */
// const heroContent = document.getElementById('heroContent');
// document.querySelector('.hero').addEventListener('mousemove', e => {
//   const x = (e.clientX / window.innerWidth - .5) * 20;
//   const y = (e.clientY / window.innerHeight - .5) * 20;
//   heroContent.style.transform = `translate(${x}px, ${y}px)`;
// });

/* -------- REVEAL on scroll -------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* -------- COUNTERS -------- */
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const dur = 1600, start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(p * target) + (p === 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterIO.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('.num').forEach(n => counterIO.observe(n));

/* -------- PAST EVENTS data + render -------- */
const events = [
  {
    title: 'ADHYAAY',
    date: '24 Mar 2025',
    desc: 'A high-voltage face-off where crews battled for the campus crown.',

    image: 'assets/event/adhyaay.jpeg',

    venue: 'Main Auditorium',
    participation: 'Open to all departments — solo & crew categories',

    highlights: ['Live DJ set', 'Celebrity guest judge', 'Prize pool of ₹50,000'],

    coords: ['Aarav Sharma', 'Ishita Verma'],

    timeline: ['5PM Crew check-in', '6PM Opening cypher', '7PM Battle rounds', '9PM Finals & awards']
  },
  {
    title: 'Rangmanch', date: '04 Feb 2025', desc: 'An evening of street plays and stage drama tackling stories that matter.',
    venue: 'Open-Air Theatre', participation: 'Drama clubs & individual performers',
    highlights: ['7 stage acts', 'Bilingual performances', 'Audience choice award'],
    coords: ['Rohan Mehta', 'Saanvi Kapoor'],
    timeline: ['6PM Doors open', '6:30PM Opening act', '8PM Intermission', '9PM Closing piece']
  },
  {
    title: 'Open Mic Night', date: '18 Jan 2025', desc: 'Poets, comics and singers took the spotlight in an unfiltered evening.',
    venue: 'Cafeteria Stage', participation: 'Walk-in slots + curated lineup',
    highlights: ['22 performers', 'Live acoustic sets', 'Spoken-word showcase'],
    coords: ['Devansh Roy', 'Meher Sodhi'],
    timeline: ['5PM Sign-ups', '6PM First half', '7:30PM Headliners', '9PM Open jam']
  },
  {
    title: 'Fashion Show', date: '09 Nov 2024', desc: 'A runway celebrating identity, sustainability and student designers.',
    venue: 'Convention Hall', participation: 'Models & designers from all batches',
    highlights: ['4 themed segments', 'Sustainable fashion line', 'Designer awards'],
    coords: ['Tanya Bhatt', 'Kabir Anand'],
    timeline: ['7PM Walk-in', '7:30PM Segment 1', '8:30PM Designer showcase', '9:30PM Finale walk']
  },
  {
    title: 'Music Night', date: '21 Oct 2024', desc: 'Bands, soloists and a headlining alumni act — one unforgettable night.',
    venue: 'Main Quad', participation: 'Bands, vocalists, instrumentalists',
    highlights: ['6 student bands', 'Alumni headliner', 'Acoustic finale'],
    coords: ['Aryan Khanna', 'Niharika Jain'],
    timeline: ['6PM Soundcheck', '7PM Opening band', '8:30PM Headliner', '10PM Acoustic close']
  },
  {
    title: 'Freshers Fest', date: '30 Aug 2024', desc: 'Welcoming the new batch with games, performances and a grand finale.',
    venue: 'Sports Ground', participation: 'All first-year students',
    highlights: ['Mr. & Ms. Fresher', 'Live band', 'Theme: Neon Carnival'],
    coords: ['Vivaan Suri', 'Riya Chawla'],
    timeline: ['4PM Welcome games', '6PM Performances', '8PM Crowning', '9PM DJ night']
  },
];

const eventsGrid = document.getElementById('eventsGrid');
events.forEach((ev, i) => {
  const card = document.createElement('article');
  card.className = 'event-card';
  card.innerHTML = `
    <div class="event-poster">
  <img src="${ev.image}" alt="${ev.title}">
</div>
    <div class="event-body">
      <span class="event-date">${ev.date}</span>
      <h3 class="event-title">${ev.title}</h3>
      <p class="event-desc">${ev.desc}</p>
      <button class="btn btn-primary" data-event="${i}">View Details</button>
    </div>`;
  eventsGrid.appendChild(card);
});

/* -------- EVENT MODAL -------- */
const modal = document.getElementById('eventModal');
const modalBody = document.getElementById('modalBody');

eventsGrid.addEventListener('click', e => {
  const btn = e.target.closest('[data-event]');
  if (!btn) return;
  const ev = events[+btn.dataset.event];
  modalBody.innerHTML = `
    <div class="modal-banner">
  <img src="${ev.image}" alt="${ev.title}">
</div>
    <div class="modal-content">
      <h3>${ev.title}</h3>
      <div class="modal-meta">
        <span><strong>Date</strong>${ev.date}</span>
        <span><strong>Venue</strong>${ev.venue}</span>
        <span><strong>Participation</strong>${ev.participation}</span>
      </div>
      <p>${ev.desc} It became one of the most talked-about evenings on the NAVRAS calendar — a celebration of craft, energy and student spirit.</p>
      <h4>Highlights</h4>
      <ul>${ev.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
      <h4>Timeline</h4>
      <ul>${ev.timeline.map(t => `<li>${t}</li>`).join('')}</ul>
      <h4>Coordinators</h4>
      <div class="modal-coordinators">${ev.coords.map(c => `<span class="coord">${c}</span>`).join('')}</div>
      <h4>Event Gallery</h4>
      <div class="modal-gallery">

  <img src="${ev.image}" alt="${ev.title}">
  <img src="${ev.image}" alt="${ev.title}">
  <img src="${ev.image}" alt="${ev.title}">

</div>
    </div>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
});

modal.addEventListener('click', e => {
  if (e.target.dataset.close !== undefined) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* -------- UPCOMING EVENTS + countdown -------- */
const upcoming = [
  { name: 'Spring Sangam', desc: 'A two-day cultural festival featuring music, dance and drama.', date: daysFromNow(28) },
  { name: 'Indie Music Fest', desc: 'A curated lineup of student bands and indie artists.', date: daysFromNow(54) },
  { name: 'Annual Day', desc: 'The grand finale of the year — performances, awards and more.', date: daysFromNow(90) },
];
function daysFromNow(d) { const x = new Date(); x.setDate(x.getDate() + d); return x; }

const upcomingGrid = document.getElementById('upcomingGrid');
upcoming.forEach((u, i) => {
  const card = document.createElement('div');
  card.className = 'upcoming-card';
  card.innerHTML = `
    <h4>${u.name}</h4>
    <p>${u.desc}</p>
    <div class="countdown" data-target="${u.date.toISOString()}">
      <div><span class="d">00</span><small>Days</small></div>
      <div><span class="h">00</span><small>Hrs</small></div>
      <div><span class="m">00</span><small>Min</small></div>
      <div><span class="s">00</span><small>Sec</small></div>
    </div>
    <a href="#join" class="btn btn-primary">Register</a>`;
  upcomingGrid.appendChild(card);
});

function tickCountdowns() {
  document.querySelectorAll('.countdown').forEach(c => {
    const t = new Date(c.dataset.target).getTime() - Date.now();
    if (t < 0) return;
    const d = Math.floor(t / 86400000);
    const h = Math.floor(t % 86400000 / 3600000);
    const m = Math.floor(t % 3600000 / 60000);
    const s = Math.floor(t % 60000 / 1000);
    c.querySelector('.d').textContent = String(d).padStart(2, '0');
    c.querySelector('.h').textContent = String(h).padStart(2, '0');
    c.querySelector('.m').textContent = String(m).padStart(2, '0');
    c.querySelector('.s').textContent = String(s).padStart(2, '0');
  });
}
setInterval(tickCountdowns, 1000); tickCountdowns();

/* -------- TEAM -------- */
const core = [
  {
    name: 'Ansh Paul',
    role: 'President',
    tag: 'The vision behind NAVRAS.',
    image: 'assets/team/1.png'
  },

  {
    name: 'Rudransh',
    role: 'Vice President',
    tag: 'Turning vision into action.',
    image: 'assets/team/2.png'
  },

  {
    name: 'Aparna Chauhan',
    role: 'Secretary',
    tag: 'Keeping everything aligned.',
    image: 'assets/team/3.png'
  },

  {
    name: 'Alok Kumar',
    role: 'Graphic Lead',
    tag: 'Designs every moment.',
    image: 'assets/team/4.png'
  },

  {
    name: 'Purab Negi',
    role: 'Technical Advisory',
    tag: 'Driving innovation.',
    image: 'assets/team/5.png'
  },

  {
    name: 'Vivek Malik',
    role: 'Technical Advisory',
    tag: 'Tech with purpose.',
    image: 'assets/team/6.png'
  },

  {
    name: 'Mayank Thakur',
    role: 'PR Head',
    tag: 'Building connections.',
    image: 'assets/team/7.png'
  },

  {
    name: 'Hardik',
    role: 'PR Head',
    tag: 'Voice of NAVRAS.',
    image: 'assets/team/8.png'
  },

  {
    name: 'Himanshu Phogat',
    role: 'Treasurer',
    tag: 'Keeping it balanced.',
    image: 'assets/team/9.png'
  },

  {
    name: 'Hiren',
    role: 'Treasurer',
    tag: 'Handling it wisely.',
    image: 'assets/team/10.png'
  },

  {
    name: 'Ujjwal',
    role: 'Student disciplinary',
    tag: 'Maintaining discipline.',
    image: 'assets/team/11.png'
  },

  {
    name: 'Parmeet',
    role: 'Student disciplinary',
    tag: 'Leading with discipline.',
    image: 'assets/team/12.png'
  },

  {
    name: 'Ansh Pandey',
    role: 'student disciplinary',
    tag: 'Ensuring order and unity.',
    image: 'assets/team/13.png'
  },
];
const members = [
  {
    name: 'Akshita',
    role: 'Technical Head',
    tag: 'Leading the tech vision.',
    image: 'assets/team/14.png'
  },

  {
    name: 'Amogh',
    role: 'Technical Co-Head',
    tag: 'Leading the tech vision.',
    image: 'assets/team/15.png'
  },

  {
    name: 'Samakhya',
    role: 'Content Head',
    tag: 'Shaping creative stories.',
    image: 'assets/team/16.png'
  },

  {
    name: 'Aanya Pathak',
    role: 'Content Co-Head',
    tag: 'Crafting ideas together.',
    image: 'assets/team/17.png'
  },

  {
    name: 'Amanat',
    role: 'Management Head',
    tag: 'Managing with excellence.',
    image: 'assets/team/18.png'
  },

  {
    name: 'Rakshit Dogra',
    role: 'management Co-Head',
    tag: 'Supporting every operation.',
    image: 'assets/team/19.png'
  },

  {
    name: 'Urvashi',
    role: 'Social Media Head',
    tag: 'Building NAVRAS online.',
    image: 'assets/team/20.png'
  },

  {
    name: 'Ashima',
    role: 'Social Media Co-Head',
    tag: 'Keeping creativity connected.',
    image: 'assets/team/21.png'
  },

  {
    name: 'Deepak Dhoundiyal',
    role: 'Marketing Head',
    tag: 'Promoting the NAVRAS vision.',
    image: 'assets/team/22.png'
  },

  {
    name: 'Vidhi Bajaj',
    role: 'Marketing Co-Head',
    tag: 'Expanding creativity everywhere.',
    image: 'assets/team/23.png'
  },

  {
    name: 'Kanupriya',
    role: 'Member',
    tag: 'Driven by creativity.',
    image: 'assets/team/24.png'
  },

  {
    name: 'Anshaj',
    role: 'Member',
    tag: 'Creating with passion.',
    image: 'assets/team/25.png'
  },

  {
    name: 'Kartik Vats',
    role: 'Member',
    tag: 'Powered by ideas.',
    image: 'assets/team/26.png'
  },

  {
    name: 'Aditya Chahal',
    role: 'Member',
    tag: 'Inspired to create.',
    image: 'assets/team/27.png'
  },

  {
    name: 'Kartik Vats',
    role: 'Member',
    tag: 'Powered by ideas.',
    image: 'assets/team/ishita.jpg'
  },
];

function renderTeam(targetId, list) {
  const el = document.getElementById(targetId);
  list.forEach(m => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <div class="team-photo">
   <img src="${m.image}" alt="">
</div>
      <h4>${m.name}</h4>
      <div class="team-role">${m.role}</div>
      <p class="team-tag">${m.tag}</p>
      <div class="team-socials">
        <a href="#">in</a><a href="#">ig</a>
      </div>`;
    el.appendChild(card);
  });
}
renderTeam('coreTeam', core);
renderTeam('membersTeam', members);

/* -------- GALLERY + filter + lightbox -------- */
const gallery = [
  { cat: 'events', label: 'Annual Fest' }, { cat: 'performances', label: 'Dance Act' },
  { cat: 'bts', label: 'Backstage' }, { cat: 'celebrations', label: 'Holi 2024' },
  { cat: 'events', label: 'Open Mic' }, { cat: 'performances', label: 'Band Night' },
  { cat: 'bts', label: 'Rehearsals' }, { cat: 'celebrations', label: 'Diwali' },
  { cat: 'events', label: 'Fashion Show' }, { cat: 'performances', label: 'Solo Vocal' },
  { cat: 'bts', label: 'Set Design' }, { cat: 'celebrations', label: 'Freshers' },
];
const masonry = document.getElementById('masonry');
gallery.forEach(g => {
  const item = document.createElement('div');
  item.className = 'item'; item.dataset.cat = g.cat;
  item.innerHTML = `<div class="placeholder">${g.label}</div>`;
  masonry.appendChild(item);
});

document.getElementById('galleryFilters').addEventListener('click', e => {
  if (!e.target.matches('.filter')) return;
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  const f = e.target.dataset.filter;
  document.querySelectorAll('.masonry .item').forEach(it => {
    it.style.display = (f === 'all' || it.dataset.cat === f) ? '' : 'none';
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
masonry.addEventListener('click', e => {
  const item = e.target.closest('.item');
  if (!item) return;
  lightboxContent.innerHTML = `<div class="placeholder">${item.querySelector('.placeholder').textContent} — Full View</div>`;
  lightbox.classList.add('open');
});
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });

/* -------- TESTIMONIALS slider -------- */
const testimonials = [
  { name: 'Ananya Singh', dept: 'CSE, 3rd Year', quote: 'NAVRAS gave me a stage and a second family. Every event feels like coming home.' },
  { name: 'Rohit Bansal', dept: 'ECE, 2nd Year', quote: 'From shy listener to lead vocalist — this society changed how I see myself.' },
  { name: 'Priya Menon', dept: 'MBA, 1st Year', quote: 'The energy backstage is unreal. You don\'t just join NAVRAS, you live it.' },
  { name: 'Karan Gupta', dept: 'CSE, 4th Year', quote: 'Four years later, my best memories of college are NAVRAS evenings.' },
];
const slidesEl = document.getElementById('slides');
const dotsEl = document.getElementById('dots');
let curSlide = 0;
testimonials.forEach((t, i) => {
  slidesEl.insertAdjacentHTML('beforeend', `
    <div class="slide">
      <div class="placeholder">Photo</div>
      <blockquote>"${t.quote}"</blockquote>
      <cite>${t.name}<small>${t.dept}</small></cite>
    </div>`);
  dotsEl.insertAdjacentHTML('beforeend', `<span data-i="${i}" class="${i === 0 ? 'active' : ''}"></span>`);
});
function goSlide(i) {
  curSlide = (i + testimonials.length) % testimonials.length;
  slidesEl.style.transform = `translateX(-${curSlide * 100}%)`;
  dotsEl.querySelectorAll('span').forEach((d, k) => d.classList.toggle('active', k === curSlide));
}
document.getElementById('prevSlide').addEventListener('click', () => goSlide(curSlide - 1));
document.getElementById('nextSlide').addEventListener('click', () => goSlide(curSlide + 1));
dotsEl.addEventListener('click', e => { if (e.target.dataset.i) goSlide(+e.target.dataset.i); });
setInterval(() => goSlide(curSlide + 1), 6000);

/* -------- FORMS -------- */
document.getElementById('joinForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('formMsg').textContent = 'Thank you! We\'ll be in touch soon.';
  e.target.reset();
});
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Message sent! We\'ll get back to you shortly.');
  e.target.reset();
});

/* -------- FOOTER year -------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* -------- Floating-label fix: ensure placeholder exists -------- */
document.querySelectorAll('.field input,.field textarea').forEach(i => i.setAttribute('placeholder', ' '));