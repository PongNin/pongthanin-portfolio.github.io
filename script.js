// Function to load HTML components
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    }
    const htmlText = await response.text();
    document.getElementById(elementId).innerHTML = htmlText;
    
    // Highlight active link in navigation
    if (elementId === 'header-container') {
      highlightActiveLink();
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to highlight active link
function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    // Check if the current path contains the link's href
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Load header and footer on DOM load
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header-container', 'header.html');
  loadComponent('footer-container', 'footer.html');
  
  // Animation for skill bars if they exist
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length > 0) {
    // Set initial width to 0
    skillBars.forEach(bar => {
      const actualWidth = bar.style.width;
      bar.dataset.width = actualWidth;
      bar.style.width = '0%';
    });
    
    // Animate to actual width after short delay
    setTimeout(() => {
      skillBars.forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 300);
  }
});
