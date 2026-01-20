const STORAGE_KEY = 'school_site_v3';
function loadData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    news: [],
    students: []
  };
}
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}
let db = loadData();

// ===== Функсия барои овоз =====
function playSound() {
  const sound = document.getElementById('notifySound');
  if (sound) sound.play();
}

// ===== Рендер =====
function renderNews() {
  const list = document.getElementById('newsList');
  list.innerHTML = '';
  if (!db.news.length) {
    list.innerHTML = '<p class="muted">Ахбор нест.</p>';
    return;
  }
  db.news.slice().reverse().forEach(n => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<h3>${n.title}</h3><p>${n.body}</p><small>${n.date}</small>`;
    list.appendChild(div);
  });
}

function renderStudents() {
  const list = document.getElementById('studentsList');
  list.innerHTML = '';
  if (!db.students.length) {
    list.innerHTML = '<p class="muted">Хонанда нест.</p>';
    return;
  }
  db.students.forEach(s => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${s.name}</strong><p>Синф: ${s.class}</p>`;
    list.appendChild(div);
  });
}

// Аввалин рендер
renderNews();
renderStudents();
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Admin Logic =====
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const adminClose = document.getElementById('adminClose');
const loginBox = document.getElementById('loginBox');
const adminPanel = document.getElementById('adminPanel');

function openAdmin() {
  adminModal.style.display = 'flex';
  loginBox.style.display = 'block';
  adminPanel.style.display = 'none';
}
function closeAdmin() {
  adminModal.style.display = 'none';
}

adminBtn.onclick = openAdmin;
adminClose.onclick = closeAdmin;

document.getElementById('loginBtn').onclick = () => {
  if (document.getElementById('adminPass').value === 'school123') {
    loginBox.style.display = 'none';
    adminPanel.style.display = 'block';
  } else {
    alert('Парол нодуруст аст');
  }
};

document.getElementById('logoutBtn').onclick = () => {
  adminPanel.style.display = 'none';
  loginBox.style.display = 'block';
  document.getElementById('adminPass').value = '';
  closeAdmin();
};

// ===== Иловаи хабар =====
document.getElementById('addNews').onclick = () => {
  const t = document.getElementById('nTitle').value.trim();
  const b = document.getElementById('nBody').value.trim();
  if (!t || !b) {
    alert('Сарлавҳа ва мазмун лозим аст');
    return;
  }
  const item = {
    id: Date.now(),
    title: t,
    body: b,
    date: new Date().toLocaleDateString()
  };
  db.news.push(item);
  saveData();
  renderNews();
  playSound(); // ✅ овоз мебарояд
  document.getElementById('nTitle').value = '';
  document.getElementById('nBody').value = '';
};

// Пок кардани ҳамаи хабарҳо
document.getElementById('clearNews').onclick = () => {
  db.news = [];
  saveData();
  renderNews();
};

// ===== Иловаи хонанда =====
document.getElementById('addStudent').onclick = () => {
  const n = document.getElementById('sName').value.trim();
  const c = document.getElementById('sClass').value.trim();
  if (!n || !c) {
    alert('Ном ва синф лозим аст');
    return;
  }
  db.students.push({ id: Date.now(), name: n, class: c });
  saveData();
  renderStudents();
  playSound(); // ✅ овоз мебарояд
  document.getElementById('sName').value = '';
  document.getElementById('sClass').value = '';
};




(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.createElement('button');
  toggle.id = 'menuToggle';
  toggle.textContent = '☰';
  toggle.className = 'menu-toggle';
  document.body.appendChild(toggle);

  const overlay = document.createElement('div');
  overlay.id = 'menuOverlay';
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  function applyResponsive() {
    const isMobile = window.innerWidth < 900;
    if (isMobile) {
      nav.classList.add('mobile-nav');
      toggle.style.display = 'inline-flex';
    } else {
      nav.classList.remove('mobile-nav');
      nav.classList.remove('open');
      overlay.classList.remove('show');
      toggle.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  function openMenu() {
    nav.classList.add('open');
    overlay.classList.add('show');
    toggle.textContent = '✖';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('show');
    toggle.textContent = '☰';
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  applyResponsive();
  window.addEventListener('resize', applyResponsive);
})();
