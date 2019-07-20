/* https://threejsfundamentals.org/threejs/lessons/threejs-load-obj.html */

'use strict';

/* global THREE */

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({
    canvas
  });

  const fov = 55;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-1.5, 3.5, 10);
  // camera.lookAt(11, 3.5, 0)

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x40a8c0);

  camera.lookAt(scene.position);

  // {
  //   const planeSize = 40;

  //   const loader = new THREE.TextureLoader();
  //   const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
  //   texture.wrapS = THREE.RepeatWrapping;
  //   texture.wrapT = THREE.RepeatWrapping;
  //   texture.magFilter = THREE.NearestFilter;
  //   const repeats = planeSize / 2;
  //   texture.repeat.set(repeats, repeats);

  //   const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  //   const planeMat = new THREE.MeshPhongMaterial({
  //     map: texture,
  //     side: THREE.DoubleSide,
  //   });
  //   const mesh = new THREE.Mesh(planeGeo, planeMat);
  //   mesh.rotation.x = Math.PI * -.5;
  //   scene.add(mesh);
  // }

  {
    const skyColor = 0xB1E1FF; // light blue

    // const skyColor = 0x80CCCC
    const groundColor = 0xB97A20; // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const objLoader = new THREE.OBJLoader2();
    objLoader.loadMtl('assets/3dmodels/mountain.mtl', null, (materials) => {
      objLoader.setMaterials(materials);
      objLoader.load('assets/3dmodels/mountain.obj', (event) => {
        const root = event.detail.loaderRootNode;
        scene.add(root);
      });
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    var speed = Date.now() * 0.00025;
    camera.position.x = Math.cos(speed) * 10;
    camera.position.z = Math.sin(speed) * 10;
    camera.lookAt(-1.5, .25, 0);
    renderer.render(scene, camera);



    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();