// Counter functionality
let count = 0;
const countElement = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');
const resetBtn = document.getElementById('resetBtn');

incrementBtn.addEventListener('click', () => {
    count++;
    countElement.textContent = count;
    countElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        countElement.style.transform = 'scale(1)';
    }, 200);
});

resetBtn.addEventListener('click', () => {
    count = 0;
    countElement.textContent = count;
    countElement.style.color = '#667eea';
});

// Time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('time').textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);

// Color changer
const colorBtn = document.getElementById('colorBtn');
const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

let colorIndex = 0;

colorBtn.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.background = colors[colorIndex];
});

// Add some interactivity to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
        setTimeout(() => {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        }, 300);
    });
});