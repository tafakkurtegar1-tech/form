// KONFIGURASI LOCAL STORAGE

const STORAGE_KEY = 'formDataEntries';

// FUNGSI UTAMA UNTUK MENGAMBIL DATA

/**
 * Mengambil data yang tersimpan dari LocalStorage.
 */
function getStoredData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading localStorage:", e);
        return [];
    }
}

// FUNGSI SUBMIT (CREATE/TAMBAH DATA)

/**
 * add.html untuk menyimpan kontak.
 */
function submitform(event) {
    event.preventDefault(); 

    // Nilai input dari add.html
    const nameInput = document.getElementById('name').value.trim(); 
    const emailInput = document.getElementById('email').value.trim();
    const telephoneInput = document.getElementById('telephone').value.trim();
    const originCityInput = document.getElementById('origin_city').value.trim();
    const messageInput = document.getElementById('message').value.trim();
    
    let isValid = true; 

    // 1. Validasi Input
    if (nameInput === "") {
        alert("Peringatan: Nama harus diisi.");
        isValid = false; 
    } else if (emailInput === "") {
        alert("Peringatan: Email harus diisi.");
        isValid = false;
    } else if (telephoneInput === "") {
        alert("Peringatan: Telepon harus diisi.");
        isValid = false;
    } else if (originCityInput === "") {
        alert("Peringatan: Kota Asal harus diisi.");
        isValid = false;
    } else if (messageInput === "") {
        alert("Peringatan: Pesan harus diisi.");
        isValid = false;
    } 
    
    if (isValid === true) { 
        
        // 2. Objek Data Baru
        const newEntry = {
            name: nameInput,
            email: emailInput,
            telephone: telephoneInput,
            originCity: originCityInput,
            message: messageInput,
            submittedAt: new Date().toLocaleString('id-ID')
        };

        // 3. Ambil dan Tambahkan Data (TANPA BATASAN)
        let storedData = getStoredData();
    
        storedData.unshift(newEntry);

        // Simpan yang sudah diperbarui kembali ke localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

        // 4. Feedback dan Reset Form
        document.getElementById('contacform').reset();
        alert(`Contact saved successfully! Total saved: ${storedData.length}`);
        
    }
}

