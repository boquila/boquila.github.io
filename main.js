(function() {
    var imageColumn = document.querySelector('.scroll-images');
    var sections = Array.prototype.slice.call(document.querySelectorAll('.scroll-section'));
    if (!imageColumn || !sections.length) return;

    var mobile = window.matchMedia('(max-width: 768px)');
    var zTop = 1;

    // The sticky image column is generated from the sections:
    // adding an entry only requires adding one .scroll-section block.
    var medias = sections.map(function(section, i) {
        var source = section.querySelector('.scroll-section-media');
        var media = document.createElement('div');
        media.className = i === 0 ? 'scroll-media is-active' : 'scroll-media';
        media.innerHTML = source ? source.innerHTML : '';
        var img = media.querySelector('img');
        if (img) img.className = 'scroll-bg';
        var video = media.querySelector('video');
        if (video) video.className = 'scroll-video';
        imageColumn.appendChild(media);
        return media;
    });

    function controlVideo(container, play) {
        var video = container.querySelector('video');
        if (!video) return;
        if (play) {
            video.play().catch(function() {});
        } else {
            video.pause();
        }
    }

    // Videos appear over an already-visible painting: fade them in on
    // their first frame instead of popping.
    document.querySelectorAll('.scroll-video, .scroll-section-video').forEach(function(video) {
        video.addEventListener('playing', function() {
            video.classList.add('is-playing');
        }, { once: true });
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var active = entry.isIntersecting;
            entry.target.classList.toggle('is-active', active);

            if (mobile.matches) {
                controlVideo(entry.target, active);
                return;
            }

            if (!active) return;
            var next = medias[sections.indexOf(entry.target)];
            var prev = null;
            medias.forEach(function(media) {
                if (media.classList.contains('is-active')) prev = media;
            });
            if (!next) return;
            if (next === prev) {
                controlVideo(next, true);
                return;
            }

            medias.forEach(function(media) {
                media.classList.remove('is-leaving');
            });

            // Stacking follows recency, not DOM order: the last shown
            // painting stays on top of older ones, so fast chains in any
            // direction blend from exactly what is on screen.
            var opacity = parseFloat(getComputedStyle(next).opacity);
            var onTop = prev && next.style.zIndex &&
                parseInt(next.style.zIndex, 10) > parseInt(prev.style.zIndex || 0, 10);

            if (prev) prev.classList.remove('is-active');

            if (prev && opacity > 0.99 && !onTop) {
                // Going back while the old painting still covers this one:
                // fade the old one out on top instead of popping this one in.
                prev.classList.add('is-leaving');
            } else if (!onTop) {
                if (opacity > 0) {
                    // Covered leftover mid-fade opacity would make the
                    // fade-in jump; restart it from transparent (invisible).
                    next.style.transition = 'none';
                    next.style.opacity = '0';
                    void next.offsetWidth;
                    next.style.transition = '';
                    next.style.opacity = '';
                }
                next.style.zIndex = ++zTop;
            }
            // Already on top mid-fade (quick direction flip): no reset,
            // no restack — it just fades back in from where it is.

            next.classList.add('is-active');
            if (prev) controlVideo(prev, false);
            controlVideo(next, true);
        });
    }, { threshold: 0.5 });

    sections.forEach(function(section) {
        observer.observe(section);
    });
})();

(function() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(function(el, i) {
        el.style.transitionDelay = (i * 0.12) + 's';
        observer.observe(el);
    });
})();