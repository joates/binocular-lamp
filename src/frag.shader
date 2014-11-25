precision highp float;

uniform sampler2D iChannel0;
uniform vec2  iMouse;
uniform vec3  iResolution;
uniform float iGlobalTime;

void main() {
	vec2 pos = gl_FragCoord.xy / iResolution.xy;
    vec4 tex = texture2D( iChannel0, pos );
	float ar = iResolution.x / iResolution.y;

    vec2 uv = -1.0 + 2.0 * pos;
    uv.x *= ar;

    vec2 mp = -1.0 + 2.0 * (iMouse / iResolution.xy);
    mp.x *= ar;

    float l1 = smoothstep( 0.7, 0.1, length( uv - vec2( mp.x+0.5, 0.0-mp.y ) ) );
    float l2 = smoothstep( 0.7, 0.1, length( uv - vec2( mp.x-0.5, 0.0-mp.y ) ) );
    vec3 col = 0.5*vec3( uv, 0.5 + 0.5*sin( iGlobalTime ) ) + 0.5*tex.xyz;
    col *= min( 0.1, mix ( l1, l2, 0.5 ) );

    // gamma
    col = pow( col, vec3(0.45) );

    gl_FragColor = vec4( col, 1.0 );
}
