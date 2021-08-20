#include <iostream>
#include <cmath>
#include <vector>
#include <numeric>
#include <random>


void initialize(std::vector<int> &img, const int len) {
    std::random_device device;
    std::default_random_engine engine(device());
    std::uniform_int_distribution<int> uniform_dist(0, 255);

    for (auto i = 0; i < len; i++)
    {
        img[i] = uniform_dist(engine);
    }
}

int get(const std::vector<int>& img, const unsigned int pos) {
    if (pos<0)
    {
        return img[0];
    }
    else if (pos >= img.size()){
        return img[img.size() - 1];
    }
    else
    {
        return img[pos];
    }
}

double sinc(double x) {
    const double PI = 3.1415926;
    return std::sin(PI * x) / (PI * x);
}

double LWeight(double x,int a) {
    if (std::abs(x) < 1e-5) {
        return 1;
    }
    else if (std::abs(x) > a) {
        return 0;
    }
    else {
        return sinc(x) * sinc(x / a);
    }
    
}
int main(void)
{
    const int iPREV_LEN = 10;
    std::vector<int> imgPREV(iPREV_LEN);
    initialize(imgPREV,iPREV_LEN);

    for (int item : imgPREV)
    {
        std::cout << item << " ";
    }

    int iRES_LEN;
    std::cin >> iRES_LEN;
    int iHalfWidth = iRES_LEN > iPREV_LEN ? 3 : 2;


    std::cout << std::endl ;
    double dX;
    int iFloorX;
    std::vector<int> vLRange(2 * iHalfWidth);
    std::vector<int> imgRES(iRES_LEN);
    double dS;
    int iResult;

    for (int i = 0; i < iRES_LEN; i++) {
        
        dX = ((i + 1.0) * iPREV_LEN) / iRES_LEN-1;
        iFloorX = static_cast<int>(std::floor(dX));
        std::iota(vLRange.begin(), vLRange.end(), iFloorX - iHalfWidth + 1);
        
        dS = 0;
        for (auto j = 0; j < 2 * iHalfWidth; j++) {
            dS += get(imgPREV, vLRange[j]) * LWeight(dX-vLRange[j],iHalfWidth);
        }
        iResult = static_cast<int>(std::round(dS));
        imgRES[i] = iResult >0 ? iResult : 0;
        std::cout << imgRES[i] << " ";
    }

    return 0;
}