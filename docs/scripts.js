// Electric Home Hub - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileNavigation();
    initializeDeviceSearch();
    initializeInteractiveElements();
});

// Mobile Navigation
function initializeMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = mobileNav.style.display === 'flex';
            mobileNav.style.display = isOpen ? 'none' : 'flex';
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (isOpen) {
                spans.forEach(span => span.style.transform = '');
            } else {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.style.display = 'none';
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
}

// Device Search and Filtering
function initializeDeviceSearch() {
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    const deviceTiles = document.querySelectorAll('.device-tile');
    
    if (searchInput && deviceTiles.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const selectedCategory = filterSelect ? filterSelect.value : 'all';
            
            filterDevices(searchTerm, selectedCategory, deviceTiles);
        });
    }
    
    if (filterSelect && deviceTiles.length > 0) {
        filterSelect.addEventListener('change', function() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const selectedCategory = this.value;
            
            filterDevices(searchTerm, selectedCategory, deviceTiles);
        });
    }
}

function filterDevices(searchTerm, category, deviceTiles) {
    deviceTiles.forEach(tile => {
        const deviceName = tile.querySelector('h4').textContent.toLowerCase();
        const deviceModel = tile.querySelector('p').textContent.toLowerCase();
        
        const matchesSearch = searchTerm === '' || 
                            deviceName.includes(searchTerm) || 
                            deviceModel.includes(searchTerm);
        
        const matchesCategory = category === 'all' || 
                              getDeviceCategory(deviceName).includes(category);
        
        if (matchesSearch && matchesCategory) {
            tile.style.display = 'block';
            tile.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
            tile.style.display = 'none';
        }
    });
}

function getDeviceCategory(deviceName) {
    const categories = {
        'refrigerator': 'appliances',
        'thermostat': 'smart-home',
        'washer': 'appliances',
        'doorbell': 'security',
        'hue': 'smart-home',
        'roomba': 'appliances'
    };
    
    for (const [key, category] of Object.entries(categories)) {
        if (deviceName.includes(key)) {
            return category;
        }
    }
    return 'smart-home';
}

// Interactive Elements
function initializeInteractiveElements() {
    // Add click handlers for device tiles
    const deviceTiles = document.querySelectorAll('.device-tile');
    deviceTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            const deviceName = this.querySelector('h4').textContent;
            showDeviceDetails(deviceName);
        });
    });
    
    // Add hover effects to action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize stats counter animation
    animateStats();
}

function showDeviceDetails(deviceName) {
    // Create a simple modal or notification
    const notification = document.createElement('div');
    notification.className = 'device-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${deviceName}</h4>
            <p>Click to view detailed information on the device tracking page.</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--surface);
        border: 1px solid var(--brand-red);
        border-radius: 12px;
        padding: 2rem;
        z-index: 1000;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        animation: fadeInUp 0.3s ease-out;
    `;
    
    notification.querySelector('button').style.cssText = `
        background: var(--brand-red);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        margin-top: 1rem;
        cursor: pointer;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 20;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 50);
}

// Utility functions for enhanced interactivity
function createToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : 'var(--brand-red)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .device-notification .notification-content {
        text-align: center;
    }
    
    .device-notification h4 {
        color: var(--brand-red);
        margin-bottom: 0.5rem;
    }
    
    .device-notification p {
        color: var(--text-secondary);
        margin-bottom: 1rem;
    }
`;

document.head.appendChild(style);