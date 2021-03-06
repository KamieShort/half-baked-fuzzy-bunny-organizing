// Create your own supabase database using the provided seeds.sql file
const SUPABASE_URL = 'https://egdrvheseyhayxbahrri.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZHJ2aGVzZXloYXl4YmFocnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ4ODE3MTMsImV4cCI6MTk2MDQ1NzcxM30.9epFpiRNgk8RIyWEaIJUu1on7JQXBpyH2ROvOPGlajE';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function getFamilies() {
    // fetch all families and their bunnies
    const resp = await client.from('loving_families').select(`*, fuzzy_bunnies (*)`);

    return checkError(resp);
}

export async function deleteBunny(id) {
    // delete a single bunny using the id argument
    const resp = await client.from('fuzzy_bunnies').delete().match({ id: id }).single();

    return checkError(resp);
}

export async function createBunny(bunny) {
    // create a bunny using the bunny argument
    const resp = await client
        .from('fuzzy_bunnies')
        .insert({ name: bunny.name, family_id: bunny.family_id });
    return checkError(resp);
}
// console.log(bunny);

// (PRE-MADE) FUNCTIONS

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
