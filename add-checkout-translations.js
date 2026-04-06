const fs = require('fs');

const checkoutKeys = {
    bs: {
        checkout: "Naplata", billingDetails: "Detalji naplate", firstName: "Ime", lastName: "Prezime",
        phone: "Broj telefona", address: "Adresa", city: "Grad", zipCode: "Poštanski broj",
        country: "Zemlja", cardNumber: "Broj kartice", expiryDate: "Datum isteka", cvv: "CVV",
        orderSummary: "Pregled narudžbe", shipping: "Dostava", tax: "Porez", placeOrder: "Naruči"
    },
    fr: {
        checkout: "Paiement", billingDetails: "Détails de facturation", firstName: "Prénom", lastName: "Nom",
        phone: "Téléphone", address: "Adresse", city: "Ville", zipCode: "Code postal",
        country: "Pays", cardNumber: "Numéro de carte", expiryDate: "Date d'expiration", cvv: "CVV",
        orderSummary: "Résumé de la commande", shipping: "Livraison", tax: "Taxe", placeOrder: "Passer la commande"
    },
    es: {
        checkout: "Pago", billingDetails: "Detalles de facturación", firstName: "Nombre", lastName: "Apellido",
        phone: "Teléfono", address: "Dirección", city: "Ciudad", zipCode: "Código postal",
        country: "País", cardNumber: "Número de tarjeta", expiryDate: "Fecha de vencimiento", cvv: "CVV",
        orderSummary: "Resumen del pedido", shipping: "Envío", tax: "Impuesto", placeOrder: "Realizar pedido"
    },
    it: {
        checkout: "Pagamento", billingDetails: "Dettagli di fatturazione", firstName: "Nome", lastName: "Cognome",
        phone: "Telefono", address: "Indirizzo", city: "Città", zipCode: "CAP",
        country: "Paese", cardNumber: "Numero carta", expiryDate: "Data di scadenza", cvv: "CVV",
        orderSummary: "Riepilogo ordine", shipping: "Spedizione", tax: "Tassa", placeOrder: "Effettua ordine"
    },
    pt: {
        checkout: "Finalizar", billingDetails: "Detalhes de cobrança", firstName: "Nome", lastName: "Sobrenome",
        phone: "Telefone", address: "Endereço", city: "Cidade", zipCode: "CEP",
        country: "País", cardNumber: "Número do cartão", expiryDate: "Data de validade", cvv: "CVV",
        orderSummary: "Resumo do pedido", shipping: "Envio", tax: "Imposto", placeOrder: "Finalizar pedido"
    },
    sl: {
        checkout: "Blagajna", billingDetails: "Podatki za plačilo", firstName: "Ime", lastName: "Priimek",
        phone: "Telefon", address: "Naslov", city: "Mesto", zipCode: "Poštna številka",
        country: "Država", cardNumber: "Številka kartice", expiryDate: "Datum poteka", cvv: "CVV",
        orderSummary: "Pregled naročila", shipping: "Dostava", tax: "Davek", placeOrder: "Oddaj naročilo"
    },
    no: {
        checkout: "Kasse", billingDetails: "Faktureringsdetaljer", firstName: "Fornavn", lastName: "Etternavn",
        phone: "Telefon", address: "Adresse", city: "By", zipCode: "Postnummer",
        country: "Land", cardNumber: "Kortnummer", expiryDate: "Utløpsdato", cvv: "CVV",
        orderSummary: "Ordresammendrag", shipping: "Frakt", tax: "Avgift", placeOrder: "Legg inn bestilling"
    },
    sv: {
        checkout: "Kassa", billingDetails: "Faktureringsuppgifter", firstName: "Förnamn", lastName: "Efternamn",
        phone: "Telefon", address: "Adress", city: "Stad", zipCode: "Postnummer",
        country: "Land", cardNumber: "Kortnummer", expiryDate: "Utgångsdatum", cvv: "CVV",
        orderSummary: "Ordersammanfattning", shipping: "Frakt", tax: "Skatt", placeOrder: "Lägg beställning"
    },
    da: {
        checkout: "Kasse", billingDetails: "Faktureringsoplysninger", firstName: "Fornavn", lastName: "Efternavn",
        phone: "Telefon", address: "Adresse", city: "By", zipCode: "Postnummer",
        country: "Land", cardNumber: "Kortnummer", expiryDate: "Udløbsdato", cvv: "CVV",
        orderSummary: "Ordreoversigt", shipping: "Forsendelse", tax: "Skat", placeOrder: "Afgiv ordre"
    }
};

// Read index.js
let content = fs.readFileSync('index.js', 'utf8');

// For each language, add checkout keys before the closing brace
Object.keys(checkoutKeys).forEach(lang => {
    // Find the language section and insert checkout keys
    const searchPattern = new RegExp(`(\\s+${lang}:\\s*{[\\s\\S]*?bestseller:\\s*"[^"]+")\\s*}`, 'g');

    const checkoutStr = ',\n\n        // Checkout\n' +
        Object.entries(checkoutKeys[lang]).map(([key, value]) =>
            `        ${key}: "${value}"`
        ).join(',\n');

    content = content.replace(searchPattern, `$1${checkoutStr}\n    }`);
});

// Write back
fs.writeFileSync('index.js', content);

console.log('✅ Added checkout translations to all languages!');
