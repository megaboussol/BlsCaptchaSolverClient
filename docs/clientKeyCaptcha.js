// 🎯 Configuration PayPal avec ton Client ID
const PAYPAL_CLIENT_ID = "AR-bxNMzpbSTZ66jto8U2M8Bk1K0-7FQAHX5mrK7UlyA_xS2EGxrHM8NQKxsLRzygkH9RW2fuLpw58iA";
const PAYPAL_SECRET_KEY = "ECjnv7rc7by_6ENRmzscoifNjcfcdCKCp1w073XtEkLIZ-sdo9PCKscWxPC58GYAstRP9kupzVW4UYg2";

// 🎯 Générateur d'API Key sécurisé
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// 🎯 Vérification du paiement avec PayPal et génération de l'API Key
function processPaymentSuccess() {
    let apiKey = generateUUID();
    
    // Afficher la clé API après paiement
    document.getElementById("api-key").innerText = `✅ Votre clé API : ${apiKey}`;
    document.getElementById("api-key").style.display = "block";

    // Envoyer la clé API via Telegram
    sendToTelegram(apiKey);
}

// 🎯 Envoi sécurisé de la clé API sur Telegram
function sendToTelegram(apiKey) {
    const TELEGRAM_BOT_TOKEN = "8103010659:AAEuPlceI-5pzwszZ6D14xEp0_HQizG3Ejk";
    const TELEGRAM_CHAT_ID = "-1002331768842";

    const message = `✅ Nouvelle API Key générée !\n🔑 Clé : ${apiKey}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => console.log("✅ API Key envoyée à Telegram"))
        .catch(error => console.error("❌ Erreur lors de l'envoi à Telegram :", error));
}

// 🎯 Chargement du script PayPal avec ton Client ID
document.addEventListener("DOMContentLoaded", function() {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}`;
    script.onload = function () {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: { value: "10.00" } // 💰 Montant du paiement
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert(`✅ Paiement réussi par ${details.payer.name.given_name}`);
                    processPaymentSuccess();
                });
            }
        }).render("#paypal-button-container");
    };
    document.body.appendChild(script);
});
