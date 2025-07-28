export function createNavbar() {
    const nav = document.createElement('nav');
    nav.className = 'navbar';

    nav.innerHTML = `
    <ul class="nav-menu">
      ${createNavItem('All Tests', true)}
      ${createNavItem('Polyclinic', true)}
      ${createNavItem('Home Blood Collection')}
      ${createNavItem('Vaccination')}
      ${createNavItem('Insurance')}
      ${createNavItem('Promotions')}
      ${createNavItem('Partnership', true)}
      ${createNavItem('About Us', true)}
      ${createNavItem('Blog', true)}
    </ul>
  `;

    return nav;
}

function createNavItem(label, hasDropdown = false) {
    return `
    <li class="nav-item">
      <button class="nav-link ${hasDropdown ? 'has-dropdown' : ''}">
        ${label}
        ${hasDropdown ? '<span class="dropdown-icon">⌄</span>' : ''}
      </button>
    </li>
  `;
}
