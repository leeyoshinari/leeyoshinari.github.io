const l_body = document.querySelector('.l_body');
const showQRCode = () => {
  const qrCode = document.getElementById('donate-wechat');
  qrCode.style.display = 'block';
  document.addEventListener('click', hideQRCode);
};

const hideQRCode = (event) => {
  const qrCode = document.getElementById('donate-wechat');
  const donateIcon = document.querySelector('.donate-icon');
  if (!qrCode.contains(event.target) && !donateIcon.contains(event.target)) {
    qrCode.style.display = 'none';
    document.removeEventListener('click', hideQRCode);
  }
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  const cmt = document.getElementById('giscus');
  if (cmt) {
    // This works before giscus load.
    cmt.setAttribute('data-theme', theme);
  }
  const iframe = document.querySelector('#comments > section.giscus > iframe');
  if (iframe) {
    // This works after giscus loaded.
    const src = iframe.src;
    const newSrc = src.replace(/theme=[\w]+/, `theme=${theme}`);
    iframe.src = newSrc;
  }
}
const switchTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  let newTheme;
  switch (currentTheme) {
    case 'light':
      newTheme = 'dark';
      break
    default:
      newTheme = 'light';
  }
  applyTheme(newTheme)
  window.localStorage.setItem('Stellar.theme', newTheme);
  const messages = {
    light: `已切换为浅色模式`,
    dark: `已切换为深色模式`,
  }
  hud?.toast?.(messages[newTheme]);
}

const theme = window.localStorage.getItem('Stellar.theme');
if (theme !== null) {applyTheme(theme);} else {window.localStorage.setItem('Stellar.theme', 'light');applyTheme('light');}

const sidebar = {
  leftbar: () => {
    if (l_body) {
      l_body.toggleAttribute('leftbar');
      l_body.removeAttribute('rightbar');
    }
  },
  rightbar: () => {
    if (l_body) {
      l_body.toggleAttribute('rightbar');
      l_body.removeAttribute('leftbar');
    }
  },
  dismiss: () => {
    if (l_body) {
      l_body.removeAttribute('leftbar');
      l_body.removeAttribute('rightbar');
    }
  },
  toggleTOC: () => {
    document.querySelector('#data-toc').classList.toggle('collapse');
  }
}

const util = {
  diffDate: (d, more = false) => {
    const ctx = {date_suffix: {just: `刚刚`, min: `分钟前`, hour: `小时前`, day: `天前`}, root : `/`,};
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let result;
    if (more) {
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (dayCount > 14) {
        result = null;
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + ' ' + ctx.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + ' ' + ctx.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + ' ' + ctx.date_suffix.min;
      } else {
        result = ctx.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  // toggle: (id) => {const el = document.getElementById(id);if (el) {el.classList.toggle("display");}},
  scrollTop: () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }
}

const hud = {
  toast: (msg, duration) => {
    const d = Number(isNaN(duration) ? 2000 : duration);
    var el = document.createElement('div');
    el.classList.add('toast');
    el.classList.add('show');
    el.innerHTML = msg;
    document.body.appendChild(el);
    setTimeout(function(){ document.body.removeChild(el) }, d);
  },

}

const init = {
  toc: () => {
    const scrollOffset = 32;
    var segs = [];
    $("article.md-text :header").each(function (idx, node) {
      segs.push(node);
    });
    function activeTOC() {
      var scrollTop = $(this).scrollTop();
      var topSeg = null;
      for (var idx in segs) {
        var seg = $(segs[idx]);
        if (seg.offset().top > scrollTop + scrollOffset) {
          continue;
        }
        if (!topSeg) {
          topSeg = seg;
        } else if (seg.offset().top >= topSeg.offset().top) {
          topSeg = seg;
        }
      }
      if (topSeg) {
        $("#data-toc a.toc-link").removeClass("active");
        var link = "#" + topSeg.attr('id');
        if (link != '#undefined') {
          const highlightItem = $('#data-toc a.toc-link[href="' + encodeURI(link) + '"]');
          if (highlightItem.length > 0) {
            highlightItem.addClass("active");
          }
        } else {
          $('#data-toc a.toc-link:first').addClass("active");
        }
      }
    }
    function scrollTOC() {
      const e0 = document.querySelector('#data-toc .toc');
      const e1 = document.querySelector('#data-toc .toc a.toc-link.active');
      if (e0 == null || e1 == null) {
        return;
      }
      const offsetBottom = e1.getBoundingClientRect().bottom - e0.getBoundingClientRect().bottom + 100;
      const offsetTop = e1.getBoundingClientRect().top - e0.getBoundingClientRect().top - 64;
      if (offsetTop < 0) {
        e0.scrollBy({top: offsetTop, behavior: "smooth"});
      } else if (offsetBottom > 0) {
        e0.scrollBy({top: offsetBottom, behavior: "smooth"});
      }
    }
    
    var timeout = null;
    window.addEventListener('scroll', function() {
      activeTOC();
      if(timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(function() {
        scrollTOC();
      }.bind(this), 50);
    });
  },
  sidebar: () => {
    $("#data-toc a.toc-link").click(function (e) {
      sidebar.dismiss();
    });
  },
  relativeDate: (selector) => {
    selector.forEach(item => {
      const $this = item;
      const timeVal = $this.getAttribute('datetime');
      let relativeValue = util.diffDate(timeVal, true);
      if (relativeValue) {
        $this.innerText = relativeValue;
      }
    })
  },
  /**
   * Tabs tag listener (without twitter bootstrap).
   */
  registerTabsTag: function () {
    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    document.querySelectorAll('.tabs .nav-tabs .tab').forEach(element => {
      element.addEventListener('click', event => {
        event.preventDefault();
        // Prevent selected tab to select again.
        if (element.classList.contains('active')) return;
        // Add & Remove active class on `nav-tabs` & `tab-content`.
        [...element.parentNode.children].forEach(target => {
          target.classList.toggle('active', target === element);
        });
        // https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
        const tActive = document.getElementById(element.querySelector('a').getAttribute('href').replace('#', ''));
        [...tActive.parentNode.children].forEach(target => {
          target.classList.toggle('active', target === tActive);
        });
        // Trigger event
        tActive.dispatchEvent(new Event('tabs:click', {
          bubbles: true
        }));
      });
    });

    window.dispatchEvent(new Event('tabs:register'));
  },

}

const isArticle = document.querySelectorAll('.md-text.content').length;
if (isArticle === 0) {
  init.relativeDate(document.querySelectorAll('.post-meta time'));
} else {
  document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('h2, h3, h4, h5, h6');
    const toc = document.getElementsByClassName('l_right')[0].getElementsByClassName('widget-body')[0];
    const ul = document.createElement('ol');
    ul.classList.add('toc');
    toc.appendChild(ul);
    const stack = [ul];
    const numbering = [0, 0, 0, 0];
  
    headers.forEach(header => {
      header.id = header.textContent;
      const level = parseInt(header.tagName[1]) - 1;
      const li = document.createElement('li');
      const a = document.createElement('a');
      const span = document.createElement('span');
      li.classList.add('toc-item');
      li.classList.add('toc-level-' + header.tagName[1]);
      a.classList.add('toc-link');
      span.classList.add('toc-text');
      const lvl = level - 1;
      numbering[lvl]++;
      for (let i = lvl + 1; i < numbering.length; i++) {
        numbering[i] = 0;
      }
      const numString = numbering.slice(0, lvl + 1).join('.') + ' ';
      span.textContent = numString + header.textContent;
      a.href = '#' + encodeURI(header.textContent);
      a.appendChild(span);
      li.appendChild(a);
  
      if (stack.length < level) {
        const newUl = document.createElement('ol');
        newUl.classList.add('toc-child');
        stack[stack.length - 1].lastElementChild.appendChild(newUl);
        stack.push(newUl);
      } else if (stack.length > level) {
        while (stack.length > level) {
          stack.pop();
        }
      }
      stack[stack.length - 1].appendChild(li);
    });
    init.toc();
    init.sidebar();
    init.registerTabsTag();
  });
}
if(typeof(Viewer) !== 'undefined'){setTimeout(() => {document.querySelectorAll('article img').forEach(ele => {new Viewer(ele, {viewed() {},});})}, 2000);}
if (document.getElementsByClassName('copy-right')[0]) {
  document.getElementsByClassName('copy-right')[0].addEventListener('click', () => {
    const url = window.location.href.split('#')[0];
    if (document.getElementsByClassName('copyright-content')[0].innerText.length > 10) {
      document.getElementsByClassName('copyright-content')[0].innerHTML = '';
      document.getElementsByClassName('copy-right')[0].innerText = '版权';
    } else {
      document.getElementsByClassName('copyright-content')[0].innerHTML = `<div class="publish-date" style="margin-top: 1rem;"><span>版权声明：本文为博主原创文章，遵循 <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.en" target="_blank">CC BY-NC-ND 4.0</a> 版权协议，转载请附上原文出处链接和本声明。</span></div>
      <div class="publish-date"><span>本文链接：<a href="${url}">${url}</a></span></div>`;
      document.getElementsByClassName('copy-right')[0].innerText = '收起';
    }
  })
}
