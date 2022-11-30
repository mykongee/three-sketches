import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import * as THREE from 'three'
import { PencilLinesMaterial } from './PencilLinesMaterials'


export class PencilLinesPass extends Pass {
	fsQuad: FullScreenQuad
	material: PencilLinesMaterial

	constructor({ width, height }: { width: number; height: number }) {
		super()

		// change the material from to our new PencilLinesMaterial
		this.material = new PencilLinesMaterial() 
		this.fsQuad = new FullScreenQuad(this.material)
        // set the uResolution uniform with the current canvas's width and height
		this.material.uniforms.uResolution.value = new THREE.Vector2(width, height)
	}

	dispose() {
		this.material.dispose()
		this.fsQuad.dispose()
	}

	render(
		renderer: THREE.WebGLRenderer,
		writeBuffer: THREE.WebGLRenderTarget,
		readBuffer: THREE.WebGLRenderTarget
	) {
		this.material.uniforms['tDiffuse'].value = readBuffer.texture

		if (this.renderToScreen) {
			renderer.setRenderTarget(null)
			this.fsQuad.render(renderer)
		} else {
			renderer.setRenderTarget(writeBuffer)
			if (this.clear) renderer.clear()
			this.fsQuad.render(renderer)
		}
	}
}