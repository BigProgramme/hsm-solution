/* ── PAGE ROUTING ── */
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === id);
    });
    const target = document.getElementById('page-' + id);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Re-trigger reveals
        setTimeout(observeReveals, 100);
    }
    return false;
}

/* ── NAV SCROLL ── */
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* ── HAMBURGER ── */
function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

/* ── SCROLL REVEAL ── */
function observeReveals() {
    const els = document.querySelectorAll('.page.active .reveal:not(.visible)');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
}
observeReveals();

/* ── PORTFOLIO FILTER ── */
function filterProjects(btn, cat) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? 'block' : 'none';
    });
}

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const successMsg = document.getElementById('formSuccess');

        // Visual feedback during sending
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        const formData = new FormData(this);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    // Success
                    successMsg.style.display = 'block';
                    successMsg.innerHTML = "Merci ! Votre message a été envoyé avec succès. Nous vous répondrons sous 48h.";
                    this.reset();
                } else {
                    // API Error
                    console.log(response);
                    alert("Une erreur est survenue : " + res.message);
                }
            })
            .catch(error => {
                console.log(error);
                alert("Erreur de connexion. Veuillez vérifier votre accès internet et réessayer.");
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                // Hide success message after 6 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 6000);
            });
    });
}