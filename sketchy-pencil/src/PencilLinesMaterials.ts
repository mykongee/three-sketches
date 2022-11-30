import * as THREE from 'three'
//@ts-ignore
import fragmentShader from './fragment.glsl'
//@ts-ignore
import vertexShader from './vertex.glsl'

export class PencilLinesMaterial extends THREE.ShaderMaterial {
	constructor() {
		super({
			uniforms: {
				tDiffuse: { value: null },
				uResolution: {
					value: new THREE.Vector2(1, 1)
				}
			},
			fragmentShader,
			vertexShader
		})
	}
}
