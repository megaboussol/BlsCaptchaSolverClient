// Générateur d'API Key sécurisé
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Vérification du paiement et génération de la clé API
function processPaymentSuccess() {
    let apiKey = generateUUID();
    
    // Afficher la clé API dans la page
    document.getElementById("api-key").innerText = `✅ Votre clé API : ${apiKey}`;
    
    // Envoyer la clé API via Telegram
    sendToTelegram(apiKey);
}

// Envoi de la clé API au bot Telegram
function sendToTelegram(apiKey) {
    const TELEGRAM_BOT_TOKEN = "TON_BOT_TOKEN_ICI";  // 🔹 Remplace avec ton bot token
    const TELEGRAM_CHAT_ID = "TON_CHAT_ID_ICI";      // 🔹 Remplace avec ton chat ID

    const message = `✅ Nouvelle API Key générée !\n🔑 Clé : ${apiKey}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => console.log("✅ API Key envoyée à Telegram"))
        .catch(error => console.error("❌ Erreur lors de l'envoi à Telegram :", error));
}

// Chargement du script PayPal
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("paypal-button-container").addEventListener("click", processPaymentSuccess);
});
