document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    const sections = document.querySelectorAll('section');
    let lastScrollTop = 0;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // 60% of the section must be visible
    };

    let activeLink = null;

    // Observer for section visibility
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const link = document.querySelector(`.sidebar ul li a[href="#${entry.target.id}"]`);

            if (entry.isIntersecting) {
                if (activeLink && activeLink !== link) {
                    activeLink.classList.remove('active');
                }
                activeLink = link;
                link.classList.add('active');
            } else if (link === activeLink) {
                link.classList.remove('active');
                activeLink = null;
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerOffset = header ? header.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close sidebar on mobile after link click
            if (window.innerWidth <= 1200) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Toggle sidebar visibility with hamburger menu
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Handle header and footer visibility on scroll
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll down - hide header and footer
            header.style.transform = 'translateY(-100%)';
            footer.style.transform = 'translateY(100%)';
            header.style.opacity = '0';
            footer.style.opacity = '0';
        } else {
            // Scroll up - show header and footer
            header.style.transform = 'translateY(0)';
            footer.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            footer.style.opacity = '1';
        }

        lastScrollTop = scrollTop;

        // Collapse sidebar on scroll if screen width is less than or equal to 1200px
        if (window.innerWidth <= 1200) {
            sidebar.classList.remove('open');
        }
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && window.innerWidth <= 1200) {
            sidebar.classList.remove('open');
        }
    });
});
