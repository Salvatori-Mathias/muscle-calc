window.onload = function() {
    
    // 1RM CALCULATOR
    document.getElementById('calcBtn').addEventListener('click', function() {
        const weight = parseFloat(document.getElementById('weight').value);
        const reps = parseInt(document.getElementById('reps').value);
        
        if (weight && reps) {
            const oneRM = Math.round(weight / (1.0278 - 0.0278 * reps) * 100) / 100;
            document.getElementById('result').innerHTML = `1RM: <strong>${oneRM.toFixed(1)}kg</strong>`;
            document.getElementById('result').classList.remove('hidden');
            
            const percents = [90, 85, 80, 75, 70];
            let html = '';
            percents.forEach(p => {
                const w = (oneRM * p / 100).toFixed(1);
                html += `<div class="percent-item">${p}% = ${w}kg</div>`;
            });
            document.querySelector('.percent-grid').innerHTML = html;
            document.getElementById('percentages').classList.remove('hidden');
        }
    });

    // TIMER + MODALE
    let timerInt = null;
    let running = false;
    let seconds = 0;
    
    function updateDisplay() {
        const display = document.querySelector('.timer-display');
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        display.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }

    document.getElementById('startTimer').addEventListener('click', function() {
        const mins = parseInt(document.getElementById('timerMin').value) || 0;
        const secs = parseInt(document.getElementById('timerSec').value) || 0;
        
        if (mins === 0 && secs === 0) {
            alert('⏰ Entre du temps !');
            return;
        }
        
        seconds = mins * 60 + secs;
        updateDisplay();
        
        if (!running) {
            this.textContent = '⏸️ PAUSE';
            running = true;
            timerInt = setInterval(() => {
                seconds--;
                updateDisplay();
                if (seconds <= 0) {
                    clearInterval(timerInt);
                    timerInt = null;
                    running = false;
                    this.textContent = 'START';
                    navigator.vibrate?.([500,200,500]);
                    document.getElementById('timeUpModal').classList.add('active'); // ✅ MODALE
                }
            }, 1000);
        } else {
            clearInterval(timerInt);
            timerInt = null;
            running = false;
            this.textContent = 'START';
        }
    });

    document.getElementById('resetTimer').addEventListener('click', function() {
        if (timerInt) clearInterval(timerInt);
        running = false;
        document.getElementById('startTimer').textContent = 'START';
        document.getElementById('timerMin').value = '0';
        document.getElementById('timerSec').value = '0';
        seconds = 0;
        updateDisplay();
    });

    // MODALE - Fermer
    window.closeTimeUpModal = function() {
        document.getElementById('timeUpModal').classList.remove('active');
    };

    // Initialisation
    updateDisplay();
};
