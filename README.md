Acest proiect reprezintă o platformă web modernă și performantă dedicată clubului de handbal **Universitatea Cluj**. Site-ul a fost dezvoltat pentru a oferi o experiență digitală completă fanilor, facilitând accesul la noutăți, programul meciurilor, lotul jucătorilor și achiziția de bilete.

---

### **🚀 Funcționalități Principale**
*   **Arhitectură Modulară:** Separarea completă a structurii (HTML) de design (CSS) și logica de funcționare (JavaScript) pentru o mentenanță ușoară.
*   **Design Responsive:** Interfața este optimizată pentru orice dispozitiv (Mobile, Tablet, Desktop) utilizând sistemul de grid Bootstrap 5[cite: 1].
*   **Managementul Echipelor:** Secțiuni detaliate pentru echipa masculină și feminină, cu profiluri pentru jucători și staff tehnic[cite: 1, 4].
*   **Sistem de Ticketing:** Pagină dedicată pentru rezervarea biletelor cu formulare integrate[cite: 2].
*   **Centru de Știri:** Arhivă de articole cu design tip editorial pentru noutăți și transferuri[cite: 4, 10].
*   **Integrare Google Maps:** Localizare precisă pentru Sala Sporturilor "Horia Demian" în pagina de contact[cite: 3].

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
│   └── style.css          # Fișier centralizat pentru toate stilurile site-ului
├── /js
│   └── main.js           # Logică JavaScript pentru formulare și interacțiuni
├── /imagini              # Resurse media optimizate (jucători, meciuri, bannere)
├── index.html            # Pagina principală (Landing Page)
├── stiri.html            # Arhiva de noutăți
├── meciuri.html          # Programul și rezultatele competiționale
├── lot.html              # Prezentarea echipelor (Masculin/Feminin)
├── clasament.html        # Pozițiile în Liga Națională
├── bilete.html           # Platforma de achiziție tichete
└── contact.html          # Formular de suport și localizare hartă
