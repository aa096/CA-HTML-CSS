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