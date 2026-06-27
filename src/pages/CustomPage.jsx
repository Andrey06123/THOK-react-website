import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import "../css/custom.css"
// import "../css/product.css"

const colorPalette = {
  black: 0x1a1a1a,
  grey: 0x888888,
  navy: 0x1d3557,
  crimson: 0xe63946,
  forest: 0x2a9d8f,
  white: 0xffffff,
  cream: 0xf4f1de,
  canary: 0xe9c46a,
  coral: 0xf4a261,
  lilac: 0xa8dadc,
};

export default function Keyboard3D() {
  const containerRef = useRef(null);
  const outerCapsRef = useRef(null);
  const innerCapsRef = useRef(null);
  const caseMeshRef = useRef(null);

  const [outerColor, setOuterColor] = useState("grey");
  const [innerColor, setInnerColor] = useState("white");
  const [caseMaterial, setCaseMaterial] = useState("plastic");
  const [loading, setLoading] = useState(true);

  function setKeycapColor(mesh, hexColor) {
    if (!mesh) return;
    mesh.material.color.setHex(hexColor);
  }

  function createKeycapMaterial(texture, baseColor, symbolColor, symbolsAreLight = true) {
    const material = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.55,
      metalness: 0.0,
      map: texture,
    });

    material.userData.symbolColor = new THREE.Color(symbolColor);
    material.userData.symbolsAreLight = symbolsAreLight ? 1.0 : 0.0;

    material.onBeforeCompile = (shader) => {
      shader.uniforms.symbolColor = {
        value: material.userData.symbolColor,
      };

      shader.uniforms.symbolsAreLight = {
        value: material.userData.symbolsAreLight,
      };

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `
        #include <common>
        uniform vec3 symbolColor;
        uniform float symbolsAreLight;

        float getLuminance(vec3 color) {
          return dot(color, vec3(0.299, 0.587, 0.114));
        }
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `
        #ifdef USE_MAP
          vec4 sampledDiffuseColor = texture2D(map, vMapUv);
          float lum = getLuminance(sampledDiffuseColor.rgb);

          float lightSymbolMask = smoothstep(0.38, 0.62, lum);
          float darkSymbolMask = 1.0 - smoothstep(0.38, 0.62, lum);

          float symbolMask = mix(darkSymbolMask, lightSymbolMask, symbolsAreLight);
          symbolMask = clamp(symbolMask * 1.8, 0.0, 1.0);

          diffuseColor.rgb = mix(diffuseColor.rgb, symbolColor, symbolMask);
        #endif
        `
      );

      material.userData.shader = shader;
    };

    return material;
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111111");

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    const textureInnerKeycaps = textureLoader.load(
      "/3d-models/textures/white_keycaps_texture.png"
    );
    const textureOuterKeycaps = textureLoader.load(
      "/3d-models/textures/black_keycaps_texture.png"
    );
    const textureKeyboardBody = textureLoader.load(
      "/3d-models/textures/keyboard_body_textures.png"
    );

    function improveTexture(texture) {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.needsUpdate = true;
    }

    improveTexture(textureInnerKeycaps);
    improveTexture(textureOuterKeycaps);
    improveTexture(textureKeyboardBody);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 2;

    function handleResize() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;

      if (width < 600) {
        camera.position.set(5, 6, 5);
      } else {
        camera.position.set(3.5, 5, 3.5);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    handleResize();

    const loader = new GLTFLoader();

    loader.load(
      "/3d-models/model/keyboard.glb",
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        model.position.x += model.position.x - center.x;
        model.position.y += model.position.y - center.y;
        model.position.z += model.position.z - center.z;

        model.traverse((child) => {
          if (!child.isMesh) return;

          if (child.name === "white_keycaps") {
            child.material = createKeycapMaterial(
              textureInnerKeycaps,
              colorPalette[innerColor],
              0x111111,
              false
            );

            innerCapsRef.current = child;
          }

          if (child.name === "black_keycaps") {
            child.material = createKeycapMaterial(
              textureOuterKeycaps,
              colorPalette[outerColor],
              0xffffff,
              true
            );

            outerCapsRef.current = child;
          }

          if (child.name === "keyboard_body") {
            child.material = new THREE.MeshStandardMaterial({
              map: textureKeyboardBody,
              color: 0xffffff,
              roughness: 0.6,
              metalness: 0.0,
            });

            caseMeshRef.current = child;
          }
        });

        scene.add(model);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
        setLoading(false);
      }
    );

    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    setKeycapColor(outerCapsRef.current, colorPalette[outerColor]);
  }, [outerColor]);

  useEffect(() => {
    setKeycapColor(innerCapsRef.current, colorPalette[innerColor]);
  }, [innerColor]);

  useEffect(() => {
    const mesh = caseMeshRef.current;
    if (!mesh) return;

    if (caseMaterial === "metallic") {
      mesh.material.metalness = 0.8;
      mesh.material.roughness = 0.2;
    } else {
      mesh.material.metalness = 0.0;
      mesh.material.roughness = 0.6;
    }

    mesh.material.needsUpdate = true;
  }, [caseMaterial]);

  return (
    <section className="customSection">
      <div className="controls">
        <h3>Outer keycaps: {outerColor}</h3>
        <div className="swatch-row">
          {Object.keys(colorPalette).map((color) => (
            <button
              key={color}
              className={`swatch ${outerColor === color ? "active" : ""}`}
              onClick={() => setOuterColor(color)}
            >
              {color}
            </button>
          ))}
        </div>

        <h3>Inner keycaps: {innerColor}</h3>
        <div className="swatch-row">
          {Object.keys(colorPalette).map((color) => (
            <button
              key={color}
              className={`swatch ${innerColor === color ? "active" : ""}`}
              onClick={() => setInnerColor(color)}
            >
              {color}
            </button>
          ))}
        </div>

        <div className="material-selector">
          <button
            className={`mat-btn ${caseMaterial === "plastic" ? "active" : ""}`}
            onClick={() => setCaseMaterial("plastic")}
          >
            Plastic
          </button>

          <button
            className={`mat-btn ${caseMaterial === "metallic" ? "active" : ""}`}
            onClick={() => setCaseMaterial("metallic")}
          >
            Metallic
          </button>
        </div>
      </div>

      <div className="three-wrapper">
        {loading && <div className="loader-3d">Loading 3D model...</div>}
        <div ref={containerRef} className="my-3d-container" />
      </div>
    </section>
  );
}