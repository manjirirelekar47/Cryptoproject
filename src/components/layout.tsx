export const Nav = () => (
  <nav class="site-nav" id="siteNav">
    <div class="container">
      <a href="/" class="brand">
        <span class="brand-dot"></span>
        CRYPTO-ATTRIB // I4C
      </a>
      <div class="nav-links">
        <a href="/#problem">Problem</a>
        <a href="/#idea">Idea</a>
        <a href="/#tech">Technical</a>
        <a href="/#impact">Impact</a>
        <a href="/demo" class="nav-cta">Live Demo</a>
      </div>
    </div>
  </nav>
)

export const Footer = () => (
  <footer class="site-footer">
    <div class="container">
      <div class="fine">© 2026 Team Submission · Theme: Blockchain &amp; Cybersecurity · Dept: I4C, CIS Division</div>
      <div class="fine">Ministry of Home Affairs · 30-hr Hackathon Build</div>
    </div>
  </footer>
)

export const NavScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function(){
        var nav = document.getElementById('siteNav');
        if (!nav) return;
        function onScroll(){
          if (window.scrollY > 30) nav.classList.add('scrolled');
          else nav.classList.remove('scrolled');
        }
        window.addEventListener('scroll', onScroll);
        onScroll();

        var els = document.querySelectorAll('.fade-up');
        if ('IntersectionObserver' in window && els.length) {
          var io = new IntersectionObserver(function(entries){
            entries.forEach(function(e){
              if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
            });
          }, { threshold: 0.12 });
          els.forEach(function(el){ io.observe(el); });
        } else {
          els.forEach(function(el){ el.classList.add('in-view'); });
        }
      })();
      `,
    }}
  />
)
