#define PI 3.1415926535897932384626433832795

vec2 O = vec2(0.0, 0.0);
vec2 unit = vec2(1.0, 0.0);
vec2 i = vec2(0.0, 1.0);

vec4 color_light = vec4(0.9, 0.9, 0.9, 1.0);
vec4 color_dark = vec4(0.4, 0.4, 0.4, 1.0);

vec2 conj(vec2 a) {
    return vec2(a.x, - a.y);
}

vec2 mul(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec2 div(vec2 a, vec2 b) {
    return mul(a, conj(b)) / dot(b, b);
}

vec2 automorphism(vec2 z, vec2 a) {
    return div(z - a, unit - mul(conj(a), z));
}

vec2 toComplex(vec2 a) {
    vec2 z = a.xy / iResolution.xy;
    z += vec2(-0.5, - 0.5);
    z *= 2.5;
    z.x *= iResolution.x / iResolution.y;
    
    return z;
}

vec4 dartboard(vec2 a) {
    float r = 2.0 * log(length(a));
    float t = 8.0 * atan(a.y, a.x) / PI;
    
    if (mod(floor(r) + floor(t), 2.0) > 0.0)
        return color_light;
    else
        return color_dark;
}

vec4 color(vec2 z)
{
    float r = length(z);

    if (r > .6 ) {
      return vec4(0.0,0.0,0.0, 1.0);
    }
    float angle = atan(z.y, z.x);
    vec3 c = vec3(angle/(2.0*PI), 0.9, 1.0);
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    vec3 rgb = c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    return vec4(rgb, 1.0);
}

vec4 pal(in vec2 z, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
   float t = atan(z.y, z.x)/(2.0*PI);
    return vec4(a + b*cos( 6.28318*(c*t+d) ), 1.0);
}

void mainImage(out vec4 a, in vec2 b) {
    vec2 z = toComplex(b.xy);
    vec2 m = 1.5 * vec2(cos(iTime), sin(iTime)) - 0.0;
    //m = toComplex(iMouse.xy);
    float bl = m.x*m.x + m.y+m.y -1.0;
    vec2 d = vec2(bl* sin(iTime),bl* cos(iTime));

    if (length(z) < 1.0) {
      for(int j = 0; j < 5; j++) {
        m = mul(z,m);
        z = automorphism(z,m);
      }
      a = pal(z, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );
    }
    
}