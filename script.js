document.addEventListener('DOMContentLoaded', () => {
  // --- Password Generator ---
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

    let color = 'red';
    let label = 'Very Weak';

    if (strength === 1) { color = 'red'; label = 'Weak'; }
    else if (strength === 2) { color = 'orange'; label = 'Fair'; }
    else if (strength === 3) { color = 'yellow'; label = 'Good'; }
    else if (strength === 4) { color = 'green'; label = 'Strong'; }

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


  // --- Background Stars ---
  const background = document.getElementById("background");
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // random position
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    // random color red or white
    star.style.backgroundColor = Math.random() > 0.5 ? "white" : "red";

    // random size
    const size = Math.random() * 2 + 1 + "px";
    star.style.width = size;
    star.style.height = size;

    // random animation speed
    star.style.animationDuration = (Math.random() * 5 + 5) + "s";

    background.appendChild(star);
  }
});

// --- Loader Fade-out ---
window.addEventListener("load", () => {
  const loader = document.getElementById("loader-container");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // fade-out complete hone ke baad
  }, 500); // loader 0.5 second tak visible
});
