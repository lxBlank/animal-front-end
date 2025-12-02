### 贡献指南（Contribution Guide）

#### 1. 外部开发者如何贡献

- **Fork 仓库**：在 GitHub/GitLab 上 Fork 本项目到你自己的账号下。  
- **创建分支**：从 `main`（或 `dev`）分支拉出新分支，分支命名建议如下：  
  - 新功能：`feature/xxx`  
  - Bug 修复：`fix/xxx`  
  - 文档：`docs/xxx`  
- **本地开发**：  
  - 安装依赖：`pip install -r requirements.txt`  
  - 进行功能开发 / Bug 修复，并确保本地测试通过：`python manage.py test`（如有）  
- **提交代码**：按下文“提交规范”编写 commit 信息并推送到你自己的远程仓库。  
- **发起 Pull Request**：在主页仓库中从你的分支发起 PR，按照“PR 描述格式”填写说明。  
- **Code Review & 修改**：根据维护者的 Review 意见进行修改，直至 PR 被合并。  

---

#### 2. 代码规范（Coding Style）

- **Python 版本与风格**
  - 使用 Python 3.8+。
  - 遵循 **PEP8** 代码风格（推荐使用 `flake8` 或 `ruff` 等工具进行检查）。  
- **Django 相关约定**
  - `views.py` 中避免写过重业务逻辑，复杂逻辑封装到 `services` / `utils` / `tools` 中。  
  - `models.py` 中字段命名清晰、含义明确，不使用难以理解的缩写。  
  - `serializers.py` 中保持字段与模型一致性，避免过多业务判断。  
- **命名与结构**
  - 变量 / 函数：使用小写加下划线，如 `get_user_token`。  
  - 类名：使用大驼峰，如 `UserProfileView`。  
  - 常量：全部大写加下划线，如 `DEFAULT_TIMEOUT`.  
- **注释与文档**
  - 关键逻辑处添加中文或英文注释，避免只靠命名猜测含义。  
  - 公共函数、类建议添加 docstring，说明用途与参数。  
- **测试**
  - 新功能和重要 Bug 修复，尽量补充或更新对应的单元测试。  
  - 确保 `python manage.py test`（或项目内的测试命令）能通过。  

---

#### 3. Pull Request 描述格式规范

建议 PR 的标题与描述遵循统一格式，便于 Review 和后期追踪。

- **PR 标题格式**

  推荐结构：`[类型] 简要说明`，例如：  
  - `[feat] 新增用户语音上传接口`  
  - `[fix] 修复社区列表接口分页错误`  
  - `[docs] 完善 README 贡献说明`  

- **PR 描述模板**

  建议在 PR 描述中包含以下内容（可直接复制作为模板）：  

  ```markdown
  ## 变更内容
  - [x] 简要说明本次 PR 做了哪些修改或新增了哪些功能
  - [ ] 如有接口变更，请写明请求方式、URL、参数和返回示例

  ## 相关 Issue
  - 关联 Issue：#123 （如果有）

  ## 测试情况
  - [ ] 已在本地运行 `python manage.py test`
  - [ ] 已在本地手动验证关键接口：
    - 接口 A：请求参数 / 返回结果
    - 接口 B：请求参数 / 返回结果

  ## 其他说明
  - 如有兼容性变更、迁移脚本或部署注意事项，请在此说明。
  ```

---

#### 4. Issue 提交规范

为便于定位问题和跟踪需求，提交 Issue 时建议遵循以下规则：

- **Issue 类型标签（Labels）**
  - `bug`：明确的错误或异常。  
  - `feature`：新功能或功能增强。  
  - `docs`：文档相关问题或改进建议。  
  - `question`：使用上的疑问或讨论。  

- **Issue 标题**
  - 简洁且能体现问题核心，例如：  
    - `bug: 用户登录接口返回 500 错误`  
    - `feature: 希望支持音频转文本功能`  

- **Issue 内容模板**

  ```markdown
  ## 类型
  - [ ] Bug
  - [ ] 新功能 / 改进建议
  - [ ] 文档 / 其他

  ## 问题或需求描述
  请用一两句话清晰描述你遇到的问题或希望实现的功能。

  ## 复现步骤（针对 Bug）
  1. 调用接口：`POST /api/v1/xxx`
  2. 请求参数：
     ```json
     {
       "example": "value"
     }
     ```
  3. 实际返回结果：
     ```json
     {
       "code": 500,
       "msg": "server error"
     }
     ```
  4. 预期结果：应该返回 200，并包含 xxx 字段。

  ## 运行环境
  - OS：Windows / macOS / Linux（及版本）
  - Python 版本：3.x
  - 数据库：SQLite / MySQL / PostgreSQL（及版本）
  - 其他相关信息：如是否使用 Docker 等

  ## 补充说明
  如有截图、日志（请注意脱敏）、错误堆栈，可在此补充。
  ```

你可以把以上四块内容直接合并进当前 `README.md` 中的某个章节（比如新建 `## 贡献指南`），如果需要我帮你把这几块和你现有 README 自动合并成一整版最终内容，也可以把当前 README 贴给我，我来整理。