// Documentation Management Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeDocumentFiltering();
    initializeFileUpload();
    updateDocumentCounts();
});

// Initialize document filtering and search
function initializeDocumentFiltering() {
    const searchInput = document.getElementById('documentSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const deviceFilter = document.getElementById('deviceFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyDocumentFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyDocumentFilters);
    }
    
    if (deviceFilter) {
        deviceFilter.addEventListener('change', applyDocumentFilters);
    }
}

// Apply filters to document grid
function applyDocumentFilters() {
    const searchTerm = document.getElementById('documentSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const deviceFilter = document.getElementById('deviceFilter').value;
    
    const documentCards = document.querySelectorAll('.document-card');
    const emptyState = document.getElementById('emptyState');
    let visibleCount = 0;
    
    documentCards.forEach(card => {
        const documentTitle = card.querySelector('h4').textContent.toLowerCase();
        const documentCategory = card.getAttribute('data-category');
        const documentDevice = card.getAttribute('data-device');
        
        const matchesSearch = searchTerm === '' || documentTitle.includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || documentCategory === categoryFilter;
        const matchesDevice = deviceFilter === 'all' || documentDevice === deviceFilter;
        
        if (matchesSearch && matchesCategory && matchesDevice) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease-out';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide empty state
    if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// Filter documents by category
function filterDocuments(category) {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = category;
        applyDocumentFilters();
    }
}

// Initialize file upload functionality
function initializeFileUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadZone && fileInput) {
        // Click to upload
        uploadZone.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                fileInput.click();
            }
        });
        
        // Drag and drop
        uploadZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadZone.classList.add('drag-over');
        });
        
        uploadZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadZone.classList.remove('drag-over');
        });
        
        uploadZone.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            handleFileUpload(files);
        });
        
        // File input change
        fileInput.addEventListener('change', function(e) {
            handleFileUpload(e.target.files);
        });
    }
}

// Select files function
function selectFiles() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
    }
}

// Handle file upload
function handleFileUpload(files) {
    if (files.length === 0) return;
    
    const uploadZone = document.getElementById('uploadZone');
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
    
    Array.from(files).forEach(file => {
        // Validate file size
        if (file.size > maxSize) {
            createToast(`File "${file.name}" is too large. Maximum size is 10MB.`, 'error');
            return;
        }
        
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            createToast(`File type "${file.type}" is not supported.`, 'error');
            return;
        }
        
        // Simulate upload
        simulateFileUpload(file);
    });
}

// Simulate file upload with progress
function simulateFileUpload(file) {
    const uploadZone = document.getElementById('uploadZone');
    
    // Create progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.className = 'upload-progress';
    progressContainer.innerHTML = `
        <div class="progress-text">Uploading: ${file.name}</div>
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">0%</div>
    `;
    
    uploadZone.appendChild(progressContainer);
    progressContainer.style.display = 'block';
    
    const progressFill = progressContainer.querySelector('.progress-fill');
    const progressText = progressContainer.querySelectorAll('.progress-text')[1];
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random progress increment
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Complete upload
            setTimeout(() => {
                progressContainer.remove();
                addDocumentToLibrary(file);
                createToast(`"${file.name}" uploaded successfully!`, 'success');
            }, 500);
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
    }, 200);
}

// Add document to library
function addDocumentToLibrary(file) {
    const documentsGrid = document.getElementById('documentsGrid');
    const category = determineFileCategory(file);
    const device = 'general'; // In a real app, user would select this
    const documentId = generateDocumentId(file.name);
    
    const documentCard = document.createElement('div');
    documentCard.className = 'document-card';
    documentCard.setAttribute('data-category', category.type);
    documentCard.setAttribute('data-device', device);
    
    documentCard.innerHTML = `
        <div class="document-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${category.color}" stroke-width="2">
                ${category.icon}
            </svg>
        </div>
        <div class="document-content">
            <h4>${file.name}</h4>
            <p class="document-category">${category.name}</p>
            <p class="document-device">General</p>
            <p class="document-date">Uploaded: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div class="document-actions">
            <button class="btn-icon" onclick="viewDocument('${documentId}')" title="View">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
            </button>
            <button class="btn-icon" onclick="downloadDocument('${documentId}')" title="Download">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            </button>
            <button class="btn-icon danger" onclick="deleteDocument('${documentId}')" title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3,6 5,6 21,6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add with animation
    documentCard.style.opacity = '0';
    documentCard.style.transform = 'translateY(20px)';
    documentsGrid.appendChild(documentCard);
    
    setTimeout(() => {
        documentCard.style.transition = 'all 0.3s ease';
        documentCard.style.opacity = '1';
        documentCard.style.transform = 'translateY(0)';
    }, 100);
    
    updateDocumentCounts();
}

// Document actions
function viewDocument(documentId) {
    const modal = createModal('Document Viewer', `
        <div class="modal-content">
            <h3>Document Preview</h3>
            <div class="document-preview">
                <div class="preview-placeholder">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff3333" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    <h4>Document Preview</h4>
                    <p>Preview functionality would show the document content here.</p>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="downloadDocument('${documentId}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download
                </button>
                <button type="button" class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `);
    
    addDocumentPreviewStyles();
}

function downloadDocument(documentId) {
    const documentCard = document.querySelector(`[onclick*="${documentId}"]`).closest('.document-card');
    const documentName = documentCard.querySelector('h4').textContent;
    
    // Simulate download
    createToast(`Downloading "${documentName}"...`, 'info');
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
        createToast(`"${documentName}" download started`, 'success');
    }, 1000);
}

function deleteDocument(documentId) {
    const documentCard = document.querySelector(`[onclick*="${documentId}"]`).closest('.document-card');
    const documentName = documentCard.querySelector('h4').textContent;
    
    const modal = createModal('Delete Document', `
        <div class="modal-content">
            <h3>Delete "${documentName}"</h3>
            <p>Are you sure you want to delete this document? This action cannot be undone.</p>
            <div class="warning-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>This document will be permanently removed from your library.</span>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" style="background-color: #ef4444;" onclick="confirmDeleteDocument('${documentId}')">Delete Document</button>
            </div>
        </div>
    `);
}

function confirmDeleteDocument(documentId) {
    const documentCard = document.querySelector(`[onclick*="${documentId}"]`).closest('.document-card');
    const documentName = documentCard.querySelector('h4').textContent;
    
    // Remove with animation
    documentCard.style.transition = 'all 0.3s ease';
    documentCard.style.transform = 'scale(0.8)';
    documentCard.style.opacity = '0';
    
    setTimeout(() => {
        documentCard.remove();
        updateDocumentCounts();
        applyDocumentFilters(); // Reapply filters to update empty state if needed
        createToast(`"${documentName}" deleted successfully`, 'success');
    }, 300);
    
    closeModal();
}

// Update document counts in category cards
function updateDocumentCounts() {
    const documentCards = document.querySelectorAll('.document-card');
    const categories = {
        manual: 0,
        warranty: 0,
        receipt: 0,
        installation: 0
    };
    
    documentCards.forEach(card => {
        if (card.style.display !== 'none') {
            const category = card.getAttribute('data-category');
            if (categories[category] !== undefined) {
                categories[category]++;
            }
        }
    });
    
    // Update category counts
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const onclick = card.getAttribute('onclick');
        if (onclick) {
            const category = onclick.match(/'([^']+)'/)[1];
            const countElement = card.querySelector('.doc-count');
            if (countElement && categories[category] !== undefined) {
                const count = categories[category];
                countElement.textContent = `${count} document${count !== 1 ? 's' : ''}`;
            }
        }
    });
}

// Utility functions
function determineFileCategory(file) {
    const fileName = file.name.toLowerCase();
    const fileType = file.type;
    
    if (fileName.includes('manual') || fileName.includes('guide') || fileName.includes('instruction')) {
        return {
            type: 'manual',
            name: 'User Manual',
            color: '#ff3333',
            icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
        };
    }
    
    if (fileName.includes('warranty') || fileName.includes('guarantee')) {
        return {
            type: 'warranty',
            name: 'Warranty',
            color: '#22c55e',
            icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'
        };
    }
    
    if (fileName.includes('receipt') || fileName.includes('invoice') || fileName.includes('purchase')) {
        return {
            type: 'receipt',
            name: 'Receipt',
            color: '#3b82f6',
            icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="12" y1="17" x2="8" y2="17"/>'
        };
    }
    
    if (fileName.includes('install') || fileName.includes('setup') || fileName.includes('configuration')) {
        return {
            type: 'installation',
            name: 'Installation Guide',
            color: '#f59e0b',
            icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
        };
    }
    
    // Default to manual
    return {
        type: 'manual',
        name: 'Document',
        color: '#ff3333',
        icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/>'
    };
}

function generateDocumentId(fileName) {
    return fileName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
}

function addDocumentPreviewStyles() {
    if (document.getElementById('document-preview-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'document-preview-styles';
    style.textContent = `
        .document-preview {
            margin: 1rem 0;
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .preview-placeholder {
            text-align: center;
            color: var(--text-secondary);
        }
        
        .preview-placeholder h4 {
            margin: 1rem 0 0.5rem;
            color: var(--text-primary);
        }
        
        .preview-placeholder p {
            color: var(--text-muted);
        }
    `;
    
    document.head.appendChild(style);
}