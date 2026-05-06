Acest proiect reprezintă o platformă web modernă și performantă dedicată clubului de handbal **Universitatea Cluj**. Site-ul a fost dezvoltat pentru a oferi o experiență digitală completă fanilor, facilitând accesul la noutăți, programul meciurilor, lotul jucătorilor și achiziția de bilete.

---

### **🚀 Funcționalități Principale**
*   **Arhitectură Modulară:** Separarea completă a structurii (HTML) de design (CSS) și logica de funcționare (JavaScript) pentru o mentenanță ușoară.
*   **Design Responsive:** Interfața este optimizată pentru orice dispozitiv (Mobile, Tablet, Desktop) utilizând sistemul de grid Bootstrap 5.
*   **Managementul Echipelor:** Secțiuni detaliate pentru echipa masculină și feminină, cu profiluri pentru jucători și staff tehnic.
*   **Sistem de Ticketing:** Pagină dedicată pentru rezervarea biletelor cu formulare integrate.
*   **Centru de Știri:** Arhivă de articole cu design tip editorial pentru noutăți și transferuri.
*   **Integrare Google Maps:** Localizare precisă pentru Sala Sporturilor "Horia Demian" în pagina de contact.

---

### **🛠️ Tehnologii Utilizate**
*   **Frontend:** HTML5 & CSS3 (utilizarea variabilelor CSS pentru consistență vizuală).
*   **Framework CSS:** Bootstrap 5.3.0 pentru layout-uri complexe și componente UI.
*   **JavaScript (Vanilla):** Validări de formulare, manipularea tab-urilor și logică pentru experiența utilizatorului.
*   **Animații:** Biblioteca AOS (Animate On Scroll) pentru un plus de dinamism la navigare.
*   **Pictograme:** FontAwesome 6 Pro.
*   **Tipografie:** Google Fonts (Montserrat & Open Sans).

---

### **📂 Structura Proiectului**
Proiectul este organizat profesional pentru a respecta standardele de dezvoltare web:
```text
/u-cluj-handbal-site
│
├── /css
│   └── style.css            # Fișier centralizat pentru toate stilurile site-ului
├── /imagini                 # Resurse media (jucători, meciuri, bannere, logo-uri)
├── /js
│   └── main.js             # Logică JavaScript pentru formulare, animații și interacțiuni
│
├── autentificare.html       # Pagina de login și înregistrare (cu opțiuni Google/Facebook)
├── bilete.html              # Platforma de achiziție tichete și abonamente
├── clasament.html           # Pozițiile detaliate în Liga Națională
├── contact.html             # Formular de suport, date de contact și localizare hartă
├── index.html               # Pagina principală a site-ului (Landing Page)
├── lot.html                 # Prezentarea lotului de jucători și a staff-ului tehnic
├── meciuri.html             # Programul competițional, rezultate și statistici
├── profil.html              # Pagina personală a utilizatorului după autentificare
├── README.md                # Documentația proiectului și detalii tehnice
├── resetare-parola.html     # Pagina pentru recuperarea și resetarea parolei
├── stire.html               # Șablonul de bază pentru vizualizarea unei știri individuale
├── stire-juniori.html       # Articol dedicat performanțelor echipelor de juniori
├── stire-transfer.html      # Anunț oficial privind noile transferuri ale clubului
├── stire-victorie.html      # Cronică de meci dedicată unui rezultat pozitiv
└── stiri.html               # Arhiva generală cu toate noutățile și articolele publicate
