const quizData = [
    {
        title: "The Vatican Puffer",
        scenario: "The Pope wearing a designer white puffer jacket. Is this a rare candid moment?",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "This was created using ChatGPT. Look at the blurry texture of the right hand",
        img: "image/vatican-puffer.jpg"
    },
    {
        title: "2011 Japan Tsunami",
        scenario: "A photo of a massive wave hitting a coastal city, shared as 'Live footage of a storm happening right now.'",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Misleading Context",
        evidence: "The photo is real, but the context is fake. This is the 2011 Tohoku tsunami being used to trick people during modern storms.",
        img: "https://eclipse23.com/cdn/shop/articles/what-we-learned-from-the-2011-tohoku-earthquake-and-tsunami-265801.jpg?v=1730348775"
    },
    {
        title: "The Afghan Girl",
        scenario: "A 1984 portrait. Notice the sharp grain and the distinct reflections in the green eyes.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Real",
        evidence: "This is Steve McCurry's famous photograph. The 'Afghan Girl' in the photo comes a work of art of his, which is different from AI 'blur.'",
        img: "https://upload.wikimedia.org/wikipedia/en/b/b4/Sharbat_Gula.jpg"
    },
    {
        title: "Cyber-Bicycle",
        scenario: "A futuristic bicycle design where the wheels appear to be made of floating light.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "AI creates objects that look 'cool' but are physically impossible. There is no chain, pedal, or structural support shown.",
        img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800"
    },
    {
        title: "The Deep-Sea Discovery",
        scenario: "A massive shark found in a shallow river, supposedly caught by a local fisherman last week.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "Look at the water foam. AI often makes water look like 'cotton candy' or static rather than flowing liquid.",
        img: "https://images.unsplash.com/photo-1560273074-c930c70e1ad0?q=80&w=800"
    },
    {
        title: "Yalta Conference 1945",
        scenario: "Churchill, Roosevelt, and Stalin sitting together. The image is black and white with physical scratches.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Real",
        evidence: "This is an authentic archival photo. AI struggles to replicate the specific chemical 'crackle' found in 80-year-old photos.",
        img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Yalta_Conference_1945_Yalta_Hotel.jpg"
    },
    {
        title: "The Floating Market",
        scenario: "An aerial view of a market where every single boat is a perfect lotus flower shape.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "This is 'Mathematical Perfection.' Real markets are messy. AI likes to repeat patterns (the boats) too perfectly.",
        img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800"
    },
    {
        title: "Abandoned Shuttles",
        scenario: "Two rusting Soviet-era space shuttles left in a massive decaying hangar.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Real",
        evidence: "This is the Baikonur Cosmodrome. The specific way the rust flakes off the metal is a level of chaotic detail AI usually misses.",
        img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800"
    },
    {
        title: "The Arctic Traveler",
        scenario: "A man walking through a heavy snowstorm. Is this a real photo from a researcher?",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "Logic Error: There are no footprints in the snow behind him, and the snowflakes are 'glowing' unnaturally.",
        img: "https://images.unsplash.com/photo-1478719059408-592965723cbc?q=80&w=800"
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
