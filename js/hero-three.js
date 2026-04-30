/**
 * Minimal Three.js accent — single low-poly shape, no heavy scene.
 */
(function () {
  function init() {
    if (typeof THREE === "undefined") return;
    const mount = document.getElementById("hero-three");
    if (!mount) return;

    let w = mount.clientWidth || 300;
    let h = mount.clientHeight || 200;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.z = 3.2;

    const geo = new THREE.IcosahedronGeometry(0.85, 0);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    let running = true;
    let raf = 0;

    function tick() {
      if (!running) return;
      mesh.rotation.x += 0.0022;
      mesh.rotation.y += 0.0035;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    function onResize() {
      w = mount.clientWidth || 300;
      h = mount.clientHeight || 200;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener("resize", onResize, { passive: true });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        tick();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
