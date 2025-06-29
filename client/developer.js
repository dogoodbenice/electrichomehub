// Developer API Page Functionality

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Create API Key functionality
function createApiKey() {
    const modal = createModal('Create API Key', `
        <div class="modal-content">
            <h3>Generate New API Key</h3>
            <form id="apiKeyForm">
                <div class="form-group">
                    <label for="keyName">Key Name</label>
                    <input type="text" id="keyName" placeholder="e.g., Production Key" required>
                </div>
                <div class="form-group">
                    <label for="keyType">Key Type</label>
                    <select id="keyType" required>
                        <option value="production">Production</option>
                        <option value="development">Development</option>
                        <option value="testing">Testing</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">Generate Key</button>
                </div>
            </form>
        </div>
    `);
    
    document.getElementById('apiKeyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const keyName = document.getElementById('keyName').value;
        const keyType = document.getElementById('keyType').value;
        
        // Generate a mock API key
        const apiKey = generateMockApiKey(keyType);
        
        // Add to the API keys list
        addApiKeyToList(keyName, apiKey, keyType);
        
        // Show success message
        createToast(`API Key "${keyName}" created successfully!`, 'success');
        
        closeModal();
    });
}

// Generate new key functionality
function generateNewKey() {
    createApiKey();
}

// Download SDK functionality
function downloadSdk(language) {
    const sdkInfo = {
        javascript: {
            name: 'JavaScript SDK',
            command: 'npm install @electric-home/sdk',
            docs: 'https://docs.electric-home.dev/sdk/javascript'
        },
        python: {
            name: 'Python SDK',
            command: 'pip install electric-home-sdk',
            docs: 'https://docs.electric-home.dev/sdk/python'
        },
        go: {
            name: 'Go SDK',
            command: 'go get github.com/electric-home/sdk',
            docs: 'https://docs.electric-home.dev/sdk/go'
        }
    };
    
    const sdk = sdkInfo[language];
    if (sdk) {
        const modal = createModal(`Download ${sdk.name}`, `
            <div class="modal-content">
                <h3>${sdk.name}</h3>
                <p>Install the SDK using your package manager:</p>
                <div class="code-block">
                    <pre><code>${sdk.command}</code></pre>
                </div>
                <p>For complete documentation and examples, visit:</p>
                <a href="${sdk.docs}" target="_blank" class="btn btn-outline">
                    View Documentation
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15,3 21,3 21,9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </a>
                <div class="form-actions">
                    <button type="button" class="btn btn-primary" onclick="closeModal()">Close</button>
                </div>
            </div>
        `);
        
        createToast(`${sdk.name} installation guide opened`, 'info');
    }
}

// Copy API Key functionality
function copyApiKey(key) {
    // Remove the masked part and show the full key for demo
    const fullKey = key + 'abcdef1234567890';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(fullKey).then(() => {
            createToast('API key copied to clipboard!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = fullKey;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        createToast('API key copied to clipboard!', 'success');
    }
}

// Delete API Key functionality
function deleteApiKey(keyId) {
    const modal = createModal('Delete API Key', `
        <div class="modal-content">
            <h3>Delete API Key</h3>
            <p>Are you sure you want to delete this API key? This action cannot be undone.</p>
            <div class="warning-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>Applications using this key will immediately lose access to the API.</span>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" style="background-color: #ef4444;" onclick="confirmDeleteApiKey('${keyId}')">Delete Key</button>
            </div>
        </div>
    `);
}

// Confirm delete API key
function confirmDeleteApiKey(keyId) {
    // Find and remove the API key card
    const apiKeyCards = document.querySelectorAll('.api-key-card');
    apiKeyCards.forEach(card => {
        const deleteButton = card.querySelector('.btn-icon.danger');
        if (deleteButton && deleteButton.getAttribute('onclick').includes(keyId)) {
            card.remove();
        }
    });
    
    createToast('API key deleted successfully', 'success');
    closeModal();
}

// View documentation functionality
function viewDocumentation() {
    window.open('documentation.html', '_blank');
}

// Utility functions
function generateMockApiKey(type) {
    const prefix = type === 'production' ? 'ehub_pk_' : 'ehub_sk_';
    const randomPart = Math.random().toString(36).substring(2, 18);
    return prefix + randomPart;
}

function addApiKeyToList(name, key, type) {
    const apiKeysList = document.getElementById('apiKeysList');
    const maskedKey = key.substring(0, 20) + '•••••••••••••••••';
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    const keyCard = document.createElement('div');
    keyCard.className = 'api-key-card';
    keyCard.innerHTML = `
        <div class="key-info">
            <h4>${name}</h4>
            <p class="key-value">${maskedKey}</p>
            <span class="key-created">Created: ${currentDate}</span>
        </div>
        <div class="key-actions">
            <button class="btn-icon" onclick="copyApiKey('${key}')" title="Copy">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
            </button>
            <button class="btn-icon danger" onclick="deleteApiKey('${type}-${Date.now()}')" title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3,6 5,6 21,6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add animation
    keyCard.style.opacity = '0';
    keyCard.style.transform = 'translateY(20px)';
    apiKeysList.appendChild(keyCard);
    
    // Animate in
    setTimeout(() => {
        keyCard.style.transition = 'all 0.3s ease';
        keyCard.style.opacity = '1';
        keyCard.style.transform = 'translateY(0)';
    }, 100);
}

// Modal functionality
function createModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.getElementById('modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener to close modal when clicking overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add modal styles
    addModalStyles();
    
    return modal;
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 200);
    }
}

function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 1;
            transition: opacity 0.2s ease;
        }
        
        .modal-dialog {
            background-color: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .modal-header {
            padding: 1.5rem 1.5rem 0 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            color: var(--text-primary);
        }
        
        .modal-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 6px;
            transition: all 0.2s;
        }
        
        .modal-close:hover {
            color: var(--brand-red);
            background-color: rgba(255, 51, 51, 0.1);
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modal-content h3 {
            margin-bottom: 1rem;
            color: var(--brand-red);
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 0.75rem;
            background-color: var(--background);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 0.9rem;
        }
        
        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--brand-red);
        }
        
        .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 1.5rem;
        }
        
        .warning-box {
            background-color: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: #ef4444;
        }
        
        .warning-box span {
            font-size: 0.9rem;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize developer page functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add syntax highlighting to code blocks
    const codeBlocks = document.querySelectorAll('.code-block pre code');
    codeBlocks.forEach(block => {
        // Simple JSON syntax highlighting
        const content = block.textContent;
        if (content.trim().startsWith('{')) {
            block.innerHTML = highlightJSON(content);
        }
    });
    
    // Add copy buttons to code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-btn';
        copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
        `;
        copyButton.onclick = () => {
            const code = block.querySelector('pre code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                createToast('Code copied to clipboard!', 'success');
            });
        };
        
        block.style.position = 'relative';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--background);
            border: 1px solid var(--border);
            border-radius: 4px;
            padding: 0.25rem;
            cursor: pointer;
            color: var(--text-secondary);
            opacity: 0.7;
            transition: all 0.2s;
        `;
        
        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
            copyButton.style.borderColor = 'var(--brand-red)';
        });
        
        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0.7';
            copyButton.style.borderColor = 'var(--border)';
        });
        
        block.appendChild(copyButton);
    });
});

// Simple JSON syntax highlighting
function highlightJSON(json) {
    return json
        .replace(/(".*?")/g, '<span style="color: #22c55e;">$1</span>')
        .replace(/(\b\d+\b)/g, '<span style="color: #3b82f6;">$1</span>')
        .replace(/(\btrue\b|\bfalse\b|\bnull\b)/g, '<span style="color: #f59e0b;">$1</span>')
        .replace(/([{}[\],])/g, '<span style="color: var(--text-secondary);">$1</span>');
}