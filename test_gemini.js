const apiKey = "AIzaSyDqf0tarkhwCdSTWCRTFdSasC4zX2ClkRg";
const models = ['gemini-1.5-flash'];

async function testGemini() {
    for (const model of models) {
        console.log(`Testing model: ${model}...`);
        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: 'user', parts: [{ text: 'Say hello' }] }]
                    })
                }
            );
            console.log(`Status: ${res.status}`);
            const data = await res.json();
            if (res.ok) {
                console.log(`Success! Response: ${data.candidates[0].content.parts[0].text}`);
            } else {
                console.log(`Error details:`, JSON.stringify(data, null, 2));
            }
        } catch (e) {
            console.error('Fetch error:', e);
        }
        console.log('---');
    }
}

testGemini();
