document.addEventListener('DOMContentLoaded', () => {
  const passDisplay = document.getElementById('passwordDisplay');
  const rangeInput = document.getElementById('ranger');
  const passLengthText = document.getElementById('passLength');
  const copyBtn = document.getElementById('copy__btn');
  const generateBtn = document.getElementById('generate');
  const upperEl = document.getElementById('uppercase');
  const lowerEl = document.getElementById('lowercase');
  const numberEl = document.getElementById('number');
  const symbolEl = document.getElementById('symbol');
  const qualityEl = document.getElementById('quality');
  const bars = document.querySelectorAll('.strength__bars');

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const number = '0123456789';
  const symbol = '!@#$%^&*()_+~<>?/[]';

  rangeInput.addEventListener('input', () => {
    passLengthText.textContent = rangeInput.value;
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(passDisplay.textContent);
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fa-regular fa-copy fa-lg"></i>';
    }, 1500);
  });

  function calculateStrength(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Set color and label
    let color = 'red';
    let label = 'Very Weak';

    if (strength === 1) {
      color = 'red';
      label = 'Weak';
    } else if (strength === 2) {
      color = 'orange';
      label = 'Fair';
    } else if (strength === 3) {
      color = 'yellow';
      label = 'Good';
    } else if (strength === 4) {
      color = 'green';
      label = 'Strong';
    }

    bars.forEach((bar, index) => {
      bar.style.backgroundColor = index < strength ? color : '#444';
    });

    qualityEl.textContent = label;
    qualityEl.style.color = color;
  }

  function generatePassword() {
    let characters = '';
    if (upperEl.checked) characters += upper;
    if (lowerEl.checked) characters += lower;
    if (numberEl.checked) characters += number;
    if (symbolEl.checked) characters += symbol;

    if (!characters) {
      passDisplay.textContent = 'Select options';
      return;
    }

    const length = +rangeInput.value;
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
    }

    passDisplay.textContent = password;
    calculateStrength(password);
  }

  generateBtn.addEventListener('click', generatePassword);
  rangeInput.dispatchEvent(new Event('input')); // Initialize
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Track mouse position
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function createGradient() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create a gradient effect that shifts color
  const gradient = ctx.createRadialGradient(
    mouse.x, mouse.y, 0,
    mouse.x, mouse.y, 500
  );
  
  // Gradient color stops
  gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
  gradient.addColorStop(0.3, 'rgba(255, 0, 150, 0.2)');
  gradient.addColorStop(0.6, 'rgba(0, 255, 110, 0.15)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  // Fill the canvas with the gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(createGradient);
}

createGradient();

// Resize canvas on window size change
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
