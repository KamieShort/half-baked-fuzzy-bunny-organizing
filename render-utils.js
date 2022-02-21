export function renderFamily(family) {
    const div = document.createElement('div');
    div.classList.add('family');
    const p = document.createElement('p');
    p.classList.add('name');
    p.textContent = family.name;
    div.append(p);
    return div;
}
