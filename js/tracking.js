// Device tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchDevices');
    const devicesGrid = document.getElementById('devicesGrid');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterDevices);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterDevices);
    }
    
    // Add device functionality
    const addDeviceBtn = document.getElementById('addDevice');
    if (addDeviceBtn) {
        addDeviceBtn.addEventListener('click', showAddDeviceModal);
    }
    
    // Device action buttons
    attachDeviceListeners();
});

function filterDevices() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchDevices');
    const devices = document.querySelectorAll('.device-card');
    
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    devices.forEach(device => {
        const category = device.dataset.category || '';
        const deviceName = device.querySelector('h3').textContent.toLowerCase();
        const deviceModel = device.querySelector('.device-model').textContent.toLowerCase();
        
        const matchesCategory = !selectedCategory || category === selectedCategory;
        const matchesSearch = !searchTerm || 
            deviceName.includes(searchTerm) || 
            deviceModel.includes(searchTerm);
        
        if (matchesCategory && matchesSearch) {
            device.style.display = 'block';
        } else {
            device.style.display = 'none';
        }
    });
}

function attachDeviceListeners() {
    // Edit buttons
    document.querySelectorAll('.device-card .btn-icon').forEach(button => {
        if (button.title === 'Edit') {
            button.addEventListener('click', function() {
                const deviceCard = button.closest('.device-card');
                editDevice(deviceCard);
            });
        } else if (button.title === 'Delete') {
            button.addEventListener('click', function() {
                const deviceCard = button.closest('.device-card');
                deleteDevice(deviceCard);
            });
        }
    });
}

function showAddDeviceModal() {
    const modal = createModal('Add New Device', `
        <form id="deviceForm" class="device-form">
            <div class="form-group">
                <label for="deviceName">Device Name</label>
                <input type="text" id="deviceName" name="name" required>
            </div>
            
            <div class="form-group">
                <label for="deviceManufacturer">Manufacturer</label>
                <input type="text" id="deviceManufacturer" name="manufacturer" required>
            </div>
            
            <div class="form-group">
                <label for="deviceModel">Model</label>
                <input type="text" id="deviceModel" name="model" required>
            </div>
            
            <div class="form-group">
                <label for="deviceCategory">Category</label>
                <select id="deviceCategory" name="category" required>
                    <option value="">Select Category</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Security">Security</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="deviceLocation">Location</label>
                <input type="text" id="deviceLocation" name="location">
            </div>
            
            <div class="form-group">
                <label for="warrantyExpiry">Warranty Expiry</label>
                <input type="date" id="warrantyExpiry" name="warrantyExpiry">
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Add Device</button>
            </div>
        </form>
    `);
    
    // Handle form submission
    const form = document.getElementById('deviceForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const deviceData = Object.fromEntries(formData);
        addDeviceToGrid(deviceData);
        closeModal();
    });
}

function editDevice(deviceCard) {
    const deviceName = deviceCard.querySelector('h3').textContent;
    const deviceModel = deviceCard.querySelector('.device-model').textContent;
    const deviceLocation = deviceCard.querySelector('.device-location').textContent;
    
    const modal = createModal('Edit Device', `
        <form id="editDeviceForm" class="device-form">
            <div class="form-group">
                <label for="editDeviceName">Device Name</label>
                <input type="text" id="editDeviceName" name="name" value="${deviceName}" required>
            </div>
            
            <div class="form-group">
                <label for="editDeviceModel">Model</label>
                <input type="text" id="editDeviceModel" name="model" value="${deviceModel}" required>
            </div>
            
            <div class="form-group">
                <label for="editDeviceLocation">Location</label>
                <input type="text" id="editDeviceLocation" name="location" value="${deviceLocation}">
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Save Changes</button>
            </div>
        </form>
    `);
    
    // Handle form submission
    const form = document.getElementById('editDeviceForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const deviceData = Object.fromEntries(formData);
        updateDeviceCard(deviceCard, deviceData);
        closeModal();
    });
}

function deleteDevice(deviceCard) {
    const deviceName = deviceCard.querySelector('h3').textContent;
    
    if (confirm(`Are you sure you want to delete "${deviceName}"? This action cannot be undone.`)) {
        deviceCard.remove();
        updateStats();
        showNotification('Device deleted successfully', 'info');
    }
}

function addDeviceToGrid(deviceData) {
    const devicesGrid = document.getElementById('devicesGrid');
    const deviceIcon = getDeviceIcon(deviceData.category);
    
    const deviceCard = document.createElement('div');
    deviceCard.className = 'device-card';
    deviceCard.dataset.category = deviceData.category;
    
    deviceCard.innerHTML = `
        <div class="device-icon">${deviceIcon}</div>
        <div class="device-info">
            <h3>${deviceData.name}</h3>
            <p class="device-model">${deviceData.manufacturer} ${deviceData.model}</p>
            <p class="device-location">${deviceData.location || 'Not specified'}</p>
        </div>
        <div class="device-status">
            <span class="warranty-badge active">Active Warranty</span>
            <span class="warranty-date">Expires: ${formatDate(deviceData.warrantyExpiry)}</span>
        </div>
        <div class="device-actions">
            <button class="btn-icon" title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
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
    
    devicesGrid.appendChild(deviceCard);
    attachDeviceListeners();
    updateStats();
    showNotification('Device added successfully', 'success');
}

function updateDeviceCard(deviceCard, deviceData) {
    deviceCard.querySelector('h3').textContent = deviceData.name;
    deviceCard.querySelector('.device-model').textContent = deviceData.model;
    deviceCard.querySelector('.device-location').textContent = deviceData.location || 'Not specified';
    
    showNotification('Device updated successfully', 'success');
}

function getDeviceIcon(category) {
    const icons = {
        'Appliances': '🏠',
        'Smart Home': '🌡️',
        'Security': '📹',
        'Entertainment': '📺'
    };
    return icons[category] || '⚡';
}

function formatDate(dateString) {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
    });
}

function updateStats() {
    const devices = document.querySelectorAll('.device-card');
    const totalDevices = devices.length;
    
    // Update stat display if it exists
    const totalStat = document.querySelector('.stat-item .stat-number');
    if (totalStat) {
        totalStat.textContent = totalDevices;
    }
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