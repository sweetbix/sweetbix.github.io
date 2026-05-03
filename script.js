// for spotlight effect on cursor
document.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.getElementById("spotlight");

    document.addEventListener("mousemove", (e) => {
        const offset = 280; // needs to be double of height / width to ensure its centered
        spotlight.style.transform = `translate(${e.clientX - offset}px, ${e.clientY - offset}px)`;
    });
});

// no spotlight for touchscreen devices (no cursor)
document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const spotlight = document.getElementById("spotlight");

    if (isMobile) {
        spotlight.classList.remove("md:opacity-30");
    }
});

// Headings lighten when the section still intersects the viewport and its top has crossed the
// upper band — same rule as contact. Require rect.bottom > 0 so once you scroll past a section
// (it moves above the window) the heading dims again; coming back relights.
function updateHeadingForSection(sectionId, headingId) {
    const section = document.getElementById(sectionId);
    const heading = document.getElementById(headingId);
    if (!section || !heading) return;

    const rect = section.getBoundingClientRect();
    const offset = 0.4;
    const vh = window.innerHeight;
    const shouldLighten = rect.bottom > 0 && rect.top < vh * offset;

    if (shouldLighten) {
        heading.classList.remove("text-slate-400");
        heading.classList.add("text-slate-200");
    } else {
        heading.classList.remove("text-slate-200");
        heading.classList.add("text-slate-400");
    }
}

function updateScrollHeadings() {
    updateHeadingForSection("about", "about-name");
    updateHeadingForSection("about", "about-tagline");
    updateHeadingForSection("experience", "experience-heading");
    updateHeadingForSection("projects", "projects-heading");
    updateHeadingForSection("contact", "dynamic-text");
}

window.addEventListener("scroll", updateScrollHeadings);
updateScrollHeadings();

// change title in contact form when input is selected
function changeInputColour(titleId, inputId) {
    const title = document.getElementById(titleId);
    const input = document.getElementById(inputId);

    input.addEventListener('focus', () => {
        title.classList.remove('text-slate-400');
        title.classList.add('text-slate-200');
        input.classList.add('text-slate-200');
    });

    input.addEventListener('blur', () => {
        title.classList.remove('text-slate-200');
        title.classList.add('text-slate-400');
        input.classList.remove('text-slate-200');
    });
}

changeInputColour('email-title', 'email-input');
changeInputColour('subject-title', 'subject-input');
changeInputColour('msg-title', 'msg-input');

function interactiveNav() {
    const sections = document.querySelectorAll("section");
    const navlinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // remove active 
                navlinks.forEach(link => link.classList.remove("active"));

                // add active to current section 
                const id = entry.target.id;
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }, {
        threshold: 0.7
    });

    sections.forEach(section => observer.observe(section));
}

interactiveNav();
