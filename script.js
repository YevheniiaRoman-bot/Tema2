// API 7: Official Joke API
const API_URL = 'https://official-joke-api.appspot.com/random_joke';

// Elemente din pagină
const btn = document.getElementById('btn-joke');
const statusMsg = document.getElementById('status-msg');
const card = document.getElementById('card-gluma');

// Elemente pentru date
const imgRobot = document.getElementById('avatar-robot');
const setupText = document.getElementById('setup');
const punchlineText = document.getElementById('punchline');
const idDisplay = document.getElementById('joke-id');
const typeDisplay = document.getElementById('joke-type');
const lenDisplay = document.getElementById('setup-len');

async function getJoke() {
    console.log("[START] Începe cererea pentru o glumă nouă...");
    
    // UI Loading
    btn.disabled = true;
    btn.innerText = "Se caută gluma...";
    statusMsg.innerText = "Conectare la serverul de comedie...";

    try {
        // Pas 1: Fetch date
        const response = await fetch(API_URL);
        console.log(`[NETWORK] Status răspuns: ${response.status}`);

        if (!response.ok) throw new Error("Serverul nu răspunde!");

        const data = await response.json();
        console.log("[DATA] Gluma primită:", data);

        // Pas 2: Actualizare UI
        setupText.innerText = data.setup;
        punchlineText.innerText = data.punchline;
        
        // Date tehnice în tabel
        idDisplay.innerText = data.id;
        typeDisplay.innerText = data.type.toUpperCase();
        lenDisplay.innerText = data.setup.length;

        // TRUC: Generăm un robot unic bazat pe ID-ul glumei
        imgRobot.src = `https://robohash.org/${data.id}?set=set1&size=200x200`;

        // Afișăm cardul
        card.style.display = 'block';
        statusMsg.innerText = "Glumă livrată cu succes! 🤖";
        
        console.log("[UI] Interfața actualizată.");

    } catch (err) {
        console.error("[EROARE]", err);
        statusMsg.innerText = "Eroare: " + err.message;
        alert("Ceva nu a mers. Vezi consola!");
    } finally {
        btn.disabled = false;
        btn.innerText = "Spune-mi o glumă!";
        console.log("[END] Proces finalizat.");
    }
}

// Event Listener
btn.addEventListener('click', getJoke);