/* ============================================
   TERMINAL BOOT ANIMATION (Hero)
   ============================================ */
const bootLines = [
  { text: '> Initializing Hari.exe...', delay: 300 },
  { text: '> Loading AI systems...', delay: 900 },
  { text: '> IEEE paper: <span class="ok">PUBLISHED ✓</span>', delay: 1600 },
  { text: '> Projects loaded: <span class="ok">4 flagship ✓</span>', delay: 2300 },
  { text: '> Status: <span class="ok">Open to opportunities ✓</span>', delay: 3000 },
  { text: '> <span class="cmd">System ready.</span>', delay: 3700 },
];

const bootOutput = document.getElementById('terminal-output');
if (bootOutput) {
  bootLines.forEach(({ text, delay }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.classList.add('terminal-line');
      line.innerHTML = text;
      bootOutput.appendChild(line);
    }, delay);
  });
  setTimeout(() => {
    const cursor = document.createElement('span');
    cursor.classList.add('terminal-cursor');
    bootOutput.appendChild(cursor);
  }, 4200);
}


/* ============================================
   NAVBAR — shrink on scroll
   ============================================ */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ============================================
   SCROLL REVEAL
   ============================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-children').forEach(el => {
  observer.observe(el);
});


/* ============================================
   INTERACTIVE TERMINAL
   ============================================ */
const terminalBody = document.getElementById('main-terminal');
const terminalInput = document.getElementById('terminal-input');

// Command history (arrow keys)
let history = [];
let historyIndex = -1;

// All command responses
const commands = {
  whoami: () => [
    '┌─ <span class="t-key">Hari Aravind Kishore A</span>',
    '├─ Role &nbsp;&nbsp;&nbsp;&nbsp;: <span class="t-cmd">AI/ML Engineer & Researcher</span>',
    '├─ Degree &nbsp;: B.Tech — Artificial Intelligence & Machine Learning',
    '├─ Status &nbsp;: <span class="t-cmd">Final year · Open to opportunities</span>',
    '├─ Research : Deep Learning · Semantic Search · AI Security · NLP',
    '└─ Location : India',
  ],

  projects: () => [
    '┌─ <span class="t-key">Flagship Projects</span>',
    '├─ [01] Semantic Search Engine for Academic Papers',
    '│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FAISS · SentenceTransformers · Ollama · Streamlit',
    '├─ [02] <span class="t-cmd">Intelligent Web Vulnerability Discovery</span> — IEEE Published',
    '│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DQN · LSTM · LightGBM · GAN · OWASP ZAP',
    '├─ [03] Bike Demand Prediction & Damage Detection',
    '│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ResNet50 · TensorFlow · Transfer Learning',
    '└─ [04] Tamil Literature NLP Dataset',
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HuggingFace · Transformers · Dravidian NLP',
  ],

  skills: () => [
    '┌─ <span class="t-key">Technical Skills</span>',
    '├─ AI/ML &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: PyTorch · TensorFlow · HuggingFace · FAISS · LangChain',
    '├─ Security &nbsp;&nbsp;: OWASP ZAP · Burp Suite · RL-based Vulnerability Detection',
    '├─ Backend &nbsp;&nbsp;&nbsp;: Python · Flask · FastAPI · Node.js',
    '├─ Data &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Pandas · NumPy · SQL · Streamlit',
    '└─ Deploy &nbsp;&nbsp;&nbsp;&nbsp;: Docker · GitHub Actions · Linux · Vercel',
  ],

  research: () => [
    '┌─ <span class="t-key">Publications</span>',
    '├─ Title &nbsp;&nbsp;&nbsp;&nbsp;: A Deep Learning-Based Approach to Intelligent',
    '│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Web Vulnerability Discovery and Risk Assessment',
    '├─ Venue &nbsp;&nbsp;&nbsp;&nbsp;: <span class="t-cmd">ETAACT 2026 — IEEE Xplore</span>',
    '├─ Status &nbsp;&nbsp;&nbsp;: Published ✓',
    '└─ Interests : Semantic Retrieval · AI Security · Low-Resource NLP · CV',
  ],

  contact: () => [
    '┌─ <span class="t-key">Contact</span>',
    '├─ Email &nbsp;&nbsp;&nbsp;: <span class="t-cmd">harikishore2004@gmail.com</span>',
    '├─ GitHub &nbsp;&nbsp;: github.com/Hak-119',
    '├─ LinkedIn : linkedin.com/in/hari-aravind-kishore',
    '└─ Resume &nbsp;&nbsp;: <span class="t-cmd">Available on request · PDF download above</span>',
  ],

  clear: () => {
    terminalBody.innerHTML = '';
    return [];
  },

  help: () => [
    'Commands: <span class="t-cmd">whoami · projects · skills · research · contact · clear</span>',
  ],
};

// Print lines to terminal
function printLines(lines) {
  lines.forEach((text, i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.classList.add('t-line');
      p.innerHTML = text;
      terminalBody.appendChild(p);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, i * 60);
  });
}

// Print user input echo
function printInput(cmd) {
  const p = document.createElement('p');
  p.classList.add('t-line');
  p.innerHTML = `<span class="t-cmd">$ ${cmd}</span>`;
  terminalBody.appendChild(p);
}

// Handle command
function handleCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  // Save to history
  history.unshift(cmd);
  historyIndex = -1;

  printInput(cmd);

  if (commands[cmd]) {
    const result = commands[cmd]();
    if (result && result.length) printLines(result);
  } else {
    printLines([
      `command not found: <span class="t-cmd">${cmd}</span>`,
      'type <span class="t-cmd">help</span> for available commands.',
    ]);
  }

  // Spacer
  const spacer = document.createElement('p');
  spacer.classList.add('t-line');
  spacer.innerHTML = '&nbsp;';
  terminalBody.appendChild(spacer);
}

// Listen for Enter key
if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    }

    // Arrow up — previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      }
    }

    // Arrow down — next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = -1;
        terminalInput.value = '';
      }
    }
  });
}