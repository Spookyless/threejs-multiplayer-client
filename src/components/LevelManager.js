/**
 * @typedef {{id: Number, x: Number, z: Number, type: "floor" | "block" | "player" | "goal"}} LevelItem
 * @typedef {{data: LevelItem[], size: Number}} Level
 */

import { Box3 } from "three";

import Config from "./Config";
import Block from "./Block";
import Floor from "./Floor";
import Player from "./Player";
import Goal from "./Goal";

export default class LevelBuilder {
    /**
     * @param {THREE.Scene} scene 
     */
    constructor(scene) {
        this.scene = scene;

        /**
         * @type {{floors: Floor[], players: Player[], blocks: Block[], goals: Goal[]}}
         */

        this.objects = {
            floors: [],
            players: [],
            blocks: [],
            goals: [],
        };
    }

    /**
     * @param {String} url 
     * @returns {Promise<Response>}
     */
    load(url) {
        return fetch(url, { method: "GET" })
    }

    /**
     * @param {Level} data 
     */
    build(data) {
        let p = new Promise((resolve, reject) => {
            let count = data.data.length;

            let size = Config.blockSize;

            data.data.forEach(el => {
                switch (el.type) {
                    case "block": {
                        this._createFloor(el.x, el.z, size);
                        this._createBlock(el.x, el.z, size);

                        if (--count == 0) { resolve(); }
                        break;
                    }
                    case "floor": {
                        this._createFloor(el.x, el.z, size);

                        if (--count == 0) { resolve(); }
                        break;
                    }
                    case "player": {
                        this._createFloor(el.x, el.z, size);
                        this._createPlayer(el.x, el.z, size);

                        if (--count == 0) { resolve(); }
                        break;
                    }
                    case "goal": {
                        this._createGoal(el.x, el.z, size);

                        if (--count == 0) { resolve(); }
                        break;
                    }
                }
            });
        });

        return p;
    }

    empty() {
        this.scene.traverse(object => {
            if (object instanceof Player ||
                object instanceof Goal ||
                object instanceof Floor ||
                object instanceof Block)
                this.scene.remove(object);
        });

        this.objects = {
            blocks: [],
            players: [],
            floors: [],
            goals: [],
        };
    }

    /**
     * @param {Number} x
     * @param {Number} z
     * @param {Number} size
     * @returns {Block}
     */
    _createBlock(x, z, size) {
        let block = new Block(x, z);

        //@ts-ignore
        let y = new Box3().setFromObject(block).getSize().y;

        block.position.set(x * size + size / 2, y / 2, z * size + size / 2);

        this.scene.add(block);
        this.objects.blocks.push(block);

        return block;
    }

    /**
     * @param {Number} x
     * @param {Number} z
     * @param {Number} size
     * @returns {Floor}
     */
    _createFloor(x, z, size) {
        let floor = new Floor(x, z);

        //@ts-ignore
        let y = new Box3().setFromObject(floor).getSize().y;

        floor.position.set(x * size + size / 2, -y / 2, z * size + size / 2);

        this.scene.add(floor);
        this.objects.floors.push(floor);

        return floor;
    }

    /**
     * @param {Number} x
     * @param {Number} z
     * @param {Number} size
     * @returns {Player}
     */
    _createPlayer(x, z, size) {
        let player = new Player(x, z);

        //@ts-ignore
        let y = new Box3().setFromObject(player).getSize().y;

        player.position.set(x * size + size / 2, y / 2, z * size + size / 2);

        this.scene.add(player);
        this.objects.players.push(player);

        return player;
    }

    /**
     * @param {Number} x
     * @param {Number} z
     * @param {Number} size
     * @returns {Goal}
     */
    _createGoal(x, z, size) {
        let goal = new Goal(x, z);

        //@ts-ignore
        let y = new Box3().setFromObject(goal).getSize().y;

        goal.position.set(x * size + size / 2, -y / 2, z * size + size / 2);

        this.scene.add(goal);
        this.objects.goals.push(goal);

        return goal;
    }


    /**
     * @param {number} toX
     * @param {number} toZ
     */
    canMove(toX, toZ) {
        for (const block of this.objects.blocks) {
            if (block.x == toX && block.z == toZ) {
                return false;
            }
        }

        return true;
    }

    moveLeft() {
        this.objects.players.sort((a, b) => {
            return a.x - b.x
        });

        for (const player of this.objects.players) {
            if (this.canMove(player.x - 1, player.z)) {
                player.moveLeft();
            }
        }
    }

    moveRight() {
        this.objects.players.sort((a, b) => {
            return - (a.x - b.x)
        });

        for (const player of this.objects.players) {
            if (this.canMove(player.x + 1, player.z)) {
                player.moveRight();
            }
        }
    }

    moveUp() {
        this.objects.players.sort((a, b) => {
            return a.z - b.z
        });

        for (const player of this.objects.players) {
            if (this.canMove(player.x, player.z - 1)) {
                player.moveUp();
            }
        }
    }

    moveDown() {
        this.objects.players.sort((a, b) => {
            return - (a.z - b.z)
        });

        for (const player of this.objects.players) {
            if (this.canMove(player.x, player.z + 1)) {
                player.moveDown();
            }
        }
    }
}