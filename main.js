/**
 * SMAN 1 RANTAU KOPAR - Main Interactive Script
 * Data source: Kemendikdasmen Official API
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCounters();
  initCharts();
  initTeacherFilter();
  initTeacherSearch();
  initContactForm();
});

// Mobile menu toggle
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
    // Close menu when clicking link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }
}

// Animated stats counter
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  const speed = 40;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const isDecimal = counter.getAttribute('data-decimal') === 'true';
        let count = 0;
        const step = target / speed;

        const updateCount = () => {
          count += step;
          if (count < target) {
            counter.innerText = isDecimal ? count.toFixed(1) + '%' : Math.ceil(count);
            setTimeout(updateCount, 25);
          } else {
            counter.innerText = isDecimal ? target + '%' : target;
          }
        };

        updateCount();
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// Chart.js data visualization
function initCharts() {
  // Chart 1: Siswa per Tingkat (Kelas 10, 11, 12)
  const ctxSiswa = document.getElementById('siswaClassChart');
  if (ctxSiswa) {
    new Chart(ctxSiswa, {
      type: 'bar',
      data: {
        labels: ['Kelas 10 (Fase E)', 'Kelas 11 (Fase F)', 'Kelas 12'],
        datasets: [
          {
            label: 'Laki-Laki',
            data: [44, 42, 42],
            backgroundColor: '#0f4c81',
            borderRadius: 6
          },
          {
            label: 'Perempuan',
            data: [51, 40, 35],
            backgroundColor: '#f59e0b',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              footer: (items) => {
                let sum = 0;
                items.forEach(i => sum += i.parsed.y);
                return 'Total Rombel: ' + sum + ' Siswa';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 10 }
          }
        }
      }
    });
  }

  // Chart 2: Komposisi Gender Siswa
  const ctxGender = document.getElementById('genderChart');
  if (ctxGender) {
    new Chart(ctxGender, {
      type: 'doughnut',
      data: {
        labels: ['Laki-Laki (128)', 'Perempuan (126)'],
        datasets: [{
          data: [128, 126],
          backgroundColor: ['#0f4c81', '#f59e0b'],
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        cutout: '65%'
      }
    });
  }
}

// Filter teacher cards
function initTeacherFilter() {
  const filterBtns = document.querySelectorAll('.guru-filter-btn');
  const cards = document.querySelectorAll('.guru-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-navy-700', 'text-white', 'active');
        b.classList.add('bg-slate-100', 'text-slate-600');
      });
      btn.classList.remove('bg-slate-100', 'text-slate-600');
      btn.classList.add('bg-navy-700', 'text-white', 'active');

      const category = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Search teachers
function initTeacherSearch() {
  const input = document.getElementById('teacher-search-input');
  const cards = document.querySelectorAll('.guru-card');

  if (input) {
    input.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(term)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

// Contact Form simulation
function initContactForm() {
  const form = document.getElementById('school-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih! Pesan Anda telah terkirim ke pihak Tata Usaha SMAN 1 Rantau Kopar.');
      form.reset();
    });
  }
}
