# GINN: Geometric Illustration of Neural Networks

[See the blog post on this](http://www.bayeswatch.com/2018/09/17/GINN/) for more information. This repository houses the code used to reproduce the results and for the basic [web application](http://www.bayeswatch.com/assets/ginn/good3.html).

The code runs in Python and requires:
1. [Pytorch](https://pytorch.org/)
2. [Scikit-image](https://scikit-image.org/)
3. [Scipy](https://www.scipy.org/)

To run the code simply run:
```python
python main.py
```
This will store the necessary files in the directory ```ginn```. It takes approximately 10 minutes to run and needs to run for 1280000 iterations to store the correct files for the visualisation tool. Following this the visualisation tool can be run by opening ```ginn/ginn.html```.

If this resource is useful to you and you would like to refer to it in an academic context, please cite the arXiv technical report (incoming link).



