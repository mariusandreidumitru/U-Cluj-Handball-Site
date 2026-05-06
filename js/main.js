// Inițializare AOS (Animații)
if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 50 });
}

// Variabile globale temporare pentru reținerea meciului selectat la click
let meciSelectatTemporar = "";
let categorieSelectataTemporar = "";

// ==========================================================
// 1. SISTEM MODERN DE ALERTE (TOAST) ȘI CONFIRMĂRI (OVERLAY)
// ==========================================================

function showCustomAlert(message, isError = false) {
    const existing = document.getElementById('customToast');
    if(existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'customToast';
    toast.className = `custom-toast ${isError ? 'error' : ''}`;
    toast.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-exclamation text-danger' : 'fa-circle-check text-success'} fa-xl"></i> <span>${message}</span>`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function showCustomConfirm(message, confirmCallback) {
    const existing = document.getElementById('customConfirmOverlay');
    if(existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'customConfirmOverlay';
    overlay.className = 'custom-overlay';
    
    overlay.innerHTML = `
        <div class="custom-confirm-box">
            <i class="fa-solid fa-triangle-exclamation fa-3x mb-3 text-warning"></i>
            <h5 class="fw-bold mb-3">Confirmare Acțiune</h5>
            <p class="text-muted mb-4">${message}</p>
            <div class="d-flex justify-content-center gap-3">
                <button class="btn btn-outline-dark fw-bold px-4" id="btnCancelConfirm">Înapoi</button>
                <button class="btn btn-danger fw-bold px-4" id="btnYesConfirm">Confirmă</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('show'), 10);

    document.getElementById('btnCancelConfirm').onclick = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    };
    
    document.getElementById('btnYesConfirm').onclick = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
        confirmCallback();
    };
}

// ==========================================================
// 2. LOGICA LA ÎNCĂRCAREA PAGINII (DOMContentLoaded)
// ==========================================================

document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPage = window.location.pathname;

    // --- NAVBAR DINAMIC ---
    const authLink = document.getElementById('authLinkBtn');
    const mainMenu = document.getElementById('mainMenu');

    if (authLink && isLoggedIn) {
        authLink.innerHTML = '<i class="fa-solid fa-user-circle me-1"></i> Profilul Meu';
        authLink.href = 'profil.html';
        
        if(currentPage.includes('profil.html')) authLink.classList.add('active');

        if (mainMenu && !document.getElementById('logoutBtnItem')) {
            const logoutLi = document.createElement('li');
            logoutLi.className = 'nav-item';
            logoutLi.id = 'logoutBtnItem';
            logoutLi.innerHTML = '<a class="nav-link text-danger fw-bold" href="#" onclick="logoutUser()"><i class="fa-solid fa-right-from-bracket me-1"></i> Deconectare</a>';
            mainMenu.appendChild(logoutLi);
        }
    }

    // --- PROTECȚIE ȘI REDIRECȚIONĂRI PAGINI ---
    if (currentPage.includes('autentificare.html') && isLoggedIn) window.location.href = 'profil.html';
    if (currentPage.includes('profil.html') && !isLoggedIn) window.location.href = 'autentificare.html';

    // --- FORMULAR LOGARE ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            if (!localStorage.getItem('userName')) {
                localStorage.setItem('userName', 'Suporter');
                localStorage.setItem('userPrenume', 'U Cluj');
            }
            showCustomAlert('Te-ai logat cu succes!');
            setTimeout(() => window.location.href = 'profil.html', 1500);
        });
    }

    // --- FORMULAR ÎNREGISTRARE ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nume = document.getElementById('regNume').value;
            const prenume = document.getElementById('regPrenume').value;
            const email = document.getElementById('regEmail').value;

            const dateProfil = { nume, prenume, email, telefon: "", dataNasterii: "", sex: "Masculin" };

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userFullData', JSON.stringify(dateProfil));
            localStorage.setItem('userName', nume);
            localStorage.setItem('userPrenume', prenume);
            localStorage.setItem('userEmail', email);

            showCustomAlert('Cont creat cu succes!');
            setTimeout(() => window.location.href = 'profil.html', 1500);
        });
    }

    // --- PROFIL: MANAGEMENT DATE ȘI SECURITATE ---
    if (currentPage.includes('profil.html')) {
        const profileForm = document.getElementById('profileForm');
        const changePassForm = document.getElementById('changePasswordForm');
        const savedData = localStorage.getItem('userFullData');
        
        if (savedData) {
            const user = JSON.parse(savedData);
            if (document.getElementById('profilNume')) document.getElementById('profilNume').value = user.nume || "";
            if (document.getElementById('profilPrenume')) document.getElementById('profilPrenume').value = user.prenume || "";
            if (document.getElementById('profilEmail')) document.getElementById('profilEmail').value = user.email || "";
            if (document.getElementById('profilTel')) document.getElementById('profilTel').value = user.telefon || "";
            if (document.getElementById('profilData')) document.getElementById('profilData').value = user.dataNasterii || "";
            if (document.getElementById('profilSex')) document.getElementById('profilSex').value = user.sex || "Masculin";
            
            if (document.getElementById('salutNume')) {
                document.getElementById('salutNume').innerText = "Salut, " + (user.prenume || "Suporter") + "!";
            }
        }

        if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const dateActualizate = {
                    nume: document.getElementById('profilNume').value,
                    prenume: document.getElementById('profilPrenume').value,
                    email: document.getElementById('profilEmail').value,
                    telefon: document.getElementById('profilTel').value,
                    dataNasterii: document.getElementById('profilData').value,
                    sex: document.getElementById('profilSex').value
                };

                localStorage.setItem('userFullData', JSON.stringify(dateActualizate));
                localStorage.setItem('userName', dateActualizate.nume);
                localStorage.setItem('userPrenume', dateActualizate.prenume);
                
                showCustomAlert('Toate datele au fost salvate cu succes!');
                setTimeout(() => location.reload(), 1500); 
            });
        }

        if (changePassForm) {
            changePassForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const newP = document.getElementById('newPass').value;
                const confirmP = document.getElementById('confirmPass').value;

                if (newP !== confirmP) {
                    showCustomAlert('Eroare: Parolele noi nu coincid!', true);
                    return;
                }
                if (newP.length < 6) {
                    showCustomAlert('Eroare: Parola nouă trebuie să aibă minim 6 caractere.', true);
                    return;
                }

                showCustomAlert('Parola a fost actualizată cu succes!');
                changePassForm.reset();
            });
        }

        incarcaBileteProfil();
    }

    // --- AUTO-FORMATARE CÂMPURI CARD (DATE LIVE) ---
    const cardNumber = document.getElementById('cardNumberInput');
    const cardExp = document.getElementById('cardExpInput');
    const cardCvv = document.getElementById('cardCvvInput');

    // 1. Formatare Număr Card: adaugă spațiu la fiecare 4 cifre (0000 0000 0000 0000)
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            // Ștergem tot ce nu este cifră
            let value = e.target.value.replace(/\D/g, '');
            // Împărțim în grupuri de câte 4 și le unim cu spațiu
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            // Limităm la 19 caractere (16 cifre + 3 spații)
            e.target.value = formatted.substring(0, 19);
        });
    }

    // 2. Formatare Dată Expirare: adaugă automat "/" după lună (LL/AA)
    if (cardExp) {
        cardExp.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            // Limităm la 5 caractere (LL/AA)
            e.target.value = value.substring(0, 5);
        });
    }

    // 3. Formatare CVV: permite doar cifre și limitează la 3 caractere
    if (cardCvv) {
        cardCvv.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            // Limităm la 3 cifre
            e.target.value = value.substring(0, 3);
        });
    }
    
    // --- AUTOMATIZARE CAPTURĂ DATE MECI ---
    const ticketButtons = document.querySelectorAll('.btn-ucluj');
    ticketButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ticketCard = this.closest('.ticket-item');
            if(!ticketCard) return;
            
            const titluMeci = ticketCard.querySelector('h4').innerText;
            
            let categorie = "Seniori";
            if (this.closest('#feminin')) {
                categorie = "Feminin";
            } else if (this.closest('#masculin')) {
                categorie = "Masculin";
            }

            meciSelectatTemporar = titluMeci;
            categorieSelectataTemporar = categorie;

            const modalTitle = document.querySelector('#modalBilete .modal-title');
            if(modalTitle) {
                modalTitle.innerHTML = `<i class="fa-solid fa-ticket me-2"></i> Bilet: ${titluMeci}`;
            }

            checkLoginAndOpenModal();
        });
    });
});

// ==========================================================
// 3. FUNCȚII EXTERNE ȘI MANAGEMENT PROCES DE CUMPĂRARE
// ==========================================================

function toggleAuthMode(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTitle = document.getElementById('authTitle');

    if (mode === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        authTitle.innerText = "Creare Cont";
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        authTitle.innerText = "Autentificare";
    }
}

// Deschidere modal + auto-completare inteligentă cu datele de profil
function checkLoginAndOpenModal() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        var myModal = new bootstrap.Modal(document.getElementById('modalBilete'));
        myModal.show();

        // Luăm datele din profil și le auto-completăm ca propunere implicită
        const numeSalvat = localStorage.getItem('userName');
        const prenumeSalvat = localStorage.getItem('userPrenume');
        const emailSalvat = localStorage.getItem('userEmail');

        if (document.getElementById('biletNume') && numeSalvat) document.getElementById('biletNume').value = numeSalvat;
        if (document.getElementById('biletPrenume') && prenumeSalvat) document.getElementById('biletPrenume').value = prenumeSalvat;
        if (document.getElementById('biletEmail') && emailSalvat) document.getElementById('biletEmail').value = emailSalvat;
    } else {
        showCustomAlert("Trebuie să te loghezi pentru a cumpăra bilete!", true);
        setTimeout(() => window.location.href = "autentificare.html", 1500);
    }
}

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    showCustomAlert('Te-ai deconectat cu succes.');
    setTimeout(() => window.location.href = "autentificare.html", 1000);
}

function deleteAccount() {
    showCustomConfirm("Ești sigur că vrei să îți ștergi definitiv contul? Pierzi tot istoricul biletelor!", () => {
        localStorage.clear();
        showCustomAlert('Contul tău a fost șters definitiv.');
        setTimeout(() => window.location.href = "index.html", 1500);
    });
}

function goToStep2() { document.getElementById('step1').style.display = 'none'; document.getElementById('step2').style.display = 'block'; }
function goBackToStep1() { document.getElementById('step2').style.display = 'none'; document.getElementById('step1').style.display = 'block'; }

function toggleCardFields() {
    const isCardSelected = document.getElementById('payCard').checked;
    const cardContainer = document.getElementById('cardDetailsContainer');
    if(cardContainer) cardContainer.style.display = isCardSelected ? 'block' : 'none';
}

function resetForm() {
    setTimeout(() => {
        const form1 = document.getElementById('formStep1');
        const form2 = document.getElementById('formStep2');
        if(form1) form1.reset();
        if(form2) form2.reset();
        toggleCardFields(); 
        document.getElementById('step1').style.display = 'block';
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'none';
    }, 500);
}

function finalizeOrder() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';

    const sectorAles = document.getElementById('sectorSelect')?.value || "Tribuna 2";
    const nrBilete = document.getElementById('cantitateBilete')?.value || "1";
    const metodaPlata = document.getElementById('payCard').checked ? "Card Online" : "Cash (Casierie)";
    
    // Luăm valorile scrise efectiv în câmpurile formularului (astfel reținem modificările dacă biletul e pt altcineva)
    const numeCumparator = document.getElementById('biletNume')?.value || "Suporter";
    const prenumeCumparator = document.getElementById('biletPrenume')?.value || "";

    // Calculăm prețul dinamic în funcție de prețul sectorului selectat în formular
    let pretUnitat = 25;
    if (sectorAles.includes("35")) pretUnitat = 35;
    if (sectorAles.includes("15")) pretUnitat = 15;
    if (sectorAles.includes("25")) pretUnitat = 25;
    
    let sumaCalculata = (pretUnitat * parseInt(nrBilete)) + " RON";

    let bileteMele = JSON.parse(localStorage.getItem('bileteCumparate')) || [];
    
    let biletNou = {
        id: "TKT-" + Math.floor(Math.random() * 100000),
        meci: meciSelectatTemporar,
        tip: categorieSelectataTemporar,
        dataAchizitie: new Date().toLocaleString('ro-RO'),
        suma: sumaCalculata,
        sector: sectorAles,
        cantitate: nrBilete,
        plata: metodaPlata,
        cumparator: `${prenumeCumparator} ${numeCumparator}`.trim()
    };

    bileteMele.push(biletNou);
    localStorage.setItem('bileteCumparate', JSON.stringify(bileteMele));
    
    showCustomAlert('Rezervare finalizată cu succes!');
}

function incarcaBileteProfil() {
    let bileteMele = JSON.parse(localStorage.getItem('bileteCumparate')) || [];
    let container = document.getElementById('bilete-container');
    if (!container) return;

    if (bileteMele.length === 0) {
        container.innerHTML = '<p class="text-muted">Nu ai cumpărat niciun bilet încă.</p>';
        return;
    }

    container.innerHTML = bileteMele.map((bilet, index) => `
        <div class="ticket-card-detailed p-4 mb-4 border shadow-sm bg-white">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <div class="d-flex align-items-center mb-2">
                        <span class="badge ${bilet.tip === 'Masculin' ? 'bg-primary' : 'bg-danger'} me-2" style="border-radius:0; padding:6px 12px; font-size:12px;">${bilet.tip}</span>
                        <h5 class="fw-bold text-uppercase mb-0">${bilet.meci}</h5>
                    </div>
                    <div class="row g-2">
                        <div class="col-6"><small class="text-muted d-block text-uppercase" style="font-size: 10px;">Cumpărător</small> <span class="fw-bold">${bilet.cumparator}</span></div>
                        <div class="col-6"><small class="text-muted d-block text-uppercase" style="font-size: 10px;">ID Tranzacție</small> <span class="text-secondary small">#${bilet.id}</span></div>
                        <div class="col-6 mt-3"><small class="text-muted d-block text-uppercase" style="font-size: 10px;">Sector / Zonă</small> <span class="badge bg-dark" style="border-radius:0; padding:6px 12px;">${bilet.sector}</span></div>
                        <div class="col-6 mt-3"><small class="text-muted d-block text-uppercase" style="font-size: 10px;">Număr Bilete</small> <span class="fw-bold">${bilet.cantitate} buc.</span></div>
                        <div class="col-6 mt-3"><small class="text-muted d-block text-uppercase" style="font-size: 10px;">Metodă Plată</small> <span>${bilet.plata}</span></div>
                        <div class="col-6 mt-3"><small class="text-muted d-block text-uppercase" style="font-size: 10px;">Data Tranzacției</small> <span>${bilet.dataAchizitie}</span></div>
                    </div>
                </div>
                <div class="col-md-4 text-md-end mt-4 mt-md-0 border-start ps-md-4" style="border-left: 1px dashed #dee2e6 !important;">
                    <div class="mb-3">
                        <small class="text-muted d-block">TOTAL ACHITAT</small>
                        <h4 class="fw-bold mb-0">${bilet.suma}</h4>
                    </div>
                    <div class="d-grid gap-2">
                       <button class="btn btn-dark btn-sm fw-bold" onclick="descarcaPDF(${index})"><i class="fa-solid fa-download me-2"></i> Descarcă PDF</button>
                        <button class="btn btn-outline-danger btn-sm fw-bold" onclick="anuleazaBilet(${index})">Anulează Bilet</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function anuleazaBilet(index) {
    showCustomConfirm("Ești sigur că anulezi biletul? Banii vor fi returnați în 3-5 zile.", () => {
        let bilete = JSON.parse(localStorage.getItem('bileteCumparate')) || [];
        bilete.splice(index, 1);
        localStorage.setItem('bileteCumparate', JSON.stringify(bilete));
        incarcaBileteProfil();
        showCustomAlert("Biletul a fost anulat cu succes.");
    });
}

function descarcaPDF(index) {
    let bilete = JSON.parse(localStorage.getItem('bileteCumparate')) || [];
    let bilet = bilete[index];

    if (!bilet) {
        showCustomAlert("Eroare: Biletul nu a putut fi găsit.", true);
        return;
    }

    // Creăm o fereastră nouă de printare
    let printWindow = window.open('', '_blank', 'width=800,height=600');
    
    // Generăm un design curat și minimalist pentru biletul tipărit
    printWindow.document.write(`
        <html>
        <head>
            <title>Bilet #${bilet.id}</title>
            <style>
                body { font-family: 'Arial', sans-serif; padding: 40px; color: #000; }
                .ticket-box { border: 3px solid #000; padding: 30px; max-width: 600px; margin: 0 auto; position: relative; }
                .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px; }
                .header h2 { margin: 0; text-transform: uppercase; letter-spacing: 2px; }
                .meci-titlu { font-size: 22px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; text-align: center;}
                .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; font-size: 14px; }
                .label { color: #666; font-size: 11px; text-transform: uppercase; display: block; margin-bottom: 2px;}
                .value { font-weight: bold; font-size: 16px; }
                .footer-ticket { border-top: 1px dashed #000; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; }
                .barcode { font-family: 'Courier New', monospace; letter-spacing: 8px; font-weight: bold; font-size: 18px; background: #000; color: #fff; padding: 5px 15px; }
                .info-recuperare { font-size: 10px; color: #444; max-width: 300px; }
            </style>
        </head>
        <body>
            <div class="ticket-box">
                <div class="header">
                    <h2>UNIVERSITATEA CLUJ HANDBAL</h2>
                    <p style="margin: 5px 0 0 0; font-size: 12px;">Bilet Oficial de Acces - Categoria ${bilet.tip}</p>
                </div>
                
                <div class="meci-titlu">${bilet.meci}</div>
                
                <div class="details-grid">
                    <div><span class="label">Cumpărător</span><span class="value">${bilet.cumparator}</span></div>
                    <div><span class="label">ID Tranzacție</span><span class="value">#${bilet.id}</span></div>
                    <div><span class="label">Sector / Zonă</span><span class="value">${bilet.sector}</span></div>
                    <div><span class="label">Cantitate</span><span class="value">${bilet.cantitate} Buc.</span></div>
                    <div><span class="label">Metodă Plată</span><span class="value">${bilet.plata}</span></div>
                    <div><span class="label">Data Achiziției</span><span class="value">${bilet.dataAchizitie}</span></div>
                </div>
                
                <div class="footer-ticket">
                    <div class="info-recuperare">
                        *Prezentarea acestui document este obligatorie la porțile de acces ale sălii.<br>
                        Valoare totală achitată: <strong>${bilet.suma}</strong>
                    </div>
                    <div class="barcode">${bilet.id.replace("TKT-", "")}</div>
                </div>
            </div>
            <script>
                // Declanșăm salvarea automată ca PDF instant la deschidere
                window.onload = function() { 
                    window.print(); 
                    setTimeout(function() { window.close(); }, 500);
                }
            <\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}