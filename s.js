let cameras=[{id:0,img_name:"00001",width:1959,height:1090,position:[-3.0089893469241797,-.11086489695181866,-3.7527640949141428,],rotation:[[.876134201218856,.06925962026449776,.47706599800804744],[-.04747421839895102,.9972110940209488,-.057586739349882114],[-.4797239414934443,.027805376500959853,.8769787916452908],],fy:1164.6601287484507,fx:1159.5880733038064},{id:1,img_name:"00009",width:1959,height:1090,position:[-2.5199776022057296,-.09704735754873686,-3.6247725540304545,],rotation:[[.9982731285632193,-.011928707708098955,-.05751927260507243],[.0065061360949636325,.9955928229282383,-.09355533724430458],[.058381769258182864,.09301955098900708,.9939511719154457],],fy:1164.6601287484507,fx:1159.5880733038064},{id:2,img_name:"00017",width:1959,height:1090,position:[-.7737533667465242,-.3364271945329695,-2.9358969417573753,],rotation:[[.9998813418672372,.013742375651625236,-.0069605529394208224],[-.014268370388586709,.996512943252834,-.08220929105659476],[.00580653013657589,.08229885200307129,.9965907801935302],],fy:1164.6601287484507,fx:1159.5880733038064},{id:3,img_name:"00025",width:1959,height:1090,position:[1.2198221749590001,-.2196687861401182,-2.3183162007028453,],rotation:[[.9208648867765482,.0012010625395201253,.389880004297208],[-.06298204172269357,.987319521752825,.14571693239364383],[-.3847611242348369,-.1587410451475895,.9092635249821667],],fy:1164.6601287484507,fx:1159.5880733038064},{id:4,img_name:"00033",width:1959,height:1090,position:[1.742387858893817,-.13848225198886954,-2.0566370113193146,],rotation:[[.24669889292141334,-.08370189346592856,-.9654706879349405],[.11343747891376445,.9919082664242816,-.05700815184573074],[.9624300466054861,-.09545671285663988,.2541976029815521],],fy:1164.6601287484507,fx:1159.5880733038064},{id:5,img_name:"00041",width:1959,height:1090,position:[3.6567309419223935,-.16470990600750707,-1.3458085590422042,],rotation:[[.2341293058324528,-.02968330457755884,-.9717522161434825],[.10270823606832301,.99469554638321,-.005638106875665722],[.9667649592295676,-.09848690996657204,.2359360976431732],],fy:1164.6601287484507,fx:1159.5880733038064},{id:6,img_name:"00049",width:1959,height:1090,position:[3.9013554243203497,-.2597500978038105,-.8106154188297828,],rotation:[[.6717235545638952,-.015718162115524837,-.7406351366386528],[.055627354673906296,.9980224478387622,.029270992841185218],[.7387104058127439,-.060861588786650656,.6712695459756353],],fy:1164.6601287484507,fx:1159.5880733038064},{id:7,img_name:"00057",width:1959,height:1090,position:[4.742994605467533,-.05591660945412069,.9500365976084458],rotation:[[-.17042655709210375,.01207080756938,-.9852964448542146],[.1165090336695526,.9931575292530063,-.00798543433078162],[.9784581921120181,-.1161568667478904,-.1706667764862097],],fy:1164.6601287484507,fx:1159.5880733038064},{id:8,img_name:"00065",width:1959,height:1090,position:[4.34676307626522,.08168160516967145,1.0876221470355405],rotation:[[-.003575447631888379,-.044792503246552894,-.9989899137764799],[.10770152645126597,.9931680875192705,-.04491693593046672],[.9941768441149182,-.10775333677534978,.0012732004866391048],],fy:1164.6601287484507,fx:1159.5880733038064},{id:9,img_name:"00073",width:1959,height:1090,position:[3.264984351114202,.078974937336732,1.0117200284114904],rotation:[[-.026919994628162257,-.1565891128261527,-.9872968974090509],[.08444552208239385,.983768234577625,-.1583319754069128],[.9960643893290491,-.0876350978794554,-.013259786205163005],],fy:1164.6601287484507,fx:1159.5880733038064},],camera=cameras[0];function getProjectionMatrix(e,$,t,_){return[[2*e/t,0,0,0],[0,-(2*$)/_,0,0],[0,0,200/199.8,1],[0,0,-.20020020020020018,0],].flat()}function getViewMatrix(e){let $=e.rotation.flat(),t=e.position,_=[[$[0],$[1],$[2],0],[$[3],$[4],$[5],0],[$[6],$[7],$[8],0],[-t[0]*$[0]-t[1]*$[3]-t[2]*$[6],-t[0]*$[1]-t[1]*$[4]-t[2]*$[7],-t[0]*$[2]-t[1]*$[5]-t[2]*$[8],1,],].flat();return _}function multiply4(e,$){return[$[0]*e[0]+$[1]*e[4]+$[2]*e[8]+$[3]*e[12],$[0]*e[1]+$[1]*e[5]+$[2]*e[9]+$[3]*e[13],$[0]*e[2]+$[1]*e[6]+$[2]*e[10]+$[3]*e[14],$[0]*e[3]+$[1]*e[7]+$[2]*e[11]+$[3]*e[15],$[4]*e[0]+$[5]*e[4]+$[6]*e[8]+$[7]*e[12],$[4]*e[1]+$[5]*e[5]+$[6]*e[9]+$[7]*e[13],$[4]*e[2]+$[5]*e[6]+$[6]*e[10]+$[7]*e[14],$[4]*e[3]+$[5]*e[7]+$[6]*e[11]+$[7]*e[15],$[8]*e[0]+$[9]*e[4]+$[10]*e[8]+$[11]*e[12],$[8]*e[1]+$[9]*e[5]+$[10]*e[9]+$[11]*e[13],$[8]*e[2]+$[9]*e[6]+$[10]*e[10]+$[11]*e[14],$[8]*e[3]+$[9]*e[7]+$[10]*e[11]+$[11]*e[15],$[12]*e[0]+$[13]*e[4]+$[14]*e[8]+$[15]*e[12],$[12]*e[1]+$[13]*e[5]+$[14]*e[9]+$[15]*e[13],$[12]*e[2]+$[13]*e[6]+$[14]*e[10]+$[15]*e[14],$[12]*e[3]+$[13]*e[7]+$[14]*e[11]+$[15]*e[15],]}function invert4(e){let $=e[0]*e[5]-e[1]*e[4],t=e[0]*e[6]-e[2]*e[4],_=e[0]*e[7]-e[3]*e[4],a=e[1]*e[6]-e[2]*e[5],r=e[1]*e[7]-e[3]*e[5],n=e[2]*e[7]-e[3]*e[6],i=e[8]*e[13]-e[9]*e[12],o=e[8]*e[14]-e[10]*e[12],s=e[8]*e[15]-e[11]*e[12],l=e[9]*e[14]-e[10]*e[13],c=e[9]*e[15]-e[11]*e[13],d=e[10]*e[15]-e[11]*e[14],u=$*d-t*c+_*l+a*s-r*o+n*i;return u?[(e[5]*d-e[6]*c+e[7]*l)/u,(e[2]*c-e[1]*d-e[3]*l)/u,(e[13]*n-e[14]*r+e[15]*a)/u,(e[10]*r-e[9]*n-e[11]*a)/u,(e[6]*s-e[4]*d-e[7]*o)/u,(e[0]*d-e[2]*s+e[3]*o)/u,(e[14]*_-e[12]*n-e[15]*t)/u,(e[8]*n-e[10]*_+e[11]*t)/u,(e[4]*c-e[5]*s+e[7]*i)/u,(e[1]*s-e[0]*c-e[3]*i)/u,(e[12]*r-e[13]*_+e[15]*$)/u,(e[9]*_-e[8]*r-e[11]*$)/u,(e[5]*o-e[4]*l-e[6]*i)/u,(e[0]*l-e[1]*o+e[2]*i)/u,(e[13]*t-e[12]*a-e[14]*$)/u,(e[8]*a-e[9]*t+e[10]*$)/u,]:null}function rotate4(e,$,t,_,a){let r=Math.hypot(t,_,a);t/=r,_/=r;let n=Math.sin($),i=Math.cos($),o=1-i,s=t*t*o+i,l=_*t*o+(a/=r)*n,c=a*t*o-_*n,d=t*_*o-a*n,u=_*_*o+i,f=a*_*o+t*n,v=t*a*o+_*n,m=_*a*o-t*n,p=a*a*o+i;return[e[0]*s+e[4]*l+e[8]*c,e[1]*s+e[5]*l+e[9]*c,e[2]*s+e[6]*l+e[10]*c,e[3]*s+e[7]*l+e[11]*c,e[0]*d+e[4]*u+e[8]*f,e[1]*d+e[5]*u+e[9]*f,e[2]*d+e[6]*u+e[10]*f,e[3]*d+e[7]*u+e[11]*f,e[0]*v+e[4]*m+e[8]*p,e[1]*v+e[5]*m+e[9]*p,e[2]*v+e[6]*m+e[10]*p,e[3]*v+e[7]*m+e[11]*p,...e.slice(12,16),]}function translate4(e,$,t,_){return[...e.slice(0,12),e[0]*$+e[4]*t+e[8]*_+e[12],e[1]*$+e[5]*t+e[9]*_+e[13],e[2]*$+e[6]*t+e[10]*_+e[14],e[3]*$+e[7]*t+e[11]*_+e[15],]}function createWorker(e){let $,t=0,_,a=[],r=new Uint32Array,n=0;var i=new Float32Array(1),o=new Int32Array(i.buffer);function s(e){i[0]=e;var $,t=o[0],_=t>>23&255,a=8388607&t;return 0==_?$=0:_<113?($=0,a|=8388608,16777216&(a>>=113-_)&&($=1,a=0)):_<142?$=_-112:($=31,a=0),(t>>31&1)<<15|$<<10|a>>13}function l(e,$){return(s(e)|s($)<<16)>>>0}function c(_){if(!$)return;let i=new Float32Array($);if(n==t){if(.01>Math.abs(a[2]*_[2]+a[6]*_[6]+a[10]*_[10]-1))return}else!function _(){if(!$)return;let a=new Float32Array($),r=new Uint8Array($);var n=Math.ceil(2*t/2048),i=new Uint32Array(2048*n*4),o=new Uint8Array(i.buffer),s=new Float32Array(i.buffer);for(let c=0;c<t;c++){s[8*c+0]=a[8*c+0],s[8*c+1]=a[8*c+1],s[8*c+2]=a[8*c+2],o[4*(8*c+7)+0]=r[32*c+24+0],o[4*(8*c+7)+1]=r[32*c+24+1],o[4*(8*c+7)+2]=r[32*c+24+2],o[4*(8*c+7)+3]=r[32*c+24+3];let d=[a[8*c+3+0],a[8*c+3+1],a[8*c+3+2],],u=[(r[32*c+28+0]-128)/128,(r[32*c+28+1]-128)/128,(r[32*c+28+2]-128)/128,(r[32*c+28+3]-128)/128,],f=[1-2*(u[2]*u[2]+u[3]*u[3]),2*(u[1]*u[2]+u[0]*u[3]),2*(u[1]*u[3]-u[0]*u[2]),2*(u[1]*u[2]-u[0]*u[3]),1-2*(u[1]*u[1]+u[3]*u[3]),2*(u[2]*u[3]+u[0]*u[1]),2*(u[1]*u[3]+u[0]*u[2]),2*(u[2]*u[3]-u[0]*u[1]),1-2*(u[1]*u[1]+u[2]*u[2]),].map((e,$)=>e*d[Math.floor($/3)]),v=[f[0]*f[0]+f[3]*f[3]+f[6]*f[6],f[0]*f[1]+f[3]*f[4]+f[6]*f[7],f[0]*f[2]+f[3]*f[5]+f[6]*f[8],f[1]*f[1]+f[4]*f[4]+f[7]*f[7],f[1]*f[2]+f[4]*f[5]+f[7]*f[8],f[2]*f[2]+f[5]*f[5]+f[8]*f[8],];i[8*c+4]=l(4*v[0],4*v[1]),i[8*c+5]=l(4*v[2],4*v[3]),i[8*c+6]=l(4*v[4],4*v[5])}e.postMessage({texdata:i,texwidth:2048,texheight:n},[i.buffer])}(),n=t;console.time("sort");let o=-1/0,s=1/0,c=new Int32Array(t);for(let d=0;d<t;d++){let u=(_[2]*i[8*d+0]+_[6]*i[8*d+1]+_[10]*i[8*d+2])*4096|0;c[d]=u,u>o&&(o=u),u<s&&(s=u)}let f=65536/(o-s),v=new Uint32Array(65536);for(let m=0;m<t;m++)c[m]=(c[m]-s)*f|0,v[c[m]]++;let p=new Uint32Array(65536);for(let h=1;h<65536;h++)p[h]=p[h-1]+v[h-1];r=new Uint32Array(t);for(let x=0;x<t;x++)r[p[c[x]]++]=x;console.timeEnd("sort"),a=_,e.postMessage({depthIndex:r,viewProj:_,vertexCount:t},[r.buffer,])}let d=()=>{if(!u){u=!0;let e=_;c(e),setTimeout(()=>{u=!1,e!==_&&d()},0)}},u;e.onmessage=e=>{e.data.ply?(t=0,c(_),t=Math.floor(($=function e($){let t=new Uint8Array($),_=new TextDecoder().decode(t.slice(0,10240)),a="end_header\n",r=_.indexOf(a);if(r<0)throw Error("Unable to read .ply file header");let n=parseInt(/element vertex (\d+)\n/.exec(_)[1]);console.log("Vertex Count",n);let i=0,o={},s={},l={double:"getFloat64",int:"getInt32",uint:"getUint32",float:"getFloat32",short:"getInt16",ushort:"getUint16",uchar:"getUint8"};for(let c of _.slice(0,r).split("\n").filter(e=>e.startsWith("property "))){let[d,u,f]=c.split(" "),v=l[u]||"getInt8";s[f]=v,o[f]=i,i+=parseInt(v.replace(/[^\d]/g,""))/8}console.log("Bytes per row",i,s,o);let m=new DataView($,r+a.length),p=0,h=new Proxy({},{get(e,$){if(!s[$])throw Error($+" not found");return m[s[$]](p*i+o[$],!0)}});console.time("calculate importance");let x=new Float32Array(n),g=new Uint32Array(n);for(p=0;p<n;p++){if(g[p]=p,!s.scale_0)continue;let w=Math.exp(h.scale_0)*Math.exp(h.scale_1)*Math.exp(h.scale_2),y=1/(1+Math.exp(-h.opacity));x[p]=w*y}console.timeEnd("calculate importance"),console.time("sort"),g.sort((e,$)=>x[$]-x[e]),console.timeEnd("sort");let E=new ArrayBuffer(32*n);console.time("build buffer");for(let b=0;b<n;b++){p=g[b];let T=new Float32Array(E,32*b,3),A=new Float32Array(E,32*b+12,3),M=new Uint8ClampedArray(E,32*b+12+12,4),R=new Uint8ClampedArray(E,32*b+12+12+4,4);if(s.scale_0){let L=Math.sqrt(h.rot_0**2+h.rot_1**2+h.rot_2**2+h.rot_3**2);R[0]=h.rot_0/L*128+128,R[1]=h.rot_1/L*128+128,R[2]=h.rot_2/L*128+128,R[3]=h.rot_3/L*128+128,A[0]=Math.exp(h.scale_0),A[1]=Math.exp(h.scale_1),A[2]=Math.exp(h.scale_2)}else A[0]=.01,A[1]=.01,A[2]=.01,R[0]=255,R[1]=0,R[2]=0,R[3]=0;T[0]=h.x,T[1]=h.y,T[2]=h.z,s.f_dc_0?(M[0]=(.5+.28209479177387814*h.f_dc_0)*255,M[1]=(.5+.28209479177387814*h.f_dc_1)*255,M[2]=(.5+.28209479177387814*h.f_dc_2)*255):(M[0]=h.red,M[1]=h.green,M[2]=h.blue),s.opacity?M[3]=1/(1+Math.exp(-h.opacity))*255:M[3]=255}return console.timeEnd("build buffer"),E}(e.data.ply)).byteLength/32),postMessage({buffer:$})):e.data.buffer?($=e.data.buffer,t=e.data.vertexCount):e.data.vertexCount?t=e.data.vertexCount:e.data.view&&(_=e.data.view,d())}}const vertexShaderSource=`
#version 300 es
precision highp float;
precision highp int;

uniform highp usampler2D u_texture;
uniform mat4 projection, view;
uniform vec2 focal;
uniform vec2 viewport;

in vec2 position;
in int index;

out vec4 vColor;
out vec2 vPosition;

void main () {
    uvec4 cen = texelFetch(u_texture, ivec2((uint(index) & 0x3ffu) << 1, uint(index) >> 10), 0);
    vec4 cam = view * vec4(uintBitsToFloat(cen.xyz), 1);
    vec4 pos2d = projection * cam;

    float clip = 1.2 * pos2d.w;
    if (pos2d.z < -clip || pos2d.x < -clip || pos2d.x > clip || pos2d.y < -clip || pos2d.y > clip) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
    }

    uvec4 cov = texelFetch(u_texture, ivec2(((uint(index) & 0x3ffu) << 1) | 1u, uint(index) >> 10), 0);
    vec2 u1 = unpackHalf2x16(cov.x), u2 = unpackHalf2x16(cov.y), u3 = unpackHalf2x16(cov.z);
    mat3 Vrk = mat3(u1.x, u1.y, u2.x, u1.y, u2.y, u3.x, u2.x, u3.x, u3.y);

    mat3 J = mat3(
        focal.x / cam.z, 0., -(focal.x * cam.x) / (cam.z * cam.z), 
        0., -focal.y / cam.z, (focal.y * cam.y) / (cam.z * cam.z), 
        0., 0., 0.
    );

    mat3 T = transpose(mat3(view)) * J;
    mat3 cov2d = transpose(T) * Vrk * T;

    float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
    float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
    float lambda1 = mid + radius, lambda2 = mid - radius;

    if(lambda2 < 0.0) return;
    vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));
    vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
    vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);

    vColor = clamp(pos2d.z/pos2d.w+1.0, 0.0, 1.0) * vec4((cov.w) & 0xffu, (cov.w >> 8) & 0xffu, (cov.w >> 16) & 0xffu, (cov.w >> 24) & 0xffu) / 255.0;
    vPosition = position;

    vec2 vCenter = vec2(pos2d) / pos2d.w;
    gl_Position = vec4(
        vCenter 
        + position.x * majorAxis / viewport 
        + position.y * minorAxis / viewport, 0.0, 1.0);

}
`.trim(),fragmentShaderSource=`
#version 300 es
precision highp float;

in vec4 vColor;
in vec2 vPosition;

out vec4 fragColor;

void main () {
    float A = -dot(vPosition, vPosition);
    if (A < -4.0) discard;
    float B = exp(A) * vColor.a;
    fragColor = vec4(B * vColor.rgb, B);
}

// let canvas_s = document.getElementById('canvas');
// let defaultModel = canvas_s.dataset.defaultModel;
// let modelBaseUrl = canvas_s.dataset.modelBaseUrl:
// let _ = new URL($.get("url")||canvas_s.dataset.defaultModel, canvas_s.dataset.modelBaseUrl)

`.trim();let defaultViewMatrix=[.47,.04,.88,0,-.11,.99,.02,0,-.88,-.11,.47,0,.07,.03,6.55,1,],viewMatrix=defaultViewMatrix;async function main(){let e=!0,$=new URLSearchParams(location.search);let canvas_s = document.getElementById('canvas');try{viewMatrix=JSON.parse(decodeURIComponent(location.hash.slice(1))),e=!1}catch(t){}let _ = new URL($.get("url")||canvas_s.dataset.defaultModel, canvas_s.dataset.modelBaseUrl),a=await fetch(_,{mode:"cors",credentials:"omit"});if(console.log(a),200!=a.status)throw Error(a.status+" Unable to load "+a.url);let r=a.body.getReader(),n=new Uint8Array(a.headers.get("content-length")),i=n.length/32>5e5?1:1/devicePixelRatio;console.log(n.length/32,i);let o=new Worker(URL.createObjectURL(new Blob(["(",createWorker.toString(),")(self)"],{type:"application/javascript"}))),s=document.getElementById("canvas"),l=document.getElementById("fps"),c=document.getElementById("camid"),d,u=s.getContext("webgl2",{antialias:!1}),f=u.createShader(u.VERTEX_SHADER);u.shaderSource(f,vertexShaderSource),u.compileShader(f),u.getShaderParameter(f,u.COMPILE_STATUS)||console.error(u.getShaderInfoLog(f));let v=u.createShader(u.FRAGMENT_SHADER);u.shaderSource(v,fragmentShaderSource),u.compileShader(v),u.getShaderParameter(v,u.COMPILE_STATUS)||console.error(u.getShaderInfoLog(v));let m=u.createProgram();u.attachShader(m,f),u.attachShader(m,v),u.linkProgram(m),u.useProgram(m),u.getProgramParameter(m,u.LINK_STATUS)||console.error(u.getProgramInfoLog(m)),u.disable(u.DEPTH_TEST),u.enable(u.BLEND),u.blendFuncSeparate(u.ONE_MINUS_DST_ALPHA,u.ONE,u.ONE_MINUS_DST_ALPHA,u.ONE),u.blendEquationSeparate(u.FUNC_ADD,u.FUNC_ADD);let p=u.getUniformLocation(m,"projection"),h=u.getUniformLocation(m,"viewport"),x=u.getUniformLocation(m,"focal"),g=u.getUniformLocation(m,"view"),w=new Float32Array([-2,-2,2,-2,2,2,-2,2]),y=u.createBuffer();u.bindBuffer(u.ARRAY_BUFFER,y),u.bufferData(u.ARRAY_BUFFER,w,u.STATIC_DRAW);let E=u.getAttribLocation(m,"position");u.enableVertexAttribArray(E),u.bindBuffer(u.ARRAY_BUFFER,y),u.vertexAttribPointer(E,2,u.FLOAT,!1,0,0);var b=u.createTexture();u.bindTexture(u.TEXTURE_2D,b);var T=u.getUniformLocation(m,"u_texture");u.uniform1i(T,0);let A=u.createBuffer(),M=u.getAttribLocation(m,"index");u.enableVertexAttribArray(M),u.bindBuffer(u.ARRAY_BUFFER,A),u.vertexAttribIPointer(M,1,u.INT,!1,0,0),u.vertexAttribDivisor(M,1);let R=()=>{u.uniform2fv(x,new Float32Array([camera.fx,camera.fy])),d=getProjectionMatrix(camera.fx,camera.fy,innerWidth,innerHeight),u.uniform2fv(h,new Float32Array([innerWidth,innerHeight])),u.canvas.width=Math.round(innerWidth/i),u.canvas.height=Math.round(innerHeight/i),u.viewport(0,0,u.canvas.width,u.canvas.height),u.uniformMatrix4fv(p,!1,d)};window.addEventListener("resize",R),R(),o.onmessage=e=>{if(e.data.buffer){n=new Uint8Array(e.data.buffer);let $=new Blob([n.buffer],{type:"application/octet-stream"}),t=document.createElement("a");t.download="model.splat",t.href=URL.createObjectURL($),document.body.appendChild(t),t.click()}else if(e.data.texdata){let{texdata:_,texwidth:a,texheight:r}=e.data;u.bindTexture(u.TEXTURE_2D,b),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.NEAREST),u.texImage2D(u.TEXTURE_2D,0,u.RGBA32UI,a,r,0,u.RGBA_INTEGER,u.UNSIGNED_INT,_),u.activeTexture(u.TEXTURE0),u.bindTexture(u.TEXTURE_2D,b)}else if(e.data.depthIndex){let{depthIndex:i,viewProj:o}=e.data;u.bindBuffer(u.ARRAY_BUFFER,A),u.bufferData(u.ARRAY_BUFFER,i,u.DYNAMIC_DRAW),C=e.data.vertexCount}};let L=[],S=0;window.addEventListener("keydown",$=>{e=!1,L.includes($.code)||L.push($.code),/\d/.test($.key)&&(camera=cameras[S=parseInt($.key)],viewMatrix=getViewMatrix(camera)),["-","_"].includes($.key)&&(viewMatrix=getViewMatrix(cameras[S=(S+cameras.length-1)%cameras.length])),["+","="].includes($.key)&&(viewMatrix=getViewMatrix(cameras[S=(S+1)%cameras.length])),c.innerText="cam  "+S,"KeyV"==$.code?(location.hash="#"+JSON.stringify(viewMatrix.map(e=>Math.round(100*e)/100)),c.innerText=""):"KeyP"===$.code&&(e=!0,c.innerText="")}),window.addEventListener("keyup",e=>{L=L.filter($=>$!==e.code)}),window.addEventListener("blur",()=>{L=[]}),window.addEventListener("wheel",$=>{e=!1,$.preventDefault();let t=1==$.deltaMode?10:2==$.deltaMode?innerHeight:1,_=invert4(viewMatrix);$.shiftKey?_=translate4(_,$.deltaX*t/innerWidth,$.deltaY*t/innerHeight,0):$.ctrlKey||$.metaKey?_=translate4(_,0,0,-10*($.deltaY*t)/innerHeight):(_=translate4(_,0,0,4),_=rotate4(_,-($.deltaX*t)/innerWidth,0,1,0),_=rotate4(_,$.deltaY*t/innerHeight,1,0,0),_=translate4(_,0,0,-4)),viewMatrix=invert4(_)},{passive:!1});let U,D,I;s.addEventListener("mousedown",$=>{e=!1,$.preventDefault(),U=$.clientX,D=$.clientY,I=$.ctrlKey||$.metaKey?2:1}),s.addEventListener("contextmenu",$=>{e=!1,$.preventDefault(),U=$.clientX,D=$.clientY,I=2}),s.addEventListener("mousemove",e=>{if(e.preventDefault(),1==I){let $=invert4(viewMatrix),t=5*(e.clientX-U)/innerWidth,_=5*(e.clientY-D)/innerHeight;$=translate4($,0,0,4),$=rotate4($,t,0,1,0),$=rotate4($,-_,1,0,0),$=translate4($,0,0,-4),viewMatrix=invert4($),U=e.clientX,D=e.clientY}else if(2==I){let a=invert4(viewMatrix);a=translate4(a,-10*(e.clientX-U)/innerWidth,0,10*(e.clientY-D)/innerHeight),viewMatrix=invert4(a),U=e.clientX,D=e.clientY}}),s.addEventListener("mouseup",e=>{e.preventDefault(),I=!1,U=0,D=0});let P=0,X=0;s.addEventListener("touchstart",$=>{$.preventDefault(),1===$.touches.length?(e=!1,U=$.touches[0].clientX,D=$.touches[0].clientY,I=1):2===$.touches.length&&(e=!1,U=$.touches[0].clientX,P=$.touches[1].clientX,D=$.touches[0].clientY,X=$.touches[1].clientY,I=1)},{passive:!1}),s.addEventListener("touchmove",e=>{if(e.preventDefault(),1===e.touches.length&&I){let $=invert4(viewMatrix),t=4*(e.touches[0].clientX-U)/innerWidth,_=4*(e.touches[0].clientY-D)/innerHeight;$=translate4($,0,0,4),$=rotate4($,t,0,1,0),$=rotate4($,-_,1,0,0),$=translate4($,0,0,-4),viewMatrix=invert4($),U=e.touches[0].clientX,D=e.touches[0].clientY}else if(2===e.touches.length){let a=Math.atan2(D-X,U-P)-Math.atan2(e.touches[0].clientY-e.touches[1].clientY,e.touches[0].clientX-e.touches[1].clientX),r=Math.hypot(U-P,D-X)/Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY),n=(e.touches[0].clientX+e.touches[1].clientX-(U+P))/2,i=(e.touches[0].clientY+e.touches[1].clientY-(D+X))/2,o=invert4(viewMatrix);o=rotate4(o,a,0,0,1),o=translate4(o,-n/innerWidth,-i/innerHeight,0),o=translate4(o,0,0,3*(1-r)),viewMatrix=invert4(o),U=e.touches[0].clientX,P=e.touches[1].clientX,D=e.touches[0].clientY,X=e.touches[1].clientY}},{passive:!1}),s.addEventListener("touchend",e=>{e.preventDefault(),I=!1,U=0,D=0},{passive:!1});let B=0,C=0,F=0,Y=0,K=0;window.addEventListener("gamepadconnected",e=>{let $=navigator.getGamepads()[e.gamepad.index];console.log(`Gamepad connected at index ${$.index}: ${$.id}. It has ${$.buttons.length} buttons and ${$.axes.length} axes.`)}),window.addEventListener("gamepaddisconnected",e=>{console.log("Gamepad disconnected")});let N,V,O=$=>{let t=invert4(viewMatrix),_=L.includes("Shift")||L.includes("ShiftLeft")||L.includes("ShiftRight");L.includes("ArrowUp")&&(t=_?translate4(t,0,-.03,0):translate4(t,0,0,.1)),L.includes("ArrowDown")&&(t=_?translate4(t,0,.03,0):translate4(t,0,0,-.1)),L.includes("ArrowLeft")&&(t=translate4(t,-.03,0,0)),L.includes("ArrowRight")&&(t=translate4(t,.03,0,0)),L.includes("KeyA")&&(t=rotate4(t,-.01,0,1,0)),L.includes("KeyD")&&(t=rotate4(t,.01,0,1,0)),L.includes("KeyQ")&&(t=rotate4(t,.01,0,0,1)),L.includes("KeyE")&&(t=rotate4(t,-.01,0,0,1)),L.includes("KeyW")&&(t=rotate4(t,.005,1,0,0)),L.includes("KeyS")&&(t=rotate4(t,-.005,1,0,0));let a=navigator.getGamepads?navigator.getGamepads():[],r=L.includes("Space");for(let i of a){if(!i)continue;Math.abs(i.axes[0])>.1&&(t=translate4(t,.06*i.axes[0],0,0),e=!1),Math.abs(i.axes[1])>.1&&(t=translate4(t,0,0,-.06*i.axes[1]),e=!1),(i.buttons[12].pressed||i.buttons[13].pressed)&&(t=translate4(t,0,-.06*(i.buttons[12].pressed-i.buttons[13].pressed),0),e=!1),(i.buttons[14].pressed||i.buttons[15].pressed)&&(t=translate4(t,-.06*(i.buttons[14].pressed-i.buttons[15].pressed),0,0),e=!1),Math.abs(i.axes[2])>.1&&(t=rotate4(t,.02*i.axes[2],0,1,0),e=!1),Math.abs(i.axes[3])>.1&&(t=rotate4(t,-.02*i.axes[3],1,0,0),e=!1);let s=i.buttons[6].value-i.buttons[7].value;Math.abs(s)>.1&&(t=rotate4(t,.02*s,0,0,1),e=!1),i.buttons[4].pressed&&!N&&(camera=cameras[(cameras.indexOf(camera)+1)%cameras.length],t=invert4(getViewMatrix(camera)),e=!1),i.buttons[5].pressed&&!V&&(camera=cameras[(cameras.indexOf(camera)+cameras.length-1)%cameras.length],t=invert4(getViewMatrix(camera)),e=!1),N=i.buttons[4].pressed,V=i.buttons[5].pressed,i.buttons[0].pressed&&(r=!0,e=!1),i.buttons[3].pressed&&(e=!0)}if(["KeyJ","KeyK","KeyL","KeyI"].some(e=>L.includes(e))&&(t=translate4(t,0,0,4),t=rotate4(t,L.includes("KeyJ")?-.05:L.includes("KeyL")?.05:0,0,1,0),t=rotate4(t,L.includes("KeyI")?.05:L.includes("KeyK")?-.05:0,1,0,0),t=translate4(t,0,0,-4)),viewMatrix=invert4(t),e){let f=invert4(defaultViewMatrix),v=Math.sin((Date.now()-K)/5e3);f=translate4(f,2.5*v,0,6*(1-Math.cos(v))),f=rotate4(f,-.6*v,0,1,0),viewMatrix=invert4(f)}B=r?Math.min(1,B+.05):Math.max(0,B-.05);let m=invert4(viewMatrix);m=translate4(m,0,-B,0),m=rotate4(m,-.1*B,1,0,0);let p=invert4(m),h=multiply4(d,p);o.postMessage({view:h});let x=1e3/($-F)||0;Y=.9*Y+.1*x,C>0?(document.getElementById("spinner").style.display="none",u.uniformMatrix4fv(g,!1,p),u.clear(u.COLOR_BUFFER_BIT),u.drawArraysInstanced(u.TRIANGLE_FAN,0,4,C)):(u.clear(u.COLOR_BUFFER_BIT),document.getElementById("spinner").style.display="",K=Date.now()+2e3);let w=100*C/(n.length/32);w<100?document.getElementById("progress").style.width=w+"%":document.getElementById("progress").style.display="none",l.innerText=Math.round(Y)+" fps",isNaN(S)&&(c.innerText=""),F=$,requestAnimationFrame(O)};O();let k=e=>{let $=new FileReader;/\.json$/i.test(e.name)?($.onload=()=>{viewMatrix=getViewMatrix((cameras=JSON.parse($.result))[0]),d=getProjectionMatrix(camera.fx/i,camera.fy/i,s.width,s.height),u.uniformMatrix4fv(p,!1,d),console.log("Loaded Cameras")},$.readAsText(e)):(H=!0,$.onload=()=>{n=new Uint8Array($.result),console.log("Loaded",Math.floor(n.length/32)),112==n[0]&&108==n[1]&&121==n[2]&&10==n[3]?o.postMessage({ply:n.buffer}):o.postMessage({buffer:n.buffer,vertexCount:Math.floor(n.length/32)})},$.readAsArrayBuffer(e))};window.addEventListener("hashchange",$=>{try{viewMatrix=JSON.parse(decodeURIComponent(location.hash.slice(1))),e=!1}catch(t){}});let G=e=>{e.preventDefault(),e.stopPropagation()};document.addEventListener("dragenter",G),document.addEventListener("dragover",G),document.addEventListener("dragleave",G),document.addEventListener("drop",e=>{e.preventDefault(),e.stopPropagation(),k(e.dataTransfer.files[0])});let z=0,j=-1,H=!1;for(;;){let{done:W,value:q}=await r.read();if(W||H)break;n.set(q,z),z+=q.length,C>j&&(o.postMessage({buffer:n.buffer,vertexCount:Math.floor(z/32)}),j=C)}H||o.postMessage({buffer:n.buffer,vertexCount:Math.floor(z/32)})}main().catch(e=>{document.getElementById("spinner").style.display="none",document.getElementById("message").innerText=e.toString()});