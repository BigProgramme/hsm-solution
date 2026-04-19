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
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const fname = document.getElementById('fname').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                if (!fname || !email || !message) {
                    alert('Veuillez remplir les champs obligatoires (Prénom, Email, Message).');
                    return;
                }

                // In production, replace with real form submission (Formspree, Netlify Forms, etc.)
                // Example with FormData: 
                // const formData = new FormData(this);
                // console.log("Form data submitted:", Object.fromEntries(formData));

                document.getElementById('formSuccess').style.display = 'block';
                setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 6000);
                
                // Reset form
                this.reset();
            });
        }