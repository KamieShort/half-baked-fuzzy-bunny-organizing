import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);
    const bunny = {
        family_id: data.get('family-id'),
        name: data.get('bunny-name'),
    };
    await createBunny(bunny);
    location.replace('../families');
    // use createBunny to create a bunny with this name and family id

    form.reset();
});

window.addEventListener('load', async () => {
    const selectElem = document.getElementById('family-id');
    const families = await getFamilies();
    console.log(selectElem);
    for (let family of families) {
        const option = document.createElement('option');
        option.value = family.id;
        option.label = family.name;
        selectElem.append(option);
    }
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    // go get the families from supabase
    // for each family
    // create an option tag
    // set the option's value and text content
    // and append the option to the select
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
