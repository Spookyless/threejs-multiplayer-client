import { Material, MeshPhongMaterial, MeshStandardMaterial, RepeatWrapping, TextureLoader } from "three";

import grass001_512_ao from "../resources/textures/grass001/grass001_512_ao.png";
import grass001_512_color from "../resources/textures/grass001/grass001_512_color.png";
import grass001_512_dis from "../resources/textures/grass001/grass001_512_dis.png";
import grass001_512_normal from "../resources/textures/grass001/grass001_512_normal.png";
import grass001_512_rough from "../resources/textures/grass001/grass001_512_rough.png";

import metal007_512_color from "../resources/textures/metal007/metal007_512_color.png";
import metal007_512_dis from "../resources/textures/metal007/metal007_512_dis.png";
import metal007_512_metal from "../resources/textures/metal007/metal007_512_metal.png";
import metal007_512_normal from "../resources/textures/metal007/metal007_512_normal.png";
import metal007_512_rough from "../resources/textures/metal007/metal007_512_rough.png";

import metal034_512_color from "../resources/textures/metal034/metal034_512_color.png";
import metal034_512_dis from "../resources/textures/metal034/metal034_512_dis.png";
import metal034_512_metal from "../resources/textures/metal034/metal034_512_metal.png";
import metal034_512_normal from "../resources/textures/metal034/metal034_512_normal.png";
import metal034_512_rough from "../resources/textures/metal034/metal034_512_rough.png";

import playerModel from "../models/player.fbx";
import playerWalk from "../models/player@walkVFast2.fbx";
import playerIdle from "../models/player@idle.fbx";
import playerFall from "../models/player@fall.fbx";

import { FBXLoader } from "three/examples/jsm/loaders/fbxloader";

export default class Library {
    constructor() {
        this.textures = {
            grass001_512_ao: new TextureLoader().load(grass001_512_ao),
            grass001_512_color: new TextureLoader().load(grass001_512_color),
            grass001_512_dis: new TextureLoader().load(grass001_512_dis),
            grass001_512_normal: new TextureLoader().load(grass001_512_normal),
            grass001_512_rough: new TextureLoader().load(grass001_512_rough),

            metal007_512_color: new TextureLoader().load(metal007_512_color),
            metal007_512_dis: new TextureLoader().load(metal007_512_dis),
            metal007_512_metal: new TextureLoader().load(metal007_512_metal),
            metal007_512_normal: new TextureLoader().load(metal007_512_normal),
            metal007_512_rough: new TextureLoader().load(metal007_512_rough),

            metal034_512_color: new TextureLoader().load(metal034_512_color),
            metal034_512_dis: new TextureLoader().load(metal034_512_dis),
            metal034_512_metal: new TextureLoader().load(metal034_512_metal),
            metal034_512_normal: new TextureLoader().load(metal034_512_normal),
            metal034_512_rough: new TextureLoader().load(metal034_512_rough),
        }

        this.models = {
            playerModel: null,
            playerIdle: null,
            playerWalk: null,
            playerFall: null
        }

        /**
         * @type {{[x: string]: MeshStandardMaterial}}
         */
        this.materials = {
            grass001: new MeshStandardMaterial({
                aoMap: this.textures.grass001_512_ao,
                map: this.textures.grass001_512_color,
                // displacementMap: this.textures.grass001_512_dis,
                normalMap: this.textures.grass001_512_normal,
                bumpMap: this.textures.grass001_512_rough,
            }),
            metal034: new MeshStandardMaterial({
                map: this.textures.metal034_512_color,
                // displacementMap: this.textures.metal034_512_dis,
                metalnessMap: this.textures.metal034_512_metal,
                normalMap: this.textures.metal034_512_normal,
                bumpMap: this.textures.metal034_512_rough,
            }),
            metal007: new MeshStandardMaterial({
                map: this.textures.metal007_512_color,
                // displacementMap: this.textures.metal007_512_dis,
                metalnessMap: this.textures.metal007_512_metal,
                normalMap: this.textures.metal007_512_normal,
                bumpMap: this.textures.metal007_512_rough,
            })
        }

        this.LoadModels();
        this.repeatMaterials();
    }

    LoadModels() {
        let fbxLoader = new FBXLoader();
        fbxLoader.load(playerModel, (object) => {
            object.traverse((child) => {
                // @ts-ignore
                if (child.isMesh) {
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            })
            object.scale.set(.5, .5, .5)
            this.models.playerModel = object;
        })
        fbxLoader.load(playerIdle, (object) => {
            object.scale.set(.5, .5, .5)
            this.models.playerIdle = object;
        })
        fbxLoader.load(playerWalk, (object) => {
            object.scale.set(.5, .5, .5)
            this.models.playerWalk = object;
        })
        fbxLoader.load(playerFall, (object) => {
            object.scale.set(.5, .5, .5)
            this.models.playerFall = object;
        })
    }

    repeatMaterials() {
        for (const key in this.materials) {
            const material = this.materials[key];

            [
                material.map,
                material.aoMap,
                material.envMap,
                material.bumpMap,
                material.normalMap,
                material.roughnessMap,
                material.metalnessMap,
                material.displacementMap
            ].forEach(mat => {
                if (mat !== null) {
                    mat.repeat.set(1, 1);
                    mat.wrapS = mat.wrapT = RepeatWrapping;
                }
            });

        }
    }
}