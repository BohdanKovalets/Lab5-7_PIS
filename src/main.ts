import "./scss/main.scss";
import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// модалка вакансії
const vacanciesBtn = document.getElementById('open-vacancies');
const modal = document.querySelector('.modal-vacancies');
const closeBtn = modal?.querySelector('.close-btn');
const list = document.getElementById('vacancy-list');

vacanciesBtn?.addEventListener('click', async () => {
  modal?.classList.remove('hidden');

  try {
    const response = await fetch('/src/data/vacancies.json');
    const vacancies = await response.json();

    if (list) {
      list.innerHTML = ''; 
      vacancies.forEach((v: { title: string; location: string }) => {
        const li = document.createElement('li');
        li.textContent = `${v.title} (${v.location})`;
        list.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error loading vacancies:', error);
  }
});

closeBtn?.addEventListener('click', () => {
  modal?.classList.add('hidden');
});


// модалка реєстрації і входу
const registerForm = document.getElementById('register-form') as HTMLFormElement;
const roleSelect = document.getElementById('role-select') as HTMLSelectElement;
const registerModal = document.querySelector('.modal-register') as HTMLElement;
const selectBtns = document.querySelectorAll('.who-btn');

selectBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const role = btn.getAttribute('data-role');
    roleSelect.value = role || 'candidate';
    registerModal.classList.remove('hidden');
  });
});

registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const userData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  };

  const res = await fetch('http://localhost:3001/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    alert('Successfully registered!');
    registerForm.reset();
    registerModal.classList.add('hidden');
  } else {
    alert('Failed to register');
  }
});