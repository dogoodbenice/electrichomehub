// Device Tracking Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeDeviceFiltering();
    updateStatsFromDevices();
});

// Initialize device filtering and search
function initializeDeviceFiltering() {
    const searchInput = document.getElementById('deviceSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const warrantyFilter = document.getElementById('warrantyFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (warrantyFilter) {
        warrantyFilter.addEventListener('change', applyFilters);
    }
}

// Apply filters to device grid
function applyFilters() {
    const searchTerm = document.getElementById('deviceSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const warrantyFilter = document.getElementById('warrantyFilter').value;
    
    const deviceCards = document.querySelectorAll('.device-card');
    const emptyState = document.getElementById('emptyState');
    let visibleCount = 0;
    
    deviceCards.forEach(card => {
        const deviceName = card.querySelector('h3').textContent.toLowerCase();
        const deviceModel = card.querySelector('.device-model').textContent.toLowerCase();
        const deviceCategory = card.getAttribute('data-category');
        const deviceWarranty = card.getAttribute('data-warranty');
        
        const matchesSearch = searchTerm === '' || 
                            deviceName.includes(searchTerm) || 
                            deviceModel.includes(searchTerm);
        
        const matchesCategory = categoryFilter === 'all' || deviceCategory === categoryFilter;
        const matchesWarranty = warrantyFilter === 'all' || deviceWarranty === warrantyFilter;
        
        if (matchesSearch && matchesCategory && matchesWarranty) {
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

// Add new device functionality
function addNewDevice() {
    const modal = createDeviceModal('Add New Device', {
        name: '',
        manufacturer: '',
        model: '',
        serialNumber: '',
        category: 'appliances',
        location: '',
        warrantyExpiry: '',
        purchaseDate: ''
    }, true);
}

// Edit device functionality
function editDevice(deviceId) {
    // Get device data from the card (in a real app, this would come from an API)
    const deviceCard = document.querySelector(`[onclick*="${deviceId}"]`).closest('.device-card');
    const deviceData = {
        name: deviceCard.querySelector('h3').textContent,
        model: deviceCard.querySelector('.device-model').textContent,
        location: deviceCard.querySelector('.device-location').textContent.replace('📍 ', ''),
        category: deviceCard.getAttribute('data-category'),
        warranty: deviceCard.getAttribute('data-warranty'),
        manufacturer: getManufacturerFromModel(deviceCard.querySelector('.device-model').textContent),
        serialNumber: generateSerialNumber(),
        warrantyExpiry: getWarrantyExpiry(deviceCard),
        purchaseDate: ''
    };
    
    createDeviceModal('Edit Device', deviceData, false, deviceId);
}

// Delete device functionality
function deleteDevice(deviceId) {
    const deviceCard = document.querySelector(`[onclick*="${deviceId}"]`).closest('.device-card');
    const deviceName = deviceCard.querySelector('h3').textContent;
    
    const modal = createModal('Delete Device', `
        <div class="modal-content">
            <h3>Delete "${deviceName}"</h3>
            <p>Are you sure you want to remove this device from your inventory? This action cannot be undone.</p>
            <div class="warning-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>All associated documents and alerts will also be removed.</span>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" style="background-color: #ef4444;" onclick="confirmDeleteDevice('${deviceId}')">Delete Device</button>
            </div>
        </div>
    `);
}

// Confirm device deletion
function confirmDeleteDevice(deviceId) {
    const deviceCard = document.querySelector(`[onclick*="${deviceId}"]`).closest('.device-card');
    const deviceName = deviceCard.querySelector('h3').textContent;
    
    // Remove the device card with animation
    deviceCard.style.transition = 'all 0.3s ease';
    deviceCard.style.transform = 'scale(0.8)';
    deviceCard.style.opacity = '0';
    
    setTimeout(() => {
        deviceCard.remove();
        updateStatsFromDevices();
        applyFilters(); // Reapply filters to update empty state if needed
        createToast(`"${deviceName}" removed from inventory`, 'success');
    }, 300);
    
    closeModal();
}

// Create device modal for add/edit
function createDeviceModal(title, deviceData, isNew, deviceId = null) {
    const modal = createModal(title, `
        <div class="modal-content">
            <h3>${title}</h3>
            <form id="deviceForm" class="device-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="deviceName">Device Name *</label>
                        <input type="text" id="deviceName" value="${deviceData.name}" required placeholder="e.g., Smart Refrigerator">
                    </div>
                    <div class="form-group">
                        <label for="deviceManufacturer">Manufacturer *</label>
                        <input type="text" id="deviceManufacturer" value="${deviceData.manufacturer}" required placeholder="e.g., Samsung">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="deviceModel">Model Number *</label>
                        <input type="text" id="deviceModel" value="${deviceData.model}" required placeholder="e.g., RF28R7351SR">
                    </div>
                    <div class="form-group">
                        <label for="deviceSerial">Serial Number</label>
                        <input type="text" id="deviceSerial" value="${deviceData.serialNumber}" placeholder="e.g., ABC123456789">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="deviceCategory">Category *</label>
                        <select id="deviceCategory" required>
                            <option value="appliances" ${deviceData.category === 'appliances' ? 'selected' : ''}>Appliances</option>
                            <option value="smart-home" ${deviceData.category === 'smart-home' ? 'selected' : ''}>Smart Home</option>
                            <option value="security" ${deviceData.category === 'security' ? 'selected' : ''}>Security</option>
                            <option value="entertainment" ${deviceData.category === 'entertainment' ? 'selected' : ''}>Entertainment</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="deviceLocation">Location</label>
                        <input type="text" id="deviceLocation" value="${deviceData.location}" placeholder="e.g., Kitchen">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="purchaseDate">Purchase Date</label>
                        <input type="date" id="purchaseDate" value="${deviceData.purchaseDate}">
                    </div>
                    <div class="form-group">
                        <label for="warrantyExpiry">Warranty Expires</label>
                        <input type="date" id="warrantyExpiry" value="${deviceData.warrantyExpiry}">
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary">${isNew ? 'Add Device' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    `);
    
    document.getElementById('deviceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveDevice(isNew, deviceId);
    });
    
    // Add form styles
    addDeviceFormStyles();
}

// Save device (add or update)
function saveDevice(isNew, deviceId) {
    const formData = {
        name: document.getElementById('deviceName').value,
        manufacturer: document.getElementById('deviceManufacturer').value,
        model: document.getElementById('deviceModel').value,
        serialNumber: document.getElementById('deviceSerial').value,
        category: document.getElementById('deviceCategory').value,
        location: document.getElementById('deviceLocation').value,
        purchaseDate: document.getElementById('purchaseDate').value,
        warrantyExpiry: document.getElementById('warrantyExpiry').value
    };
    
    if (isNew) {
        addDeviceToGrid(formData);
        createToast(`"${formData.name}" added to inventory`, 'success');
    } else {
        updateDeviceInGrid(deviceId, formData);
        createToast(`"${formData.name}" updated successfully`, 'success');
    }
    
    updateStatsFromDevices();
    closeModal();
}

// Add device to grid
function addDeviceToGrid(deviceData) {
    const devicesGrid = document.getElementById('devicesGrid');
    const warrantyStatus = calculateWarrantyStatus(deviceData.warrantyExpiry);
    const deviceIcon = getDeviceIcon(deviceData.category);
    const deviceId = generateDeviceId(deviceData.name);
    
    const deviceCard = document.createElement('div');
    deviceCard.className = 'device-card';
    deviceCard.setAttribute('data-category', deviceData.category);
    deviceCard.setAttribute('data-warranty', warrantyStatus);
    
    deviceCard.innerHTML = `
        <div class="device-header">
            <div class="device-icon">${deviceIcon}</div>
            <div class="device-actions">
                <button class="btn-icon" onclick="editDevice('${deviceId}')" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                    </svg>
                </button>
                <button class="btn-icon danger" onclick="deleteDevice('${deviceId}')" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="device-content">
            <h3>${deviceData.name}</h3>
            <p class="device-model">${deviceData.manufacturer} ${deviceData.model}</p>
            <p class="device-location">📍 ${deviceData.location || 'No location set'}</p>
            <div class="device-details">
                <span class="warranty-badge ${warrantyStatus}">${formatWarrantyStatus(warrantyStatus)}</span>
                <span class="device-date">${formatWarrantyDate(deviceData.warrantyExpiry, warrantyStatus)}</span>
            </div>
        </div>
    `;
    
    // Add with animation
    deviceCard.style.opacity = '0';
    deviceCard.style.transform = 'translateY(20px)';
    devicesGrid.appendChild(deviceCard);
    
    setTimeout(() => {
        deviceCard.style.transition = 'all 0.3s ease';
        deviceCard.style.opacity = '1';
        deviceCard.style.transform = 'translateY(0)';
    }, 100);
}

// Update device in grid
function updateDeviceInGrid(deviceId, deviceData) {
    const deviceCard = document.querySelector(`[onclick*="${deviceId}"]`).closest('.device-card');
    const warrantyStatus = calculateWarrantyStatus(deviceData.warrantyExpiry);
    
    deviceCard.setAttribute('data-category', deviceData.category);
    deviceCard.setAttribute('data-warranty', warrantyStatus);
    
    deviceCard.querySelector('h3').textContent = deviceData.name;
    deviceCard.querySelector('.device-model').textContent = `${deviceData.manufacturer} ${deviceData.model}`;
    deviceCard.querySelector('.device-location').textContent = `📍 ${deviceData.location || 'No location set'}`;
    deviceCard.querySelector('.warranty-badge').textContent = formatWarrantyStatus(warrantyStatus);
    deviceCard.querySelector('.warranty-badge').className = `warranty-badge ${warrantyStatus}`;
    deviceCard.querySelector('.device-date').textContent = formatWarrantyDate(deviceData.warrantyExpiry, warrantyStatus);
}

// Update stats based on current devices
function updateStatsFromDevices() {
    const deviceCards = document.querySelectorAll('.device-card[style*="block"], .device-card:not([style*="none"])');
    const totalDevices = deviceCards.length;
    
    let activeWarranties = 0;
    let expiringSoon = 0;
    let expired = 0;
    
    deviceCards.forEach(card => {
        const warrantyStatus = card.getAttribute('data-warranty');
        if (warrantyStatus === 'active') activeWarranties++;
        else if (warrantyStatus === 'expiring') expiringSoon++;
        else if (warrantyStatus === 'expired') expired++;
    });
    
    // Update stat numbers with animation
    animateStatUpdate('.stat-content .stat-number', [totalDevices, activeWarranties, expiringSoon, expired]);
}

// Utility functions
function calculateWarrantyStatus(warrantyExpiry) {
    if (!warrantyExpiry) return 'expired';
    
    const today = new Date();
    const expiryDate = new Date(warrantyExpiry);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 90) return 'expiring';
    return 'active';
}

function formatWarrantyStatus(status) {
    const statusMap = {
        'active': 'Active Warranty',
        'expiring': 'Expiring Soon',
        'expired': 'Expired'
    };
    return statusMap[status] || 'Unknown';
}

function formatWarrantyDate(date, status) {
    if (!date) return 'No warranty info';
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });
    
    if (status === 'expired') return `Expired: ${formattedDate}`;
    return `Expires: ${formattedDate}`;
}

function getDeviceIcon(category) {
    const icons = {
        'appliances': '🏠',
        'smart-home': '💡',
        'security': '🔒',
        'entertainment': '📺'
    };
    return icons[category] || '⚡';
}

function generateDeviceId(name) {
    return name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
}

function getManufacturerFromModel(model) {
    if (model.includes('Samsung')) return 'Samsung';
    if (model.includes('Google') || model.includes('Nest')) return 'Google';
    if (model.includes('Ring')) return 'Ring';
    if (model.includes('Philips')) return 'Philips';
    if (model.includes('iRobot')) return 'iRobot';
    return '';
}

function generateSerialNumber() {
    return 'SN' + Math.random().toString(36).substring(2, 12).toUpperCase();
}

function getWarrantyExpiry(deviceCard) {
    const dateText = deviceCard.querySelector('.device-date').textContent;
    const match = dateText.match(/(\w+)\s+(\d{4})/);
    if (match) {
        const month = match[1];
        const year = match[2];
        const monthMap = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
            'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
            'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };
        return `${year}-${monthMap[month] || '12'}-31`;
    }
    return '';
}

function animateStatUpdate(selector, values) {
    const statElements = document.querySelectorAll(selector);
    statElements.forEach((element, index) => {
        if (values[index] !== undefined) {
            const currentValue = parseInt(element.textContent);
            const targetValue = values[index];
            animateNumber(element, targetValue, currentValue);
        }
    });
}

function animateNumber(element, target, current = 0) {
    const duration = 500;
    const startTime = Date.now();
    const difference = target - current;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(current + (difference * progress));
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function addDeviceFormStyles() {
    if (document.getElementById('device-form-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'device-form-styles';
    style.textContent = `
        .device-form {
            max-width: 600px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        @media (max-width: 480px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(style);
}