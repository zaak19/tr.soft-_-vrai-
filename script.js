const data = {
  fr: {
    title: 'Innover aujourd’hui,<br>construire demain !!',
    intro: 'Des solutions numériques modernes, pensées pour accompagner les entreprises, les créateurs et les projets de demain.',
    services: 'NOS SERVICES', contact: 'CONTACT US',
    s1: 'Applications Mobiles', d1: 'Conception d’applications mobiles modernes et adaptées à vos besoins.',
    s2: 'Services Numériques', d2: 'Découvrez nos solutions de création digitale, d’accompagnement et de développement.',
    s3: 'Informations importantes !!', d3: 'Retrouvez ici les informations et annonces importantes de Trillion Software.',
    open: 'Voir les services →', detail: 'SERVICES NUMÉRIQUES', back: 'Retour',
    dt1: 'Coaching Business', dt2: 'Création d’affiche', dt3: 'Création de site web', dt4: 'Création de Logo', dt5: 'Création d’application mobile',
    fixed: 'Prix fixe :', monthly: '/mois'
  },
  en: {
    title: 'Innovate today,<br>build tomorrow !!',
    intro: 'Modern digital solutions designed to support businesses, creators and the projects of tomorrow.',
    services: 'OUR SERVICES', contact: 'CONTACT US',
    s1: 'Mobile Applications', d1: 'Modern mobile applications designed around your needs.',
    s2: 'Digital Services', d2: 'Discover our digital creation, support and development solutions.',
    s3: 'Important Information !!', d3: 'Find important information and announcements from Trillion Software here.',
    open: 'View services →', detail: 'DIGITAL SERVICES', back: 'Back',
    dt1: 'Business Coaching', dt2: 'Poster Design', dt3: 'Website Creation', dt4: 'Logo Design', dt5: 'Mobile App Development',
    fixed: 'Fixed price:', monthly: '/month'
  }
};

function applyLang(lang) {
  const t = data[lang] || data.fr;
  const set = (id, value, html = false) => {
    const e = document.getElementById(id);
    if (e) html ? e.innerHTML = value : e.textContent = value;
  };
  set('title', t.title, true); set('intro', t.intro); set('servicesBtn', t.services); set('servicesTitle', t.services);
  set('contactBtn', t.contact); set('contactLabel', t.contact); set('s1', t.s1); set('d1', t.d1); set('s2', t.s2); set('d2', t.d2);
  set('s3', t.s3); set('d3', t.d3); set('openServices', t.open); set('detailTitle', t.detail); set('back', t.back);
  set('dtitle1', t.dt1); set('dtitle2', t.dt2); set('dtitle3', t.dt3); set('dtitle4', t.dt4); set('dtitle5', t.dt5);
  for (let i = 1; i <= 5; i++) {
    const p = document.getElementById('price' + i);
    if (p) {
      const strong = p.querySelector('strong');
      const amount = strong ? strong.textContent.replace('/mois', '') : '';
      p.firstChild.textContent = t.fixed + ' ';
      if (strong && i === 1) strong.textContent = amount + t.monthly;
    }
  }
  document.documentElement.lang = lang;
  localStorage.setItem('trillion-language', lang);
  document.querySelectorAll('.langs button').forEach(b => b.classList.toggle('active', b.dataset.l === lang));
}

document.querySelectorAll('.langs button').forEach(button => {
  button.addEventListener('click', () => applyLang(button.dataset.l));
});

applyLang(localStorage.getItem('trillion-language') || 'fr');
