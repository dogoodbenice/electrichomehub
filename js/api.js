// API Key Management functionality
document.addEventListener('DOMContentLoaded', function() {
    // Generate new API key functionality
    const generateBtn = document.getElementById('generateApiKey');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const newKey = 'ehk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            
            // Create new API key card
            const apiKeysGrid = document.querySelector('.api-keys-grid');
            const newKeyCard = document.createElement('div');
            newKeyCard.className = 'api-key-card';
            newKeyCard.innerHTML = `
                <div class="api-key-header">
                    <h3>New API Key</h3>
                    <span class="api-badge">NEW</span>
                </div>
                <div class="api-key-value">${newKey}</div>
                <div class="api-key-actions">
                    <button class="btn-secondary copy-key">Copy</button>
                    <button class="btn-danger revoke-key">Revoke</button>
                </div>
            `;
            
            apiKeysGrid.appendChild(newKeyCard);
            
            // Add event listeners to new buttons
            attachKeyCardListeners(newKeyCard);
            
            // Show success message
            showNotification('New API key generated successfully', 'success');
        });
    }
    
    // Copy and revoke functionality for existing keys
    document.querySelectorAll('.api-key-card').forEach(attachKeyCardListeners);
});

function attachKeyCardListeners(card) {
    const copyBtn = card.querySelector('.copy-key, .btn-secondary');
    const revokeBtn = card.querySelector('.revoke-key, .btn-danger');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const keyValue = card.querySelector('.api-key-value').textContent;
            navigator.clipboard.writeText(keyValue).then(() => {
                showNotification('API key copied to clipboard', 'success');
            });
        });
    }
    
    if (revokeBtn) {
        revokeBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
                card.remove();
                showNotification('API key revoked successfully', 'info');
            }
        });
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
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}