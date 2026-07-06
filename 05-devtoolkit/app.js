// ================================
// DEVTOOLKIT — app.js
// ================================

// ================================
// SECTION 1 — TAB SWITCHING
// ================================

const tabBtns = document.querySelectorAll(".tab-btn");
const toolPanels = document.querySelectorAll(".tool-panel");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active styles from all buttons
    tabBtns.forEach((b) => {
      b.classList.remove("text-white", "border-indigo-500");
      b.classList.add("text-gray-400", "border-transparent");
    });

    //add active styles to clicked button
    btn.classList.add("text-white", "border-indigo-500");
    btn.classList.remove("text-gray-400", "border-transparent");

    //hide all panels
    toolPanels.forEach((panel) => panel.classList.add("hidden"));

    //show the correct panel
    const tabName = btn.dataset.tab;
    document.querySelector(`#tab-${tabName}`).classList.remove("hidden");
  });
});

// ================================
// SECTION 2 — JSON FORMATTER
// ================================
const jsonInput = document.querySelector("#json-input");
const jsonOutput = document.querySelector("#json-output");
const jsonStatus = document.querySelector("#json-status");
const jsonFormatBtn = document.querySelector("#json-format-btn");
const jsonClearBtn = document.querySelector("#json-clear-btn");
const jsonCopyBtn = document.querySelector("#json-copy-btn");

jsonFormatBtn.addEventListener("click", () => {
  const raw = jsonInput.value.trim();

  // Empty check
  if (raw === "") {
    jsonStatus.textContent = "⚠️ Please enter some JSON";
    jsonStatus.className = "mt-3 text-sm text-yellow-400";
    jsonOutput.classList.add("hidden");
    return;
  }

  try {
    // Parse then stringify with 2 space indent
    const parsed = JSON.parse(raw);
    const formatted = JSON.stringify(parsed, null, 2);

    // Show output
    jsonOutput.textContent = formatted;
    jsonOutput.classList.remove("hidden");

    // Success status
    jsonStatus.textContent = "✅ Valid JSON";
    jsonStatus.className = "mt-3 text-sm text-green-400";
  } catch (err) {
    // Invalid JSON
    jsonOutput.classList.add("hidden");
    jsonStatus.textContent = `❌ Invalid JSON: ${err.message}`;
    jsonStatus.className = "mt-3 text-sm text-red-400";
  }
});

jsonClearBtn.addEventListener("click", () => {
  jsonInput.value = "";
  jsonOutput.textContent = "";
  jsonOutput.classList.add("hidden");
  jsonStatus.textContent = "";
});

jsonCopyBtn.addEventListener("click", () => {
  const text = jsonOutput.textContent;
  if (!text) return;

  navigator.clipboard.writeText(text);
  jsonCopyBtn.textContent = "Copied!";
  setTimeout(() => {
    jsonCopyBtn.textContent = "Copy";
  }, 2000);
});

// ================================
// SECTION 3 — PASSWORD GENERATOR
// ================================

const passwordOutput = document.querySelector("#password-output");
const passwordCopyBtn = document.querySelector("#password-copy-btn");
const lengthSlider = document.querySelector("#length-slider");
const lengthDisplay = document.querySelector("#length-display");
const includeUppercase = document.querySelector("#include-uppercase");
const includeLowercase = document.querySelector("#include-lowercase");
const includeNumbers = document.querySelector("#include-numbers");
const includeSymbols = document.querySelector("#include-symbols");
const generateBtn = document.querySelector("#generate-btn");
const strengthBars = document.querySelectorAll(".strength-bar");
const strengthLabel = document.querySelector("#strength-label");

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

const generatePassword = () => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Build character pool from checked options
  let charset = "";
  if (includeUppercase.checked) charset += uppercase;
  if (includeLowercase.checked) charset += lowercase;
  if (includeNumbers.checked) charset += numbers;
  if (includeSymbols.checked) charset += symbols;

  // Need at least one charset selected
  if (charset === "") {
    passwordOutput.textContent = "Select at least one option";
    return;
  }
  // Build password character by character
  const length = parseInt(lengthSlider.value);
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  passwordOutput.textContent = password;
  updateStrength(password);
};

const updateStrength = (password) => {
  // Count how many character types are present
  let score = 0;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 16) score++;
  if (password.length >= 24) score++;

  // Map score to strength level
  let level, color, label;

  if (score <= 2) {
    level = 1;
    color = "bg-red-500";
    label = "Weak";
  } else if (score === 3) {
    level = 2;
    color = "bg-yellow-500";
    label = "Fair";
  } else if (score === 4) {
    level = 3;
    color = "bg-blue-500";
    label = "Strong";
  } else {
    level = 4;
    color = "bg-green-500";
    label = "Very Strong";
  }

  // Update strength bars
  strengthBars.forEach((bar, index) => {
    bar.className = "strength-bar h-2 flex-1 rounded-full";
    if (index < level) {
      bar.classList.add(color);
    } else {
      bar.classList.add("bg-gray-700");
    }
  });

  strengthLabel.textContent = label;
  strengthLabel.className = `text-xs mt-1 text-${color.split("-")[1]}-400`;
};

generateBtn.addEventListener("click", generatePassword);

passwordCopyBtn.addEventListener("click", () => {
  const password = passwordOutput.textContent;
  if (password === "Click Generate" || password === "") return;

  navigator.clipboard.writeText(password);
  passwordCopyBtn.textContent = "Copied!";
  setTimeout(() => (passwordCopyBtn.textContent = "Copy"), 2000);
});

// Generate one on page load
generatePassword();

// ================================
// SECTION 4 — COLOR CONVERTER
// ================================
const hexInput = document.querySelector("#hex-input");
const colorPicker = document.querySelector("#color-picker");
const rgbR = document.querySelector("#rgb-r");
const rgbG = document.querySelector("#rgb-g");
const rgbB = document.querySelector("#rgb-b");
const colorPreview = document.querySelector("#color-preview");
const hexToRgbBtn = document.querySelector("#hex-to-rgb-btn");
const rgbToHexBtn = document.querySelector("#rgb-to-hex-btn");
const colorCopyBtn = document.querySelector("#color-copy-btn");

// Convert hex string to rgb object
const hexToRgb = (hex) => {
  // Remove # if present
  const clean = hex.replace("#", "");

  // Parse r, g, b from hex pairs
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  return { r, g, b };
};

// Convert rgb values to hex string
const rgbToHex = (r, g, b) => {
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Update the color preview box
const updatePreview = (hex) => {
  colorPreview.style.backgroundColor = hex;
  colorPicker.value = hex;
  hexInput.value = hex;
};

hexToRgbBtn.addEventListener("click", () => {
  const hex = hexInput.value.trim();

  // Validate hex format
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    hexInput.classList.add("border-red-500");
    return;
  }

  hexInput.classList.remove("border-red-500");
  const { r, g, b } = hexToRgb(hex);
  rgbR.value = r;
  rgbG.value = g;
  rgbB.value = b;
  updatePreview(hex);
});

rgbToHexBtn.addEventListener("click", () => {
  const r = parseInt(rgbR.value);
  const g = parseInt(rgbG.value);
  const b = parseInt(rgbB.value);

  // Validate rgb values
  if (
    isNaN(r) ||
    isNaN(g) ||
    isNaN(b) ||
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255
  )
    return;

  const hex = rgbToHex(r, g, b);
  updatePreview(hex);
});

// Color picker syncs with hex input live
colorPicker.addEventListener("input", () => {
  updatePreview(colorPicker.value);
  const { r, g, b } = hexToRgb(colorPicker.value);
  rgbR.value = r;
  rgbG.value = g;
  rgbB.value = b;
});

colorCopyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(hexInput.value);
  colorCopyBtn.textContent = "Copied!";
  setTimeout(() => (colorCopyBtn.textContent = "Copy HEX"), 2000);
});

// ================================
// SECTION 5 — WORD COUNTER
// ================================
const counterInput = document.querySelector("#counter-input");
const wordCount = document.querySelector("#word-count");
const charCount = document.querySelector("#char-count");
const sentenceCount = document.querySelector("#sentence-count");
const readTime = document.querySelector("#read-time");
const counterClearBtn = document.querySelector("#counter-clear-btn");

const updateCounts = () => {
  const text = counterInput.value;

  // Characters — just length
  charCount.textContent = text.length;

  // Words — split by whitespace, filter empty strings
  const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
  wordCount.textContent = words.length;

  // Sentences — split by . ! ?
  const sentences =
    text.trim() === ""
      ? []
      : text.split(/[.!?]+/).filter((s) => s.trim() !== "");
  sentenceCount.textContent = sentences.length;

  // Reading time — average 200 words per minute
  const minutes = Math.ceil(words.length / 200);
  readTime.textContent = minutes;
};

counterInput.addEventListener("input", updateCounts);

counterClearBtn.addEventListener("click", () => {
  counterInput.value = "";
  updateCounts();
});

// ================================
// SECTION 6 — BASE64
// ================================
const base64Input = document.querySelector("#base64-input");
const base64Output = document.querySelector("#base64-output");
const base64Status = document.querySelector("#base64-status");
const encodeBtn = document.querySelector("#encode-btn");
const decodeBtn = document.querySelector("#decode-btn");
const base64ClearBtn = document.querySelector("#base64-clear-btn");
const base64CopyBtn = document.querySelector("#base64-copy-btn");

encodeBtn.addEventListener("click", () => {
  const text = base64Input.value.trim();
  if (text === "") return;

  try {
    const encoded = btoa(text);
    base64Output.value = encoded;
    base64Status.textContent = "✅ Encoded successfully";
    base64Status.className = "text-sm text-green-400";
  } catch (err) {
    base64Status.textContent = "❌ Could not encode — invalid characters";
    base64Status.className = "text-sm text-red-400";
  }
});

decodeBtn.addEventListener("click", () => {
  const text = base64Input.value.trim();
  if (text === "") return;

  try {
    const decoded = atob(text);
    base64Output.value = decoded;
    base64Status.textContent = "✅ Decoded successfully";
    base64Status.className = "text-sm text-green-400";
  } catch (err) {
    base64Status.textContent = "❌ Invalid Base64 string";
    base64Status.className = "text-sm text-red-400";
  }
});

base64ClearBtn.addEventListener("click", () => {
  base64Input.value = "";
  base64Output.value = "";
  base64Status.textContent = "";
});

base64CopyBtn.addEventListener("click", () => {
  if (base64Output.value === "") return;
  navigator.clipboard.writeText(base64Output.value);
  base64CopyBtn.textContent = "Copied!";
  setTimeout(() => (base64CopyBtn.textContent = "Copy"), 2000);
});
