/* ===== Golden Space — script.js ===== */
const PHONE = '995568800870';

/* ---- მენიუს მონაცემები (ფასები ლარში) ---- */
const MENU = {
  shaurma: { label: '🌯 შაურმა', items: [
    { id: 's1', name: 'შაურმა მინი',     sub: 'mini',        price: 7,  em: '🌯', size: 44 },
    { id: 's2', name: 'შაურმა პატარა',   sub: 'პატარა',      price: 10, em: '🌯', size: 54 },
    { id: 's3', name: 'შაურმა სტანდარტი',sub: 'სტანდარტი',   price: 12, em: '🌯', size: 62 },
    { id: 's4', name: 'შაურმა საშუალო',  sub: 'საშუალო',     price: 16, em: '🌯', size: 72 },
    { id: 's5', name: 'შაურმა დიდი',     sub: 'დიდი',        price: 18, em: '🌯', size: 82 },
    { id: 's6', name: 'შაურმა გოლდენი',  sub: 'გოლდენ სპეციალური', price: 25, em: '🌯', size: 94, ribbon: 'GOLD' }
  ]},
  burger: { label: '🍔 ბურგერი & ჰოთ დოგი', items: [
    { id: 'b1', name: 'ბურგერი',          sub: 'შაურმის ხორცით', price: 6,  em: '🍔' },
    { id: 'b2', name: 'ჩიზბურგერი',       sub: 'შაურმის ხორცით', price: 9,  em: '🧀' },
    { id: 'h1', name: 'ჰოთ დოგი კლასიკი', sub: 'კლასიკური',      price: 5,  em: '🌭' },
    { id: 'h2', name: 'ჰოთ დოგი მექსიკური',sub: 'მექსიკური',     price: 7,  em: '🌭' },
    { id: 'h3', name: 'ბულდოგი',          sub: 'დიდი ჰოთ დოგი',  price: 10, em: '🌭', ribbon: 'TOP' }
  ]},
  box: { label: '📦 ბოქსი, ნაგეტი & ფრი', items: [
    { id: 'x1', name: 'შაურმა ბოქსი',  sub: 'GS Box',    price: 12, em: '📦' },
    { id: 'n1', name: 'ნაგეტი პატარა', sub: 'პატარა',    price: 6,  em: '🍗' },
    { id: 'n2', name: 'ნაგეტი დიდი',   sub: 'დიდი',      price: 9,  em: '🍗' },
    { id: 'f1', name: 'ფრი საშუალო',   sub: 'საშუალო',   price: 6,  em: '🍟' },
    { id: 'f2', name: 'ფრი დიდი',      sub: 'დიდი',      price: 12, em: '🍟' },
    { id: 'c1', name: 'ყველის სოუსი პატარა', sub: 'პატარა', price: 5, em: '🧀' },
    { id: 'c2', name: 'ყველის სოუსი დიდი',   sub: 'დიდი',   price: 10, em: '🧀' }
  ]},
  drinks: { label: '🥤 სასმელები', items: [
    { id: 'd1', name: 'გამაგრილებელი სასმელი', sub: 'Coca-Cola, Fanta, Sprite...', price: 2.5, em: '🥤' },
    { id: 'l1', name: 'ლუდი Paulaner',  sub: 'ბოთლი',  price: 8, em: '🍺' },
    { id: 'l2', name: 'ლუდი Heineken',  sub: 'ბოთლი',  price: 6, em: '🍻' },
    { id: 'a1', name: 'აირანი',         sub: 'Ayran',  price: 3, em: '🥛' }
  ]}
};
const ALL = Object.values(MENU).flatMap(c => c.items);
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const fmt = n => (Number.isInteger(n) ? n : n.toFixed(1)) + '₾';

/* ---- preloader ---- */
window.addEventListener('load', () => setTimeout(() => $('#preloader')?.classList.add('hide'), 900));

/* ---- header ---- */
const header = $('#header');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 30);
onScroll(); addEventListener('scroll', onScroll, { passive: true });
const burger = $('#burger'), nav = $('#nav');
burger?.addEventListener('click', () => { burger.classList.toggle('open'); nav.classList.toggle('open'); });
$$('#nav a').forEach(a => a.addEventListener('click', () => { burger?.classList.remove('open'); nav.classList.remove('open'); }));
if (location.pathname.endsWith('map.html')) $$('#nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === 'map.html'));
const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

/* ---- cursor glow ---- */
const glow = $('#cursorGlow');
if (glow && matchMedia('(hover:hover)').matches) {
  addEventListener('mousemove', e => { glow.style.opacity = 1; glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
}

/* ---- toast ---- */
let toastT;
function toast(msg) {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---- menu render ---- */
const grid = $('#menuGrid'), tabs = $('#tabs');
let activeTab = 'shaurma';
function renderTabs() {
  if (!tabs) return;
  tabs.innerHTML = Object.entries(MENU).map(([k, c]) =>
    `<button class="tab ${k === activeTab ? 'active' : ''}" data-tab="${k}">${c.label}</button>`).join('');
}
function renderMenu() {
  if (!grid) return;
  grid.innerHTML = MENU[activeTab].items.map((it, i) => `
    <article class="item" style="animation-delay:${i * 70}ms">
      ${it.ribbon ? `<span class="ribbon">${it.ribbon}</span>` : ''}
      <div class="em" style="font-size:${it.size || 64}px">${it.em}</div>
      <h4>${it.name}</h4>
      <small>${it.sub || ''}</small>
      <div class="row"><span class="price">${fmt(it.price)}</span>
      <button class="add" data-add="${it.id}" aria-label="დამატება">+</button></div>
    </article>`).join('');
  initTilt(grid.querySelectorAll('.item'));
}
tabs?.addEventListener('click', e => {
  const b = e.target.closest('.tab'); if (!b) return;
  activeTab = b.dataset.tab; renderTabs(); renderMenu();
});
grid?.addEventListener('click', e => {
  const b = e.target.closest('[data-add]'); if (!b) return;
  addToCart(b.dataset.add);
  const r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2);
});

/* ---- cart ---- */
let cart = {};
try { cart = JSON.parse(localStorage.getItem('gs_cart') || '{}'); } catch (e) { cart = {}; }
const save = () => { try { localStorage.setItem('gs_cart', JSON.stringify(cart)); } catch (e) {} };
function addToCart(id) { cart[id] = (cart[id] || 0) + 1; save(); renderCart(); const it = ALL.find(x => x.id === id); toast('✅ ' + it.name + ' დაემატა'); const cb = $('#cartBtn'); cb?.classList.remove('bump'); void cb?.offsetWidth; cb?.classList.add('bump'); }
function changeQty(id, d) { cart[id] = (cart[id] || 0) + d; if (cart[id] <= 0) delete cart[id]; save(); renderCart(); }
function renderCart() {
  const ids = Object.keys(cart).filter(id => ALL.find(x => x.id === id));
  const count = ids.reduce((s, id) => s + cart[id], 0);
  const total = ids.reduce((s, id) => s + cart[id] * ALL.find(x => x.id === id).price, 0);
  const cc = $('#cartCount'); if (cc) cc.textContent = count;
  const tt = $('#cartTotal'); if (tt) tt.textContent = fmt(total);
  const box = $('#cartItems'); if (!box) return;
  box.innerHTML = ids.length ? ids.map(id => { const it = ALL.find(x => x.id === id); return `
    <div class="ci"><div class="e">${it.em}</div>
      <div><b>${it.name}</b><small>${fmt(it.price)} × ${cart[id]} = ${fmt(it.price * cart[id])}</small></div>
      <div class="qty"><button data-q="-1" data-id="${id}">−</button><span>${cart[id]}</span><button data-q="1" data-id="${id}">+</button></div>
    </div>`; }).join('') : `<div class="empty"><span>🛒</span>კალათა ცარიელია.<br>დაამატე რამე გემრიელი!</div>`;
}
$('#cartItems')?.addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (b) changeQty(b.dataset.id, +b.dataset.q); });
const drawer = $('#drawer'), overlay = $('#overlay');
const openCart = () => { drawer?.classList.add('open'); overlay?.classList.add('show'); };
const closeCart = () => { drawer?.classList.remove('open'); overlay?.classList.remove('show'); };
$('#cartBtn')?.addEventListener('click', openCart);
$('#closeCart')?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);
$('#clearCart')?.addEventListener('click', () => { cart = {}; save(); renderCart(); });
$('#orderWa')?.addEventListener('click', () => {
  const ids = Object.keys(cart);
  if (!ids.length) return toast('🛒 კალათა ცარიელია');
  const name = $('#oName').value.trim(), phone = $('#oPhone').value.trim(), addr = $('#oAddr').value.trim();
  if (!name || !phone || !addr) { [['#oName', name], ['#oPhone', phone], ['#oAddr', addr]].forEach(([s, v]) => $(s).classList.toggle('err', !v)); return toast('გთხოვ შეავსო სახელი, ტელეფონი და მისამართი'); }
  let total = 0;
  const lines = ids.map(id => { const it = ALL.find(x => x.id === id); total += it.price * cart[id]; return `• ${it.name} × ${cart[id]} = ${fmt(it.price * cart[id])}`; });
  const msg = `🛵 ახალი შეკვეთა — Golden Space\n\n${lines.join('\n')}\n\nჯამი: ${fmt(total)}\n\n👤 ${name}\n📞 ${phone}\n📍 ${addr}`;
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
});
renderTabs(); renderMenu(); renderCart();

/* ---- booking ---- */
const bd = $('#bDate');
if (bd) { const t = new Date(); bd.min = t.toISOString().slice(0, 10); bd.value = bd.min; }
$('#bookingForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const f = { name: $('#bName'), phone: $('#bPhone'), date: $('#bDate'), time: $('#bTime') };
  let ok = true;
  Object.values(f).forEach(i => { const bad = !i.value.trim(); i.classList.toggle('err', bad); if (bad) ok = false; });
  if (!ok) return toast('გთხოვ შეავსო ყველა სავალდებულო ველი');
  const msg = `📅 მაგიდის დაჯავშნა — Golden Space\n\n👤 ${f.name.value}\n📞 ${f.phone.value}\n🗓 ${f.date.value}  ⏰ ${f.time.value}\n👥 სტუმარი: ${$('#bGuests').value}\n📝 ${$('#bNote').value || '—'}`;
  const out = $('#bookingOk');
  out.textContent = '✅ გმადლობთ! ჯავშანი მზადაა — გახსენი WhatsApp და გამოგზავნე, ან დაგვირეკე.';
  out.classList.add('show');
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  burst(innerWidth / 2, innerHeight / 2, 40);
  e.target.reset(); if (bd) bd.value = bd.min;
});
$$('input').forEach(i => i.addEventListener('input', () => i.classList.remove('err')));

/* ---- reveal on scroll ---- */
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));

/* ---- counters ---- */
const cio = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; cio.unobserve(en.target);
  const el = en.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
  (function step(t) { const p = Math.min((t - t0) / 1600, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); })(t0);
}), { threshold: .5 });
$$('[data-count]').forEach(el => cio.observe(el));

/* ---- 3D tilt + spotlight ---- */
function initTilt(list) {
  if (!matchMedia('(hover:hover)').matches) return;
  list.forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
      el.style.transform = `perspective(800px) rotateY(${(x - .5) * 12}deg) rotateX(${(.5 - y) * 12}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}
initTilt($$('.tilt'));

/* ---- golden sparks background ---- */
const cv = $('#sparks');
if (cv) {
  const c = cv.getContext('2d'); let W, H, P = [];
  const resize = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
  resize(); addEventListener('resize', resize);
  const mk = () => ({ x: Math.random() * W, y: H + Math.random() * 60, r: Math.random() * 2.4 + .6, v: Math.random() * .8 + .3, a: Math.random() * .6 + .3, d: Math.random() * 2 - 1 });
  for (let i = 0; i < 70; i++) { const p = mk(); p.y = Math.random() * H; P.push(p); }
  (function loop() {
    c.clearRect(0, 0, W, H);
    P.forEach((p, i) => {
      p.y -= p.v; p.x += Math.sin(p.y / 40) * .4 + p.d * .1; p.a -= .0008;
      if (p.y < -10 || p.a <= 0) P[i] = mk();
      c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7);
      c.fillStyle = `rgba(255,${180 + p.r * 20 | 0},40,${p.a})`; c.shadowBlur = 12; c.shadowColor = '#ffa800'; c.fill();
    });
    requestAnimationFrame(loop);
  })();
}

/* ---- click burst ---- */
function burst(x, y, n = 16) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i');
    const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 70;
    s.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:8px;height:8px;border-radius:50%;background:#ffc83c;box-shadow:0 0 10px #ff9d00;pointer-events:none;z-index:400;transition:transform .7s ease-out,opacity .7s`;
    document.body.appendChild(s);
    requestAnimationFrame(() => { s.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(.2)`; s.style.opacity = 0; });
    setTimeout(() => s.remove(), 750);
  }
}
