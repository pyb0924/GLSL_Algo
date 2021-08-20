#version 330 core
out vec4 FragColor;
in vec3 ourColor;
in vec2 TexCoord;

// texture sampler
uniform sampler2D texture1;
uniform float fWidth;
uniform float fHeight;

float sinc(float x) {
    const float PI = 3.1415926;
    return sin(PI * x) / (PI * x);
}

float LWeight(float x) {
    if (abs(x) < 1e-6) {
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
    float texelSizeX = 1.0 / fWidth; //size of one texel 
	float texelSizeY = 1.0 / fHeight; //size of one texel 
    vec4 nSum = vec4( 0.0, 0.0, 0.0, 0.0 );
   
	int nX = int(TexCoord.x * fWidth);
	int nY = int(TexCoord.y * fHeight);
	vec2 TexCoord1 = vec2( float(nX) / fWidth + 0.5 / fWidth, float(nY) / fHeight + 0.5 / fHeight );
    float f,f1;

    for( int m = -2; m <=3; m++ )
    {
        for( int n = -2; n<= 3; n++)
        {
			vec4 vecData = texture(textureSampler, TexCoord1 + vec2(texelSizeX * float( m ), texelSizeY * float( n )));
			f  = LWeight(float(m));
			vec4 vecCooef1 = vec4( f,f,f,f );
			f1 = LWeight(float(n));
			vec4 vecCoeef2 = vec4( f1, f1, f1, f1 );
            nSum += vecData * vecCoeef2 * vecCooef1  ;
        }
    }
    return nSum ;
}
					       

void main()
{
	FragColor = Lanczos(texture1,TexCoord);
}
