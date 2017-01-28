var shell = require('gl-now')()
  , glslify = require('glslify')
  , createBuffer = require('gl-buffer')
  , createTexture = require('gl-texture2d')
  , texture, buffer, shader, startTime
  , createShader = glslify({vertex:'./vert.shader', fragment:'./frag.shader'})

shell.on('gl-init', function() {
  var gl = shell.gl
  startTime = Date.now()
  texture = createTexture(gl, require('../lib/img'))       // create texture
  buffer = createBuffer(gl, [-1, -1, 3, -1, -1, 3])        // create buffer
  shader = createShader(gl)                                // create shader
  shader.attributes.iPosition.location = 0
})

shell.on('gl-render', function(t) {
  var gl = shell.gl
  shader.bind()
  buffer.bind()
  shader.attributes.iPosition.pointer()
  shader.uniforms.iChannel0 = texture.bind()
  shader.uniforms.iGlobalTime = (Date.now() - startTime) / 1000.0
  // Note: +"<number as String>" converts it to a float value
  shader.uniforms.iResolution = [+shell.canvas.width,+shell.canvas.height,0.0]
  shader.uniforms.iMouse = [+shell.mouseX,+shell.mouseY]
  gl.drawArrays(gl.TRIANGLES, 0, 3)
})
