const quizData = [
    {
        title: "The Vatican Puffer",
        scenario: "An image of the Pope wearing a stylish, oversized designer white puffer jacket.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "Look at the hands and the glasses—they blur into the face. This was a Midjourney creation that went viral in 2023.",
        img: "https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "2011 Japan Tsunami",
        scenario: "A photo of a massive wave hitting a coastal city, shared during a recent 2024 storm.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Misleading Context",
        evidence: "The photo is 100% real, but the context is wrong. It's 13 years old and being used to farm engagement during a new disaster.",
        img: "https://images.unsplash.com/photo-1551219059-b5f8e7acee56?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "National Geographic Portrait",
        scenario: "A high-contrast photo of a girl with piercing green eyes from a 1984 magazine cover.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Real",
        evidence: "This is the famous 'Afghan Girl' by Steve McCurry. High grain and period-correct film artifacts prove its authenticity.",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "Cyber-Bicycle Design",
        scenario: "A futuristic bicycle where the spokes of the wheels don't actually touch the center hub.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "Structural impossibility. AI often 'dreams' objects that look cool but wouldn't function under physics.",
        img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "The Deep-Sea Discovery",
        scenario: "A photo of a giant 'Meglodon' shark supposedly caught by a fishing boat yesterday.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "Check the water surface. AI struggles to render the complex physics of splashing water and foam consistently.",
        img: "https://images.unsplash.com/photo-1560273074-c930c70e1ad0?q=80&w=800"
    },
    {
        title: "Historic Peace Treaty",
        scenario: "A blurry black and white photo showing an event that took place in 1945.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Real",
        evidence: "The damage on the negative (white spots) matches historical archiving patterns that AI rarely replicates accurately.",
        img: "https://images.unsplash.com/photo-1526332663830-51a70059c193?q=80&w=800"
    },
    {
        title: "The Floating Market",
        scenario: "A stunning aerial view of a market where boats are shaped like giant lotus flowers.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "Too perfect. The symmetry of the boats and the lack of any 'trash' or realistic clutter suggests AI generation.",
        img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "Abandoned Space Station",
        scenario: "A photo of an old Soviet-era control room covered in vines and dust.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Real",
        evidence: "This is a real photo from the Baikonur Cosmodrome. The specific wear on the buttons is consistent with 50 years of decay.",
        img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "The Arctic Protest",
        scenario: "Activists holding a banner in the snow. The hands holding the banner have 6 fingers each.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "The 'Six-Finger' rule. Even advanced AI still struggles with the complex anatomy of human extremities.",
        img: "https://images.unsplash.com/photo-1478719059408-592965723cbc?auto=format&fit=crop&q=80&w=600"
    }
];

let score = 0;
let progress = 0;
const total = quizData.length;

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    quizData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${item.img}')"></div>
            <h3>${item.title}</h3>
            <p>${item.scenario}</p>
            <div class="btn-stack" id="stack-${index}">
                ${item.options.map(opt => `<button class="option-btn" onclick="handleChoice(${index}, '${opt}')">${opt}</button>`).join('')}
            </div>
            <div id="feedback-${index}" class="feedback-box"></div>
        `;
        grid.appendChild(card);
    });
}

window.handleChoice = (idx, choice) => {
    const item = quizData[idx];
    const feedback = document.getElementById(`feedback-${idx}`);
    const stack = document.getElementById(`stack-${idx}`);
    
    // Disable buttons
    Array.from(stack.children).forEach(btn => btn.disabled = true);
    
    if (choice === item.correct) {
        score++;
        feedback.innerHTML = `<strong>Correct!</strong> ${item.evidence}`;
        feedback.className = "feedback-box correct-ans";
    } else {
        feedback.innerHTML = `<strong>Incorrect.</strong> It was actually ${item.correct}. ${item.evidence}`;
        feedback.className = "feedback-box wrong-ans";
    }

    progress++;
    updateProgress();
};

function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    const percent = (progress / total) * 100;
    
    fill.style.width = `${percent}%`;
    text.innerText = `${progress}/${total} Examined`;

    if (progress === total) {
        setTimeout(showFinalResults, 1000);
    }
}

function showFinalResults() {
    const modal = document.getElementById('results-modal');
    const scoreVal = document.getElementById('final-score-val');
    const msg = document.getElementById('final-message');
    
    modal.classList.remove('hidden');
    scoreVal.innerText = `${score}/${total}`;

    if (score >= 7) {
        msg.innerText = "Exceptional. You are a Certified Digital Scribe. You see through the noise.";
    } else if (score >= 4) {
        msg.innerText = "Well done. You have a solid grasp of the basics, but keep an eye on those metadata clues.";
    } else {
        msg.innerText = "A great learning opportunity. The digital world is tricky—try reviewing the methodology steps above!";
    }
}

document.addEventListener('DOMContentLoaded', renderGallery);
