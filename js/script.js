import * as THREE from '../../node_modules/three/build/three.module.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';

const background = 0x000000

const scene = new THREE.Scene();
scene.background = new THREE.Color(background);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement ); 
controls.target.set(0,0,0);

const light = new THREE.AmbientLight(0x404040, 2.5); // soft white light
scene.add( light );

const pointLight = new THREE.PointLight( 0x404040, 0.5 );
pointLight.position.y = 2500;
scene.add( pointLight );

const pointLight2 = new THREE.PointLight( 0x404040, 1 );
camera.add( pointLight2 );

const pointLight3 = new THREE.PointLight( 0x2ecc71, 0.5 );
pointLight3.position.x = - 1000;
pointLight3.position.z = 1000;
scene.add( pointLight3 );


var model;
function load_book(scale){
    const textureLoader= new THREE.TextureLoader()
    const normalMap = textureLoader.load("../assets/models/book/textures/BookA_normal.png")
    normalMap.flipY = false;
    const baseColor = textureLoader.load("../assets/models/book/textures/BookA_baseColor.png")
    baseColor.flipY = false;
    const metallicRoughness = textureLoader.load("../assets/models/book/textures/BookA_metallicRoughness.png")
    metallicRoughness.flipY = false;

    const material = new THREE.MeshStandardMaterial({
        color: "0x95a5a6",
        normalMap: normalMap,
        // metalnessMap: metallicRoughness,
        metalness: 0.80,
        // roughnessMap: metallicRoughness,
        roughness: 0.25,
        phog: true,
    });

    const loader = new GLTFLoader();

    loader.load( '../assets/models/book/scene.gltf', function ( gltf ) {
        model = gltf.scene;
        model.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = material;
            }
        });
        model.scale.set( scale, scale, scale);
        scene.add(model);
    }, 	function (xhr) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

function load_computer(scale){
    const textureLoader= new THREE.TextureLoader()

    const material = new THREE.MeshStandardMaterial({
        color: 0xbdc3c7,
        // normalMap: normalMap,
        // metalnessMap: metallicRoughness,
        metalness: 0.90,
        // roughnessMap: metallicRoughness,
        roughness: 0.25,
    });

    const loader = new GLTFLoader();

    loader.load( './assets/models/computer/scene.gltf', function ( gltf ) {
        model = gltf.scene;
        model.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = material;
            }
        });
        model.scale.set( scale, scale, scale);
        scene.add(model);
    }, 	function (xhr) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }, undefined, function ( error ) {
        console.error( error );
    } );
}


function load_briefcase(scale){
    const textureLoader= new THREE.TextureLoader()
    const baseColor = textureLoader.load("../assets/models/briefcase/textures/Team3_Sanchez_BriefcaseLeather_diffuse.jpeg")
    baseColor.flipY = false;

    const material = new THREE.MeshStandardMaterial({
        color: "0xbdc3c7",
        // normalMap: normalMap,
        // metalnessMap: metallicRoughness,
        metalness: 0.90,
        // roughnessMap: metallicRoughness,
        roughness: 0.25,
        phog: true,
    });

    const loader = new GLTFLoader();

    loader.load( '../assets/models/briefcase/scene.gltf', function ( gltf ) {
        model = gltf.scene;
        model.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = material;
            }
        });
        model.scale.set( scale, scale, scale);
        scene.add(model);
    }, 	function (xhr) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

load_computer(0.8) // skills
// load_briefcase(0.3) // experience
// load_book(0.1) // study

camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(0,1,0)

const animate = function () {
    requestAnimationFrame( animate );
    if (model) model.rotation.y += 0.01;
    renderer.render( scene, camera );
};
animate();


