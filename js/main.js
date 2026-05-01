// Inițializare AOS (Animații)
AOS.init({ once: true, offset: 50 });

// === 1. AUTOMATIZAREA LIGILOR, BORDER-URILOR ȘI BADGE-URILOR ===
document.addEventListener("DOMContentLoaded", function() {
    
    const awayColor = '#6c757d'; // Gri pentru toate meciurile în deplasare

    // Funcție comună pentru a procesa biletele (atât masculin cât și feminin)
    function processTickets(selector, isFemale) {
        document.querySelectorAll(selector).forEach(card => {
            let isAway = card.classList.contains('is-away');
            let infoContainer = card.querySelector('.ticket-info-container');
            let dateBox = card.querySelector('.ticket-date-box');
            
            // Cream badge-ul automat
            if(infoContainer) {
                let badge = document.createElement('span');
                badge.className = isAway ? 'badge bg-secondary mb-2' : 'badge bg-dark mb-2';
                
                // Setăm textul în funcție de ligă și status (acasă/deplasare)
                let ligaText = 'Liga națională';
                let genText = isFemale ? 'Feminin' : 'Masculin';
                badge.textContent = isAway ? `${ligaText} (Deplasare)` : `${ligaText} (${genText})`;
                
                // Îl inserăm deasupra numelui echipelor
                infoContainer.insertBefore(badge, infoContainer.firstChild);
            }

            // Aplicăm culorile automat (dacă e deplasare devine gri)
            if (isAway && dateBox) {
                card.style.borderLeftColor = awayColor;
                dateBox.style.backgroundColor = awayColor;
            }
        });
    }

    // Rulăm procesarea pentru ambele secțiuni
    processTickets('#masculin .ticket-item', false);
    processTickets('#feminin .ticket-item', true);

    // === 2. DESCHIDEREA AUTOMATĂ A TAB-ULUI DIN LINK ===
    let hash = window.location.hash;
    if (hash) {
        let targetCard = document.querySelector(hash);
        if (targetCard) {
            let tabPane = targetCard.closest('.tab-pane');
            if (tabPane) {
                let tabId = tabPane.getAttribute('id');
                let tabButton = document.querySelector(`button[data-bs-target="#${tabId}"]`);
                if (tabButton) {
                    let bsTab = new bootstrap.Tab(tabButton);
                    bsTab.show();
                    setTimeout(() => { targetCard.scrollIntoView({ behavior: 'smooth' }); }, 300);
                }
            }
        }
    }
});

// === LOGICA PENTRU FORMULARUL DE BILETE ===
function goToStep2() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function goBackToStep1() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

function toggleCardFields() {
    const isCardSelected = document.getElementById('payCard').checked;
    const cardContainer = document.getElementById('cardDetailsContainer');
    const cardInput = document.getElementById('cardNumberInput');
    const expInput = document.getElementById('cardExpInput');
    const cvvInput = document.getElementById('cardCvvInput');

    if (isCardSelected) {
        cardContainer.style.display = 'block';
        cardInput.required = true;
        expInput.required = true;
        cvvInput.required = true;
    } else {
        cardContainer.style.display = 'none';
        cardInput.required = false;
        expInput.required = false;
        cvvInput.required = false;
    }
}

function finalizeOrder() {
    const isCasierie = document.getElementById('payCash').checked;
    
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';

    if (isCasierie) {
        document.getElementById('successTitle').innerText = "Rezervare Înregistrată!";
        document.getElementById('successMessage').innerHTML = "Biletele au fost rezervate cu succes pe numele tău.<br><strong>Vă așteptăm la casieria sălii pentru a achita contravaloarea lor și pentru a ridica biletele fizice.</strong>";
    } else {
        document.getElementById('successTitle').innerText = "Plată Confirmată!";
        document.getElementById('successMessage').innerHTML = "Plata a fost procesată cu succes.<br><strong>Biletele electronice (QR Code) au fost trimise pe adresa ta de email. Vă așteptăm la meci!</strong>";
    }
}

function resetForm() {
    setTimeout(() => {
        document.getElementById('formStep1').reset();
        document.getElementById('formStep2').reset();
        toggleCardFields(); 
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
    }, 500);
}

// === LOGICA PENTRU FORMULARUL DE CONTACT ===

function handleContactSubmit(e) {
    e.preventDefault();
    document.getElementById('formContainer').style.setProperty('display', 'none', 'important');
    document.getElementById('successMessage').style.setProperty('display', 'flex', 'important');
}

function resetContactForm() {
    const contactForm = document.getElementById('contactForm');
    if(contactForm) contactForm.reset();
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('successMessage').style.setProperty('display', 'none', 'important');
    document.getElementById('formContainer').style.setProperty('display', 'block', 'important');
}

document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    
    // Verificăm dacă suntem pe pagina de contact
    if (contactForm) {
        const submitBtn = document.getElementById('submitBtn');
        const formElements = contactForm.querySelectorAll('input, select, textarea');

        function checkFormValidity() {
            submitBtn.disabled = !contactForm.checkValidity();
        }

        formElements.forEach(el => {
            el.addEventListener('input', checkFormValidity);
            el.addEventListener('change', checkFormValidity);
        });
    }
});

// === LOGICA PENTRU FORMULARUL DE JUNIORI ===
document.addEventListener("DOMContentLoaded", function() {
    const juniorForm = document.getElementById('junior-form');
    
    if (juniorForm) {
        juniorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
            window.scrollTo({ top: document.getElementById('success-message').offsetTop - 100, behavior: 'smooth' });
        });
    }
});