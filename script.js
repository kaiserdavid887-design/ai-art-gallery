const quizData = [
    {
        title: "The Vatican Puffer",
        scenario: "The Pope wearing a designer white puffer jacket. Is this a rare candid moment?",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "This was created using ChatGPT. Look at the blurry texture of the right hand",
        img: "vatican-puffer.jpg"
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
        correct: "Misleading Context",
        evidence: "The image may be real, but the caption is false or manipulated. Viral posts often recycle old or unrelated images.",
        img: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=800"
    },
    {
        title: "Perfect Politician Portrait",
        scenario: "A polished headshot of a politician with oddly smooth skin, perfect symmetry, and strange teeth.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "AI portraits often create overly smooth skin, unnatural symmetry, and strange details in teeth, ears, or eyes.",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800"
    },
    {
        title: "Historic War Footage",
        scenario: "A dramatic image shared as 'New battlefield photo from today.'",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Misleading Context",
        evidence: "Old war photos are often reshared during modern conflicts with fake captions. The image may be real, but the timing is false.",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800"
    },
    {
        title: "Hyperreal Celebrity",
        scenario: "An image of a celebrity in a place they were never reported to be, looking almost real at first glance.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "AI Generated",
        evidence: "AI images of famous people often look believable, but details like hands, reflections, and background logic give them away.",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800"
    },
    {
        title: "Flooded City Street",
        scenario: "A terrifying city flood image posted as breaking news, but with no reliable source.",
        options: ["AI Generated", "Real", "Misleading Context"],
        correct: "Misleading Context",
        evidence: "Some disaster photos are real but reused from older events. Always verify location, date, and source.",
        img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800"
    }
];

const galleryGrid = document.getElementById("gallery-grid");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const resultsModal = document.getElementById("results-modal");
const finalScoreVal = document.getElementById("final-score-val");
const finalMessage = document.getElementById("final-message");

let answeredCount = 0;
let score = 0;
let answeredQuestions = new Set();

function updateProgress() {
    progressText.textContent = `${answeredCount}/${quizData.length} Examined`;
    const percent = (answeredCount / quizData.length) * 100;
    progressFill.style.width = `${percent}%`;
}

function showResults() {
    finalScoreVal.textContent = `${score}/${quizData.length}`;

    if (score === quizData.length) {
        finalMessage.textContent = "Excellent. You spotted every case correctly.";
    } else if (score >= Math.ceil(quizData.length * 0.7)) {
        finalMessage.textContent = "Strong result. You can spot most misleading or AI-generated images.";
    } else if (score >= Math.ceil(quizData.length * 0.4)) {
        finalMessage.textContent = "Decent start. You noticed some clues, but a few tricky cases got through.";
    } else {
        finalMessage.textContent = "You need a sharper eye. A lot of fake or misleading content slips by when details are ignored.";
    }

    resultsModal.classList.remove("hidden");
}

function handleAnswer(selectedBtn, selectedOption, item, feedbackBox, cardIndex) {
    if (answeredQuestions.has(cardIndex)) {
        return;
    }

    answeredQuestions.add(cardIndex);
    answeredCount++;

    const allButtons = selectedBtn.closest(".btn-stack").querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === item.correct) {
            btn.style.borderColor = "var(--success)";
            btn.style.background = "rgba(46, 204, 113, 0.15)";
        }
    });

    if (selectedOption === item.correct) {
        score++;
        selectedBtn.style.borderColor = "var(--success)";
        selectedBtn.style.background = "rgba(46, 204, 113, 0.15)";
        feedbackBox.className = "feedback-box correct-ans";
        feedbackBox.innerHTML = `<strong>Correct.</strong> ${item.evidence}`;
    } else {
        selectedBtn.style.borderColor = "var(--error)";
        selectedBtn.style.background = "rgba(231, 76, 60, 0.15)";
        feedbackBox.className = "feedback-box wrong-ans";
        feedbackBox.innerHTML = `<strong>Not quite.</strong> ${item.evidence}`;
    }

    updateProgress();

    if (answeredCount === quizData.length) {
        setTimeout(showResults, 500);
    }
}

function renderQuiz() {
    galleryGrid.innerHTML = "";

    quizData.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="square-frame">
                <img src="${item.img}" alt="${item.title}">
            </div>
            <h3>${item.title}</h3>
            <p>${item.scenario}</p>
            <div class="btn-stack">
                ${item.options.map(option => `
                    <button class="option-btn" type="button">${option}</button>
                `).join("")}
            </div>
            <div class="feedback-box"></div>
        `;

        const feedbackBox = card.querySelector(".feedback-box");
        const buttons = card.querySelectorAll(".option-btn");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                handleAnswer(button, button.textContent, item, feedbackBox, index);
            });
        });

        galleryGrid.appendChild(card);
    });

    updateProgress();
}

renderQuiz();
