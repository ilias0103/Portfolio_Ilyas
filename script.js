
const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
});

if (menuBtn) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: .12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.querySelector('#contactForm');
const status = document.querySelector('#formStatus');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    status.textContent = 'Сообщение подготовлено. В демо-версии данные не отправляются на сервер.';
    status.classList.add('show');
    form.reset();
  });
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const value = button.dataset.filter;
    document.querySelectorAll('[data-category]').forEach(card => {
      card.style.display = value === 'all' || card.dataset.category.includes(value) ? '' : 'none';
    });
  });
});

const modal = document.querySelector('#projectModal');
const modalTitle = document.querySelector('#modalTitle');
const modalText = document.querySelector('#modalText');

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!modal) return;
    modalTitle.textContent = btn.dataset.title;
    modalText.textContent = btn.dataset.modal;
    modal.classList.add('open');
  });
});

document.querySelector('.close')?.addEventListener('click', () => modal?.classList.remove('open'));
modal?.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('open');
});
