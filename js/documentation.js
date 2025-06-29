// Documentation management functionality
document.addEventListener('DOMContentLoaded', function() {
    // File upload functionality
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const selectFilesBtn = document.getElementById('selectFiles');
    
    if (selectFilesBtn) {
        selectFilesBtn.addEventListener('click', () => fileInput.click());
    }
    
    if (uploadZone) {
        // Drag and drop functionality
        uploadZone.addEventListener('dragover', handleDragOver);
        uploadZone.addEventListener('drop', handleDrop);
        uploadZone.addEventListener('dragleave', handleDragLeave);
        uploadZone.addEventListener('click', () => fileInput.click());
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterDocuments(this.dataset.category);
        });
    });
    
    // Document actions
    attachDocumentListeners();
});

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
}

function processFiles(files) {
    files.forEach(file => {
        if (isValidFileType(file)) {
            simulateFileUpload(file);
        } else {
            showNotification(`File type not supported: ${file.name}`, 'error');
        }
    });
}

function isValidFileType(file) {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/jpg',
        'image/png'
    ];
    return allowedTypes.includes(file.type);
}

function simulateFileUpload(file) {
    // Show upload progress
    const progressModal = createUploadProgress(file.name);
    
    // Simulate upload with progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Complete upload and add to documents
            setTimeout(() => {
                closeModal();
                addDocumentToLibrary(file);
                showNotification(`${file.name} uploaded successfully`, 'success');
            }, 500);
        }
        updateProgress(progress);
    }, 300);
}

function createUploadProgress(fileName) {
    return createModal('Uploading Document', `
        <div class="upload-progress">
            <div class="upload-file-info">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                </svg>
                <span class="file-name">${fileName}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <div class="progress-text">
                <span id="progressText">0%</span>
            </div>
        </div>
    `);
}

function updateProgress(progress) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`;
    }
}

function addDocumentToLibrary(file) {
    const documentsGrid = document.getElementById('documentsGrid');
    const fileType = getFileType(file);
    const category = determineCategory(file.name);
    
    const documentCard = document.createElement('div');
    documentCard.className = 'document-card';
    documentCard.dataset.category = category;
    
    documentCard.innerHTML = `
        <div class="document-icon">
            ${getDocumentIcon(fileType)}
        </div>
        <div class="document-info">
            <h3>${file.name.replace(/\.[^/.]+$/, "")}</h3>
            <p class="document-device">Unassigned Device</p>
            <p class="document-type">${category} • ${fileType.toUpperCase()} • ${formatFileSize(file.size)}</p>
            <p class="document-date">Uploaded: ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            })}</p>
        </div>
        <div class="document-actions">
            <button class="btn-icon" title="View">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
            </button>
            <button class="btn-icon" title="Download">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            </button>
            <button class="btn-icon" title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3,6 5,6 21,6"/>
                    <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                </svg>
            </button>
        </div>
    `;
    
    documentsGrid.appendChild(documentCard);
    attachDocumentListeners();
    updateDocumentStats();
}

function getFileType(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    return extension;
}

function determineCategory(fileName) {
    const name = fileName.toLowerCase();
    if (name.includes('manual') || name.includes('guide') || name.includes('instruction')) {
        return 'Manual';
    } else if (name.includes('warranty') || name.includes('guarantee')) {
        return 'Warranty';
    } else if (name.includes('receipt') || name.includes('invoice') || name.includes('purchase')) {
        return 'Receipt';
    } else if (name.includes('certificate') || name.includes('certification')) {
        return 'Certificate';
    }
    return 'Manual'; // Default category
}

function getDocumentIcon(fileType) {
    if (fileType === 'pdf') {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
        </svg>`;
    } else if (['jpg', 'jpeg', 'png'].includes(fileType)) {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
        </svg>`;
    } else {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
        </svg>`;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function filterDocuments(category) {
    const documents = document.querySelectorAll('.document-card');
    
    documents.forEach(doc => {
        const docCategory = doc.dataset.category;
        if (!category || docCategory === category) {
            doc.style.display = 'block';
        } else {
            doc.style.display = 'none';
        }
    });
}

function attachDocumentListeners() {
    document.querySelectorAll('.document-card .btn-icon').forEach(button => {
        const title = button.getAttribute('title');
        
        if (title === 'View') {
            button.addEventListener('click', function() {
                const documentCard = button.closest('.document-card');
                viewDocument(documentCard);
            });
        } else if (title === 'Download') {
            button.addEventListener('click', function() {
                const documentCard = button.closest('.document-card');
                downloadDocument(documentCard);
            });
        } else if (title === 'Delete') {
            button.addEventListener('click', function() {
                const documentCard = button.closest('.document-card');
                deleteDocument(documentCard);
            });
        }
    });
}

function viewDocument(documentCard) {
    const documentName = documentCard.querySelector('h3').textContent;
    showNotification(`Opening ${documentName}...`, 'info');
}

function downloadDocument(documentCard) {
    const documentName = documentCard.querySelector('h3').textContent;
    showNotification(`Downloading ${documentName}...`, 'info');
}

function deleteDocument(documentCard) {
    const documentName = documentCard.querySelector('h3').textContent;
    
    if (confirm(`Are you sure you want to delete "${documentName}"? This action cannot be undone.`)) {
        documentCard.remove();
        updateDocumentStats();
        showNotification('Document deleted successfully', 'info');
    }
}

function updateDocumentStats() {
    const documents = document.querySelectorAll('.document-card');
    const totalDocuments = documents.length;
    
    // Count by category
    const counts = {
        total: totalDocuments,
        Manual: 0,
        Warranty: 0,
        Receipt: 0,
        Certificate: 0
    };
    
    documents.forEach(doc => {
        const category = doc.dataset.category;
        if (counts.hasOwnProperty(category)) {
            counts[category]++;
        }
    });
    
    // Update stats display
    const statItems = document.querySelectorAll('.document-stats .stat-item');
    const statLabels = ['Total Documents', 'Manuals', 'Warranties', 'Receipts'];
    const statValues = [counts.total, counts.Manual, counts.Warranty, counts.Receipt];
    
    statItems.forEach((item, index) => {
        const numberEl = item.querySelector('.stat-number');
        if (numberEl && statValues[index] !== undefined) {
            numberEl.textContent = statValues[index];
        }
    });
}

// Utility functions
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#0369a1'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}