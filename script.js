// Counter Animation Logic
    const animateCounters = () => {
        const counters = document.querySelectorAll('.sd5-stat-number');
        const speed = 100; // Lower is faster

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc) + '+';
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to trigger animation when visible
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(document.querySelector('.sd5-grid'));