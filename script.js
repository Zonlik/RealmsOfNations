// Копирование IP
function copyIP() {
    const ip = document.getElementById('ip').textContent;
    navigator.clipboard.writeText(ip);
    alert('IP адрес скопирован: ' + ip);
}

// Статус сервера
async function getServerStatus() {
    try {
        const response = await fetch('https://api.mcsrvstat.us/2/realmofnations.my-craft.cc:36020');
        const data = await response.json();
        
        const playersEl = document.getElementById('players');
        const statusEl = document.getElementById('status');
        const serverStatus = document.getElementById('server-status');
        const onlinePlayers = document.getElementById('online-players');
        
        if (data.online) {
            const count = data.players.online || '?';
            if (playersEl) playersEl.textContent = count;
            if (statusEl) statusEl.innerHTML = `🟢 Онлайн: <span id="players">${count}</span> игроков`;
            if (serverStatus) serverStatus.textContent = '🟢 Онлайн';
            if (serverStatus) serverStatus.style.color = '#4ade80';
            if (onlinePlayers) onlinePlayers.textContent = count;
        } else {
            if (statusEl) statusEl.innerHTML = '🔴 Сервер офлайн';
            if (serverStatus) {
                serverStatus.textContent = '🔴 Офлайн';
                serverStatus.style.color = '#f87171';
            }
            if (onlinePlayers) onlinePlayers.textContent = '0';
        }
    } catch (e) {
        const statusEl = document.getElementById('status');
        if (statusEl) statusEl.innerHTML = '🟡 Не удалось получить статус';
    }
}

// Покупка доната
function buyDonate(title, price) {
    const message = `Я хочу купить титул «${title}» за ${price} ₽!`;
    const encoded = encodeURIComponent(message);
    const telegram = `https://t.me/ваш_ник`; // Замени на свой Telegram
    const discord = `https://discord.gg/ваш_сервер`; // Замени на свой Discord
    
    if (confirm(`Ты точно хочешь купить титул «${title}» за ${price} ₽?\n\nПосле оплаты напиши администратору на сервере: /msg Admin`)) {
        alert(`Для покупки титула «${title}»:\n\n1. Оплати ${price} ₽\n2. Напиши администратору на сервере: /msg Admin\n3. Получи титул!`);
        // Открыть Telegram или Discord для связи
        if (confirm('Открыть Telegram для связи?')) {
            window.open(telegram, '_blank');
        }
    }
}

// Обновляем статус каждые 30 секунд
getServerStatus();
setInterval(getServerStatus, 30000);
