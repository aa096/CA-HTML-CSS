export async function getJackets() {
    const url = "https://api.noroff.dev/api/v1/rainy-days";
    
try { 
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("It's raining, failed to fetch jackets");
    }
    const result = await response.json();
    return result; 
    } catch (error) {
    throw error;
    }
}

// removeIfNeeded

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const title = params.get("title")

const url = "https://api.noroff.dev/api/v1/rainy-days/"+ id;

export async function getJacket() {
    try { 
        showLoadingIndicator (".main_section");
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("It's raining, failed to fetch jackets");
        }
        const result = await response.json();
            createHTML (result); 
            getTitle (result);
            addStylingIcons ();
        } 

        catch (error) {
            showError (error.message, ".main_section");
        }
}

export function getTitle (result) {
    const titleContainer = document.getElementById("title");    
    titleContainer.textContent = result.title;
}
