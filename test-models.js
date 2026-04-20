const apiKey = 'AIzaSyDz3qeDrNTFgqqFj4FKlykD17lYzw9dcZU';

async function listModels() {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        const models = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent")).map(m => m.name);
        console.log("Supported Models:", models);
    } catch (e) {
        console.error(e);
    }
}
listModels();
