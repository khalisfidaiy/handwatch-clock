document.addEventListener('DOMContentLoaded', () => {
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');

    const updateTimezones = () => {
        const now = new Date();

        // Time zone offsets in hours
        const zones = [
            { id: 'time-hanoi',    label: 'Asia/Bangkok' }, // Hanoi, Vietnam (UTC+7)
            { id: 'time-surabaya', label: 'Asia/Jakarta' }, // Surabaya, Indonesia (UTC+7)
            { id: 'time-london',   label: 'Europe/London' }, // London, UK (UTC+0 or +1 DST)
            { id: 'time-ny',       label: 'America/New_York' }, // New York, USA (UTC-5 or -4 DST)
        ];

        zones.forEach(zone => {
            const tzTime = now.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: zone.label
            });
            const el = document.getElementById(zone.id);
            if (el) el.textContent = tzTime;
        });
    };

    const updateClock = () => {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondsDegrees = ((seconds / 60) * 360) + 90;
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

        if (secondHand && minuteHand && hourHand) {
            secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
            minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
            hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
        }
    };

    const updateDigitalClock = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const digitalClock = document.getElementById('digital-clock');
        if (digitalClock) {
            digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
        }
    };


    setInterval(() => {
        updateClock();
        updateDigitalClock();
        updateTimezones();
    }, 1000);

    updateClock();
    updateDigitalClock();
    updateTimezones();   
});