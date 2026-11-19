
    (function(){
        const config = window.TCOBooking;
        const root = document.getElementById('taxi-booking');

        function esc(str){
            if(typeof str !== 'string') return '';
            return str
                .replaceAll('&','&amp;')
                .replaceAll('<','&lt;')
                .replaceAll('>','&gt;')
                .replaceAll('"','&quot;')
                .replaceAll("'","&#039;");
        }

        function num(v){
            return Number(v || 0).toLocaleString('nl-NL',{minimumFractionDigits:2, maximumFractionDigits:2});
        }

        function money(v){
            return '€ ' + Number(v || 0).toLocaleString('nl-NL',{minimumFractionDigits:2, maximumFractionDigits:2});
        }

        function icon(type){
            const icons = {
                location: `
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z"></path>
                        <circle cx="12" cy="11" r="2.5"></circle>
                    </svg>
                `,
                calendar: `
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                        <path d="M16 3v4M8 3v4M3 10h18"></path>
                    </svg>
                `,
                clock: `
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="9"></circle>
                        <path d="M12 7v5l3 2"></path>
                    </svg>
                `,
                user: `
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21a8 8 0 0 0-16 0"></path>
                        <circle cx="12" cy="8" r="4"></circle>
                    </svg>
                `,
                phone: `
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.35 1.8.68 2.65a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.43-1.25a2 2 0 0 1 2.11-.45c.85.33 1.74.56 2.65.68A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                `,
                mail: `
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                        <path d="M3 7l9 6 9-6"></path>
                    </svg>
                `,
                note: `
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                    </svg>
                `
            };
            return icons[type] || '';
        }

        root.innerHTML = `
            <div class="tb-wrap">
                <div class="tb-top">
                    <div class="tb-brand">
                        <div>
                            <h2 class="tb-brand-title">${esc(config.teksten.titel)}</h2>
                            <p class="tb-brand-sub">${esc(config.teksten.subtitel)}</p>
                        </div>
                    </div>

                    <div class="tb-progress" aria-label="Boekingsstappen">
                        <div class="tb-progress-item active" data-progress="1"><span class="tb-progress-dot">1</span><span class="tb-progress-label">${esc(config.teksten.reis)}</span></div>
                        <div class="tb-progress-item" data-progress="2"><span class="tb-progress-dot">2</span><span class="tb-progress-label">${esc(config.teksten.voertuig)}</span></div>
                        <div class="tb-progress-item" data-progress="3"><span class="tb-progress-dot">3</span><span class="tb-progress-label">${esc(config.teksten.contact)}</span></div>
                        <div class="tb-progress-item" data-progress="4"><span class="tb-progress-dot">4</span><span class="tb-progress-label">${esc(config.teksten.controle)}</span></div>
                    </div>
                </div>

                <div class="tb-body">
                    <div class="tb-step active" data-step="1">
                        <div class="tb-grid">
                            <div class="tb-panel">
                                <div class="tb-trip-type">
                                    <div class="tb-trip-option">
                                        <input type="radio" name="taxi-booking-triptype" id="taxi-booking-single" value="single" checked>
                                        <label for="taxi-booking-single">${esc(config.teksten.enkele_reis)}</label>
                                    </div>
                                    <div class="tb-trip-option">
                                        <input type="radio" name="taxi-booking-triptype" id="taxi-booking-return" value="return">
                                        <label for="taxi-booking-return">${esc(config.teksten.retour)}</label>
                                    </div>
                                </div>

                                <div class="tb-field">
                                    <label>Ophaaladres</label>
                                    <div class="tb-input-wrap">
                                        <span class="tb-ico">${icon('location')}</span>
                                        <input type="text" id="taxi-booking-pickup" placeholder="Bijv. Station Oldenzaal, MST">
                                    </div>
                                    <div class="tb-error" id="taxi-booking-pickup-error"></div>
                                </div>

                                <div class="tb-stop-list" id="taxi-booking-stops"></div>

                                <button type="button" class="tb-stop-btn" id="taxi-booking-add-stop">＋ Tussenstop toevoegen</button>

                                <div class="tb-field">
                                    <label>Bestemming</label>
                                    <div class="tb-input-wrap">
                                        <span class="tb-ico">${icon('location')}</span>
                                        <input type="text" id="taxi-booking-dropoff" placeholder="Bijv. Almelo, Enschede, Hengelo">
                                    </div>
                                    <div class="tb-error" id="taxi-booking-dropoff-error"></div>
                                </div>

                                <div class="tb-quick-row" aria-label="Populaire bestemmingen">
                                    <span>Snel:</span>
                                    <button type="button" class="tb-quick-btn" data-address="Amsterdam Airport Schiphol, Evert van de Beekstraat, Schiphol">Schiphol</button>
									<button type="button" class="tb-quick-btn" data-address="Rotterdam The Hague Airport, Rotterdam">Rotterdam Airport</button>
									<button type="button" class="tb-quick-btn" data-address="Flughafenstraße 105, 40474 Düsseldorf, Duitsland">Dusseldorf Airport</button>
                                </div>

                                <div class="tb-row">
                                    <div class="tb-field">
                                        <label>Datum</label>
                                        <div class="tb-input-wrap">
                                            <span class="tb-ico">${icon('calendar')}</span>
                                            <input type="date" id="taxi-booking-date1" inputmode="none" placeholder="Selecteer datum" data-placeholder="Selecteer datum">
                                        </div>
                                        <div class="tb-error" id="taxi-booking-date1-error"></div>
                                    </div>
                                    <div class="tb-field">
                                        <label>Tijd</label>
                                        <div class="tb-input-wrap">
                                            <span class="tb-ico">${icon('clock')}</span>
                                            <input type="time" id="taxi-booking-time1" inputmode="none" placeholder="Selecteer tijd" data-placeholder="Selecteer tijd">
                                        </div>
                                        <div class="tb-error" id="taxi-booking-time1-error"></div>
                                    </div>
                                </div>

                                <div id="taxi-booking-return-fields" style="display:none;">
                                    <div class="tb-row">
                                        <div class="tb-field">
                                            <label>Retour datum</label>
                                            <div class="tb-input-wrap">
                                                <span class="tb-ico">${icon('calendar')}</span>
                                                <input type="date" id="taxi-booking-date2" inputmode="none" placeholder="Selecteer datum" data-placeholder="Selecteer datum">
                                            </div>
                                            <div class="tb-error" id="taxi-booking-date2-error"></div>
                                        </div>
                                        <div class="tb-field">
                                            <label>Retour tijd</label>
                                            <div class="tb-input-wrap">
                                                <span class="tb-ico">${icon('clock')}</span>
                                                <input type="time" id="taxi-booking-time2" inputmode="none" placeholder="Selecteer tijd" data-placeholder="Selecteer tijd">
                                            </div>
                                            <div class="tb-error" id="taxi-booking-time2-error"></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tb-passengers">
                                    <div class="tb-passenger-label">${icon('user')} Passagiers</div>
                                    <div class="tb-counter">
                                        <button type="button" id="taxi-booking-minus" aria-label="Minder passagiers">−</button>
                                        <span id="taxi-booking-passengers">1</span>
                                        <button type="button" id="taxi-booking-plus" aria-label="Meer passagiers">+</button>
                                    </div>
                                </div>

                                <button type="button" class="tb-main-btn" id="taxi-booking-calculate">${esc(config.teksten.bereken)}</button>
                            </div>

                            <div>
                                <div class="tb-map" id="taxi-booking-map"></div>

                                <div class="tb-mini-grid">
                                    <div class="tb-mini-card">
                                        <div class="label">Afstand</div>
                                        <div class="value" id="taxi-booking-distance">-</div>
                                    </div>
                                    <div class="tb-mini-card">
                                        <div class="label">Tijd</div>
                                        <div class="value" id="taxi-booking-duration">-</div>
                                    </div>
                                    <div class="tb-mini-card">
                                        <div class="label">Prijs</div>
                                        <div class="value" id="taxi-booking-price">Op aanvraag</div>
                                    </div>
                                </div>

                                <div class="tb-error" id="taxi-booking-route-error" style="margin-top:12px;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="tb-step" data-step="2">
                        <div class="tb-panel">
                            <h3>Kies uw voertuig</h3>
                            <p class="tb-panel-sub">Selecteer het voertuig dat past bij uw aantal passagiers.</p>

                            <div class="tb-vehicle-grid">
                                <div class="tb-vehicle">
                                    <input type="radio" name="taxi-booking-vehicle" id="taxi-booking-vehicle-auto" value="auto" checked>
                                    <label for="taxi-booking-vehicle-auto">
                                        <div class="tb-vehicle-media">
                                            <img src="${config.afbeeldingen.auto}" alt="Mercedes E-Klasse">
                                        </div>
                                        <div class="tb-vehicle-title">${esc(config.voertuigen.auto.naam)}</div>
                                        <div class="tb-vehicle-sub">${esc(config.voertuigen.auto.personen)}</div>
                                        <div class="tb-vehicle-line">Starttarief: € ${num(config.voertuigen.auto.start)}</div>
                                        <div class="tb-vehicle-line">Kilometertarief: € ${num(config.voertuigen.auto.km)}</div>
                                        <div class="tb-vehicle-line">Minuuttarief: € ${num(config.voertuigen.auto.minuut)}</div>
                                    </label>
                                </div>

                                <div class="tb-vehicle">
                                    <input type="radio" name="taxi-booking-vehicle" id="taxi-booking-vehicle-bus" value="bus">
                                    <label for="taxi-booking-vehicle-bus">
                                        <div class="tb-vehicle-media">
                                            <img class="tb-bus-img" src="${config.afbeeldingen.bus}" alt="Mercedes Bus">
                                        </div>
                                        <div class="tb-vehicle-title">${esc(config.voertuigen.bus.naam)}</div>
                                        <div class="tb-vehicle-sub">${esc(config.voertuigen.bus.personen)}</div>
                                        <div class="tb-vehicle-line">Starttarief: € ${num(config.voertuigen.bus.start)}</div>
                                        <div class="tb-vehicle-line">Kilometertarief: € ${num(config.voertuigen.bus.km)}</div>
                                        <div class="tb-vehicle-line">Minuuttarief: € ${num(config.voertuigen.bus.minuut)}</div>
                                    </label>
                                </div>
                            </div>

                            <div class="tb-buttons">
                                <button type="button" class="tb-btn tb-btn-light" id="taxi-booking-back-2">${esc(config.teksten.vorige)}</button>
                                <button type="button" class="tb-btn tb-btn-dark" id="taxi-booking-next-2">${esc(config.teksten.volgende)}</button>
                            </div>
                        </div>
                    </div>

                    <div class="tb-step" data-step="3">
                        <div class="tb-panel">
                            <h3>${esc(config.teksten.contact_titel)}</h3>
                            <p class="tb-panel-sub">${esc(config.teksten.contact_subtitel)}</p>

                            <div class="tb-row">
                                <div class="tb-field">
                                    <label>Naam *</label>
                                    <div class="tb-input-wrap">
                                        <span class="tb-ico">${icon('user')}</span>
                                        <input type="text" id="taxi-booking-name" placeholder="Uw naam">
                                    </div>
                                    <div class="tb-error" id="taxi-booking-name-error"></div>
                                </div>

                                <div class="tb-field">
                                    <label>Telefoon *</label>
                                    <div class="tb-input-wrap">
                                        <span class="tb-ico">${icon('phone')}</span>
                                        <input type="tel" id="taxi-booking-phone" placeholder="Uw telefoonnummer">
                                    </div>
                                    <div class="tb-error" id="taxi-booking-phone-error"></div>
                                </div>
                            </div>

                            <div class="tb-field">
                                <label>E-mail *</label>
                                <div class="tb-input-wrap">
                                    <span class="tb-ico">${icon('mail')}</span>
                                    <input type="email" id="taxi-booking-email" placeholder="Uw e-mailadres">
                                </div>
                                <div class="tb-error" id="taxi-booking-email-error"></div>
                            </div>

                            <div class="tb-field">
                                <label>Opmerking</label>
                                <div class="tb-input-wrap">
                                    <span class="tb-ico">${icon('note')}</span>
                                    <textarea id="taxi-booking-notes" placeholder="Extra informatie, bagage, vluchtnummer, enz."></textarea>
                                </div>
                            </div>

                            <div class="tb-buttons">
                                <button type="button" class="tb-btn tb-btn-light" id="taxi-booking-back-3">${esc(config.teksten.vorige)}</button>
                                <button type="button" class="tb-btn tb-btn-dark" id="taxi-booking-next-3">${esc(config.teksten.volgende)}</button>
                            </div>
                        </div>
                    </div>

                    <div class="tb-step" data-step="4">
                        <div class="tb-panel">
                            <h3>${esc(config.teksten.controle_titel)}</h3>
                            <p class="tb-panel-sub">Controleer uw gegevens en verstuur daarna direct via WhatsApp, delen of e-mail.</p>

                            <div class="tb-summary">
                                <div class="tb-summary-item"><span>Rit type</span><strong id="taxi-booking-sum-triptype">-</strong></div>
                                <div class="tb-summary-item"><span>Voertuig</span><strong id="taxi-booking-sum-vehicle">-</strong></div>
                                <div class="tb-summary-item"><span>Passagiers</span><strong id="taxi-booking-sum-passengers">-</strong></div>
                                <div class="tb-summary-item"><span>Ophaaladres</span><strong id="taxi-booking-sum-pickup">-</strong></div>
                                <div class="tb-summary-item"><span>Tussenstops</span><strong id="taxi-booking-sum-stops">-</strong></div>
                                <div class="tb-summary-item"><span>Bestemming</span><strong id="taxi-booking-sum-dropoff">-</strong></div>
                                <div class="tb-summary-item"><span>Heen datum/tijd</span><strong id="taxi-booking-sum-datetime1">-</strong></div>
                                <div class="tb-summary-item" id="taxi-booking-sum-return-row" style="display:none;"><span>Retour datum/tijd</span><strong id="taxi-booking-sum-datetime2">-</strong></div>
                                <div class="tb-summary-item"><span>Afstand</span><strong id="taxi-booking-sum-distance">-</strong></div>
                                <div class="tb-summary-item"><span>Reistijd</span><strong id="taxi-booking-sum-duration">-</strong></div>
                                <div class="tb-summary-item"><span>Basisprijs</span><strong id="taxi-booking-sum-base">-</strong></div>
                                <div class="tb-summary-item"><span>Korting</span><strong id="taxi-booking-sum-discount">-</strong></div>
                                <div class="tb-summary-item"><span>Naam</span><strong id="taxi-booking-sum-name">-</strong></div>
                                <div class="tb-summary-item"><span>Telefoon</span><strong id="taxi-booking-sum-phone">-</strong></div>
                                <div class="tb-summary-item"><span>E-mail</span><strong id="taxi-booking-sum-email">-</strong></div>
                            </div>

                            <div class="tb-total" id="taxi-booking-sum-total">Op aanvraag</div>
                            <div class="tb-note" id="taxi-booking-discount-note">Nog geen rit berekend.</div>
                            <div class="tb-note">${esc(config.teksten.privacy)}</div>

                            <div class="tb-buttons">
                                <button type="button" class="tb-btn tb-btn-light" id="taxi-booking-back-4">${esc(config.teksten.vorige)}</button>
                                <button type="button" class="tb-btn tb-btn-light" id="taxi-booking-share-booking">${esc(config.teksten.delen)}</button>
                                <button type="button" class="tb-btn tb-btn-dark" id="taxi-booking-send-email">Verstuur via e-mail</button>
                                <button type="button" class="tb-btn tb-btn-whatsapp" id="taxi-booking-send-whatsapp">Verstuur via WhatsApp</button>
                            </div>

                            <div class="tb-success" id="taxi-booking-success"></div>
                            <div class="tb-error" id="taxi-booking-share-error"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const els = {
            steps: root.querySelectorAll('.tb-step'),
            progress: root.querySelectorAll('.tb-progress-item'),
            pickup: root.querySelector('#taxi-booking-pickup'),
            dropoff: root.querySelector('#taxi-booking-dropoff'),
            stopsWrap: root.querySelector('#taxi-booking-stops'),
            addStop: root.querySelector('#taxi-booking-add-stop'),
            quickButtons: root.querySelectorAll('.tb-quick-btn'),
            date1: root.querySelector('#taxi-booking-date1'),
            time1: root.querySelector('#taxi-booking-time1'),
            date2: root.querySelector('#taxi-booking-date2'),
            time2: root.querySelector('#taxi-booking-time2'),
            returnFields: root.querySelector('#taxi-booking-return-fields'),
            passengersLabel: root.querySelector('#taxi-booking-passengers'),
            minus: root.querySelector('#taxi-booking-minus'),
            plus: root.querySelector('#taxi-booking-plus'),
            calculate: root.querySelector('#taxi-booking-calculate'),
            map: root.querySelector('#taxi-booking-map'),
            distance: root.querySelector('#taxi-booking-distance'),
            duration: root.querySelector('#taxi-booking-duration'),
            price: root.querySelector('#taxi-booking-price'),
            routeError: root.querySelector('#taxi-booking-route-error'),
            back2: root.querySelector('#taxi-booking-back-2'),
            next2: root.querySelector('#taxi-booking-next-2'),
            back3: root.querySelector('#taxi-booking-back-3'),
            next3: root.querySelector('#taxi-booking-next-3'),
            back4: root.querySelector('#taxi-booking-back-4'),
            shareBooking: root.querySelector('#taxi-booking-share-booking'),
            sendEmail: root.querySelector('#taxi-booking-send-email'),
            sendWhatsapp: root.querySelector('#taxi-booking-send-whatsapp'),
            name: root.querySelector('#taxi-booking-name'),
            phone: root.querySelector('#taxi-booking-phone'),
            email: root.querySelector('#taxi-booking-email'),
            notes: root.querySelector('#taxi-booking-notes'),
            success: root.querySelector('#taxi-booking-success'),
            shareError: root.querySelector('#taxi-booking-share-error'),
            sumTriptype: root.querySelector('#taxi-booking-sum-triptype'),
            sumVehicle: root.querySelector('#taxi-booking-sum-vehicle'),
            sumPassengers: root.querySelector('#taxi-booking-sum-passengers'),
            sumPickup: root.querySelector('#taxi-booking-sum-pickup'),
            sumStops: root.querySelector('#taxi-booking-sum-stops'),
            sumDropoff: root.querySelector('#taxi-booking-sum-dropoff'),
            sumDatetime1: root.querySelector('#taxi-booking-sum-datetime1'),
            sumDatetime2: root.querySelector('#taxi-booking-sum-datetime2'),
            sumReturnRow: root.querySelector('#taxi-booking-sum-return-row'),
            sumDistance: root.querySelector('#taxi-booking-sum-distance'),
            sumDuration: root.querySelector('#taxi-booking-sum-duration'),
            sumBase: root.querySelector('#taxi-booking-sum-base'),
            sumDiscount: root.querySelector('#taxi-booking-sum-discount'),
            sumName: root.querySelector('#taxi-booking-sum-name'),
            sumPhone: root.querySelector('#taxi-booking-sum-phone'),
            sumEmail: root.querySelector('#taxi-booking-sum-email'),
            sumTotal: root.querySelector('#taxi-booking-sum-total'),
            discountNote: root.querySelector('#taxi-booking-discount-note')
        };



        function setupNativeDateTimePlaceholders(){
            [
                { el: els.date1, text: 'Selecteer datum' },
                { el: els.time1, text: 'Selecteer tijd' },
                { el: els.date2, text: 'Selecteer datum' },
                { el: els.time2, text: 'Selecteer tijd' }
            ].forEach(function(item){
                if(!item.el) return;

                const wrap = item.el.closest('.tb-input-wrap');
                if(!wrap) return;

                wrap.classList.add('tb-native-placeholder');
                item.el.setAttribute('placeholder', item.text);
                item.el.setAttribute('data-placeholder', item.text);

                let placeholder = wrap.querySelector('.tb-placeholder-text');
                if(!placeholder){
                    placeholder = document.createElement('span');
                    placeholder.className = 'tb-placeholder-text';
                    wrap.appendChild(placeholder);
                }
                placeholder.textContent = item.text;

                function syncPlaceholder(){
                    const empty = !item.el.value;
                    item.el.classList.toggle('tb-empty-native', empty);
                    wrap.classList.toggle('tb-has-value', !empty);
                }

                item.el.addEventListener('input', syncPlaceholder);
                item.el.addEventListener('change', syncPlaceholder);
                item.el.addEventListener('blur', syncPlaceholder);
                item.el.addEventListener('focus', syncPlaceholder);
                syncPlaceholder();
            });
        }

        setupNativeDateTimePlaceholders();

        const state = {
            step: 1,
            passengers: 1,
            stopCount: 0,
            map: null,
            directionsService: null,
            directionsRenderer: null,
            distanceKm: 0,
            durationMin: 0,
            basePrice: 0,
            discountPct: 0,
            discountAmount: 0,
            finalPrice: 0
        };

        function clearErrors(){
            root.querySelectorAll('.tb-error').forEach(function(e){
                e.textContent = '';
            });
            els.success.textContent = '';
            els.shareError.textContent = '';
        }

        function getTripType(){
            const c = root.querySelector('input[name="taxi-booking-triptype"]:checked');
            return c ? c.value : 'single';
        }

        function getVehicle(){
            const c = root.querySelector('input[name="taxi-booking-vehicle"]:checked');
            return c ? c.value : 'auto';
        }

        function getVehicleData(){
            return config.voertuigen[getVehicle()];
        }

        function showStep(n){
            state.step = n;
            els.steps.forEach(function(s){ s.classList.remove('active'); });
            els.progress.forEach(function(p){
                const progressStep = parseInt(p.getAttribute('data-progress'), 10);
                p.classList.remove('active', 'done');
                if(progressStep < n){
                    p.classList.add('done');
                }
            });

            const stepEl = root.querySelector('.tb-step[data-step="' + n + '"]');
            const progressEl = root.querySelector('.tb-progress-item[data-progress="' + n + '"]');

            if(stepEl) stepEl.classList.add('active');
            if(progressEl) progressEl.classList.add('active');

            if(n === 4){
                updateSummary();
            }

            root.scrollIntoView({behavior:'smooth', block:'start'});
        }

        function pad(n){
            return String(n).padStart(2, '0');
        }

        function getMinimumBookingDateTime(){
            const now = new Date();
            return new Date(now.getTime() + (60 * 60 * 1000));
        }

        function formatDateValue(date){
            return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
        }

        function formatTimeValue(date){
            return pad(date.getHours()) + ':' + pad(date.getMinutes());
        }

        function setDateMin(){
            const minDt = getMinimumBookingDateTime();
            const minDate = formatDateValue(minDt);
            els.date1.min = minDate;
            els.date2.min = minDate;
        }

        function updateTimeMinConstraints(){
            const minDt = getMinimumBookingDateTime();
            const minDate = formatDateValue(minDt);
            const minTime = formatTimeValue(minDt);

            if(els.date1.value === minDate){
                els.time1.min = minTime;
            } else {
                els.time1.min = '00:00';
            }

            if(els.date2.value === minDate){
                els.time2.min = minTime;
            } else {
                els.time2.min = '00:00';
            }
        }

        function getDateTimeFromInputs(dateValue, timeValue){
            if(!dateValue || !timeValue) return null;

            const parts = dateValue.split('-');
            const timeParts = timeValue.split(':');

            if(parts.length !== 3 || timeParts.length < 2) return null;

            return new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2]),
                Number(timeParts[0]),
                Number(timeParts[1]),
                0,
                0
            );
        }

        function isAtLeastOneHourAhead(dateValue, timeValue){
            const bookingDt = getDateTimeFromInputs(dateValue, timeValue);
            if(!bookingDt) return false;

            const minimumDt = getMinimumBookingDateTime();
            return bookingDt.getTime() >= minimumDt.getTime();
        }

        function validateEmail(email){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function getStops(){
            return Array.from(root.querySelectorAll('.tb-stop-input'))
                .map(function(i){ return i.value.trim(); })
                .filter(Boolean);
        }

        function updateStopLabels(){
            const labels = root.querySelectorAll('.tb-stop-item label');
            labels.forEach(function(label, index){
                label.textContent = 'Tussenstop ' + (index + 1);
            });
            state.stopCount = labels.length;
        }

        function calculateRoutePreviewIfPossible(){
            const pickup = els.pickup.value.trim();
            const dropoff = els.dropoff.value.trim();

            if(!pickup || !dropoff) return;
            if(!state.directionsService || !state.directionsRenderer) return;

            calculateRoute(false);
        }

        function createAutocomplete(input, countries){
            if(!(typeof google !== 'undefined' && google.maps && google.maps.places)) return null;

            /*
             * Google adres-suggesties:
             * - Ophaaladres, tussenstops en bestemming: Nederland, Duitsland en België.
             * Hierdoor komt niet heel Europa tevoorschijn, maar kun je wel ritten vanuit/naar buurlanden invullen.
             */
            const countryList = Array.isArray(countries) && countries.length ? countries.map(function(c){ return String(c).toLowerCase(); }) : ['nl'];
            const isNetherlandsOnly = countryList.length === 1 && countryList[0] === 'nl';

            const nlBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(50.7504, 3.3316),
                new google.maps.LatLng(53.5550, 7.2275)
            );

            const options = {
                fields: ['formatted_address','geometry','name','address_components'],
                componentRestrictions: { country: isNetherlandsOnly ? 'nl' : countryList },
                bounds: nlBounds,
                strictBounds: isNetherlandsOnly
            };

            if(isNetherlandsOnly){
                options.types = ['address'];
            }

            const autocomplete = new google.maps.places.Autocomplete(input, options);

            autocomplete.addListener('place_changed', function(){
                setTimeout(function(){
                    calculateRoutePreviewIfPossible();
                }, 150);
            });

            input.addEventListener('change', calculateRoutePreviewIfPossible);
            input.addEventListener('blur', function(){
                setTimeout(calculateRoutePreviewIfPossible, 150);
            });

            return autocomplete;
        }

        function addStopField(){
            state.stopCount++;

            const div = document.createElement('div');
            div.className = 'tb-field tb-stop-item';
            div.innerHTML = `
                <label>Tussenstop ${state.stopCount}</label>
                <div class="tb-stop-item-row">
                    <div class="tb-stop-input-wrap">
                        <span class="tb-ico">${icon('location')}</span>
                        <input type="text" class="tb-stop-input" placeholder="Voer tussenstop in">
                    </div>
                    <button type="button" class="tb-remove-stop" aria-label="Verwijderen">✕</button>
                </div>
            `;

            els.stopsWrap.appendChild(div);

            const input = div.querySelector('.tb-stop-input');
            const removeBtn = div.querySelector('.tb-remove-stop');

            removeBtn.addEventListener('click', function(){
                div.remove();
                updateStopLabels();
                calculateRoutePreviewIfPossible();
            });

            createAutocomplete(input, ['nl','de','be']);

            input.addEventListener('change', calculateRoutePreviewIfPossible);
            input.addEventListener('blur', function(){
                setTimeout(calculateRoutePreviewIfPossible, 150);
            });
        }

        function updateReturnVisibility(){
            els.returnFields.style.display = getTripType() === 'return' ? 'block' : 'none';
        }

        function getDiscountPct(distanceKm){
            let pct = 0;
            (config.kortingen || []).forEach(function(rule){
                if(distanceKm >= Number(rule.vanaf_km)){
                    pct = Math.max(pct, Number(rule.korting_pct));
                }
            });
            return pct;
        }

        function calculatePrice(){
            if (!state.distanceKm) {
                state.basePrice = state.discountPct = state.discountAmount = state.finalPrice = 0;
                return;
            }
            const vehicle = getVehicleData();
            let base = Number(vehicle.start) + (state.distanceKm * Number(vehicle.km)) + (state.durationMin * Number(vehicle.minuut));

            if(getTripType() === 'return'){
                base = base * 2;
            }

            const discountPct = getDiscountPct(state.distanceKm);
            const discountAmount = base * (discountPct / 100);
            const finalPrice = base - discountAmount;

            state.basePrice = base;
            state.discountPct = discountPct;
            state.discountAmount = discountAmount;
            state.finalPrice = finalPrice;
        }

        function validateStep1(){
            clearErrors();
            updateTimeMinConstraints();

            let ok = true;

            const pickup = els.pickup.value.trim();
            const dropoff = els.dropoff.value.trim();

            if(!pickup){
                root.querySelector('#taxi-booking-pickup-error').textContent = 'Vul een ophaaladres in.';
                ok = false;
            }

            if(!dropoff){
                root.querySelector('#taxi-booking-dropoff-error').textContent = 'Vul een bestemming in.';
                ok = false;
            }

            if(!els.date1.value){
                root.querySelector('#taxi-booking-date1-error').textContent = 'Kies een datum.';
                ok = false;
            }

            if(!els.time1.value){
                root.querySelector('#taxi-booking-time1-error').textContent = 'Kies een tijd.';
                ok = false;
            }

            if(els.date1.value && els.time1.value && !isAtLeastOneHourAhead(els.date1.value, els.time1.value)){
                root.querySelector('#taxi-booking-time1-error').textContent = '❗ Je kunt alleen minimaal 1 uur van tevoren boeken.';
                ok = false;
            }

            if(getTripType() === 'return'){
                if(!els.date2.value){
                    root.querySelector('#taxi-booking-date2-error').textContent = 'Kies een retour datum.';
                    ok = false;
                }

                if(!els.time2.value){
                    root.querySelector('#taxi-booking-time2-error').textContent = 'Kies een retour tijd.';
                    ok = false;
                }

                if(els.date2.value && els.time2.value && !isAtLeastOneHourAhead(els.date2.value, els.time2.value)){
                    root.querySelector('#taxi-booking-time2-error').textContent = '❗ Retour moet ook minimaal 1 uur van tevoren zijn.';
                    ok = false;
                }
            }

            if (getTripType() === 'return' && els.date2.value && els.time2.value) {
                const outward = getDateTimeFromInputs(els.date1.value, els.time1.value);
                const inward = getDateTimeFromInputs(els.date2.value, els.time2.value);
                if (outward && inward && inward <= outward) {
                    root.querySelector('#taxi-booking-time2-error').textContent = 'Kies een retourtijd na de heenrit.';
                    ok = false;
                }
            }

            return ok;
        }

        function validateStep2(){
            clearErrors();

            if(!validateStep1()){
                showStep(1);
                return false;
            }

            const vehicle = getVehicle();
            if(state.passengers >= 5 && vehicle !== 'bus'){
                els.routeError.textContent = 'Voor 5 t/m 8 passagiers moet een bus geselecteerd worden.';
                showStep(2);
                return false;
            }

            return true;
        }

        function validateStep3(){
            clearErrors();
            let ok = true;

            if(!els.name.value.trim()){
                root.querySelector('#taxi-booking-name-error').textContent = 'Vul uw naam in.';
                ok = false;
            }

            if(!els.phone.value.trim()){
                root.querySelector('#taxi-booking-phone-error').textContent = 'Vul uw telefoonnummer in.';
                ok = false;
            }

            if(!els.email.value.trim()){
                root.querySelector('#taxi-booking-email-error').textContent = 'Vul uw e-mailadres in.';
                ok = false;
            } else if(!validateEmail(els.email.value.trim())){
                root.querySelector('#taxi-booking-email-error').textContent = 'Vul een geldig e-mailadres in.';
                ok = false;
            }

            return ok;
        }

        function updateSummary(){
            calculatePrice();

            const vehicle = getVehicleData();
            const stops = getStops();

            els.sumTriptype.textContent = getTripType() === 'return' ? 'Retour' : 'Enkele reis';
            els.sumVehicle.textContent = vehicle.naam + ' (' + vehicle.personen + ')';
            els.sumPassengers.textContent = String(state.passengers);
            els.sumPickup.textContent = els.pickup.value.trim() || '-';
            els.sumStops.textContent = stops.length ? stops.join(' | ') : '-';
            els.sumDropoff.textContent = els.dropoff.value.trim() || '-';
            els.sumDatetime1.textContent = (els.date1.value || '-') + ' ' + (els.time1.value || '-');
            els.sumDistance.textContent = state.distanceKm > 0 ? num(state.distanceKm) + ' km' : '-';
            els.sumDuration.textContent = state.durationMin > 0 ? Math.round(state.durationMin) + ' min' : '-';
            els.sumBase.textContent = state.basePrice > 0 ? money(state.basePrice) : '-';
            els.sumDiscount.textContent = state.discountPct > 0 ? state.discountPct + '% (- ' + money(state.discountAmount) + ')' : 'Geen korting';
            els.sumName.textContent = els.name.value.trim() || '-';
            els.sumPhone.textContent = els.phone.value.trim() || '-';
            els.sumEmail.textContent = els.email.value.trim() || '-';
            els.sumTotal.textContent = state.finalPrice > 0 ? money(state.finalPrice) : 'Op aanvraag';

            if(getTripType() === 'return'){
                els.sumReturnRow.style.display = 'flex';
                els.sumDatetime2.textContent = (els.date2.value || '-') + ' ' + (els.time2.value || '-');
            } else {
                els.sumReturnRow.style.display = 'none';
                els.sumDatetime2.textContent = '-';
            }

            if(state.distanceKm > 0){
                if(state.discountPct > 0){
                    els.discountNote.textContent = 'Korting toegepast: ' + state.discountPct + '% bij ' + num(state.distanceKm) + ' km.';
                } else {
                    els.discountNote.textContent = 'Voor deze afstand geldt geen afstandskorting.';
                }
            } else {
                els.discountNote.textContent = 'Nog geen rit berekend.';
            }

            els.price.textContent = state.finalPrice > 0 ? money(state.finalPrice) : 'Op aanvraag';
        }

        function buildWaypoints(){
            return getStops().map(function(address){
                return {
                    location: address,
                    stopover: true
                };
            });
        }

        function initMap(){
            els.map.parentElement.hidden = false;
            els.calculate.textContent = 'Bereken ritprijs';
            if(typeof google === 'undefined' || !google.maps){
                els.routeError.textContent = 'Google Maps is niet geladen. Controleer uw API key.';
                return;
            }

            state.map = new google.maps.Map(els.map, {
                center: {
                    lat: Number(config.default_map_center.lat),
                    lng: Number(config.default_map_center.lng)
                },
                zoom: 6,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: true
            });

            state.directionsService = new google.maps.DirectionsService();
            state.directionsRenderer = new google.maps.DirectionsRenderer({
                map: state.map,
                suppressMarkers: false,
                preserveViewport: false
            });

            createAutocomplete(els.pickup, ['nl','de','be']);
            createAutocomplete(els.dropoff, ['nl','de','be']);
        }

        function calculateRoute(goNext){
            if(typeof goNext === 'undefined') goNext = true;

            clearErrors();
            updateTimeMinConstraints();

            const pickup = els.pickup.value.trim();
            const dropoff = els.dropoff.value.trim();

            if(!pickup){
                root.querySelector('#taxi-booking-pickup-error').textContent = 'Vul een ophaaladres in.';
                return;
            }

            if(!dropoff){
                root.querySelector('#taxi-booking-dropoff-error').textContent = 'Vul een bestemming in.';
                return;
            }

            if(!state.directionsService || !state.directionsRenderer){
                if (goNext && validateStep1()) showStep(2);
                return;
            }

            state.directionsService.route({
                origin: pickup,
                destination: dropoff,
                waypoints: buildWaypoints(),
                optimizeWaypoints: false,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                provideRouteAlternatives: false
            }, function(result, status){
                if(status !== 'OK' || !result || !result.routes || !result.routes[0]){
                    state.distanceKm = state.durationMin = 0;
                    if (goNext && validateStep1()) showStep(2);
                    else els.routeError.textContent = 'Controleer de adressen voor een prijsindicatie.';

                    return;
                }

                state.directionsRenderer.setDirections(result);

                const route = result.routes[0];
                const legs = route.legs || [];
                let distanceMeters = 0;
                let durationSeconds = 0;

                legs.forEach(function(leg){
                    if(leg.distance) distanceMeters += Number(leg.distance.value || 0);
                    if(leg.duration) durationSeconds += Number(leg.duration.value || 0);
                });

                state.distanceKm = distanceMeters / 1000;
                state.durationMin = durationSeconds / 60;

                calculatePrice();

                els.distance.textContent = num(state.distanceKm) + ' km';
                els.duration.textContent = Math.round(state.durationMin) + ' min';
                els.price.textContent = money(state.finalPrice);

                if(route.bounds && state.map){
                    state.map.fitBounds(route.bounds);
                } else if(state.directionsRenderer && state.directionsRenderer.getDirections()){
                    const dir = state.directionsRenderer.getDirections();
                    if(dir && dir.routes && dir.routes[0] && dir.routes[0].bounds){
                        state.map.fitBounds(dir.routes[0].bounds);
                    }
                }

                google.maps.event.trigger(state.map, 'resize');

                setTimeout(function(){
                    if(route.bounds && state.map){
                        state.map.fitBounds(route.bounds);
                    }
                }, 250);

                if(goNext){
                    if(validateStep1()){
                        showStep(2);
                    } else {
                        showStep(1);
                    }
                }
            });
        }

        function formatShareDate(value){
            if(!value) return '-';

            const parts = value.split('-');
            if(parts.length !== 3) return value;

            const year = parts[0];
            const month = parseInt(parts[1], 10);
            const day = parseInt(parts[2], 10);

            if(!year || !month || !day) return value;

            return day + '-' + month + '-' + year;
        }

        function getBookingMessage(){
            updateSummary();

            const stops = getStops();
            const isReturn = getTripType() === 'return';
            const vehicle = getVehicleData();
            const lines = [];

            lines.push('🚕 TAXI TCO - BOEKINGSAANVRAAG');
            lines.push('');

            lines.push('📍 RITGEGEVENS');
            lines.push('Ophalen: ' + els.pickup.value.trim());

            if(stops.length){
                lines.push('Tussenstop(s): ' + stops.join(' | '));
            }

            lines.push('Bestemming: ' + els.dropoff.value.trim());
            lines.push('Heen: ' + formatShareDate(els.date1.value) + ' om ' + els.time1.value);

            if(isReturn){
                lines.push('Retour: ' + formatShareDate(els.date2.value) + ' om ' + els.time2.value);
            }

            lines.push('');
            lines.push('👥 REISGEGEVENS');
            lines.push('Rittype: ' + (isReturn ? 'Retour' : 'Enkele reis'));
            lines.push('Voertuig: ' + vehicle.naam + ' (' + vehicle.personen + ')');
            lines.push('Passagiers: ' + state.passengers);

            lines.push('');
			lines.push('💳 PRIJS');
            lines.push('Afstand: ' + (state.distanceKm > 0 ? num(state.distanceKm) + ' km' : '-'));
            lines.push('Reistijd: ' + (state.durationMin > 0 ? Math.round(state.durationMin) + ' min' : '-'));
            lines.push('Basisprijs: ' + (state.distanceKm ? money(state.basePrice) : 'Op aanvraag'));

            if(state.discountPct > 0){
                lines.push('Korting: ' + state.discountPct + '% (- ' + money(state.discountAmount) + ')');
            } else {
                lines.push('Korting: Geen korting');
            }

            lines.push('Totaalprijs: ' + (state.distanceKm ? money(state.finalPrice) : 'Op aanvraag'));

            lines.push('');
            lines.push('👤 CONTACT');
            lines.push('Naam: ' + els.name.value.trim());
            lines.push('Telefoon: ' + els.phone.value.trim());
            lines.push('E-mail: ' + els.email.value.trim());

            if(els.notes.value.trim()){
                lines.push('Opmerking: ' + els.notes.value.trim());
            }

            lines.push('');
            lines.push('Dit is een prijsindicatie. De boeking is pas definitief na bevestiging door Taxi TCO.');

            return lines.join('\n');
        }

        async function shareBooking(){
            if(!validateStep1()) {
                showStep(1);
                return;
            }
            if(!validateStep2()) {
                return;
            }
            if(!validateStep3()) {
                showStep(3);
                return;
            }

            const message = getBookingMessage();
            els.success.textContent = '';
            els.shareError.textContent = '';

            if(navigator.share){
                try{
                    await navigator.share({
                        title: 'Taxi boeking',
                        text: message
                    });
                    els.success.textContent = 'Boeking is gedeeld.';
                } catch(e){}
                return;
            }

            if(navigator.clipboard){
                try{
                    await navigator.clipboard.writeText(message);
                    els.success.textContent = 'Boeking is gekopieerd. U kunt deze nu plakken in WhatsApp, sms of e-mail.';
                } catch(e){
                    els.shareError.textContent = 'Delen is niet beschikbaar op dit apparaat.';
                }
            } else {
                els.shareError.textContent = 'Delen is niet beschikbaar op dit apparaat.';
            }
        }

        async function sendEmailBooking(){
            if(!validateStep1()) {
                showStep(1);
                return;
            }
            if(!validateStep2()) {
                return;
            }
            if(!validateStep3()) {
                showStep(3);
                return;
            }

            updateSummary();
            clearErrors();

            window.location.href = 'mailto:' + config.email + '?subject='
                + encodeURIComponent('Taxirit aanvragen') + '&body=' + encodeURIComponent(getBookingMessage());
        }

        function sendWhatsapp(){
            if(!validateStep1()) {
                showStep(1);
                return;
            }
            if(!validateStep2()) {
                return;
            }
            if(!validateStep3()) {
                showStep(3);
                return;
            }

            const phone = '31645045025';
            if(!phone){
                els.shareError.textContent = 'WhatsApp nummer ontbreekt bovenin de code.';
                return;
            }

            const message = getBookingMessage();
            const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
            window.open(url, '_blank');
        }

        function bind(){
            setDateMin();
            updateTimeMinConstraints();
            updateReturnVisibility();

            root.querySelectorAll('input[name="taxi-booking-triptype"]').forEach(function(el){
                el.addEventListener('change', function(){
                    updateReturnVisibility();
                    updateTimeMinConstraints();
                    calculatePrice();
                    updateSummary();
                });
            });

            root.querySelectorAll('input[name="taxi-booking-vehicle"]').forEach(function(el){
                el.addEventListener('change', function(){
                    calculatePrice();
                    updateSummary();
                });
            });

            els.date1.addEventListener('change', function(){
                updateTimeMinConstraints();
                validateStep1();
            });

            els.time1.addEventListener('change', function(){
                validateStep1();
            });

            els.date2.addEventListener('change', function(){
                updateTimeMinConstraints();
                validateStep1();
            });

            els.time2.addEventListener('change', function(){
                validateStep1();
            });

            els.time1.addEventListener('focus', updateTimeMinConstraints);
            els.time2.addEventListener('focus', updateTimeMinConstraints);

            els.addStop.addEventListener('click', addStopField);

            els.quickButtons.forEach(function(btn){
                btn.addEventListener('click', function(){
                    els.dropoff.value = btn.getAttribute('data-address') || btn.textContent.trim();
                    calculateRoutePreviewIfPossible();
                });
            });

            els.minus.addEventListener('click', function(){
                if(state.passengers > 1){
                    state.passengers--;
                    els.passengersLabel.textContent = String(state.passengers);

                    if(state.passengers <= 4){
                        root.querySelector('#taxi-booking-vehicle-auto').checked = true;
                    }
                }
            });

            els.plus.addEventListener('click', function(){
                if(state.passengers < 8){
                    state.passengers++;
                    els.passengersLabel.textContent = String(state.passengers);

                    if(state.passengers >= 5){
                        root.querySelector('#taxi-booking-vehicle-bus').checked = true;
                    }
                }
            });

            els.calculate.addEventListener('click', function(){
                calculateRoute(true);
            });

            els.back2.addEventListener('click', function(){ showStep(1); });

            els.next2.addEventListener('click', function(){
                if(validateStep2()){
                    showStep(3);
                } else {
                    showStep(1);
                }
            });

            els.back3.addEventListener('click', function(){ showStep(2); });

            els.next3.addEventListener('click', function(){
                if(!validateStep1()){
                    showStep(1);
                    return;
                }

                if(!validateStep2()){
                    showStep(2);
                    return;
                }

                if(validateStep3()){
                    updateSummary();
                    showStep(4);
                }
            });

            els.back4.addEventListener('click', function(){ showStep(3); });
            els.shareBooking.addEventListener('click', shareBooking);
            els.sendEmail.addEventListener('click', sendEmailBooking);
            els.sendWhatsapp.addEventListener('click', sendWhatsapp);
        }

        els.map.parentElement.hidden = true;
        bind();
        els.pickup.placeholder = root.dataset.pickup || 'Straat, huisnummer en plaats';
        els.dropoff.placeholder = root.dataset.dropoff || 'Straat, huisnummer en plaats';
        if (config.mapsKey) {
            window.initTcoMap = initMap;
            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?' + new URLSearchParams({
                key: config.mapsKey, libraries: 'places', language: 'nl', region: 'NL',
                loading: 'async', callback: 'initTcoMap'
            });
            script.async = true;
            document.head.append(script);
        }
    })();
