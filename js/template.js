export function createLeft() {
  const ele = document.createElement('div');
  ele.classList.add('leftbar-container');
  ele.innerHTML = `
      <header class="header"><div class="logo-wrap"><a class="avatar" href="/"><img class="avatar" src="/img/avatars.png" alt="" loading="lazy" /></a><a class="title" href="/"><div class="main" ff="title">白瑜のBlog</div><div class="sub normal cap" style="margin-left:-3px;">笑，只是一个表情，与快乐无关。</div><div class="sub hover cap" style="margin-left:-3px;opacity:0;">生活，就是过了今天等明天而已。</div></a></div></header>
      <div class="widgets">
      <widget class="widget-wrapper post-list">
          <div class="widget-header dis-select"><span class="name" style="font-weight: bold;">墙裂推荐</span></div>
          <div class="widget-body fs14">
          <a class="item title" href="/p/987654327.html"><span class="title">搭建自己的 AI 会话应用</span></a>
          <a class="item title" href="/p/940241891.html"><span class="title">Windows 风格的个人网盘</span></a>
          <a class="item title" href="/p/987654323.html"><span class="title">自建家庭 KTV</span></a>
          <a class="item title" href="/p/940241892.html"><span class="title">性能测试平台</span></a>
          <a class="item title" href="/p/940242882.html"><span class="title">做一个自己的领券网站</span></a>
          <a class="item title" href="/p/940241893.html"><span class="title">AIGC 助力办公智能化</span></a>
          </div>
      </widget>
      </div>
      <footer class="footer dis-select">
      <div class="social-wrap">
        <a class="social" title="主页" href="/"><img src="/img/home.svg" alt="" /></a>
        <a class="social" title="Github" href="https://github.com/leeyoshinari" target="_blank"><img src="/img/github.svg" alt="" /></a>
        <!--a class="social left-donate" title="打赏" onclick="showQRCode()"><img src="/img/donate.svg" alt="" /></a-->
        <a class="social" title="浅色/深色" onclick="switchTheme()"><img src="/img/moon.svg" alt="" /></a>
      </div>
      </footer>`;
  return ele;
}

// 有目录时引用这个模块
export function createRight() {
  const ele = document.createElement('div');
  ele.classList.add('widgets');
  ele.innerHTML = `
    <widget class="widget-wrapper toc" id="data-toc" collapse="false">
      <div class="widget-header dis-select">
        <span class="name" style="font-size: 1.5em; font-weight: bold;">目录</span>
        <a class="cap-action" onclick="sidebar.toggleTOC()"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6h11m-11 6h11m-11 6h11M4 6h1v4m-1 0h2m0 8H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg></a>
      </div>
      <div class="widget-body"></div>
      <div class="widget-footer">
        <a class="top" onclick="util.scrollTop()"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m9 15.5l3-3l3 3m-6-4l3-3l3 3"/></g></svg><span>返回顶部</span></a>
      </div>
    </widget>`;
  return ele;
}

// 没有目录时引用这个模块
export function createDefaultRight() {
  const ele = document.createElement('div');
  ele.classList.add('widgets');
  ele.innerHTML = `
    <widget class="widget-wrapper markdown">
      <div class="widget-header dis-select"><span class="name">🎉 你好呀，欢迎光临 ~</span></div><div class="widget-body fs14"><p><span id="hitokoto"></span></p><hr style="border: 1px solid black; background-color: black;">本站仅分享个人原创、二次开发的东西，以及个人学习和经验的总结，绝不灌水，欢迎收藏本站。</div>
    </widget>
    <widget class="widget-wrapper markdown">
      <div class="widget-header dis-select"><span class="name">🥂 这么有缘，那就认识一下吧 ~</span></div><div class="widget-body fs14" style="text-align: center;"><hr style="border: 1px solid black; background-color: black;"><img src="/img/wechat.jpg" alt="" loading="lazy" /></div>
    </widget>`;
  return ele;
}

export function createFootNote() {
  const ele = document.createElement('div');
  ele.classList.add('text');
  ele.innerHTML = `<center><span>© 2025 白瑜  ·  共发表 15 篇 Blogs</span><br></center>`;
  return ele;
}

export function createMobileHeader() {
  const ele = document.createElement('div');
  ele.classList.add('logo-wrap');
  ele.innerHTML = `<a class="avatar" href="/"><img class="avatar" src="/img/avatars.png" alt="" loading="lazy" /></a><a class="title" href="/"><div class="main" ff="title">白瑜のBlog</div><div class="sub normal cap">人生无非是笑笑人家，再让人家笑笑而已！</div><div class="sub hover cap" style="opacity:0">今天的事情不必今天做完，万一活不到明天呢！</div></a>`;
  return ele;
}

export function createDonate() {
  const ele = document.createElement('section');
  ele.innerHTML = `
    <div class="header"><!--span>打赏</span--></div>
    <div class="body">
        <p>如果这篇文章对您有帮助，那<a onclick="showQRCode()" class="donate-icon">请作者喝杯奶茶</a>吧!</p>
        <div class="donate-image" id="donate-wechat" style="display:none; position:absolute; z-index:1000; transform: translateY(-100%); transform: translateX(10%) translateY(-118%); max-width: 70%;">
        <img loading="lazy" src="/img/donate.jpg" alt="打赏" loading="lazy" />
        </div>
    </div>`;
  return ele;
}

export function createFloatPanel(isTop=true) {
  const ele = document.createElement('div');
  ele.classList.add('float-panel');
  ele.classList.add('blur');
  var text = `
    <button type='button' style='display:none' class='laptop-only rightbar-toggle mobile' onclick='sidebar.rightbar()'>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6h11m-11 6h11m-11 6h11M4 6h1v4m-1 0h2m0 8H4c0-1 2-2 2-3s-1-1.5-2-1"/>
      </svg>
    </button>
    <button type='button' style='display:none' class='mobile-only leftbar-toggle mobile' onclick='sidebar.leftbar()'>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M2 11c0-3.771 0-5.657 1.172-6.828C4.343 3 6.229 3 10 3h4c3.771 0 5.657 0 6.828 1.172C22 5.343 22 7.229 22 11v2c0 3.771 0 5.657-1.172 6.828C19.657 21 17.771 21 14 21h-4c-3.771 0-5.657 0-6.828-1.172C2 18.657 2 16.771 2 13z"/>
          <path id="sep" stroke-linecap="round" d="M5.5 10h6m-5 4h4m4.5 7V3"/>
        </g>
      </svg>
    </button>`;
  if (isTop) {
    text += `
      <button type='button' style='display:none' class='laptop-only topbar-toggle mobile' onclick='util.scrollTop()'>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="m9 15.5l3-3l3 3m-6-4l3-3l3 3"/>
          </g>
        </svg>
      </button>`;
  }
  ele.innerHTML = text;
  return ele;
}
