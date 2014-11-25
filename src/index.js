var shell = require('gl-now')()
  , glslify = require('glslify')
  , createBuffer = require('gl-buffer')
  , createTexture = require('gl-texture2d')
  , buffer
  , shader
  , texture
  , startTime

var createShader = glslify({
        vertex:     './vert.shader'
      , fragment:   './frag.shader'
})


shell.on('gl-init', function() {
  var gl = shell.gl

  startTime = Date.now()

  //Create texture
  texture = createTexture(gl, require('../lib/img'))

  //Create buffer
  buffer = createBuffer(gl, [ -1, -1,  3, -1, -1,  3 ])
  
  //Create shader
  shader = createShader(gl)
  shader.attributes.iPosition.location = 0
})

shell.on('gl-render', function(t) {
  var gl = shell.gl

  shader.bind()
  buffer.bind()

  shader.attributes.iPosition.pointer()
  shader.uniforms.iChannel0   = texture.bind()
  shader.uniforms.iGlobalTime = (Date.now() - startTime) / 1000.0
  shader.uniforms.iResolution = [ 0.0+shell.canvas.width, 0.0+shell.canvas.height, 0.0 ]
  shader.uniforms.iMouse      = [ 0.0+shell.mouseX, 0.0+shell.mouseY ]

  gl.drawArrays(gl.TRIANGLES, 0, 3)
})