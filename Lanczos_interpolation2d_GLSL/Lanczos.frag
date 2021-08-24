#version 330 core
out vec4 FragColor;
in vec3 ourColor;
in vec2 TexCoord;

// texture sampler
uniform sampler2D texture1;

float sinc(float x) {
    const float PI = 3.1415926;
    return sin(PI * x) / (PI * x);
}

float LWeight(float x) {
    if (abs(x) < 1e-8) {
        return 1.0f;
    }
    else if (abs(x) >= 3) {
        return 0.0f;
    }
    else {
        return sinc(x) * sinc(x / 3);
    }
}

vec4 Lanczos(sampler2D textureSampler,vec2 TexCoord){
    vec2 texTureDim = textureSize(textureSampler, 0);
    vec2 samplePos = floor( texTureDim * TexCoord - 0.5) + 0.5;
    samplePos/=vec2(texTureDim);
    vec4 nSum = vec4( 0.0, 0.0, 0.0, 0.0 );
    float f,f1;

    for( int m = -2; m <=3; m++ )
    {
        f  = LWeight(float(m));
        vec4 vecCooef1 = vec4( f,f,f,f );
        for( int n = -2; n<= 3; n++)
        {
			vec4 vecData = textureOffset(textureSampler,samplePos,ivec2(m,n));
			f1 = LWeight(float(n));
			vec4 vecCoeef2 = vec4( f1, f1, f1, f1 );
            nSum += vecData * vecCoeef2 * vecCooef1  ;
        }
    }
    return nSum ;
}
					       

void main()
{
	FragColor = (ourColor, 1) *Lanczos(texture1,TexCoord);
}
