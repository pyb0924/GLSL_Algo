# GLSL_Algo

## Overview

部分在实习期间的核心算法实现，使用GLSL实现的插值和滤波shader。

### Lanvzos Interpolation

一个简单的Lanczos插值算法实现。包括：

#### 1D插值（C++实现）

[Lanczos_interpolation1d.cpp ](./Lanczos_interpolation/Lanczos_interpolation1d.cpp)



#### 2D插值（C++实现）

[Lanczos_interpolation2d.cpp](./Lanczos_interpolation2d/Lanczos_interpolation2d.cpp)



#### 2D插值（OpenGL Fragment Shader实现）

[Lanczos_interpolation2d_GLSL.cpp](./Lanczos_interpolation2d_GLSL/Lanczos_interpolation2d_GLSL.cpp)

> 提供原始Texture，biCubic插值和Lanczos插值Shader，可供切换和对比。


### Bilateral Filtering

一个双边滤波算法的GLSL实现

[Bilateral_Filetering_GLSL.cpp](./Bilateral_Filtering_GLSL/Bilateral_Filetering_GLSL.cpp)



## README.md

[README.md](./README.md)
