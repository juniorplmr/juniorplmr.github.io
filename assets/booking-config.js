window.TCOBooking = {
    // Voeg een openbare Google Maps-browsersleutel toe die voor dit domein is toegestaan.
    mapsKey: '',
    email: 'info@taxitco.nl',
    teksten: {
        titel: 'Vraag uw taxi aan', subtitel: 'Vul uw route in en kies uw vertrekdatum.',
        reis: 'Reis', voertuig: 'Voertuig', contact: 'Contact', controle: 'Controle',
        enkele_reis: 'Enkele reis', retour: 'Retour', bereken: 'Verder naar voertuig',
        volgende: 'Volgende', vorige: 'Terug', delen: 'Delen',
        contact_titel: 'Uw contactgegevens', contact_subtitel: 'Waar kunnen we u bereiken over uw rit?',
        controle_titel: 'Controleer uw aanvraag',
        privacy: 'U kiest hoe u uw aanvraag deelt. Na bevestiging door Taxi TCO staat uw rit vast.'
    },
    afbeeldingen: { auto: '/assets/auto.png', bus: '/assets/bus.png' },
    voertuigen: {
        auto: { naam: 'Auto', personen: '1 t/m 4 personen', start: 4.31, km: 3.17, minuut: 0.52 },
        bus: { naam: 'Bus', personen: '5 t/m 8 personen', start: 8.77, km: 4, minuut: 0.59 }
    },
    kortingen: [
        { vanaf_km: 100, korting_pct: 50 }, { vanaf_km: 70, korting_pct: 35 },
        { vanaf_km: 40, korting_pct: 25 }, { vanaf_km: 20, korting_pct: 15 }
    ],
    default_map_center: { lat: 52.31, lng: 6.93 }
};
