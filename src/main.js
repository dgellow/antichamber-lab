/*global require*/
var Three = require('three'),
    Config = require('../data/config');

var renderer = new Three.WebGLRenderer(),
    scene = new Three.Scene(),
    domElement = document.getElementById('gameArea');

debugscene = scene;

renderer.setSize(Config.Scene.width, Config.Scene.height);
domElement.appendChild(renderer.domElement);

scene.add(createFloor(Config.Floor));
scene.add(createSkybox(Config.Skybox));

scene.add(createAmbientLight(Config.AmbientLight));
var light = createPointLight(Config.PointLight);
light.name = 'light';
scene.add(light);

// Main camera
var camera = createCamera(Config.Camera);
camera.name = 'camera';
scene.add(camera);

// Left face camera
var cameraLeft = createCamera(Config.CameraLeft);
cameraLeft.name = 'camera-left';
scene.add(cameraLeft);

// Left face screen
var leftRenderTarget = createWebGLRenderTarget(Config.RenderTargetLeft);
var leftScreenFace = createFaceScreen(leftRenderTarget,
                                      Config.FaceScreenLeft);
leftScreenFace.name = 'face-screen-left';
scene.add(leftScreenFace);

// Right face camera
var cameraRight = createCamera(Config.CameraRight);
cameraRight.name = 'camera-right';
scene.add(cameraRight);

// Right face screen
var rightRenderTarget = createWebGLRenderTarget(Config.RenderTargetRight);
var rightScreenFace = createFaceScreen(rightRenderTarget,
                                       Config.FaceScreenRight);
rightScreenFace.name = 'face-screen-right';
scene.add(rightScreenFace);

// Cube
var cube = createCube(Config.Cube);
cube.name = 'cube';
scene.add(cube);

// Torus knots
torusKnot(scene, -200, 50, -200, 0x346789);
torusKnot(scene, 200, 50, -200, 0x987654);
torusKnot(scene, 200, 50, 200, 0x457823);
torusKnot(scene, -200, 50, 200, 0x853476);


//
// Rendering
//
function draw(renderer, scene) {
    renderer.render(scene,
                    scene.getObjectByName('camera-left'),
                    leftRenderTarget);

    renderer.render(scene,
                    scene.getObjectByName('camera-right'),
                    rightRenderTarget);

    renderer.render(scene, scene.getObjectByName('camera'));
    requestAnimationFrame(draw.bind(this, renderer, scene));
}

function animate(scene) {
    setInterval(function() {
        scene.getObjectByName('camera-left')
            .rotateZ(0.03);
    }, 5);

    setInterval(function() {
        scene.getObjectByName('camera-right')
            .rotateZ(-0.001);
    }, 5);
}

//
// Factories
//

function torusKnot(scene, x, y, z, color) {
    var wireMaterial = new Three.MeshBasicMaterial({
        color: 0x000000, wireframe: true, transparent: true
    });
    var colorMaterial = new Three.MeshPhongMaterial({
        color: color
    });
    var shape = Three.SceneUtils.createMultiMaterialObject(
        new Three.TorusKnotGeometry(30, 6, 160, 10, 3, 2),
        [colorMaterial, wireMaterial]
    );
    shape.position.set(x, y, z);
    scene.add(shape);
}

function createPointLight(config) {
    var light = new Three.PointLight(
        (config && config.color) || 0xffffff
    );

    light.position.set(
        (config && config.x) || 0,
        (config && config.y) || 0,
        (config && config.z) || 0
    );

    return light;
}

function createAmbientLight(config) {
    return new Three.AmbientLight(
        (config && config.color) || 0xffffff
    );
}

function createFloor(config) {
    var texture = new Three.ImageUtils.loadTexture(
        'images/checkerboard.jpg'
    );
    texture.wrapS = texture.wrapT = Three.RepeatWrapping;
    texture.repeat.set(10, 10);

    var floor = new Three.Mesh(
        new Three.PlaneGeometry(1000, 1000, 10, 10),
        new Three.MeshBasicMaterial({
            map: texture, side: Three.DoubleSide
        })
    );

    floor.position.x = config.x || 0;
    floor.position.y = config.y || 0;
    floor.rotation.x = config.z || 0;

    return floor;
}

function createSkybox(config) {
    var materialDefinition = {
        map: Three.ImageUtils.loadTexture('images/night-sky.jpg')
    };

    var materials = [];
    for (var i = 0; i < 6; i += 1) {
        var material = new Three.MeshBasicMaterial(materialDefinition);
        material.side = Three.BackSide;
        materials.push(material);
    }

    var skybox = new Three.Mesh(
        new Three.BoxGeometry(5000, 5000, 5000, 1, 1, 1),
        new Three.MeshFaceMaterial(materials)
    );

    return skybox;
}

function createCamera(config) {
    var viewAngle = config.viewAngle || 45,
        near = config.near || 0.1,
        far = config.far || 10000;

    var camera = new Three.PerspectiveCamera(
        viewAngle,
        Config.Scene.width / Config.Scene.height,
        near, far
    );

    camera.position.x = config.x || 0;
    camera.position.y = config.y || 0;
    camera.position.z = config.z || 0;

    camera.rotation.x = (config.rotation && config.rotation.x) || 0;
    camera.rotation.y = (config.rotation && config.rotation.y) || 0;
    camera.rotation.z = (config.rotation && config.rotation.z) || 0;

    if (config.name) {
        camera.name = config.name;
    }

    return camera;
}

function createWebGLRenderTarget(config) {
    var renderTarget = new Three.WebGLRenderTarget(
        512, 512, {format: Three.RGBFormat}
    );
    return renderTarget;
}

function createFaceScreen(renderTarget, config) {
    var faceScreen = new Three.Mesh(
        new Three.BoxGeometry(300, 300, 1, 1),
        new Three.MeshBasicMaterial({map: renderTarget})
    );

    faceScreen.position.set(
        (config && config.x) || 0,
        (config && config.y) || 0,
        (config && config.z) || 0
    );

    faceScreen.rotateY(
        (config && config.rotation && config.rotation.y) || 0
    );

    return faceScreen;
}

function createCube(config) {
    var geometry = new Three.BoxGeometry(305, 305, 305, 305);
    var material = new Three.MeshBasicMaterial({color: 0x232323});

    var cube = new Three.Mesh(geometry, material);

    cube.position.set(
        (config && config.x) || 0,
        (config && config.y) || 0,
        (config && config.z) || 0
    );
    cube.rotateY(
        (config && config.rotation && config.rotation.y) || 0
    );

    return cube;
}

document.addEventListener('DOMContentLoaded', function() {
    draw(renderer, scene);
    animate(scene);
});
