import {customizeElement} from "../../utils/handleElement.js";

export function createRepositoryButton() {
    const git = document.createElement('div');
    git.className = 'github-button';

    git.innerHTML = `
      <a class="Github Repository" href="https://github.com/tnqbao/internship-practice-js" aria-label="GitHub Repository" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.gauas.online/images/internship/github-icon.svg" alt="GitHub Icon">
      </a>
  `;

    return customizeElement(git, {
        id: 'github-repo-button',
        events: {
            mouseenter: (e) => e.target.style.transform = 'scale(1.1)',
            mouseleave: (e) => e.target.style.transform = 'scale(1)'
        },
        dataset: {
            component: 'github-button'
        }
    });
}
