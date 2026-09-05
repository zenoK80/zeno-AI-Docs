# 자동 배포는 어떻게 돌아가는가 — deploy.yml 완전 해부

`git push` 한 번으로 사이트가 갱신되는 그 장치를 처음부터 끝까지 설명한다. YAML이 뭔지, 왜 하필 그 폴더 이름이어야 하는지, 각 줄이 무슨 뜻인지, 직접 만들려면 어떻게 하는지까지.

---

## 0. 전체 그림 먼저

우리가 하는 일은 `git push` 하나뿐이다. 그 뒤에 벌어지는 일은 이렇다.

```
내 컴퓨터에서 git push
        ↓
GitHub가 "main 브랜치에 푸시됐다"를 감지
        ↓
.github/workflows/deploy.yml 을 찾아 읽음
        ↓
빈 리눅스 컴퓨터 한 대를 새로 켬 (러너)
        ↓
그 컴퓨터에서 순서대로 실행:
  1. 소스 코드 내려받기
  2. Node.js 설치
  3. npm ci      (라이브러리 설치)
  4. npm run build  (out/ 폴더에 HTML 생성)
  5. out/ 폴더를 결과물로 포장
        ↓
포장된 결과물을 GitHub Pages에 올림
        ↓
https://zeno.it.kr 갱신 완료 → 러너 컴퓨터는 삭제됨
```

여기서 **가장 중요한 오해 하나**를 먼저 풀자.

> **배포되는 것은 `.mdx` 파일이 아니다.** 러너가 빌드해서 만든 `out/` 폴더의 HTML이 배포된다. 그래서 빌드가 실패하면 사이트는 **이전 버전 그대로** 남는다.

---

## 1. YAML이 뭔가

`.yml`(또는 `.yaml`)은 **설정을 적는 파일 형식**이다. 프로그래밍 언어가 아니다. "이 값은 이거다"를 적는 메모지에 가깝다.

JSON을 봤다면 이렇게 비교하면 된다.

```json
{ "name": "홍길동", "age": 20, "hobbies": ["독서", "게임"] }
```

같은 내용을 YAML로 쓰면 이렇다.

```yaml
name: 홍길동
age: 20
hobbies:
  - 독서
  - 게임
```

괄호와 따옴표를 줄이고 **줄바꿈과 들여쓰기로 구조를 표현**한다. 규칙은 세 개뿐이다.

### 규칙 1: `키: 값`

콜론 뒤에 **반드시 공백 한 칸**이 필요하다.

```yaml
name: Deploy to GitHub Pages     # 맞음
name:Deploy to GitHub Pages      # 틀림 (공백 없음)
```

### 규칙 2: 들여쓰기가 소속을 정한다

들여쓰기된 줄은 **바로 위 줄에 속한다.**

```yaml
on:                    # on 이라는 항목이 있고
  push:                #   그 안에 push 가 있고
    branches: [main]   #     그 안에 branches 가 있다
```

**들여쓰기는 반드시 공백(스페이스)으로 한다. 탭(Tab)을 쓰면 오류가 난다.** YAML에서 가장 흔한 실수다. 보통 공백 2칸을 쓴다.

### 규칙 3: `-` 는 목록(리스트)

```yaml
steps:
  - uses: actions/checkout@v4
  - run: npm ci
  - run: npm run build
```

`steps` 안에 항목이 3개 있고, **적힌 순서대로 실행된다.**

`[main]`처럼 대괄호로 한 줄에 쓸 수도 있다. 아래 둘은 완전히 같은 뜻이다.

```yaml
branches: [main]

branches:
  - main
```

### `#` 는 주석

`#` 뒤는 사람이 읽는 메모일 뿐 실행에 영향이 없다. 우리 파일 30~31행이 그렇다.

---

## 2. 왜 하필 `.github/workflows/` 인가

**GitHub가 정한 약속이라서다.** 바꿀 수 없다.

GitHub는 저장소를 받을 때마다 **`.github/workflows/` 폴더만 들여다본다.** 그 안에 있는 `.yml` 파일을 자동화 설정으로 인식한다. 다른 곳에 두면 그냥 텍스트 파일일 뿐 아무 일도 안 일어난다.

| 위치 | 인식되나 |
|---|:--:|
| `.github/workflows/deploy.yml` | 된다 |
| `.github/workflows/무슨이름이든.yml` | **된다** |
| `.github/deploy.yml` | 안 된다 (workflows 폴더가 아님) |
| `workflows/deploy.yml` | 안 된다 (.github 안이 아님) |
| `deploy.yml` (루트) | 안 된다 |

**정리하면 이렇다.**

- **폴더 경로 `.github/workflows/` 는 고정** — 반드시 이대로여야 한다
- **파일 이름 `deploy.yml` 은 자유** — `배포.yml`이든 `abc.yml`이든 상관없다. 확장자만 `.yml` 또는 `.yaml`이면 된다
- 파일을 **여러 개 둘 수도 있다.** 각각 독립적으로 돌아간다 (예: `deploy.yml`은 배포, `test.yml`은 테스트)

앞에 붙은 점(`.github`)은 리눅스에서 **숨김 폴더**를 뜻한다. 그래서 파일 탐색기에서 안 보일 수 있는데, 정상이다.

---

## 3. 우리 파일 한 줄씩 읽기

`.github/workflows/deploy.yml` 전문을 조각내서 본다.

### 이름

```yaml
name: Deploy to GitHub Pages
```

GitHub의 **Actions 탭에 표시될 이름**이다. 아무 이름이나 써도 되고 동작에는 영향이 없다.

### 언제 실행할지

```yaml
on:
  push:
    branches: [main]
```

**`on`은 "언제 실행할까"를 정하는 자리다.** 지금 설정은 이렇게 읽는다.

> **main 브랜치에 푸시될 때** 실행하라.

그래서 다른 브랜치에 푸시하면 배포가 안 된다. 자주 쓰는 다른 조건들:

```yaml
on:
  pull_request:              # PR이 올라올 때
  schedule:
    - cron: '0 0 * * *'      # 매일 자정마다
  workflow_dispatch:         # Actions 탭에서 버튼으로 수동 실행
```

`workflow_dispatch`는 넣어두면 편하다. **코드 변경 없이 배포만 다시 하고 싶을 때** 버튼 하나로 돌릴 수 있다.

### 권한

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

이 자동화가 **저장소에 무슨 짓을 할 수 있는지** 정한다. 최소한만 주는 게 안전하다.

| 항목 | 뜻 |
|---|---|
| `contents: read` | 소스 코드를 **읽기만** 한다. 코드를 고치거나 커밋하지 못한다 |
| `pages: write` | GitHub Pages에 **결과물을 올릴 수 있다** |
| `id-token: write` | 신원 증명 토큰 발급. Pages 배포 방식이 요구한다 |

셋 다 **GitHub Pages 배포에 필요한 최소 조합**이다. 하나라도 빼면 권한 오류로 실패한다.

### 동시 실행 정리

```yaml
concurrency:
  group: pages
  cancel-in-progress: true
```

푸시를 연달아 두 번 하면 배포가 두 개 동시에 돌아갈 수 있다. 그러면 **먼저 시작한 오래된 빌드가 나중에 끝나서 최신 결과를 덮어쓰는** 사고가 난다.

이 설정은 그걸 막는다.

- **`group: pages`** — 이 이름표를 단 작업은 한 번에 하나만 돈다
- **`cancel-in-progress: true`** — 새 작업이 시작되면 **돌고 있던 이전 작업을 취소**한다

> **쉽게 말하면**: 새 주문이 들어오면 이전 주문은 버린다. 어차피 최신 코드로 만든 게 맞으니까.

### 작업(job) 두 개

```yaml
jobs:
  build:
    ...
  deploy:
    needs: build
    ...
```

**`jobs` 안의 각 항목이 하나의 작업**이고, **작업마다 별도의 컴퓨터를 새로 받는다.**

- `build` — 사이트를 만드는 작업
- `deploy` — 만든 걸 올리는 작업
- **`needs: build`** — deploy는 build가 **성공해야만** 시작한다

`build`와 `deploy`는 이름을 우리가 정한 것이라 마음대로 바꿔도 된다. 단 `needs:`에 적은 이름도 같이 바꿔야 한다.

빌드가 실패하면 deploy는 아예 실행되지 않는다. **이번 메모리 부족 사고 때 사이트가 옛날 버전 그대로였던 이유**가 이것이다.

### 어떤 컴퓨터에서 돌릴지

```yaml
runs-on: ubuntu-latest
```

**러너(runner)** 라고 부르는 임시 컴퓨터의 종류를 고른다. `ubuntu-latest`는 최신 우분투 리눅스다.

- 무료 표준 러너는 **메모리 16GB**
- 공개 저장소는 사용 시간 무제한
- 빌드가 끝나면 **컴퓨터는 삭제**된다. 그래서 매번 라이브러리를 새로 설치한다
- `windows-latest`, `macos-latest`도 있지만 리눅스가 가장 빠르고 흔하다

### 단계들

```yaml
steps:
  - uses: actions/checkout@v4
```

**`uses`는 "남이 만들어 둔 도구를 가져다 쓴다"** 는 뜻이다. `actions/checkout`은 GitHub 공식 도구로, **저장소 코드를 러너에 내려받는다.** 러너는 빈 컴퓨터라서 이걸 안 하면 코드가 없다.

`@v4`는 그 도구의 버전이다.

```yaml
  - uses: actions/setup-node@v4
    with:
      node-version: 22
      cache: npm
```

**`with`는 그 도구에 넘기는 설정값**이다.

- `node-version: 22` — Node.js 22 버전을 설치한다
- `cache: npm` — 설치한 라이브러리를 저장해 뒀다가 다음 실행 때 재사용한다. 빌드가 빨라진다

```yaml
  - run: npm ci
```

**`run`은 "이 명령어를 그대로 터미널에 친다"** 는 뜻이다.

`npm ci`는 `npm install`의 사촌인데 차이가 있다.

| | `npm install` | `npm ci` |
|---|---|---|
| 기준 파일 | `package.json` | **`package-lock.json`** |
| 버전 | 조건에 맞으면 더 최신도 설치 | **잠긴 버전 그대로** 설치 |
| 기존 폴더 | 남겨두고 갱신 | `node_modules`를 **지우고 새로** |
| 용도 | 개발할 때 | **자동화 환경** |

`ci`는 Continuous Integration(지속적 통합)의 약자다. **"내 컴퓨터에서 되던 그 버전 그대로"** 를 보장하려고 자동화에서는 이걸 쓴다.

```yaml
  - run: npm run build
    env:
      NODE_OPTIONS: --max-old-space-size=8192
```

`package.json`에 정의된 `build` 스크립트를 실행한다. 우리 프로젝트에서는 `next build`가 돌아가고, 결과가 `out/` 폴더에 쌓인다.

**`env`는 그 명령에만 적용되는 환경 변수**를 정한다. 여기 있는 `NODE_OPTIONS`는 메모리 부족을 막으려고 나중에 추가한 것이다. 자세한 사정은 [insight/02_배포-빌드-메모리-부족.md](../insight/02_배포-빌드-메모리-부족.md)에 정리해 뒀다.

```yaml
  - uses: actions/upload-pages-artifact@v3
    with:
      path: ./out
```

**아티팩트(artifact)** 는 "작업의 결과물"이라는 뜻이다. `out/` 폴더를 압축해서 GitHub에 보관한다.

이 단계가 필요한 이유가 중요하다. **build 작업과 deploy 작업은 서로 다른 컴퓨터에서 돌아간다.** build가 끝나면 그 컴퓨터는 사라지므로, 결과물을 어딘가에 맡겨 둬야 deploy 쪽 컴퓨터가 받아 갈 수 있다.

> **쉽게 말하면**: 이사할 때 짐을 보관 창고에 맡겼다가 새 집에서 찾는 것과 같다.

### 배포 작업

```yaml
  deploy:
    needs: build
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- **`environment`** — GitHub Pages 배포에 필요한 지정된 환경 이름이다. 이 이름은 `github-pages`로 고정
- **`${{ ... }}`** — YAML이 아니라 **GitHub Actions의 값 넣기 문법**이다. 실행 중에 실제 값으로 바뀐다
- **`id: deployment`** — 이 단계에 붙인 이름표. 위의 `steps.deployment.outputs.page_url`이 이 이름표를 가리킨다. **배포된 주소를 받아와 Actions 화면에 링크로 띄우는 용도**다
- **`actions/deploy-pages@v4`** — 맡겨 둔 아티팩트를 실제 Pages 사이트에 올리는 공식 도구

---

## 4. GitHub 설정에서 해줘야 하는 것

**`.yml` 파일만 있으면 되는 게 아니다.** 저장소 설정에서 한 가지를 켜야 한다.

**Settings → Pages → Source**를 **`GitHub Actions`** 로 바꾼다.

기본값은 `Deploy from a branch`인데, 그 상태면 **특정 브랜치의 파일을 그대로 올리는 방식**이라 우리 워크플로가 만든 결과물을 안 쓴다. 이걸 안 바꾸면 워크플로는 성공했다고 나오는데 사이트는 그대로인 이상한 상황이 된다.

현재 이 저장소 설정은 이렇게 되어 있다.

| 항목 | 값 |
|---|---|
| 빌드 방식 | `workflow` (= GitHub Actions) |
| 주소 | `https://zeno.it.kr/` |
| 커스텀 도메인 | `zeno.it.kr` |
| HTTPS 강제 | 켜짐 |

**커스텀 도메인(`zeno.it.kr`)도 저장소 파일이 아니라 Settings → Pages에 저장돼 있다.** 그래서 코드를 뒤져도 안 나온다. 도메인 쪽에서는 DNS 설정으로 GitHub Pages를 가리켜야 하는데, 이건 도메인 산 곳(가비아 등)에서 하는 별도 작업이다.

---

## 5. 직접 만들어 보기

빈 저장소에 처음부터 만든다면 순서는 이렇다.

### 1단계: 폴더와 파일 만들기

```bash
mkdir -p .github/workflows
```

`.github/workflows/deploy.yml`을 만들고 내용을 채운다. **폴더 경로는 반드시 이대로**여야 한다.

### 2단계: 빌드 결과가 어디 쌓이는지 확인

프레임워크마다 다르다. 이 값을 `path:`에 적어야 한다.

| 도구 | 결과 폴더 |
|---|---|
| Next.js (`output: 'export'`) | `out` |
| Vite | `dist` |
| Create React App | `build` |
| 정적 HTML만 있는 경우 | `.` (루트) |

### 3단계: 푸시

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: GitHub Pages 자동 배포 추가"
git push
```

푸시하는 순간 GitHub가 파일을 발견하고 **바로 실행한다.** 등록 절차 같은 건 없다.

### 4단계: 설정 켜기

Settings → Pages → Source를 `GitHub Actions`로.

### 5단계: 확인

저장소의 **Actions 탭**에 실행 기록이 보인다. 노란 점은 진행 중, 초록 체크는 성공, 빨간 X는 실패다. 실패한 걸 클릭하면 어느 단계에서 왜 죽었는지 로그가 그대로 나온다.

---

## 6. 자주 겪는 문제

| 증상 | 원인과 해결 |
|---|---|
| 푸시했는데 Actions에 아무것도 안 뜬다 | 파일 위치가 `.github/workflows/` 가 아니거나, `on:` 의 브랜치 이름이 실제와 다르다(`main` vs `master`) |
| `Invalid workflow file` 오류 | YAML 문법 오류. **들여쓰기에 탭을 쓴 경우**가 가장 흔하다. 콜론 뒤 공백 누락도 |
| 빌드는 성공인데 사이트가 그대로 | Settings → Pages의 Source가 `GitHub Actions`가 아니다 |
| `Resource not accessible` 오류 | `permissions:` 블록이 없거나 항목이 빠졌다 |
| 빌드가 OOM으로 죽는다 | 힙 상한 문제. [insight/02](../insight/02_배포-빌드-메모리-부족.md) 참고 |
| 로컬은 되는데 CI만 실패 | 리눅스는 **대소문자를 구분**한다. `Header.tsx`를 `header.tsx`로 import하면 로컬(Windows/macOS)만 통과한다 |

**Actions 로그를 명령줄에서 보는 법**은 [insight/02](../insight/02_배포-빌드-메모리-부족.md) 문서 안에 정리해 뒀다.

---

## 7. 요약

- **`.yml`** 은 설정 파일 형식이다. `키: 값`, 들여쓰기로 소속, `-` 로 목록. **탭 금지**
- **`.github/workflows/` 경로는 GitHub가 정한 고정 규칙**이고, 그 안의 파일 이름은 자유다
- **`on:`** 이 실행 조건, **`jobs:`** 가 할 일, **`steps:`** 가 순서다
- **`uses`** 는 남의 도구 가져다 쓰기, **`run`** 은 터미널 명령 직접 실행
- 작업마다 **빈 컴퓨터를 새로 받으므로**, 결과물은 아티팩트로 맡겨서 다음 작업에 넘긴다
- **파일만으로는 부족하다.** Settings → Pages → Source를 `GitHub Actions`로 켜야 한다
- 배포되는 건 소스가 아니라 **빌드 결과물(`out/`)** 이다. 빌드가 실패하면 사이트는 이전 버전 그대로 남는다
