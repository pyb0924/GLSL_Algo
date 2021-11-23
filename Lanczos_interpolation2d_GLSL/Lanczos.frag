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
    else {
        return sinc(x) * sinc(x / 3);
    }
}

vec4 Lanczos(sampler2D textureSampler,vec2 texCoord){
    ivec2 dim = textureSize(textureSampler, 0);
    vec2 imgCoord = vec2(dim) * texCoord;
    vec2 samplePos = floor(imgCoord - 0.5) + 0.5;
    vec2 interpFactor = imgCoord - samplePos;
    samplePos /= vec2(dim);

    vec4 nSum = vec4( 0.0, 0.0, 0.0, 0.0 );
    float fX,fY;
        
    for( int m = -2; m <=3; m++ )
    {
        fX  = LWeight(float(m)-interpFactor.x);
        vec4 vecCooef1 = vec4( fX,fX,fX,fX );
        for( int n = -2; n<= 3; n++)
        {
			vec4 vecData = textureOffset(textureSampler,samplePos,ivec2(m,n));
			fY = LWeight(float(n)-interpFactor.y);
			vec4 vecCoeef2 = vec4( fY, fY, fY, fY );
            nSum += vecData * vecCoeef2 * vecCooef1 ;
        }
    }
    return nSum ;
}
					       

void main()
{
	FragColor = (ourColor, 1) *Lanczos(texture1,TexCoord);
}
