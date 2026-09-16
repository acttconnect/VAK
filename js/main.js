/* =========================================================
   VAK GROUP - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HEADER
       ===================================================== */

    const header = document.querySelector(".header");

    if (header) {
        const updateHeader = () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }


    /* =====================================================
       MOBILE NAVIGATION
       Exact selectors for current header:
       #menuToggle
       #navMenu
       .mobile-menu
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        const mobileLinks =
            navMenu.querySelectorAll(".mobile-nav-link");

        const mobileCta =
            navMenu.querySelector(".mobile-cta");


        function openMobileMenu() {

            navMenu.classList.add("active");
            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            document.body.classList.add("menu-open");
        }


        function closeMobileMenu() {

            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");
        }


        function toggleMobileMenu(event) {

            event.preventDefault();
            event.stopPropagation();

            if (navMenu.classList.contains("active")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }


        /* Hamburger click */

        menuToggle.addEventListener(
            "click",
            toggleMobileMenu
        );


        /* Close after clicking navigation link */

        mobileLinks.forEach(link => {

            link.addEventListener("click", function () {
                closeMobileMenu();
            });

        });


        /* Close after clicking mobile CTA */

        if (mobileCta) {

            mobileCta.addEventListener(
                "click",
                function () {
                    closeMobileMenu();
                }
            );

        }


        /* Close when clicking outside */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    navMenu.classList.contains("active") &&
                    !navMenu.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    closeMobileMenu();
                }

            }
        );


        /* Close with ESC */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    navMenu.classList.contains("active")
                ) {
                    closeMobileMenu();
                }

            }
        );


        /* Close menu when resizing to desktop */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 900) {
                    closeMobileMenu();
                }

            }
        );

    }


    /* =====================================================
       TAB SWITCHING
       ===================================================== */

    const tabContainers =
        document.querySelectorAll(".tab-container");

    tabContainers.forEach(container => {

        const tabBtns =
            container.querySelectorAll(".tab-btn");

        const tabContents =
            container.querySelectorAll(".tab-content");


        tabBtns.forEach(btn => {

            btn.addEventListener("click", function () {

                const targetId =
                    btn.getAttribute("data-tab");

                if (!targetId) {
                    return;
                }


                tabBtns.forEach(button => {
                    button.classList.remove("active");
                });


                tabContents.forEach(content => {
                    content.classList.remove("active");
                });


                btn.classList.add("active");


                const targetContent =
                    container.querySelector(
                        "#" + CSS.escape(targetId)
                    );


                if (targetContent) {
                    targetContent.classList.add("active");
                }

            });

        });

    });


    /* =====================================================
       PRODUCT SIDEBAR
       ===================================================== */

    const sidebarBtns =
        document.querySelectorAll(".sidebar-btn");

    sidebarBtns.forEach(btn => {

        btn.addEventListener("click", function () {

            const targetId =
                btn.getAttribute("data-category");

            if (!targetId) {
                return;
            }


            sidebarBtns.forEach(button => {
                button.classList.remove("active");
            });


            btn.classList.add("active");


            const productCategories =
                document.querySelectorAll(
                    ".product-category-section"
                );


            productCategories.forEach(section => {
                section.style.display = "none";
            });


            const targetSection =
                document.getElementById(targetId);


            if (targetSection) {
                targetSection.style.display = "block";
            }

        });

    });


    /* =====================================================
       LIGHTBOX
       ===================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-card, .lightbox-trigger"
        );


    if (galleryItems.length > 0) {

        let lightbox =
            document.querySelector(".lightbox");


        /* Create lightbox if not already present */

        if (!lightbox) {

            lightbox =
                document.createElement("div");

            lightbox.className = "lightbox";

            lightbox.innerHTML = `
                <button
                    type="button"
                    class="lightbox-close"
                    aria-label="Close image"
                >
                    &times;
                </button>

                <img
                    class="lightbox-content"
                    src=""
                    alt="Enlarged view"
                >

                <div class="lightbox-caption"></div>
            `;

            document.body.appendChild(lightbox);
        }


        const lightboxImg =
            lightbox.querySelector(
                ".lightbox-content"
            );


        const lightboxCaption =
            lightbox.querySelector(
                ".lightbox-caption"
            );


        const lightboxClose =
            lightbox.querySelector(
                ".lightbox-close"
            );


        function closeLightbox() {

            lightbox.classList.remove("active");

            document.body.style.overflow = "";

        }


        galleryItems.forEach(item => {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const image =
                        item.querySelector("img");


                    const imgSrc =
                        item.getAttribute("href") ||
                        item.getAttribute("data-src") ||
                        (image
                            ? image.getAttribute("src")
                            : "");


                    const titleElement =
                        item.querySelector(
                            ".gallery-title"
                        );


                    const captionText =
                        item.getAttribute(
                            "data-caption"
                        ) ||
                        item.getAttribute("title") ||
                        (
                            titleElement
                                ? titleElement.innerText
                                : ""
                        );


                    if (!imgSrc) {
                        return;
                    }


                    if (lightboxImg) {
                        lightboxImg.src = imgSrc;
                    }


                    if (lightboxCaption) {
                        lightboxCaption.innerText =
                            captionText || "";
                    }


                    lightbox.classList.add("active");

                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeLightbox
            );

        }


        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox ||
                    event.target === lightboxClose
                ) {
                    closeLightbox();
                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("active")
                ) {
                    closeLightbox();
                }

            }
        );

    }


    /* =====================================================
       WHATSAPP INQUIRY
       ===================================================== */

    window.enquireProduct =
        function (productName) {

            const primaryNumber =
                "9977003608";


            const safeProductName =
                productName ||
                "General Website Inquiry";


            const message =
                encodeURIComponent(
                    `Hi VAK Group, I would like to enquire about your "${safeProductName}". Please send me details and pricing.`
                );


            const waUrl =
                `https://wa.me/91${primaryNumber}?text=${message}`;


            window.open(
                waUrl,
                "_blank",
                "noopener,noreferrer"
            );

        };


    /* =====================================================
       PARTNERS / CLIENTS INFINITE TRACK
       ===================================================== */

    const tracks =
        document.querySelectorAll(
            ".partners-track"
        );


    tracks.forEach(track => {

        /*
         * Prevent duplicate cloning if this script
         * somehow gets initialized more than once.
         */

        if (
            track.dataset.duplicated === "true"
        ) {
            return;
        }


        const originalContent =
            track.innerHTML.trim();


        if (!originalContent) {
            return;
        }


        track.innerHTML =
            originalContent +
            originalContent;


        track.dataset.duplicated =
            "true";

    });

});


/* =========================================================
   HERO SLIDER
   Only initializes if hero elements exist.
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const slides =
            document.querySelectorAll(
                ".hero-slide"
            );


        const dots =
            document.querySelectorAll(
                ".hero-dot"
            );


        const nextButton =
            document.getElementById(
                "heroNext"
            );


        const prevButton =
            document.getElementById(
                "heroPrev"
            );


        const currentNumber =
            document.getElementById(
                "heroCurrent"
            );


        const hero =
            document.getElementById(
                "homeHero"
            );


        /*
         * If this is not the homepage,
         * don't initialize the slider.
         */

        if (
            !hero ||
            slides.length === 0
        ) {
            return;
        }


        let currentSlide = 0;

        let autoSlide = null;


        /* =================================================
           SHOW SLIDE
           ================================================= */

        function showSlide(index) {

            if (slides.length === 0) {
                return;
            }


            if (index >= slides.length) {
                index = 0;
            }


            if (index < 0) {
                index = slides.length - 1;
            }


            currentSlide = index;


            slides.forEach(
                (slide, i) => {

                    slide.classList.toggle(
                        "active",
                        i === currentSlide
                    );

                }
            );


            dots.forEach(
                (dot, i) => {

                    dot.classList.toggle(
                        "active",
                        i === currentSlide
                    );

                }
            );


            if (currentNumber) {

                currentNumber.textContent =
                    String(
                        currentSlide + 1
                    ).padStart(2, "0");

            }

        }


        /* =================================================
           NEXT
           ================================================= */

        function nextSlide() {

            showSlide(
                currentSlide + 1
            );

            restartAutoSlide();

        }


        /* =================================================
           PREVIOUS
           ================================================= */

        function previousSlide() {

            showSlide(
                currentSlide - 1
            );

            restartAutoSlide();

        }


        /* =================================================
           START AUTO SLIDE
           ================================================= */

        function startAutoSlide() {

            clearInterval(autoSlide);


            autoSlide =
                setInterval(
                    function () {

                        showSlide(
                            currentSlide + 1
                        );

                    },
                    6000
                );

        }


        /* =================================================
           RESTART AUTO SLIDE
           ================================================= */

        function restartAutoSlide() {

            clearInterval(autoSlide);

            startAutoSlide();

        }


        /* =================================================
           NEXT BUTTON
           ================================================= */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    nextSlide();

                }
            );

        }


        /* =================================================
           PREVIOUS BUTTON
           ================================================= */

        if (prevButton) {

            prevButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    previousSlide();

                }
            );

        }


        /* =================================================
           DOTS
           ================================================= */

        dots.forEach(
            function (dot, index) {

                dot.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        showSlide(index);

                        restartAutoSlide();

                    }
                );

            }
        );


        /* =================================================
           TOUCH SWIPE
           ================================================= */

        let touchStartX = 0;
        let touchEndX = 0;


        hero.addEventListener(
            "touchstart",
            function (event) {

                if (
                    !event.changedTouches ||
                    !event.changedTouches.length
                ) {
                    return;
                }


                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            "touchend",
            function (event) {

                if (
                    !event.changedTouches ||
                    !event.changedTouches.length
                ) {
                    return;
                }


                touchEndX =
                    event.changedTouches[0].screenX;


                const difference =
                    touchStartX - touchEndX;


                if (
                    Math.abs(difference) < 50
                ) {
                    return;
                }


                if (difference > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }

            },
            {
                passive: true
            }
        );


        /* =================================================
           PAUSE ON DESKTOP HOVER
           ================================================= */

        hero.addEventListener(
            "mouseenter",
            function () {

                clearInterval(autoSlide);

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                startAutoSlide();

            }
        );


        /* =================================================
           INITIALIZE
           ================================================= */

        showSlide(0);

        startAutoSlide();

    }
);


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const productData = {

    "cement-silo": {
        title: "Cement & Fly Ash Storage Silo",
        category: "Silos & Storage",
        tag: "Best Seller",
        image: "images/main_image4.jpeg",
        description:
            "High-durability bolted and welded heavy-gauge steel silos engineered for cement, fly ash and slag storage.",
        price: "Custom Project Quote",
        life: "25+ Years Structural Life",
        specs: [
            "Capacities: 50T, 100T, 150T, 200T, 300T, 500T",
            "Heavy-duty IS 2062 Grade Steel Plate",
            "Manhole, ladder, safety railing and level indicators",
            "CAD site drawing provided for installation",
            "Anti-corrosion primer and weather-resistant coating"
        ]
    },


    "bulker-feeding": {
        title: "Bulker Feeding Root Blower System",
        category: "Silos & Storage",
        tag: "High Pressure",
        image: "images/silo_img_7.jpeg",
        description:
            "Heavy-duty pneumatic blower system designed for continuous cement and fly ash conveying.",
        price: "Request Spec Quote",
        life: "10+ Years Heavy Duty",
        specs: [
            "Heavy-duty cast iron Roots Blower",
            "Air filter, check valve and pressure relief valve",
            "Transfer rate: 20 to 60 Tons per hour",
            "Energy-efficient motor with thermal protection"
        ]
    },


    "skid-platform": {
        title: "Skid Platform Heavy Storage Base",
        category: "Silos & Storage",
        tag: "Modular Unit",
        image: "images/silo_img_9.jpg",
        description:
            "Heavy structural steel skid platform designed for rapid deployment and foundation stabilization.",
        price: "Based on Dimensions",
        life: "20+ Years Life",
        specs: [
            "Heavy ISMB structural steel construction",
            "Modular bolt-on layout",
            "Integrated load cell mounting points",
            "Custom site drawings and structural analysis"
        ]
    },


    "silo-accessories": {
        title: "Silo Safety & Automation Accessories",
        category: "Silos & Storage",
        tag: "OEM",
        image: "images/silo_img_.jpg",
        description:
            "Industrial silo safety and automation accessories including valves, sensors, aeration pads and dust collection systems.",
        price: "Catalog Pricing Available",
        life: "Original OEM Guarantee",
        specs: [
            "273mm ID Butterfly Valves",
            "Pressure Relief Valves",
            "Aeration Fluidization Pads",
            "Rotary Paddle Level Indicators",
            "Bin Activators and Pulse Dust Collectors"
        ]
    },


    "anti-clog-mesh": {
        title: "Anti-Clog Wire Mesh Screen",
        category: "Wire Mesh & Screens",
        tag: "+25% to 50% Output",
        image: "images/crusher_img_1.jpg",
        description:
            "Flexible PU-strip screening technology designed to reduce blinding and sticky aggregate clogging.",
        price: "₹25,000 / Screen Approx.",
        life: "6 to 9 Months",
        specs: [
            "Individual wire vibration",
            "25% to 50% potential output improvement",
            "Reduced manual screen clearing",
            "Aperture sizes from 2mm to 45mm"
        ]
    },


    "anti-clog-buster": {
        title: "Anti-Clog Buster",
        category: "Wire Mesh & Screens",
        tag: "Auto Vibrating",
        image: "images/crusher_img_4.jpg",
        description:
            "Automated mechanical hammering attachment for preventing material build-up on vibrating screens.",
        price: "₹10,000 / Meter",
        life: "6 to 9 Months",
        specs: [
            "Auto-hammering kinetic action",
            "10% to 50% potential production improvement",
            "Clamp-on installation",
            "Wear-resistant alloy hammer heads"
        ]
    },


    "knapex-wiremesh": {
        title: "Knapex High Tensile Wire Mesh",
        category: "Wire Mesh & Screens",
        tag: "High Tensile Steel",
        image: "images/crusher_img_6.jpg",
        description:
            "Precision-woven spring steel wire mesh designed for quarrying, crushed stone and mining applications.",
        price: "Direct Factory Rate",
        life: "Long Abrasive Life",
        specs: [
            "High Carbon Spring Steel",
            "Accurate mesh opening sizes",
            "Multiple hook edge options",
            "High tensile strength"
        ]
    },


    "crusher-efficiency-system": {
        title: "Crusher Efficiency System",
        category: "Crusher & Machinery",
        tag: "Mobile App Telemetry",
        image: "images/crusher_img_9.jpg",
        description:
            "Smart telemetry system for monitoring conveyor speed, motor load, feed rate and throughput.",
        price: "₹2.0 Lakh / Conveyor",
        life: "Software Subscription Included",
        specs: [
            "Real-time mobile telemetry",
            "Instant performance alerts",
            "Helps prevent belt slippage and overload",
            "1 Year Free Software Maintenance"
        ]
    },


    "overband-magnet": {
        title: "Overband Magnetic Separator",
        category: "Crusher & Machinery",
        tag: "Zero Maintenance",
        image: "images/crusher_img_13.jpg",
        description:
            "Permanent magnetic separator designed to remove tramp iron and metal debris from conveyor systems.",
        price: "₹76,600 to ₹1,60,000",
        life: "Permanent Magnetic Life",
        specs: [
            "Permanent magnetic circuit",
            "500mm - 650mm belt models available",
            "800mm belt model available",
            "Protects downstream machinery"
        ]
    },


    "opel-rollers": {
        title: "Opel Heavy Duty Conveyor Rollers",
        category: "Crusher & Machinery",
        tag: "1 Year Replacement",
        image: "images/crusher_img_16.jpg",
        description:
            "Heavy-duty dust-proof conveyor rollers designed for continuous industrial operation.",
        price: "Wholesale Industrial Rate",
        life: "1 Year Guarantee",
        specs: [
            "NBC heavy-duty bearings",
            "Dust and moisture-resistant sealing",
            "EN8 carbon steel shaft",
            "1 Year Full Replacement Warranty"
        ]
    },


    "pulleys-motors": {
        title: "Motorised Pulleys & Vibro Motors",
        category: "Crusher & Machinery",
        tag: "Heavy Duty Power",
        image: "images/crusher_img_22.jpg",
        description:
            "Heavy-duty conveyor drive pulleys and vibration motors for continuous plant operation.",
        price: "Quotation On Demand",
        life: "Heavy Duty 5+ Years",
        specs: [
            "Hermetically sealed motorised pulleys",
            "Adjustable eccentric weights",
            "IP65 enclosure",
            "High starting torque"
        ]
    },


    "steel-bridges-trays": {
        title: "Steel Bridges & Cable Trays",
        category: "Crusher & Machinery",
        tag: "Structural Grade",
        image: "images/crusher_img_27.jpg",
        description:
            "Structural steel solutions for plant crossings, foundations and cable management.",
        price: "₹85/kg to ₹12.5 Lakh",
        life: "Structural Grade 30+ Years",
        specs: [
            "Steel plant bridges",
            "Heavy structural insert plates",
            "300mm cable trays",
            "600mm cable trays"
        ]
    }

};


/* =========================================================
   PRODUCT FILTER + SEARCH
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const filterButtons =
            document.querySelectorAll(
                ".product-filter"
            );


        const productCards =
            document.querySelectorAll(
                ".product-card"
            );


        const searchInput =
            document.getElementById(
                "productSearch"
            );


        const emptyState =
            document.getElementById(
                "productsEmpty"
            );


        /*
         * If product filter doesn't exist on this page,
         * simply stop here.
         */

        if (
            filterButtons.length === 0 &&
            productCards.length === 0
        ) {
            return;
        }


        let activeCategory = "All";


        function filterProducts() {

            const search =
                searchInput
                    ? searchInput.value
                        .toLowerCase()
                        .trim()
                    : "";


            let visibleCount = 0;


            productCards.forEach(card => {

                const category =
                    (
                        card.dataset.category ||
                        ""
                    ).trim();


                const title =
                    (
                        card.dataset.title ||
                        ""
                    )
                        .toLowerCase()
                        .trim();


                const categoryLower =
                    category.toLowerCase();


                const matchesCategory =
                    activeCategory === "All" ||
                    category === activeCategory;


                const matchesSearch =
                    !search ||
                    title.includes(search) ||
                    categoryLower.includes(search);


                const show =
                    matchesCategory &&
                    matchesSearch;


                card.style.display =
                    show ? "" : "none";


                if (show) {
                    visibleCount++;
                }

            });


            if (emptyState) {

                emptyState.style.display =
                    visibleCount === 0
                        ? "block"
                        : "none";

            }

        }


        /* =================================================
           FILTER BUTTONS
           ================================================= */

        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(btn => {
                        btn.classList.remove("active");
                    });


                    button.classList.add("active");


                    activeCategory =
                        button.dataset.category ||
                        "All";


                    filterProducts();

                }
            );

        });


        /* =================================================
           SEARCH
           ================================================= */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                filterProducts
            );

        }


        /* Initial filter */

        filterProducts();

    }
);


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

window.openProduct =
    function (id) {

        const product =
            productData[id];


        if (!product) {
            console.warn(
                "Product not found:",
                id
            );

            return;
        }


        const modal =
            document.getElementById(
                "productModal"
            );


        if (!modal) {
            return;
        }


        const modalImage =
            document.getElementById(
                "modalImage"
            );


        const modalTag =
            document.getElementById(
                "modalTag"
            );


        const modalCategory =
            document.getElementById(
                "modalCategory"
            );


        const modalTitle =
            document.getElementById(
                "modalTitle"
            );


        const modalDescription =
            document.getElementById(
                "modalDescription"
            );


        const modalPrice =
            document.getElementById(
                "modalPrice"
            );


        const modalLife =
            document.getElementById(
                "modalLife"
            );


        const modalSpecs =
            document.getElementById(
                "modalSpecs"
            );


        /* Image */

        if (modalImage) {

            modalImage.src =
                product.image;

            modalImage.alt =
                product.title;

        }


        /* Tag */

        if (modalTag) {

            modalTag.textContent =
                product.tag;

        }


        /* Category */

        if (modalCategory) {

            modalCategory.textContent =
                product.category;

        }


        /* Title */

        if (modalTitle) {

            modalTitle.textContent =
                product.title;

        }


        /* Description */

        if (modalDescription) {

            modalDescription.textContent =
                product.description;

        }


        /* Price */

        if (modalPrice) {

            modalPrice.textContent =
                product.price;

        }


        /* Life */

        if (modalLife) {

            modalLife.textContent =
                product.life;

        }


        /* Specifications */

        if (modalSpecs) {

            modalSpecs.innerHTML = "";


            product.specs.forEach(
                spec => {

                    const li =
                        document.createElement(
                            "li"
                        );


                    li.textContent =
                        spec;


                    modalSpecs.appendChild(
                        li
                    );

                }
            );

        }


        /* Open */

        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";


        window.currentProduct =
            product.title;

    };


/* =========================================================
   CLOSE PRODUCT MODAL
   ========================================================= */

window.closeProduct =
    function () {

        const modal =
            document.getElementById(
                "productModal"
            );


        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        /*
         * Don't force body overflow if
         * another overlay is still open.
         */

        const mobileMenu =
            document.getElementById(
                "navMenu"
            );


        const lightbox =
            document.querySelector(
                ".lightbox.active"
            );


        const productModal =
            document.querySelector(
                ".product-modal.active"
            );


        if (
            !mobileMenu?.classList.contains("active") &&
            !lightbox &&
            !productModal
        ) {
            document.body.style.overflow =
                "";
        }

    };


/* =========================================================
   PRODUCT MODAL WHATSAPP
   ========================================================= */

window.enquireProductFromModal =
    function () {

        const product =
            window.currentProduct ||
            "Product";


        const message =
            `Hello VAK Group, I am interested in ${product}. Please share more details and quotation.`;


        const whatsappUrl =
            "https://wa.me/919977003608?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

    };


/* =========================================================
   MODAL BACKDROP + ESC
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const productModal =
            document.getElementById(
                "productModal"
            );


        if (productModal) {

            productModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        productModal
                    ) {

                        window.closeProduct();

                    }

                }
            );

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        /* Product modal */

        const productModal =
            document.getElementById(
                "productModal"
            );


        if (
            productModal &&
            productModal.classList.contains("active")
        ) {

            window.closeProduct();

            return;

        }


        /* Mobile menu */

        const navMenu =
            document.getElementById(
                "navMenu"
            );


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        if (
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove(
                "active"
            );


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);