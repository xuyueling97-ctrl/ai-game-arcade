# AI 游戏街机厅

一个中文个人游戏门户，汇集由不同 AI 模型开发的小游戏。网站使用静态 HTML、CSS 和 JavaScript，无需构建、安装依赖或配置 API 密钥。

## 本地预览

在项目目录中运行以下命令，然后在浏览器中打开 http://localhost:8000/。也可以直接打开 `index.html`。

```sh
python3 -m http.server 8000
```

## 添加和更新游戏

1. 将封面放进 `assets/`。建议使用约 2.1∶1 的横图，并压缩为 WebP。
2. 在 `games.js` 的 `games` 数组中追加或修改一项。数组顺序决定卡片显示顺序。
3. 刷新浏览器，检查卡片、状态筛选和链接。筛选数量会自动更新。

| 字段 | 用法 |
| --- | --- |
| `title` | 游戏名称，必填。 |
| `status` | 必填。填写 `released`（已上线）、`beta`（Beta 公测）或 `development`（开发中）。 |
| `image` | 可选。封面的相对路径，如 `./assets/new-game.webp`。 |
| `model` | 可选。填写开发模型及协作信息。 |
| `description` | 可选。填写简短的游戏介绍。 |
| `playUrl` | 已上线或公测作品的实际试玩地址。设置后显示「开始游戏」按钮。 |
| `sourceUrl` | 已上线或公测作品的仓库地址。设置后显示「源码」按钮。 |

开发中作品可用以下格式登记。发布时，把状态改成 `released` 或 `beta`，并补上实际地址和介绍。

```js
{
  title: "新游戏",
  status: "development",
  image: "./assets/new-game.webp",
},
```

## 部署到 GitHub Pages

1. 在 GitHub 创建或选择用于发布门户的仓库，将本目录的**内容**放到目标分支的根目录。保留 `.nojekyll`、`index.html`、`styles.css`、`games.js`、`app.js` 和整个 `assets/` 目录。
2. 打开仓库的 **Settings → Pages**。在 **Build and deployment** 下，将 **Source** 设为 **Deploy from a branch**，选择目标分支（例如 `main`）和 **/ (root)**，然后点击 **Save**。
3. 部署完成后，从 **Settings → Pages** 打开站点。项目站点地址通常为 `https://<用户名>.github.io/<仓库名>/`。样式、脚本和图片均使用相对路径，可直接部署在仓库子路径。
4. 此后，更新发布分支上的文件即可重新部署。

GitHub Pages 当前的设置步骤以 [GitHub 官方文档](https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) 为准。
