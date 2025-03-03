const CLIENT_ID_PAYPAL = "AR-bxNMzpbSTZ66jto8U2M8Bk1K0-7FQAHX5mrK7UlyA_xS2EGxrHM8NQKxsLRzygkH9RW2fuLpw58iA";
const TELEGRAM_TOKEN = "8103010659:AAEuPlceI-5pzwszZ6D14xEp0_HQizG3Ejk";
const TELEGRAM_CHAT_ID = "-1002331768842";

// Fonction pour envoyer le numéro de téléphone sur Telegram
function sendPhoneToTelegram(phoneNumber) {
    if (!phoneNumber) {
        alert("Veuillez entrer un numéro de téléphone valide.");
        return;
    }
    
    let message = `📞 Nouveau contact : ${phoneNumber}`;
    let url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("✅ Numéro envoyé avec succès!");
            } else {
                alert("❌ Erreur d'envoi. Veuillez réessayer.");
            }
        })
        .catch(error => alert("❌ Problème de connexion."));
}

// Fonction pour envoyer la clé API sur Telegram
function sendApiKeyToTelegram(apiKey, phoneNumber) {
    let message = `✅ Nouvelle API Key générée !\n🔑 Clé : ${apiKey}\n📱 Téléphone : ${phoneNumber}`;
    let url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log("✅ Infos envoyées à Telegram");
            } else {
                console.error("❌ Erreur lors de l'envoi");
            }
        })
        .catch(error => console.error("❌ Problème de connexion."));
}

// Intégration PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '5.00', // Montant du paiement
                    currency_code: 'USD'
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert(`✅ Paiement réussi par ${details.payer.name.given_name}`);
            let apiKey = generateUUID(); // Générer une clé API
            let phoneNumber = document.getElementById("phone-number").value;
            document.getElementById("api-key").innerText = `✅ Votre clé API : ${apiKey}`;
            sendApiKeyToTelegram(apiKey, phoneNumber); // Envoyer la clé API à Telegram
        });
    }
}).render('#paypal-button-container');

// Fonction pour générer une clé API unique
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
