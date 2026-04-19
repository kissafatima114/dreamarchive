const page = document.body.dataset.page;
const currentEntryId = document.body.dataset.entryId || "";

const entryImageMap = {
  entry1: "images/dream1.PNG",
  entry2: "images/dream2.PNG",
  entry3: "images/dream3.PNG",
  entry4: "images/dream4.PNG",
  entry5: "images/dream5.PNG"
};

const entryPageMap = {
  entry1: "entry1.html",
  entry2: "entry2.html",
  entry3: "entry3.html",
  entry4: "entry4.html",
  entry5: "entry5.html"
};

const orbs = document.querySelectorAll(".orb");

if (orbs.length) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateOrbs() {
    currentX += (mouseX - currentX) * 0.04;
    currentY += (mouseY - currentY) * 0.04;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = (currentX - centerX) / centerX;
    const offsetY = (currentY - centerY) / centerY;

    orbs.forEach((orb, index) => {
      const factor = (index + 1) * 6;
      const moveX = offsetX * factor;
      const moveY = offsetY * factor;
      orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animateOrbs);
  }

  animateOrbs();
}

document.querySelectorAll("[data-entry]").forEach((link) => {
  link.addEventListener("click", () => {
    if (currentEntryId) {
      localStorage.setItem("dreamArchiveLastEntry", currentEntryId);
    } else {
      localStorage.setItem("dreamArchiveLastEntry", link.dataset.entry);
    }
  });
});

if (page === "home") {
  const title = document.getElementById("homeTitle");
  const titleGhost = document.getElementById("titleGhost");
  const titleGhost2 = document.getElementById("titleGhost2");
  const cards = document.querySelectorAll(".floating-entry-card");
  const cursorGlow = document.getElementById("cursorGlow");
  const homepagePreview = document.getElementById("homepagePreview");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  cards.forEach((card) => {
    const previewImage = card.dataset.preview;

    card.addEventListener("mouseenter", () => {
      if (!homepagePreview || !previewImage) return;
      homepagePreview.style.backgroundImage = `url("${previewImage}")`;
      homepagePreview.classList.add("show");
    });

    card.addEventListener("mouseleave", () => {
      if (!homepagePreview) return;
      homepagePreview.classList.remove("show");
    });
  });

  function animateHome() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = (currentX - centerX) / centerX;
    const offsetY = (currentY - centerY) / centerY;

    if (cursorGlow) {
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
    }

    if (title) {
      const titleMoveX = offsetX * 22;
      const titleMoveY = offsetY * 14;
      const titleRotate = offsetX * 1.8;
      const titleBlur = Math.abs(offsetX) * 1.2 + Math.abs(offsetY) * 1.2;
      const spacing = 0.02 + Math.abs(offsetX) * 0.04;

      title.style.transform =
        `translate(${titleMoveX}px, ${titleMoveY}px) rotate(${titleRotate}deg) scale(${1 + Math.abs(offsetY) * 0.02})`;

      title.style.filter =
        `blur(${titleBlur * 0.3}px) brightness(${1 + Math.abs(offsetY) * 0.08})`;

      title.style.letterSpacing = `${spacing}em`;
    }

    if (titleGhost) {
      const ghostX = offsetX * -15;
      const ghostY = offsetY * -8;
      titleGhost.style.transform =
        `translate(${ghostX}px, ${ghostY}px) scale(${1.02 + Math.abs(offsetX) * 0.03})`;
      titleGhost.style.opacity = `${0.12 + Math.abs(offsetX) * 0.18}`;
    }

    if (titleGhost2) {
      const ghost2X = offsetX * 20;
      const ghost2Y = offsetY * 12;
      titleGhost2.style.transform =
        `translate(${ghost2X}px, ${ghost2Y}px) scale(${1.03 + Math.abs(offsetY) * 0.025})`;
      titleGhost2.style.opacity = `${0.08 + Math.abs(offsetY) * 0.12}`;
    }

    cards.forEach((card, index) => {
      const factor = (index + 1) * 0.35;
      const drift = Math.sin(Date.now() * 0.0012 + index * 1.6) * 8;

      const moveX = offsetX * (18 + factor * 8) + drift;
      const moveY = offsetY * (16 + factor * 6);

      const blur = Math.abs(offsetY) * 0.35;
      const glow = 14 + Math.abs(offsetX) * 18 + Math.abs(offsetY) * 18;

      let baseRotate = 0;
      if (index === 0) baseRotate = -7;
      if (index === 1) baseRotate = 4;
      if (index === 2) baseRotate = -5;
      if (index === 3) baseRotate = 6;
      if (index === 4) baseRotate = -4;

      card.style.transform =
        `translate(${moveX}px, ${moveY}px) rotate(${baseRotate}deg) scale(${1 + Math.abs(offsetX) * 0.015})`;

      card.style.filter = `blur(${blur}px)`;
      card.style.boxShadow = `
        0 0 ${glow}px rgba(165, 100, 255, 0.16),
        0 20px 50px rgba(0, 0, 0, 0.24)
      `;
    });

    requestAnimationFrame(animateHome);
  }

  animateHome();
}

if (currentEntryId) {
  const bleed = document.getElementById("memoryBleed");
  const lastEntry = localStorage.getItem("dreamArchiveLastEntry");

  if (bleed && lastEntry && lastEntry !== currentEntryId && entryImageMap[lastEntry]) {
    bleed.style.backgroundImage = `url("${entryImageMap[lastEntry]}")`;
    bleed.classList.add("show");
  }

  localStorage.setItem("dreamArchiveLastEntry", currentEntryId);
}

const dreamImage = document.querySelector(".main-image");
const dreamScene = document.querySelector(".dream-scene");
const ghostLayer1 = document.querySelector(".ghost-layer-1");
const ghostLayer2 = document.querySelector(".ghost-layer-2");
const imageGlow = document.querySelector(".image-glow");
const topBlink = document.querySelector(".top-blink");
const bottomBlink = document.querySelector(".bottom-blink");

if (dreamImage && dreamScene) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  let blinkImpulse = 0;
  let blinkAmount = 0;

  dreamScene.addEventListener("mousemove", (e) => {
    const rect = dreamScene.getBoundingClientRect();
    targetX = (e.clientX - rect.left) / rect.width - 0.5;
    targetY = (e.clientY - rect.top) / rect.height - 0.5;
  });

  dreamScene.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  window.addEventListener(
    "wheel",
    (e) => {
      const intensity = Math.min(1, Math.abs(e.deltaY) / 160);
      blinkImpulse = Math.max(blinkImpulse, intensity);
    },
    { passive: true }
  );

  function animateDreamImage() {
    currentX += (targetX - currentX) * 0.075;
    currentY += (targetY - currentY) * 0.075;

    blinkImpulse *= 0.86;
    blinkAmount += (blinkImpulse - blinkAmount) * 0.22;

    const time = Date.now() * 0.0012;

    const driftX = Math.sin(time) * 12;
    const driftY = Math.cos(time * 0.8) * 8;

    const rippleA = Math.sin(time * 1.8 + currentX * 8) * 0.035;
    const rippleB = Math.cos(time * 1.3 + currentY * 7) * 0.025;

    const moveX = currentX * 44 + driftX;
    const moveY = currentY * 30 + driftY;

    const scale = 1.12 + rippleA;
    const rotate = currentX * 4.5 + rippleB * 8;
    const skewX = currentY * 7;
    const skewY = currentX * 3.5;

    const clarity = Math.min(Math.abs(currentX) + Math.abs(currentY), 1);

    const blinkBlurBoost = blinkAmount * 10;
    const blur = 10 - clarity * 8.6 + blinkBlurBoost;
    const brightness = 0.72 + clarity * 0.34 - blinkAmount * 0.18;
    const saturate = 0.78 + clarity * 0.42 - blinkAmount * 0.08;
    const contrast = 0.95 + clarity * 0.24;
    const hue = 10 + Math.sin(time * 0.5) * 8;

    dreamImage.style.transform =
      `translate(${moveX}px, ${moveY}px)
       scale(${scale})
       rotate(${rotate}deg)
       skewX(${skewX}deg)
       skewY(${skewY}deg)`;

    dreamImage.style.filter =
      `blur(${blur}px)
       brightness(${brightness})
       saturate(${saturate})
       contrast(${contrast})
       hue-rotate(${hue}deg)`;

    if (ghostLayer1) {
      ghostLayer1.style.transform =
        `translate(${moveX * -0.35}px, ${moveY * -0.28}px)
         scale(${1.16 + rippleB}) rotate(${rotate * -0.35}deg)`;

      ghostLayer1.style.opacity = `${0.18 + clarity * 0.16}`;
      ghostLayer1.style.filter =
        `blur(${24 - clarity * 8 + blinkAmount * 6}px) hue-rotate(${hue + 16}deg) saturate(${1.15 + clarity * 0.25})`;
    }

    if (ghostLayer2) {
      ghostLayer2.style.transform =
        `translate(${moveX * 0.22}px, ${moveY * 0.18}px)
         scale(${1.22 + rippleA}) rotate(${rotate * 0.25}deg)`;

      ghostLayer2.style.opacity = `${0.12 + clarity * 0.14}`;
      ghostLayer2.style.filter =
        `blur(${40 - clarity * 12 + blinkAmount * 8}px) hue-rotate(${hue - 18}deg) brightness(${1.05 + clarity * 0.12}) saturate(${1.3 + clarity * 0.2})`;
    }

    if (imageGlow) {
      imageGlow.style.transform =
        `translate(${currentX * 18}px, ${currentY * 12}px) scale(${1 + clarity * 0.08})`;
      imageGlow.style.opacity = `${0.62 + clarity * 0.26 - blinkAmount * 0.18}`;
    }

    if (topBlink && bottomBlink) {
      const lidHeight = `${blinkAmount * 70}%`;
      topBlink.style.height = lidHeight;
      bottomBlink.style.height = lidHeight;
    }

    requestAnimationFrame(animateDreamImage);
  }

  animateDreamImage();
}

function getRandomDreamTarget(currentId) {
  const entries = Object.keys(entryPageMap).filter((id) => id !== currentId);
  if (!entries.length) return null;
  const randomId = entries[Math.floor(Math.random() * entries.length)];
  return {
    id: randomId,
    page: entryPageMap[randomId]
  };
}

function createClickPulse(pulseLayer, x, y) {
  if (!pulseLayer) return;

  const pulse = document.createElement("div");
  pulse.className = "click-pulse";
  pulse.style.left = `${x}px`;
  pulse.style.top = `${y}px`;

  pulseLayer.appendChild(pulse);

  requestAnimationFrame(() => {
    pulse.classList.add("active");
  });

  setTimeout(() => {
    pulse.remove();
  }, 520);
}

function createLocalizedDissolve(scene, image, dissolveLayer, pulseLayer) {
  if (!scene || !image || !dissolveLayer) return;

  let isDissolving = false;

  scene.addEventListener("click", (e) => {
    if (isDissolving) return;
    isDissolving = true;

    const rect = scene.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    createClickPulse(pulseLayer, clickX, clickY);

    const shouldDrift = Math.random() < 0.45;
    const randomTarget = shouldDrift ? getRandomDreamTarget(currentEntryId) : null;

    setTimeout(() => {
      const cols = 8;
      const rows = 6;
      const pieceW = rect.width / cols;
      const pieceH = rect.height / rows;
      const maxRadius = Math.min(rect.width, rect.height) * 0.34;

      dissolveLayer.innerHTML = "";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const left = x * pieceW;
          const top = y * pieceH;

          const centerX = left + pieceW / 2;
          const centerY = top + pieceH / 2;

          const dx = centerX - clickX;
          const dy = centerY - clickY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > maxRadius) continue;

          const strength = 1 - distance / maxRadius;
          const normX = dx / (distance || 1);
          const normY = dy / (distance || 1);

          const spread = 35 + strength * 95 + Math.random() * 25;
          const tx = normX * spread + (Math.random() - 0.5) * 28;
          const ty = normY * spread + (Math.random() - 0.5) * 28;
          const rot = `${(Math.random() - 0.5) * 120 * (0.5 + strength)}deg`;

          const sx = (1.1 + strength * 1.1 + Math.random() * 0.35).toFixed(2);
          const sy = (0.65 + Math.random() * 0.35).toFixed(2);

          const piece = document.createElement("div");
          piece.className = "smear-piece";
          piece.style.borderRadius = `${18 + Math.random() * 40}px`;
          piece.style.clipPath = `ellipse(${50 + Math.random() * 30}% ${50 + Math.random() * 30}% at 50% 50%)`;

          piece.style.width = `${pieceW + 2}px`;
          piece.style.height = `${pieceH + 2}px`;
          piece.style.left = `${left}px`;
          piece.style.top = `${top}px`;
          piece.style.backgroundImage = `url("${image.getAttribute("src")}")`;
          piece.style.backgroundSize = `${rect.width}px ${rect.height}px`;
          piece.style.backgroundPosition = `-${left}px -${top}px`;
          piece.style.setProperty("--tx", `${tx}px`);
          piece.style.setProperty("--ty", `${ty}px`);
          piece.style.setProperty("--rot", rot);
          piece.style.setProperty("--sx", sx);
          piece.style.setProperty("--sy", sy);

          dissolveLayer.appendChild(piece);

          requestAnimationFrame(() => {
            piece.classList.add("active");
          });
        }
      }

      image.style.opacity = "0.22";

      if (shouldDrift && randomTarget) {
        localStorage.setItem("dreamArchiveLastEntry", currentEntryId);
        scene.style.transition = "filter 0.8s ease, opacity 0.8s ease";
        scene.style.filter = "blur(10px) brightness(0.85)";
      }
    }, 110);

    if (shouldDrift && randomTarget) {
      setTimeout(() => {
        window.location.href = randomTarget.page;
      }, 1250);
    } else {
      setTimeout(() => {
        image.style.opacity = "1";
        dissolveLayer.innerHTML = "";
        scene.style.filter = "";
        isDissolving = false;
      }, 1450);
    }
  });
}

createLocalizedDissolve(
  document.getElementById("cloudScene"),
  document.getElementById("cloudImage"),
  document.getElementById("cloudDissolve"),
  document.getElementById("cloudPulse")
);

createLocalizedDissolve(
  document.getElementById("fieldScene"),
  document.getElementById("fieldImage"),
  document.getElementById("fieldDissolve"),
  document.getElementById("fieldPulse")
);

createLocalizedDissolve(
  document.getElementById("bridgeScene"),
  document.getElementById("bridgeImage"),
  document.getElementById("bridgeDissolve"),
  document.getElementById("bridgePulse")
);

createLocalizedDissolve(
  document.getElementById("entry4Scene"),
  document.getElementById("entry4Image"),
  document.getElementById("entry4Dissolve"),
  document.getElementById("entry4Pulse")
);

createLocalizedDissolve(
  document.getElementById("entry5Scene"),
  document.getElementById("entry5Image"),
  document.getElementById("entry5Dissolve"),
  document.getElementById("entry5Pulse")
);

if (page === "field") {
  const scene = document.getElementById("fieldScene");
  const canvas = document.getElementById("fieldCanvas");

  if (scene && canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      const rect = scene.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 90;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.4 + 0.6,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.28 - 0.04,
        alpha: Math.random() * 0.28 + 0.05
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.fillStyle = `rgba(245,230,255,${p.alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }
}