(function() {
    var sections = document.querySelectorAll('.scroll-section');
    var medias = document.querySelectorAll('.scroll-media');
    if (!sections.length || !medias.length) return;

    function controlVideo(mediaOrSection, play) {
        var video = mediaOrSection.querySelector('video');
        if (!video) return;
        if (play) {
            video.play().catch(function() {});
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var index = entry.target.getAttribute('data-index');
            var active = entry.isIntersecting;

            medias.forEach(function(media) {
                if (media.getAttribute('data-index') === index) {
                    media.classList.toggle('is-active', active);
                    controlVideo(media, active);
                }
            });

            controlVideo(entry.target, active);
        });
    }, { threshold: 0.5 });

    sections.forEach(function(section) {
        observer.observe(section);
    });
})();