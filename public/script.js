// 1. Matrix Background Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height, columns;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
const fontSize = 16;
let drops = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly more trail fading
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00FF41'; // Standard Matrix Green
    ctx.font = `${fontSize}px monospace`;
    ctx.shadowBlur = 5; // Added some glow
    ctx.shadowColor = '#00FF41';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

window.addEventListener('resize', initCanvas);
initCanvas();
setInterval(drawMatrix, 50);

// 2. Schedule and Talk Rendering
let allTalks = [];
const scheduleContainer = document.getElementById('schedule-container');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;
};

const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="highlight-text">$1</span>');
};

const renderSchedule = (searchTerm = '') => {
    console.log('Rendering schedule with term:', searchTerm);
    scheduleContainer.innerHTML = '';
    
    let currentMinutes = 10 * 60; // 10:00 AM
    const talkDuration = 60;
    const transition = 10;
    const lunchDuration = 60;

    const term = searchTerm.toLowerCase().trim();
    let talkIndex = 0;

    // We have 7 slots total: Talk 1, 2, 3, Lunch, Talk 4, 5, 6
    for (let i = 0; i < 7; i++) {
        const startTime = formatTime(currentMinutes);
        
        // Slot 3 (the 4th item) is always Lunch
        if (i === 3) {
            const endTime = formatTime(currentMinutes + lunchDuration);
            const lunchHtml = `
                <div class="schedule-item lunch">
                    <div class="time">[ ${startTime} - ${endTime} ]</div>
                    <div class="title">RECHARGING_NEURAL_LINKS (LUNCH_BREAK)</div>
                </div>
            `;
            scheduleContainer.insertAdjacentHTML('beforeend', lunchHtml);
            currentMinutes += lunchDuration;
            continue;
        }

        // Get the talk for this slot
        const talk = allTalks[talkIndex];
        if (talk) {
            const endTime = formatTime(currentMinutes + talkDuration);
            
            // Match checking
            const isMatch = term === '' || 
                talk.title.toLowerCase().includes(term) ||
                talk.category.some(cat => cat.toLowerCase().includes(term)) ||
                talk.description.toLowerCase().includes(term) ||
                talk.speakers.some(s => s.toLowerCase().includes(term));
            
            const displayedSpeakers = talk.speakers.map(s => highlightMatch(s, term)).join(', ');
            const displayedTitle = highlightMatch(talk.title, term);
            const displayedCategories = talk.category.map(cat => 
                `<span class="category-tag">#${highlightMatch(cat, term)}</span>`
            ).join('');

            const talkHtml = `
                <div class="schedule-item ${isMatch ? 'match' : 'dimmed'}">
                    <div class="item-header">
                        <div class="time">[ ${startTime} - ${endTime} ]</div>
                        <div class="speakers">> Speakers: ${displayedSpeakers}</div>
                    </div>
                    <div class="title">${displayedTitle}</div>
                    <div class="description">${talk.description}</div>
                    <div class="categories">
                        ${displayedCategories}
                    </div>
                </div>
            `;
            scheduleContainer.insertAdjacentHTML('beforeend', talkHtml);
        } else {
            // Placeholder if talk data is missing for some reason
            scheduleContainer.insertAdjacentHTML('beforeend', `<div class="schedule-item dimmed"><div class="title">[ DATA_MISSING ]</div></div>`);
        }

        currentMinutes += talkDuration + transition;
        talkIndex++;
    }
};

// 3. Data Fetching and Search
const performSearch = () => {
    renderSchedule(searchBar.value);
};

const fetchTalks = async () => {
    try {
        console.log('Fetching talks...');
        // Set loading state
        scheduleContainer.innerHTML = `
            <div class="schedule-item">
                <div class="title loading-text">> INITIALIZING_DECRYPTION_PROTOCOL</div>
            </div>
        `;
        
        const response = await fetch('/api/talks');
        if (!response.ok) throw new Error('Network response was not ok');
        
        // Simulating a short delay so the loading state is actually visible
        await new Promise(resolve => setTimeout(resolve, 800)); 

        allTalks = await response.json();
        console.log('Talks loaded:', allTalks.length);
        renderSchedule();
    } catch (error) {
        console.error('Error fetching talks:', error);
        scheduleContainer.innerHTML = '<div class="schedule-item"><div class="title">> ERROR: CONNECTION_LOST_TO_ZION</div><div class="description">Could not load schedule data. Ensure the server is running.</div></div>';
    }
};

searchBtn.addEventListener('click', performSearch);

searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Initial load
fetchTalks();
