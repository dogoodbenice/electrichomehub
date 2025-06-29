// Data export functionality
document.addEventListener('DOMContentLoaded', function() {
    // Export format buttons
    document.querySelectorAll('.format-btn').forEach(button => {
        button.addEventListener('click', function() {
            const dataType = this.dataset.type;
            const format = this.dataset.format;
            handleExport(dataType, format);
        });
    });
    
    // Import functionality
    const importZone = document.getElementById('importZone');
    const importFileInput = document.getElementById('importFileInput');
    const selectImportBtn = document.getElementById('selectImportFile');
    
    if (selectImportBtn) {
        selectImportBtn.addEventListener('click', () => importFileInput.click());
    }
    
    if (importZone) {
        importZone.addEventListener('dragover', handleDragOver);
        importZone.addEventListener('drop', handleDrop);
        importZone.addEventListener('dragleave', handleDragLeave);
        importZone.addEventListener('click', () => importFileInput.click());
    }
    
    if (importFileInput) {
        importFileInput.addEventListener('change', handleImportFileSelect);
    }
    
    // Template downloads
    document.querySelectorAll('.template-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const templateName = this.textContent;
            downloadTemplate(templateName);
        });
    });
    
    // Recent export downloads
    document.querySelectorAll('.export-item .btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            const exportItem = this.closest('.export-item');
            const fileName = exportItem.querySelector('p').textContent;
            downloadRecentExport(fileName);
        });
    });
});

function handleExport(dataType, format) {
    showExportProgress(dataType, format);
    
    // Simulate export process
    setTimeout(() => {
        const fileName = generateFileName(dataType, format);
        completeExport(fileName);
        addToRecentExports(dataType, fileName);
        showNotification(`${format.toUpperCase()} export completed: ${fileName}`, 'success');
    }, 2000);
}

function showExportProgress(dataType, format) {
    const modal = createModal('Exporting Data', `
        <div class="export-progress">
            <div class="export-info">
                <h4>Preparing ${dataType} export</h4>
                <p>Format: ${format.toUpperCase()}</p>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="exportProgressFill"></div>
            </div>
            <div class="progress-text">
                <span id="exportProgressText">Gathering data...</span>
            </div>
        </div>
    `);
    
    // Simulate progress
    let progress = 0;
    const messages = [
        'Gathering data...',
        'Processing records...',
        'Formatting output...',
        'Finalizing export...'
    ];
    
    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => closeModal(), 500);
        }
        
        const progressFill = document.getElementById('exportProgressFill');
        const progressText = document.getElementById('exportProgressText');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (progressText) {
            const messageIndex = Math.min(Math.floor(progress / 25), messages.length - 1);
            progressText.textContent = messages[messageIndex];
        }
    }, 400);
}

function generateFileName(dataType, format) {
    const date = new Date().toISOString().split('T')[0];
    const typeMap = {
        'devices': 'device_inventory',
        'documents': 'documentation_archive',
        'alerts': 'alert_history',
        'complete': 'complete_backup'
    };
    
    const baseName = typeMap[dataType] || dataType;
    return `${baseName}_${date}.${format}`;
}

function completeExport(fileName) {
    // Create download link
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;
    link.textContent = `Download ${fileName}`;
    link.style.display = 'none';
    
    // Simulate download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function addToRecentExports(dataType, fileName) {
    const recentExports = document.querySelector('.exports-list');
    const now = new Date();
    
    const exportTypeMap = {
        'devices': 'Device Inventory Export',
        'documents': 'Documentation Archive',
        'alerts': 'Alert History Report',
        'complete': 'Complete Backup'
    };
    
    const exportItem = document.createElement('div');
    exportItem.className = 'export-item';
    exportItem.innerHTML = `
        <div class="export-info">
            <h4>${exportTypeMap[dataType] || 'Data Export'}</h4>
            <p>${fileName}</p>
            <span class="export-date">${now.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</span>
        </div>
        <button class="btn-secondary">Download</button>
    `;
    
    // Add event listener to new download button
    exportItem.querySelector('.btn-secondary').addEventListener('click', function() {
        downloadRecentExport(fileName);
    });
    
    recentExports.insertBefore(exportItem, recentExports.firstChild);
    
    // Keep only 5 most recent exports
    const exportItems = recentExports.querySelectorAll('.export-item');
    if (exportItems.length > 5) {
        exportItems[exportItems.length - 1].remove();
    }
}

function downloadRecentExport(fileName) {
    showNotification(`Downloading ${fileName}...`, 'info');
}

function downloadTemplate(templateName) {
    const templates = {
        'Device Import Template (CSV)': 'device_import_template.csv',
        'Document Metadata Template (CSV)': 'document_metadata_template.csv',
        'Import Format Guide (PDF)': 'import_format_guide.pdf'
    };
    
    const fileName = templates[templateName] || 'template.csv';
    showNotification(`Downloading ${fileName}...`, 'info');
}

// Import functionality
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
    processImportFiles(files);
}

function handleImportFileSelect(e) {
    const files = Array.from(e.target.files);
    processImportFiles(files);
}

function processImportFiles(files) {
    files.forEach(file => {
        if (isValidImportFile(file)) {
            simulateImport(file);
        } else {
            showNotification(`Invalid file type: ${file.name}`, 'error');
        }
    });
}

function isValidImportFile(file) {
    const allowedTypes = [
        'text/csv',
        'application/json',
        'application/zip'
    ];
    return allowedTypes.includes(file.type) || file.name.endsWith('.csv');
}

function simulateImport(file) {
    const modal = createModal('Importing Data', `
        <div class="import-progress">
            <div class="import-info">
                <h4>Processing ${file.name}</h4>
                <p>Size: ${formatFileSize(file.size)}</p>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" id="importProgressFill"></div>
            </div>
            <div class="progress-text">
                <span id="importProgressText">Validating file format...</span>
            </div>
        </div>
    `);
    
    // Simulate import progress
    let progress = 0;
    const messages = [
        'Validating file format...',
        'Parsing data records...',
        'Checking for duplicates...',
        'Importing records...',
        'Finalizing import...'
    ];
    
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                closeModal();
                showNotification(`Successfully imported ${file.name}`, 'success');
            }, 500);
        }
        
        const progressFill = document.getElementById('importProgressFill');
        const progressText = document.getElementById('importProgressText');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (progressText) {
            const messageIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
            progressText.textContent = messages[messageIndex];
        }
    }, 500);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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