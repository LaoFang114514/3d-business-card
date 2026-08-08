const card    = document.getElementById('card');
const scene   = document.getElementById('scene');
const toggle  = document.getElementById('toggle');
const label   = document.getElementById('label');
const icon    = document.getElementById('iconPath');

const ICON_PAUSE = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z';
const ICON_PLAY  = 'M8 5v14l11-7z';

let ry = 0, rx = 0, scale = 1;   // rx 初始水平，竖直拖动后回弹至水平
let autoRotate = true;
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
  if (autoRotate && !dragging && !pinch) ry = (ry + 0.05 * dt) % 360;
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
  rx = clamp(rx + dy * 0.3, -70, 45);
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

/* ---- 按钮触摸遮罩 ---- */
document.querySelectorAll('mdui-fab.ctrl').forEach((fab) => {
  fab.addEventListener('pointerdown', () => fab.classList.add('pressed'));
  const clear = () => fab.classList.remove('pressed');
  fab.addEventListener('pointerup', clear);
  fab.addEventListener('pointercancel', clear);
  fab.addEventListener('pointerleave', clear);
});

/* ---- 左边按钮 ---- */
const GITHUB_URL = 'https://github.com/LaoFang114514/3d-business-card';
document.getElementById('back').addEventListener('click', () => {
  location.href = GITHUB_URL;
});

/* ---- 右边按钮 ---- */
const HOME_URL = 'https://gitcode.com/LaoFang233/3d-business-card';
document.getElementById('home').addEventListener('click', () => {
  location.href = HOME_URL;
});
