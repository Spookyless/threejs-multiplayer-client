import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

import config from './Config';

export default class extends Mesh{
    constructor(){
        super(
            new BoxGeometry(config.blockSize, config.blockSize, config.blockSize),
            new MeshPhongMaterial({
                color: 0x000000
            })
        )
    }
}