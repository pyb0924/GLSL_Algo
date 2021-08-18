#include <iostream>
#include <cmath>
#include <vector>
#include <numeric>
#include <random>


void initialize(std::vector<int>& vec, const int len) {
    std::random_device device;
    std::default_random_engine engine(device());
    std::uniform_int_distribution<int> uniform_dist(0, 255);

    for (auto i = 0; i < len; i++)
    {
        vec[i] = uniform_dist(engine);
    }
}

// TODO 2-d index
int get(const std::vector<std::vector<int>>& img,
    const int x, const int y) {
    int height = img.size();
    int width = img[0].size();
    if (x < 0 && y < 0)
    {
        return img[0][0];
    }
    else if (x >= height && y >= width) {
        return img[height - 1][width - 1];
    }
    else if (x >= height && y < 0)
    {
        return img[height - 1][0];
    }
    else if (x < 0 && y >= width) {
        return img[0][width - 1];
    }
    else if (x < 0) {
        return img[0][y];
    }
    else if (y < 0) {
        return img[x][0];
    }
    else if (x >= height) {
        return img[height - 1][y];
    }
    else if (y >= width) {
        return img[x][width - 1];
    }
    else {
        return img[x][y];
    }
}

double sinc(double x) {
    const double PI = 3.1415926;
    return std::sin(PI * x) / (PI * x);
}

double LWeight(double x, int a) {
    if (std::abs(x) < 1e-5) {
        return 1;
    }
    else if (std::abs(x) >= a) {
        return 0;
    }
    else {
        return sinc(x) * sinc(x / a);
    }

}


int main(void)
{
    const int iPREV_WIDTH = 10,iPREV_HEIGHT=10;
    std::vector<std::vector<int>> imgPREV;

    std::vector<int> tmp(iPREV_WIDTH);

    for (int i = 0; i < iPREV_HEIGHT; i++) {
        initialize(tmp, iPREV_WIDTH);
        imgPREV.push_back(tmp);
    }

    for (std::vector<int> items : imgPREV)
    {
        for (int item : items) {
            std::cout << item << " ";
        }
        std::cout << std::endl;
    }

    int iRES_WIDTH,iRES_HEIGHT;
    std::cin >> iRES_WIDTH>>iRES_HEIGHT;
    int iXA = iRES_WIDTH > iPREV_WIDTH ? 3 : 2;
    int iYA = iRES_HEIGHT > iPREV_HEIGHT ? 3 : 2;

    std::cout << iXA << " " << iYA << std::endl;
    
    std::vector<int> vXRange(2 * iXA);
    std::vector<int> vYRange(2 * iYA);
    std::vector<std::vector<int>> imgRES;

    std::vector<int> vResTmp(iRES_WIDTH, 0);
    for (int i = 0; i < iRES_HEIGHT; i++) {
        imgRES.push_back(vResTmp);
    }

    int iResult;
    double dS;
    double dX, dY;
    int iFloorX, iFloorY;
    std::vector<int> vLXRange(2 * iXA);
    std::vector<int> vLYRange(2 * iYA);

    for (int i = 0; i < iRES_HEIGHT; i++) {

        dX = ((i + 1) * iPREV_HEIGHT) / static_cast<double>(iRES_HEIGHT) - 1;
        iFloorX = static_cast<int>(std::floor(dX));
        std::iota(vLXRange.begin(), vLXRange.end(), iFloorX - iXA + 1);

        for (int j = 0; j < iRES_WIDTH; j++) {
            
            dY = ((j + 1) * iPREV_WIDTH) / static_cast<double>(iRES_WIDTH) - 1;
            iFloorY = static_cast<int>(std::floor(dY));
            std::iota(vLYRange.begin(), vLYRange.end(), iFloorY - iYA + 1);

            dS = 0;
            for (auto k = 0; k < 2 * iXA; k++) {
                for (auto l = 0; l < 2 * iYA; l++) {
                    dS += get(imgPREV, vLXRange[k], vYRange[l]) * LWeight(dX - vLXRange[k], iXA) * LWeight(dY - vLYRange[l], iYA);
                }
            }

            iResult =  static_cast<int>(std::round(dS));
            imgRES[i][j] = iResult > 0 ? iResult : 0;

            std::cout << imgRES[i][j] << " ";
        }
       
        std::cout << std::endl;
    }

    return 0;
}