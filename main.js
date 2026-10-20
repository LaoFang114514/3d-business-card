/* ============================================================
   本文件是网页的实现逻辑，日常不需要动。
   名片上的标题、图片、社交媒体、关于弹窗，全部在 config.js 里改。
   ============================================================ */

const DEFAULTS = {
  标题: '3D 名片',
  正面图片: 'front.png',
  背面图片: 'back.png',
  旋转速度: 0.05,
  社交媒体: [],
  关于: { 标题: '关于', 链接: [], 版权: '', 备案: [] },
};

const raw = window.名片配置 || {};
const cfg = Object.assign({}, DEFAULTS, raw);
cfg.关于 = Object.assign({}, DEFAULTS.关于, raw.关于 || {});

/* config.js 里的符号改错了（用了中文引号/逗号）会导致整个文件读不到，
   这时页面看着像坏了，所以显式提示一下 */
if (!window.名片配置) {
  const tip = document.createElement('div');
  tip.className = 'cfg-error';
  tip.textContent = 'config.js 没有读到，请检查引号、逗号、冒号是不是英文符号';
  document.body.appendChild(tip);
}

/* 按名称或链接猜平台图标，认不出时用通用链接图标 */
const PLATFORM = [
  [/bilibili\.com|b23\.tv|哔哩|b站/i, 'bilibili'],
  [/douyin\.com|iesdouyin|抖音/, 'douyin'],
  [/weibo\.(com|cn)|微博/, 'weibo'],
  [/xiaohongshu\.com|xhslink|小红书/, 'xiaohongshu'],
  [/weixin|wechat|微信/, 'wechat'],
  [/qq\.com|qq\.me|QQ|企鹅/, 'qq'],
  [/zhihu\.com|知乎/, 'zhihu'],
  [/github\.com|gitcode\.com|github|gitcode/i, 'github'],
  [/(^|\/|\.|@)x\.com|twitter|推特/, 'x'],
  [/youtu\.?be|油管/, 'youtube'],
  [/^mailto:|邮箱|邮件|e-?mail/i, 'mail'],
  [/主页|首页|个人网站/, 'home'],
];

const ICONS = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  light: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z',
  dark: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z',
  bilibili: 'M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z',
  douyin: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  link: 'M11 17H7q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h4zm-3-4v-2h8v2zm5 4v-2h4q1.25 0 2.125-.875T20 12t-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12t-1.463 3.538T17 17z',
  mail: 'M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z',
  weibo: 'M4.278 8.592c2.773-2.77 6.004-4.033 7.219-2.816c.537.537.588 1.464.244 2.572c-.178.557.524.25.524.25c2.241-.938 4.197-.994 4.91.027c.38.542.343 1.306-.008 2.19c-.163.407.048.47.36.563c1.262.392 2.668 1.336 2.668 3.004c0 2.763-3.98 6.239-9.964 6.239c-4.565 0-9.23-2.213-9.23-5.852c0-1.902 1.204-4.102 3.277-6.177m12.133 5.742c-.237-2.391-3.382-4.039-7.023-3.677c-3.64.359-6.403 2.59-6.167 4.98c.237 2.394 3.382 4.039 7.023 3.68c3.641-.362 6.401-2.592 6.167-4.983m-10.249.104c.754-1.528 2.712-2.39 4.446-1.94c1.792.463 2.707 2.154 1.976 3.799c-.744 1.683-2.883 2.58-4.695 1.994c-1.752-.566-2.493-2.295-1.727-3.853m2.715.578c-.563-.237-1.291.008-1.64.553c-.354.547-.189 1.201.371 1.456c.568.257 1.325.013 1.676-.55c.346-.568.163-1.217-.408-1.459m1.387-.578c-.216-.084-.486.018-.613.232c-.123.214-.054.458.163.547c.219.092.501-.012.628-.231c.123-.22.044-.466-.178-.548m5.694-11.514A5.83 5.83 0 0 1 21.5 4.72a5.84 5.84 0 0 1 1.22 5.704a.84.84 0 0 1-1.06.54a.844.844 0 0 1-.542-1.062a4.142 4.142 0 0 0-4.808-5.327a.845.845 0 0 1-.353-1.65m.626 2.926a2.836 2.836 0 0 1 3.29 3.648a.725.725 0 1 1-1.378-.45a1.38 1.38 0 0 0-.287-1.357a1.4 1.4 0 0 0-1.322-.426a.723.723 0 1 1-.303-1.415',
  zhihu: 'M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078c-.271.73-.5 1.434-.68 2.11h4.587c.545-.006.445 1.168.445 1.171H9.384a58.104 58.104 0 01-.112 3.797h2.712c.388.023.393 1.251.393 1.266H9.183a9.223 9.223 0 01-.408 2.102l.757-.604c.452.456 1.512 1.712 1.906 2.177.473.681.063 2.081.063 2.081l-2.794-3.382c-.653 2.518-1.845 3.607-1.845 3.607-.523.468-1.58.82-2.64.516 2.218-1.73 3.44-3.917 3.667-6.497H4.491c0-.015.197-1.243.806-1.266h2.71c.024-.32.086-3.254.086-3.797H6.598c-.136.406-.158.447-.268.753-.594 1.095-1.603 1.122-1.907 1.155.906-1.821 1.416-3.6 1.591-4.064.425-1.124 1.671-1.125 1.671-1.125zM13.078 6h6.377v11.33h-2.573l-2.184 1.373-.401-1.373h-1.219zm1.313 1.219v8.86h.623l.263.937 1.455-.938h1.456v-8.86z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  qq: 'M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673',
  wechat: 'M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z',
  x: 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  xiaohongshu: 'M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972.794.794 0 0 0-.884-.618.795.795 0 0 0-.692.794c0 .101-.002.666.001.777zm-11.509 4.808c-.203.001-1.353.004-1.685.003a2.528 2.528 0 0 1-.766-.126.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124.66.01 1.32.002 1.981 0 .01 0 .02-.006.023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01a.834.834 0 0 0-.01.08c-.027.397-.038.495-.234 3.06-.012.24-.034.389-.135.607-.026.057-.033.042.003.112.046.092.681 1.523.787 1.74.008.015.011.02.017.02.008 0 .033-.026.047-.044.147-.187.268-.391.371-.606.306-.635.44-1.325.486-1.706.014-.11.021-.22.03-.33l.204-2.616.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.427 1.427 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.443.443 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293c.076.982.153 1.964.233 2.946.05.4.186 1.085.487 1.706.103.215.223.419.37.606.015.018.037.051.048.049.02-.003.742-1.642.804-1.765.036-.07.03-.055.003-.112zm3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56c-.01 0-.02.006-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.534.534 0 0 0-.02.191.46.46 0 0 0 .23.378.981.981 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.53.53 0 0 0-.023.172.465.465 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001c.01 0 .02-.006.023-.015l.575-1.28a.025.025 0 0 0-.024-.035zm-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829 0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047.001.037.465 1.064.555 1.263.01.02.03.033.051.033.157.003.767.009.938-.014.153-.02.3-.06.438-.132.3-.156.49-.419.595-.765.052-.172.075-.353.075-.533.002-2.33 0-4.66-.007-6.991a.032.032 0 0 0-.032-.032zm11.784 6.896c0-.014-.01-.021-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084-.37 0-1.11-.002-1.304 0-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036c.006.01.013.008.058.008 1.748.003 3.495.002 5.243.002.03-.001.034-.006.035-.033v-1.539zm4.177-3.43c0 .013-.007.023-.02.024-.346.006-.692.004-1.037.004-.014-.002-.022-.01-.022-.024-.005-.434-.007-.869-.01-1.303 0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015.093.025.16.107.165.204.006.431.002 1.153.001 1.153zm2.67.244a1.953 1.953 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21c0-.132-.007-.263-.025-.394a1.823 1.823 0 0 0-.153-.53 1.533 1.533 0 0 0-.677-.71 2.167 2.167 0 0 0-1-.258c-.153-.003-.567 0-.72 0-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007c-.006.006-.008.012-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128V11.19s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003c.098 0 .191.02.28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185 0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033.184.437.374.871.57 1.303a.045.045 0 0 0 .04.026c.17.005.34.002.51.003.15-.002.517.004.666-.01a2.03 2.03 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981c0-.128-.01-.254-.034-.38 0 .078-.029-.641-.724-.998z',
};

function pickIcon(item) {
  if (ICONS[item.图标]) return item.图标;
  const s = (item.链接 || '') + ' ' + (item.名称 || '');
  for (const [re, key] of PLATFORM) { if (re.test(s)) return key; }
  return 'link';
}

/* ---- 把配置写回页面 ---- */
const card    = document.getElementById('card');
const scene   = document.getElementById('scene');
const toggle  = document.getElementById('toggle');
const label   = document.getElementById('label');
const icon    = document.getElementById('iconPath');

document.title = cfg.标题;
document.getElementById('cardTitle').textContent = cfg.标题;
document.getElementById('frontImg').src = cfg.正面图片;
document.getElementById('backImg').src = cfg.背面图片;

const ICON_PAUSE = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z';
const ICON_PLAY  = 'M8 5v14l11-7z';

let ry = 0, rx = 0, scale = 1;   // rx 初始水平，竖直拖动后回弹至水平
let autoRotate = Number(cfg.旋转速度) > 0;
let dragging = false;
let lastX = 0, lastY = 0;
let pinch = null;
let vx = 0;                      // 水平角速度（惯性用）
let releaseAnim = null;          // 松手动画帧（回弹 + 惯性）

const RX_HOME = 0;               // 竖直回弹目标角度（水平正中）

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function render() {
  card.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(' + scale + ')';
}

let lastTime = 0;
function loop(t) {
  const dt = Math.min(50, (t - lastTime) || 16);
  lastTime = t;
  if (autoRotate && !dragging && !pinch) ry = (ry + Number(cfg.旋转速度) * dt) % 360;
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

scene.addEventListener('pointerdown', (e) => {
  if (releaseAnim) { cancelAnimationFrame(releaseAnim); releaseAnim = null; }
  dragging = true;
  vx = 0;
  lastX = e.clientX;
  lastY = e.clientY;
  scene.setPointerCapture(e.pointerId);
});
scene.addEventListener('pointermove', (e) => {
  if (!dragging || pinch) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  if (!autoRotate) {   // 自动旋转中只响应上下拖动，不响应水平
    ry = (ry + dx * 0.4) % 360;
    vx = dx * 0.4;
  }
  rx = clamp(rx + dy * 0.3, -45, 45);
});
scene.addEventListener('pointerup',      () => { endDrag(); });
scene.addEventListener('pointercancel',  () => { endDrag(); });

/* 松手：上下回弹至中间 + 左右惯性旋转 */
function endDrag() {
  dragging = false;
  if (releaseAnim) return;
  const releaseLoop = () => {
    let active = false;
    // 上下回弹至水平正中
    const diff = RX_HOME - rx;
    if (Math.abs(diff) > 0.1) {
      rx += diff * 0.15;
      active = true;
    } else {
      rx = RX_HOME;
    }
    // 左右惯性（速度逐帧衰减，仅暂停状态）
    if (!autoRotate && Math.abs(vx) > 0.3) {
      ry = (ry + vx) % 360;
      vx *= 0.92;
      active = true;
    } else {
      vx = 0;
    }
    render();
    releaseAnim = active ? requestAnimationFrame(releaseLoop) : null;
  };
  releaseAnim = requestAnimationFrame(releaseLoop);
}

scene.addEventListener('wheel', (e) => {
  e.preventDefault();
  scale = clamp(scale * Math.exp(-e.deltaY * 0.0012), 0.4, 3);
  render();
}, { passive: false });

function dist(touches) {
  return Math.hypot(touches[0].clientX - touches[1].clientX,
                    touches[0].clientY - touches[1].clientY);
}
scene.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) pinch = { d: dist(e.touches), s: scale };
}, { passive: true });
scene.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2 && pinch) {
    e.preventDefault();
    scale = clamp(pinch.s * dist(e.touches) / pinch.d, 0.4, 3);
    render();
  }
}, { passive: false });
scene.addEventListener('touchend', (e) => {
  if (e.touches.length < 2) pinch = null;
});

toggle.addEventListener('click', () => {
  autoRotate = !autoRotate;
  if (autoRotate && releaseAnim) { cancelAnimationFrame(releaseAnim); releaseAnim = null; }
  vx = 0;
  label.textContent = autoRotate ? '暂停旋转' : '开始旋转';
  icon.setAttribute('d', autoRotate ? ICON_PAUSE : ICON_PLAY);
});
if (!autoRotate) {
  label.textContent = '开始旋转';
  icon.setAttribute('d', ICON_PLAY);
}

/* ---- 按钮触摸遮罩 ---- */
document.querySelectorAll('mdui-fab.ctrl').forEach((fab) => {
  fab.addEventListener('pointerdown', () => fab.classList.add('pressed'));
  const clear = () => fab.classList.remove('pressed');
  fab.addEventListener('pointerup', clear);
  fab.addEventListener('pointercancel', clear);
  fab.addEventListener('pointerleave', clear);
});

/* ---- 左边按钮：关于弹窗 ---- */
document.getElementById('about').addEventListener('click', () => {
  document.getElementById('aboutDialog').open = true;
});
document.getElementById('aboutClose').addEventListener('click', () => {
  document.getElementById('aboutDialog').open = false;
});
document.getElementById('aboutTitle').textContent = cfg.关于.标题;
const aboutLinks = document.getElementById('aboutLinks');
let aboutLine = null;
(cfg.关于.链接 || []).forEach((item) => {
  if (!item || !item.链接) return;
  if (!aboutLine || item.换行) {
    aboutLine = document.createElement('div');
    aboutLine.className = 'about-line';
    aboutLinks.appendChild(aboutLine);
  }
  const a = document.createElement('a');
  a.href = item.链接;
  a.textContent = item.名称 || item.链接;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  aboutLine.appendChild(a);
});

const aboutFooter = document.getElementById('aboutFooter');
const copyright = typeof cfg.关于.版权 === 'string' ? cfg.关于.版权.trim() : '';
const beianList = Array.isArray(cfg.关于.备案) ? cfg.关于.备案.filter((item) => item && item.名称) : [];
if (copyright || beianList.length) {
  aboutFooter.hidden = false;
  if (copyright) {
    const line = document.createElement('div');
    line.textContent = copyright;
    aboutFooter.appendChild(line);
  }
  if (beianList.length) {
    const line = document.createElement('div');
    line.className = 'about-beian';
    beianList.forEach((item) => {
      const a = document.createElement('a');
      a.textContent = item.名称;
      if (item.链接) {
        a.href = item.链接;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      line.appendChild(a);
    });
    aboutFooter.appendChild(line);
  }
}

/* ---- 右边按钮：社交媒体，原地向上展开成一排图标 ---- */
const socialBtn = document.getElementById('social');
const tray      = document.getElementById('socialTray');

/* 社交栏第一个按钮：亮色 / 暗色切换 */
const themeBtn = document.createElement('button');
themeBtn.type = 'button';
themeBtn.id = 'themeToggle';
themeBtn.className = 'social-item';
const themeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
themeSvg.setAttribute('viewBox', '0 0 24 24');
themeSvg.setAttribute('fill', 'currentColor');
themeSvg.setAttribute('aria-hidden', 'true');
const themePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
themeSvg.appendChild(themePath);
themeBtn.appendChild(themeSvg);
tray.appendChild(themeBtn);

function isDarkTheme() {
  return document.documentElement.classList.contains('mdui-theme-dark');
}
function refreshThemeBtn() {
  const dark = isDarkTheme();
  themePath.setAttribute('d', dark ? ICONS.light : ICONS.dark);
  themeBtn.title = dark ? '切换到亮色模式' : '切换到暗色模式';
  themeBtn.setAttribute('aria-label', themeBtn.title);
}
refreshThemeBtn();
themeBtn.addEventListener('click', () => {
  const dark = !isDarkTheme();
  document.documentElement.classList.toggle('mdui-theme-dark', dark);
  document.documentElement.classList.toggle('mdui-theme-light', !dark);
  refreshThemeBtn();
});

(cfg.社交媒体 || []).forEach((item) => {
  if (!item || !item.链接) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'social-item';
  btn.title = item.名称 || item.链接;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', ICONS[pickIcon(item)] || ICONS.link);
  svg.appendChild(path);
  btn.appendChild(svg);
  btn.addEventListener('click', () => {
    window.open(item.链接, '_blank', 'noopener,noreferrer');
    setTray(false);
  });
  tray.appendChild(btn);
});

/* 一条都没配就把按钮藏起来，免得点开一个空栏 */
if (!tray.children.length) socialBtn.style.display = 'none';

function setTray(open) {
  tray.classList.toggle('open', open);
  tray.setAttribute('aria-hidden', open ? 'false' : 'true');
  socialBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  socialBtn.setAttribute('variant', open ? 'filled' : 'tonal');
}

socialBtn.addEventListener('click', () => setTray(!tray.classList.contains('open')));
document.addEventListener('click', (e) => {
  if (!tray.classList.contains('open')) return;
  const path = e.composedPath();
  if (path.includes(tray) || path.includes(socialBtn)) return;
  setTray(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setTray(false);
});
