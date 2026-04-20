const apiKey = 'AIzaSyDz3qeDrNTFgqqFj4FKlykD17lYzw9dcZU';
const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

async function test() {
    for (const model of models) {
        console.log("Testing model: " + model);
        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{role: "user", parts: [{text: "Hi"}]}]
                    })
                }
            );
            const text = await res.text();
            console.log(`Status ${res.status}:`, text);
        } catch (e) {
            console.error(e);
        }
    }
}

test();
