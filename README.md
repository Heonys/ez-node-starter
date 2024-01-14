# ts-eznode-starter

이 저장소는 Express 기반의 Node.js 서버와 템플릿 엔진 Nunjucks을 통해서 아주 간단한 UI를 작성하고 Node.js에서 TypeScript 코드를 작성하기 위한 쉬운 workflow를 보여주는 것입니다

TypeScript 및 Node 프로젝트를 만드는 데 대한 포괄적이고 결정적인 가이드가 되는 것이 목표가 아니라 이름에서도 알 수 있듯이 Node.js 코드를 작성하는데 참조가 되었으면 좋겠습니다.

만약 Express 기반의 TypeScript 프로젝트를 시작하는 데 관심이 있다면 NestJS 라는 프레임워크를 참고해도 좋을 것 같습니다. [NestJS - A progressive Node.js framework](https://nestjs.com)

### 요구사항

- MongoDB 설정
  [Atlas](https://www.mongodb.com/atlas)를 활용하여 관리형 MongoDB 인스턴스를 생성
- Redis 설정
  [Redis](https://redis.com/)를 사용하여 데이터베이스를 생성
- Kakao 설정
  [Kakao Developers](https://developers.kakao.com/)에서 웹 플랫폼 어플리케이션을 생성하고도메인을 추가하여 Kakao API와의 연동

### 환경변수 설정

```env
PORT=8080
SECRET_KEY=your-secret-key
JWT_SECRET=your-secret-key
JWT_EXPIRES_SEC=86400
# MongoDB
CLUSTER_KEY=connectionstring
# Kakao
KAKAO_ID=RestAPIKey
# Redis
REDIS_ENDPOINT=redisendpoint
REDIS_PASWORD=userpassword
```

# 시작하기

- 저장소 복제

```
git clone https://github.com/Heonys/ts-eznode-starter.git <project_name>
```

- 의존성 설치

```
cd <project_name>
npm install
```

- 빌드 및 실행

```
npm run build
npm start
```

| NPM Script   | Description                                   |
| ------------ | --------------------------------------------- |
| `build-css`  | shx을 통한 `.css`파일 복사하여 css 빌드       |
| `build-ts`   | TypeScript 빌드                               |
| `build`      | 전체 빌드 (`build-ts`, `build-css`)           |
| `serve`      | `production` 환경에서 서버 실행               |
| `pm2`        | `PM2`로 어플리케이션 실행                     |
| `start`      | 어플리케이션 시작                             |
| `dev`        | 개발 환경에서 `nodemon`으로 어플리케이션 실행 |
| `test`       | `Jest`를 사용하여 테스트를 실행               |
| `test:watch` | 테스트를 watch 모드로 실행                    |
| `coverage`   | 테스트 커버리지 보고서 생성                   |

### 프로젝트 구조

| Forder              | Description                          |
| ------------------- | ------------------------------------ |
| **dist**            | 빌드된 파일들이 있는 디렉토리        |
| **node_modules**    | 모든 npm 종속성들이 포함된 디렉토리  |
| **src**             | dist 디렉토리로 컴파일될 소스 코드   |
| **src/controllers** | http 요청에 응답하는 컨트롤러        |
| **src/middleware**  | Express 미들웨어 함수                |
| **src/models**      | 데이터 모델을 정의                   |
| **src/passport**    | passport 설정과 관련된 디렉토리      |
| **src/public**      | css, image 등의 정적 파일            |
| **src/router**      | Express 라우터 정의                  |
| **src/db**          | MongoDB 연결 및 설정파일             |
| **src/types**       | TypeScript 타입 정의                 |
| **src/util**        | 유틸리티 함수 디렉토리               |
| **src/app.ts**      | Express 기본 구성 및 미들웨어를 정의 |
| **src/server.ts**   | Express 어플리케이션의 진입점        |
| **test**            | 테스트 파일 디렉토리                 |
| **Views**           | 템플릿 엔진 디렉토리                 |

### TypeScript 컴파일 구성

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*", "test/middleware.spec.ts"]
}
```



### Contributors

- [Jiheon Kim](https://github.com/Heonys)