// Issue monitoring functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mark all as read functionality
    const markAllReadBtn = document.getElementById('markAllRead');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllAlertsAsRead);
    }
    
    // Individual mark as read buttons
    document.querySelectorAll('.mark-read').forEach(button => {
        button.addEventListener('click', function() {
            const alertCard = button.closest('.alert-card');
            markAlertAsRead(alertCard);
        });
    });
    
    // Toggle switches for settings
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingItem = this.closest('.setting-item');
            const settingName = settingItem.querySelector('h3').textContent;
            const isEnabled = this.checked;
            
            showNotification(
                `${settingName} ${isEnabled ? 'enabled' : 'disabled'}`,
                'info'
            );
        });
    });
    
    // Action buttons
    document.querySelectorAll('.alert-actions .btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            const alertCard = button.closest('.alert-card');
            const alertTitle = alertCard.querySelector('h3').textContent;
            const buttonText = button.textContent;
            
            handleAlertAction(alertTitle, buttonText);
        });
    });
});

function markAllAlertsAsRead() {
    const unreadAlerts = document.querySelectorAll('.alert-card.unread');
    
    unreadAlerts.forEach(alert => {
        markAlertAsRead(alert);
    });
    
    updateAlertSummary();
    showNotification('All alerts marked as read', 'success');
}

function markAlertAsRead(alertCard) {
    alertCard.classList.remove('unread');
    alertCard.classList.add('read');
    
    // Update mark as read button
    const markReadBtn = alertCard.querySelector('.mark-read');
    if (markReadBtn) {
        markReadBtn.style.display = 'none';
    }
    
    updateAlertSummary();
}

function updateAlertSummary() {
    const alerts = document.querySelectorAll('.alert-card');
    const unreadAlerts = document.querySelectorAll('.alert-card.unread');
    
    // Count by severity
    const counts = {
        critical: 0,
        warning: 0,
        info: 0
    };
    
    unreadAlerts.forEach(alert => {
        const severity = alert.dataset.severity;
        if (counts.hasOwnProperty(severity)) {
            counts[severity]++;
        }
    });
    
    // Update summary cards
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach(card => {
        const number = card.querySelector('.summary-number');
        const label = card.querySelector('.summary-label');
        
        if (card.classList.contains('critical')) {
            number.textContent = counts.critical;
            label.textContent = counts.critical === 1 ? 'Critical Alert' : 'Critical Alerts';
        } else if (card.classList.contains('warning')) {
            number.textContent = counts.warning;
            label.textContent = counts.warning === 1 ? 'Warning' : 'Warnings';
        } else if (card.classList.contains('info')) {
            number.textContent = counts.info;
            label.textContent = counts.info === 1 ? 'Update Available' : 'Updates Available';
        }
    });
}

function handleAlertAction(alertTitle, actionText) {
    const actions = {
        'View Details': () => showNotification('Opening detailed alert information...', 'info'),
        'Extend Warranty': () => showNotification('Redirecting to warranty extension options...', 'info'),
        'Update Now': () => showNotification('Starting firmware update process...', 'info'),
        'View Service Plans': () => showNotification('Loading available service plans...', 'info'),
        'View Report': () => showNotification('Opening energy efficiency report...', 'info'),
        'Download Update': () => showNotification('Downloading app update...', 'info')
    };
    
    if (actions[actionText]) {
        actions[actionText]();
    } else {
        showNotification(`Executing: ${actionText}`, 'info');
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