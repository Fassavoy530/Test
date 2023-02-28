# NYUSH_Information_Visualization_Fall2023_Final_Project

This is a course project for DATS-SHU 235 Information Visualization, completed with my teammate Tianqing Yu and guided by Prof. Xianbin Gu. <br> 

Non-pharmaceutical intervention is a significant part of regulating health. In order to help people understand how diets have the potential to alleviate the effects of chronic diseases and some communicable diseases, we implemented an interactive visualization about the correlation between protein intake structure and COVID-19 case fatality rate, and the correlation between protein intake structure and obesity rate. <br>

The visualization was built primarily using JavaScript, D3, and React. The demo can be found in the demo folder with figures and video implementation.

## Dataset
We visualized an open-source dataset in Kaggle called: COVID-19 Healthy Diet Dataset ([link](https://www.kaggle.com/datasets/mariaren/covid19-healthy-diet-dataset)) and case-fatality rate from the coronavirus resource center webpage from John Hopkins University[^1].

## Instructions for running the visualization using webpack
- Create a folder containing the source code from the src folder as well as `package.json` `package-lock.json`, and `webpack.config.js`
- Open the folder in your development tool (VSCode recommended).
- Open the terminal and run the following commands:
  - **npm init** to initialize the folder.
  - **npm i -D webpack webpack-cli** to install the webpack and other packages.
  - **npx webpack server** to run the virtual server in the terminal.
  - Visit this URL: http://localhost:3000/ in your browser.
  - Have fun interacting with the visualization!

[^1]: https://coronavirus.jhu.edu/data/mortality
