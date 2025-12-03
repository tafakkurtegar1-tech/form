// --- Constanta Data  ---
const STORAGE_KEY = 'contactList';
let contacts = [];

// ----------------------------------------------------------------------
// --- 1. FUNGSI DASAR (CRUD INTI) ---
// ----------------------------------------------------------------------

/**
 * Memuat data kontak DARI LOCAL STORAGE.
 */
function loadContacts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        contacts = JSON.parse(data);
    } else {
        contacts = [];
    }
}

/**
 * Menyimpan array 'contacts' saat ini ke Local Storage.
 */
function saveContacts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

/**
 * Menambah kontak baru ke array dan menyimpannya.
 */
function addContact(newContact) {
    const contactWithId = {
        id: Date.now(), // ID unik untuk setiap kontak
        ...newContact
    };

    contacts.push(contactWithId);
    saveContacts();
}

/**
 * Mengubah kontak yang sudah ada berdasarkan ID.
 */
function editContact(id, updatedData) {
    const index = contacts.findIndex(contact => contact.id === id);

    if (index !== -1) {
        contacts[index] = { ...contacts[index], ...updatedData };
        saveContacts();
        return true;
    }
    return false;
}

/**
 * Menghapus kontak dari array berdasarkan ID.
 */
function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    saveContacts();
}

/**
 * Fungsi pembantu untuk mengosongkan form
 */
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telephone').value = '';
    document.getElementById('origin_city').value = '';
    document.getElementById('message').value = '';
}


// ----------------------------------------------------------------------
// --- 2. FUNGSI UNTUK HALAMAN ADD (add.html) ---
// ----------------------------------------------------------------------

/**
 * Handler submit form di add.html.
 * Menyimpan data, menampilkan alert, dan mengosongkan form.
 */
function submitform(event) {
    event.preventDefault();
    loadContacts();

    // Mengambil nilai dari input form
    const newContact = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        originCity: document.getElementById('origin_city').value,
        message: document.getElementById('message').value
    };

    addContact(newContact);

    alert(`Kontak ${newContact.name} berhasil disimpan!`);

    clearForm();
}


// ----------------------------------------------------------------------
// --- 3. FUNGSI UNTUK HALAMAN EDIT (edit.html) ---
// ----------------------------------------------------------------------

/**
 * Memuat data kontak spesifik dari Local Storage dan mengisi form edit.
 */
function loadContactForEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = parseInt(urlParams.get('id'));
    const editForm = document.getElementById('edit-form');

    if (isNaN(contactId) || !editForm) {
        return;
    }

    loadContacts();
    const contact = contacts.find(c => c.id === contactId);

    if (contact) {
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('telephone').value = contact.telephone;
        document.getElementById('origin_city').value = contact.originCity;
        document.getElementById('message').value = contact.message;

        editForm.dataset.contactId = contactId;
    } else {
        alert("Kontak tidak ditemukan.");
        window.location.href = 'list.html';
    }
}

/**
 * Handler submit form di edit.html untuk menyimpan perubahan.
 */
function saveEditedContact(event) {
    event.preventDefault();

    const editForm = document.getElementById('edit-form');
    const contactId = parseInt(editForm.dataset.contactId);

    if (isNaN(contactId)) {
        alert("Error: ID kontak hilang. Tidak dapat menyimpan.");
        return;
    }

    const updatedData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        originCity: document.getElementById('origin_city').value,
        message: document.getElementById('message').value
    };

    if (editContact(contactId, updatedData)) {
        alert(`Kontak ${updatedData.name} berhasil diperbarui!`);
        // Redirect setelah edit tetap diperlukan agar daftar terupdate
        window.location.href = 'list.html';
    } else {
        alert("Gagal memperbarui kontak. ID tidak ditemukan.");
    }
}


// ----------------------------------------------------------------------
// --- 4. FUNGSI UNTUK HALAMAN LIST (list.html) ---
// ----------------------------------------------------------------------

  function displayStoredEntries() {
    loadContacts();

    const container = document.getElementById('stored-data-list');
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';

    if (!container) return;

    // 1. Filter Kontak
    const filteredContacts = contacts.filter(contact => {
        // Gabungkan semua field untuk pencarian
        const searchPool = `${contact.name} ${contact.email} ${contact.originCity} ${contact.message}`.toLowerCase();
        return searchPool.includes(searchTerm);
    });

    // 2. Buat Tampilan Grid menggunakan LOOP (forEach)
    container.innerHTML = '';

    if (filteredContacts.length === 0) {
        container.innerHTML = `<p class="text-center text-custom-dark-text mt-4">${searchTerm ? 'Tidak ada kontak yang cocok dengan pencarian Anda.' : 'Daftar kontak masih kosong.'}</p>`;
        container.className = '';
        return;
    }

    container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4';

    // Loop dimulai di sini
    filteredContacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.className = 'p-4 border border-custom-border rounded-lg bg-white/70 shadow-lg flex flex-col justify-between';

        contactCard.innerHTML = `
            <div>
                <h4 class="text-xl font-bold text-custom-dark-text mb-2">${contact.name}</h4>
                <p class="text-sm text-gray-700">✉️ ${contact.email}</p>
                <p class="text-sm text-gray-700">📞 ${contact.telephone}</p>
                <p class="text-sm text-gray-700">📍 ${contact.originCity}</p>
                <p class="text-xs mt-2 italic text-gray-600 border-t pt-2 mt-2">
                    Pesan: ${contact.message.substring(0, 80)}${contact.message.length > 80 ? '...' : ''}
                </p>
            </div>
            <div class="flex space-x-2 mt-4">
                <button onclick="window.location.href='edit.html?id=${contact.id}'"
                        class="flex-1 py-2 px-3 bg-custom-border text-custom-dark-text text-sm rounded-md hover:opacity-80 transition duration-150">
                    ✏️ Edit
                </button>
                <button onclick="confirmDelete(${contact.id})"
                        class="flex-1 py-2 px-3 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition duration-150">
                    🗑️ Hapus
                </button>
            </div>
        `;
        container.appendChild(contactCard);
    });
}

/**
 * Fungsi pembantu untuk mengkonfirmasi dan menjalankan penghapusan.
 */
function confirmDelete(id) {
    const contactToDelete = contacts.find(c => c.id === id);
    const contactName = contactToDelete ? contactToDelete.name : 'Kontak Ini';

    if (confirm(`Apakah Anda yakin ingin menghapus kontak: ${contactName}?`)) {
        deleteContact(id);
        displayStoredEntries();
    }
}


// ----------------------------------------------------------------------
// --- 5. FUNGSI DOM ---
// ----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    loadContacts();

    if (document.getElementById('edit-form')) {
        loadContactForEdit();
    }

    else if (document.getElementById('stored-data-list')) {
        displayStoredEntries();
    }
});



