const ADMIN_EMAIL = 'trillionbooks6@gmail.com';
const ADMIN_PASSWORD_HASH = 'c036211255d2fce4d06df885364e7c3f596e1db132e3f38c5f8759ec6209680f';

async function sha256(text){
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
function isAdmin(){ return sessionStorage.getItem('trillion-admin-auth') === '1'; }
function requireAdmin(){ if(!isAdmin()) location.href='admin-login.html?target=mobile'; }
function logout(){ sessionStorage.removeItem('trillion-admin-auth'); location.href='index.html'; }

const target = new URLSearchParams(location.search).get('target') || 'mobile';
const loginForm = document.getElementById('loginForm');
if(loginForm){
  const msg = document.getElementById('loginMsg');
  loginForm.addEventListener('submit', async e=>{
    e.preventDefault();
    const email = document.getElementById('adminEmail').value.trim().toLowerCase();
    const password = document.getElementById('adminPassword').value;
    msg.textContent = 'Vérification...';
    if(email === ADMIN_EMAIL && await sha256(password) === ADMIN_PASSWORD_HASH){
      sessionStorage.setItem('trillion-admin-auth','1');
      location.href = target === 'info' ? 'informations-importantes.html' : 'application-mobile.html';
    }else{
      msg.textContent = 'Accès refusé : e-mail ou mot de passe incorrect.';
    }
  });
}

document.querySelectorAll('[data-admin-target]').forEach(card=>{
  card.addEventListener('click', ()=>{
    const t = card.dataset.adminTarget;
    if(isAdmin()) location.href = t === 'info' ? 'informations-importantes.html' : 'application-mobile.html';
    else location.href = 'admin-login.html?target=' + encodeURIComponent(t);
  });
});

document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click', logout));

function loadItems(key){ try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []} }
function saveItems(key, items){ localStorage.setItem(key, JSON.stringify(items)); }
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2); }
function escapeHtml(s){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

const appForm = document.getElementById('appForm');
if(appForm){
  requireAdmin();
  const list = document.getElementById('appList');
  const render = ()=>{
    const items=loadItems('trillion-apps');
    list.innerHTML = items.length ? items.map(x=>`<article class="admin-item"><img src="${x.image}" alt="${escapeHtml(x.name)}"><div><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.description).replace(/\n/g,'<br>')}</p><small>${x.format || 'Image carrée'}</small></div><button class="delete-btn" data-del="${x.id}">Supprimer</button></article>`).join('') : '<p class="empty">Aucune application ajoutée pour le moment.</p>';
    list.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{saveItems('trillion-apps',loadItems('trillion-apps').filter(x=>x.id!==b.dataset.del));render();});
  };
  appForm.addEventListener('submit',e=>{
    e.preventDefault();
    const file=document.getElementById('appImage').files[0];
    if(!file) return;
    const img=new Image(); const reader=new FileReader();
    reader.onload=()=>{img.onload=()=>{ if(Math.abs(img.width/img.height-1)>0.02){alert('L’image doit être carrée (3×3 ou 4×4).');return;} const items=loadItems('trillion-apps'); items.push({id:uid(),name:document.getElementById('appName').value.trim(),description:document.getElementById('appDescription').value.trim(),image:reader.result,format:'Format carré 3×3 / 4×4'}); saveItems('trillion-apps',items); appForm.reset();render();};img.src=reader.result;}; reader.readAsDataURL(file);
  });
  render();
}

const infoForm = document.getElementById('infoForm');
if(infoForm){
  requireAdmin();
  const list=document.getElementById('infoList');
  const render=()=>{const items=loadItems('trillion-important');list.innerHTML=items.length?items.map(x=>`<article class="admin-item info-item"><div><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.text).replace(/\n/g,'<br>')}</p><small>${escapeHtml(x.date||'')}</small></div><button class="delete-btn" data-del="${x.id}">Supprimer</button></article>`).join(''):'<p class="empty">Aucune information publiée pour le moment.</p>';list.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{saveItems('trillion-important',loadItems('trillion-important').filter(x=>x.id!==b.dataset.del));render();});};
  infoForm.addEventListener('submit',e=>{e.preventDefault();const items=loadItems('trillion-important');items.push({id:uid(),title:document.getElementById('infoTitle').value.trim(),text:document.getElementById('infoText').value.trim(),date:new Date().toLocaleDateString('fr-FR')});saveItems('trillion-important',items);infoForm.reset();render();});
  render();
}
