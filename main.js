(function() {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var mousePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    var canvas, ctx, sprites;
    var particles = [];
    var frame = 0;
    var last = null;
    var carry = 0;
    var dpr = 1;
    var spacing = 30;
    var maxParticles = 48;
    var windSeed = Math.floor(Math.random() * 1000000);

    // Interpolate random values instead of repeating a sine-wave sway.
    // The smooth curve lets gusts change direction without jitter.
    function breeze(time, seed) {
        function sample(index) {
            var value = Math.imul(index ^ seed, 374761393);
            value = Math.imul(value ^ (value >>> 13), 1274126177);
            return ((value ^ (value >>> 16)) >>> 0) / 2147483648 - 1;
        }
        var step = Math.floor(time);
        var fraction = time - step;
        var blend = fraction * fraction * fraction * (fraction * (fraction * 6 - 15) + 10);
        var start = sample(step);
        return start + (sample(step + 1) - start) * blend;
    }

    // Small cached drawings keep the trail crisp without image downloads.
    function makeSprite(color, leaf) {
        var sprite = document.createElement('canvas');
        sprite.width = sprite.height = 80;
        var ink = sprite.getContext('2d');
        ink.translate(40, 40);
        ink.scale(2, 2);
        ink.fillStyle = color;
        ink.lineJoin = 'round';
        if (leaf) {
            var shape = new Path2D('M0 -17 L4 -9 L7 -11 L6 -3 L12 -7 L12 -3 L17 -4 L14 3 L17 5 L5 10 L2 10 L1 16 L-1 16 L-1 10 L-5 10 L-17 5 L-14 3 L-17 -4 L-12 -3 L-12 -7 L-6 -3 L-7 -11 L-4 -9 Z');
            ink.fill(shape);
            ink.strokeStyle = 'rgba(77,77,77,0.22)';
            ink.lineWidth = 0.7;
            ink.stroke(shape);
            ink.beginPath();
            ink.moveTo(0, 12);
            ink.lineTo(0, -10);
            ink.moveTo(0, 5);
            ink.lineTo(-10, -1);
            ink.moveTo(0, 5);
            ink.lineTo(10, -1);
            ink.stroke();
        } else {
            for (var petal = 0; petal < 6; petal++) {
                ink.save();
                ink.rotate(petal * Math.PI / 3);
                ink.beginPath();
                ink.ellipse(0, -9, 5.5, 8, 0, 0, Math.PI * 2);
                ink.fill();
                ink.restore();
            }
            ink.beginPath();
            ink.arc(0, 0, 5, 0, Math.PI * 2);
            ink.fillStyle = '#ffe58b';
            ink.fill();
            ink.beginPath();
            ink.arc(-1.3, -1.5, 1.4, 0, Math.PI * 2);
            ink.fillStyle = '#fff7d6';
            ink.fill();
        }
        return sprite;
    }

    function resize() {
        if (!canvas) return;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function setup() {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        if (!ctx) { canvas = null; return false; }
        canvas.className = 'nature-trail';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(canvas);
        sprites = ['#f6a9c6', '#b9a4ed', '#9cd8ee', '#ffc09e'].map(function(color) {
            return makeSprite(color, false);
        }).concat(['#33da72', '#f3c84b', '#ed7068'].map(function(color) {
            return makeSprite(color, true);
        }));
        resize();
        return true;
    }

    function reset() {
        cancelAnimationFrame(frame);
        frame = 0;
        particles.length = 0;
        last = null;
        carry = 0;
        if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function spawn(x, y, now, vx, vy) {
        if (particles.length >= maxParticles) particles.shift();
        var spriteIndex = Math.floor(Math.random() * sprites.length);
        var leaf = spriteIndex >= 4;
        particles.push({
            x: x + (Math.random() - 0.5) * 18,
            y: y + (Math.random() - 0.5) * 18,
            born: now,
            updated: now,
            life: 1500 + Math.random() * 650,
            size: 18 + Math.random() * 17,
            vx: vx * 0.09 + (Math.random() - 0.5) * 75,
            vy: vy * 0.06 - 25 - Math.random() * 45,
            fall: leaf ? 30 + Math.random() * 20 : 12 + Math.random() * 16,
            seed: Math.floor(Math.random() * 1000000),
            response: 0.65 + Math.random() * 0.65,
            drag: 1.8 + Math.random() * 1.4,
            tilt: 1,
            angle: (Math.random() - 0.5) * Math.PI,
            spin: (Math.random() - 0.5) * (leaf ? 3 : 4.5),
            leaf: leaf,
            sprite: sprites[spriteIndex]
        });
    }

    function tick(now) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particles = particles.filter(function(p) { return now - p.born < p.life; });
        var time = now / 1000;
        // A shared, wandering breeze keeps the motion connected; small local
        // eddies give each flower and leaf its own path through it.
        var windX = breeze(time * 0.7, windSeed) * 42 + breeze(time * 1.3, windSeed + 1) * 12;
        var windY = breeze(time * 0.9, windSeed + 2) * 16;
        particles.forEach(function(p) {
            var age = (now - p.born) / p.life;
            var dt = Math.min(0.05, (now - p.updated) / 1000);
            p.updated = now;
            var scale = Math.min(1, age * 12) * (1 - age * 0.3);
            var eddy = breeze(time * 1.6, p.seed);
            var lift = breeze(time * 1.2, p.seed + 1);
            var catchWind = 1 - Math.exp(-p.drag * dt);
            var oldVx = p.vx;
            var oldVy = p.vy;
            p.vx += ((windX + eddy * 26) * p.response - p.vx) * catchWind;
            p.vy += (p.fall + windY * p.response + lift * 20 - p.vy) * catchWind;
            p.x += (oldVx + p.vx) * 0.5 * dt;
            p.y += (oldVy + p.vy) * 0.5 * dt;
            // Gusts gently turn the shapes, sometimes slowing or reversing a spin.
            var turn = eddy * (p.leaf ? 2 : 1.2) + windX * 0.012;
            p.spin += (turn - p.spin) * (1 - Math.exp(-2 * dt));
            p.angle += p.spin * dt;
            p.tilt += (0.8 + lift * 0.18 - p.tilt) * catchWind;
            ctx.save();
            ctx.globalAlpha = Math.min(1, (1 - age) * 2.5);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            // Leaves gently tilt as they tumble; flowers stay open as they twirl.
            if (p.leaf) ctx.scale(p.tilt, 1);
            var size = p.size * scale;
            ctx.drawImage(p.sprite, -size / 2, -size / 2, size, size);
            ctx.restore();
        });
        // No animation work remains when the last flower or leaf disappears.
        frame = particles.length ? requestAnimationFrame(tick) : 0;
    }

    window.addEventListener('pointermove', function(event) {
        if (event.pointerType !== 'mouse' || reducedMotion.matches || !mousePointer.matches || document.hidden) return;
        if (!canvas && !setup()) return;
        var now = performance.now();
        var point = { x: event.clientX, y: event.clientY, time: now };
        if (last) {
            var dx = point.x - last.x;
            var dy = point.y - last.y;
            var distance = Math.hypot(dx, dy);
            var elapsed = Math.max(8, now - last.time) / 1000;
            var speed = Math.min(1400, distance / elapsed);
            var vx = distance ? dx / distance * speed : 0;
            var vy = distance ? dy / distance * speed : 0;
            // Bound work even if a pointer jumps across a very wide screen.
            var count = 0;
            var remaining = distance;
            var traveled = 0;
            while (carry + remaining >= spacing && count < maxParticles) {
                var step = spacing - carry;
                traveled += step;
                remaining -= step;
                spawn(last.x + dx * traveled / distance, last.y + dy * traveled / distance, now, vx, vy);
                carry = 0;
                spacing = 22 + Math.random() * 24;
                count++;
            }
            carry = count === maxParticles ? 0 : carry + remaining;
        }
        last = point;
        if (!frame && particles.length) frame = requestAnimationFrame(tick);
    }, { passive: true });

    window.addEventListener('resize', function() { reset(); resize(); });
    window.addEventListener('blur', reset);
    window.addEventListener('pagehide', reset);
    document.documentElement.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', reset);
    reducedMotion.addEventListener('change', reset);
    mousePointer.addEventListener('change', reset);
})();

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
