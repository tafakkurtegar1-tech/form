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

    // 1. Validasi Input (Hanya memastikan tidak ada yang kosong)
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

// FUNGSI HAPUS SATU per SATU (DELETE)

/**
 * Fungsi untuk menghapus data berdasarkan index.
 */
function deleteEntry(index) {
    if (!confirm("Are you sure you want to delete this CONTACT #" + (index + 1) + "?")) {
        return; 
    }
    
    let storedData = getStoredData();

    // Hapus satu elemen pada index yang diberikan
    storedData.splice(index, 1); 

    // Simpan kembali data yang sudah diperbarui
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

    // Perbarui tampilan di list.html
    displayStoredEntries();
}

// FUNGSI HAPUS SEMUA DATA (CLEAR)

/**
 * Fungsi untuk menghapus semua kontak yang tersimpan di localStorage.
 */
function clearAllStoredData() {
    if (confirm("Are you sure you want to DELETE all saved CONTACTS?")) {
        localStorage.removeItem(STORAGE_KEY);
        alert("All saved contacts have been deleted!");
        displayStoredEntries(); 
    }
}
