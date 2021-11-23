#version 330 core
out vec4 FragColor;

in vec2 TexCoord;

uniform int KernalSize;
uniform float SigmaSpace;
uniform float SigmaColor;

// texture sampler
uniform sampler2D TextureSampler;

vec4 GaussianWeight(vec4 dist,float sigma)
{
    return exp(-dist* dist / sigma /sigma / 2);
}

vec4 BilateralFiltering(sampler2D textureSampler,vec2 texCoord)
{
    ivec2 dim = textureSize(textureSampler, 0);
    vec2 imgCoord = vec2(dim) * texCoord;
    vec2 samplePos = floor(imgCoord - 0.5) + 0.5;
    vec2 interpFactor = imgCoord - samplePos;
    samplePos /= vec2(dim);
	int Size = KernalSize / 2;
    vec4 CurColor;
    vec4 CenterColor = texture2D(textureSampler,samplePos);

    float fSpaceDistance;
    vec4 vSpaceDistance, vColorDistance;

    vec4 Weight[81];
    int i=0;
    for(int dX = -Size; dX <= Size; ++dX)
    {
        for(int dY = -Size; dY <= Size; ++dY)
        {
            CurColor = textureOffset(textureSampler, samplePos, ivec2(dX,dY));
            vColorDistance = (CenterColor - CurColor)*256;
            fSpaceDistance = distance(float(dX), float(dY));
            vSpaceDistance=vec4(fSpaceDistance, fSpaceDistance, fSpaceDistance, fSpaceDistance);
            Weight[i] = GaussianWeight(vColorDistance, SigmaColor) * GaussianWeight(vSpaceDistance, SigmaSpace);
            i++;
        } 
    }
    vec4 fSum=vec4(0.0,0.0,0.0,0.0);
    for(i=0;i<KernalSize*KernalSize;i++)
    {
        fSum+=Weight[i];
    }


    vec4 Result=vec4(0.0,0.0,0.0,0.0);
    i=0;
    for(int dX = -Size; dX <= Size; ++dX)
    {
        for(int dY = -Size; dY <= Size; ++dY)
        {
            Result+=Weight[i]/fSum*textureOffset(textureSampler, samplePos, ivec2(dX,dY));
            i++;
        }
    }
    return Result;
}

void main()
{
	FragColor = BilateralFiltering(TextureSampler,TexCoord);
}


