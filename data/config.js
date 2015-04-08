/*global module*/
module.exports = {
    "Scene": {
        "width": 640,
        "height": 360
    },

    "Camera": {
        "x": 0,
        "y": 100,
        "z": 500,
        "viewAngle": 60,
        "near": 10,
        "far": 10000
    },

    "PointLight": {
        "x": 0,
        "y": 1000,
        "z": 0,
        "color": 0xffffff
    },

    "AmbientLight": {
        "color": 0x111111
    },

    "CameraLeft": {
        "x": 0,
        "y": 100,
        "z": 160,
        "viewAngle": 60,
        "near": 10,
        "far": 10000,
        "rotation": {
            "x": -Math.PI,
            "y": Math.PI - 2,
            "z": -Math.PI
        }
    },

    "CameraRight": {
        "x": 0,
        "y": 100,
        "z": 160,
        "viewAngle": 60,
        "near": 10,
        "far": 10000,
        "rotation": {
            "x": 0,
            "y": -Math.PI/2,
            "z": 0
        }
    },

    "Floor": {
        "x": 0,
        "y": -0.5,
        "z": Math.PI/2
    },

    "FaceScreenLeft": {
        "x": -106,
        "y": 100,
        "z": 25,
        "rotation": {
            "x": 0,
            "y": -Math.PI/4,
            "z": 0
        }
    },

    "FaceScreenRight": {
        "x": 119,
        "y": 100,
        "z": 0,
        "rotation": {
            "x": 0,
            "y": Math.PI/4,
            "z": 0
        }
    },

    "Cube": {
        "x": 0,
        "y": 100,
        "z": -100,
        "rotation": {
            "x":0,
            "y": Math.PI/4,
            "z": 0
        }
    }
};
