#version 330 core
out vec4 FragColor;
in vec3 ourColor;
in vec2 TexCoord;

uniform sampler2D texture1;
uniform float fWidth;
uniform float fHeight;

float Triangular( float f )
{
	f = f / 2.0;
	if( f < 0.0 )
	{
		return ( f + 1.0 );
	}
	else
	{
		return ( 1.0 - f );
	}
	return 0.0;
}

vec4 BiCubic( sampler2D textureSampler, vec2 TexCoord )
{
	float texelSizeX = 1.0 / fWidth; //size of one texel 
	float texelSizeY = 1.0 / fHeight; //size of one texel 
    vec4 nSum = vec4( 0.0, 0.0, 0.0, 0.0 );
    vec4 nDenom = vec4( 0.0, 0.0, 0.0, 0.0 );

    for( int m = -1; m <=2; m++ )
    {
        for( int n =-1; n<= 2; n++)
        {
			vec4 vecData = texture2D(textureSampler, TexCoord + vec2(texelSizeX * float( m ), texelSizeY * float( n )));
			float f  = Triangular( float( m ) );
			vec4 vecCooef1 = vec4( f,f,f,f );
			float f1 = Triangular( -( float( n )  ) );
			vec4 vecCoeef2 = vec4( f1, f1, f1, f1 );
            nSum = nSum + ( vecData * vecCoeef2 * vecCooef1  );
            nDenom = nDenom + (( vecCoeef2 * vecCooef1 ));
        }
    }
    return nSum / nDenom;
}

// Shader for interpolating Bi cubic in Triangular method.
void main()
{
	vec4 Data = BiCubic( texture1, TexCoord );
	FragColor = Data;
}

