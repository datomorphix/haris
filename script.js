const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you absolutely, 100% certain?",
    "Are you positive?",
    "woiyee...",
    "Just think about it!",
    "please say yes...",
    "If you say no, I'll actually cry",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;
let lastFleeTime = 0;

const noBtn = document.querySelector('.no-button');
const msgEl = document.getElementById('msg');

function fleeFrom(clientX, clientY) {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distX = clientX - btnCenterX;
    const distY = clientY - btnCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 120) {
        const angle = Math.atan2(distY, distX);
        let newX = rect.left - Math.cos(angle) * 160;
        let newY = rect.top - Math.sin(angle) * 160;

        const margin = 10;
        newX = Math.max(margin, Math.min(window.innerWidth - rect.width - margin, newX));
        newY = Math.max(margin, Math.min(window.innerHeight - rect.height - margin, newY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.transition = 'left 0.15s ease, top 0.15s ease';

        const now = Date.now();
        if (now - lastFleeTime > 800) {
            lastFleeTime = now;
            const msg = messages[messageIndex % messages.length];
            msgEl.textContent = msg;
            noBtn.textContent = msg;
            messageIndex++;

            const yesButton = document.querySelector('.yes-button');
            const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
            yesButton.style.fontSize = `${Math.min(currentSize * 1.15, 52)}px`;
        }
    }
}

document.addEventListener('mousemove', (e) => {
    fleeFrom(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    fleeFrom(touch.clientX, touch.clientY);
}, { passive: true });

function handleNoClick() {
    const msg = messages[messageIndex % messages.length];
    msgEl.textContent = msg;
    noBtn.textContent = msg;
    messageIndex++;

    const yesButton = document.querySelector('.yes-button');
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${Math.min(currentSize * 1.35, 52)}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}