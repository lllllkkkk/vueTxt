const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAsssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const registerRouter = require('./backend/router')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
    // assetModuleFilename: 'images/[hash:8][ext][query]'
  },
  devServer: { // 自动浏览器生成
    port: 3000,
    hot: true,
    open: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    onBeforeSetupMiddleware:function(devServer){
      registerRouter(devServer.app)
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        // es6转es5编译
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // 处理css
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 处理 less
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
       type: 'javascript/auto'
      },
      {
        // 处理视频
        test: /\.(mp4|mp3|wav)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                'src/assets/scss/variable.scss', // 引入全局 SasS 变量的文件（对应你全局文件的路径）
                'src/assets/scss/mixin.scss'
              ]
            }
          }
        ]
      },
      // {
      //   test: /\.(jpg|png|jpeg|gif|bmp)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 1024,
      //         fallback: {
      //           loader: 'file-loader',
      //           options: {
      //             name: '[name].[ext]'
      //           }
      //         }
      //       }
      //     },
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //         },
      //         optipng: {
      //           enabled: false,
      //         },
      //         pngquant: {
      //           quality: [0.65, 0.90],
      //           speed: 4
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         webp: {
      //           quality: 75
      //         }
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.vue/,
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // 自动插入HTML模版中
      template: './src/index.html',
      filename: 'index.html',
      title: 'Vue3 + webpack',
      minify: {
        collapseWhitespace: true, // 去掉空格
        removeComments: true // 去掉注释
      }
    }),
    new CleanWebpackPlugin(), // 清除以前的打包文件
    new OptimizeCssAsssetsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new VueLoaderPlugin()
  ]
}