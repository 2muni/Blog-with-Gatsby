---
title: Create React App
subTitle: 처음 시작하는 React 프로젝트
category: "React.js"
cover: head.png
---

##Create React App
리액트 프로젝트를 시작하면서, 사용자는 컴포넌트를 여러가지 파일로 분리할 것이며(모듈화), 또한 이러한 컴포넌트들은 일반 자바스크립트가 아닌 JSX 문법으로 작성하게 됩니다. 이러한 파일들은 하나로 결합하기 위해선 자바스크립트 모듈화 도구인 [webpack](https://webpack.js.org/)을 사용하고, JSX를 비롯한 새로운 자바스크립트 문법들을 사용하기 위해선 [Babel](https://babeljs.io/)이라는 도구를 사용합니다.

[CRA-Create React App](https://github.com/facebook/create-react-app)은 리액트 작업환경을 명령어 하나로 설정할 수 있는 공식 도구입니다. 이로 인해 사용자는 컴포넌트 개발을 제외한 다른 것은 신경쓰지 않아도 됩니다.  
(또한 [PWA-Progressive Web App](https://developers.google.com/web/progressive-web-apps/?hl=ko)이 일부 적용되어 있습니다.)

이제부터 간단한 실습과 함께 설명이 진행됩니다. 본인의 작업환경을 확인하시고, 내용을 진행해 주세요.
##작업환경 설정
###사전 준비
* [Node.js v8(LTS)](https://nodejs.org/ko/download/)
* npm 혹은 [Yarn](https://yarnpkg.com/en/docs/install#windows-stable)
* 코드 에디터 (필자는 [VSCode](https://code.visualstudio.com/)를 사용합니다)


###CRA 설치
npm의 경우
```
npm install -g create-react-app
```
yarn의 경우
```
yarn global add create-react-app
```

##프로젝트 시작
다음 명령어를 통해 리액트 프로젝트를 웹팩 설계 없이 생성할 수 있습니다. 여기선 프로젝트 이름을 react-tutorial로 진행하겠습니다.
```
$ create-react-app react-tutorial
```

설치가 완료되었으면 npm run start 명령어(혹은 yarn start)를 통해 개발 서버를 실행하여 개발을 시작하실 수 있습니다.

###명령어
아래 명령어들은 프로젝트의 최상단 디렉토리 내부에 있는 package.json을 통해 확인하실 수 있습니다.
>* **start**: 개발 서버 실행
>* **build**: 프로덕션 빌드
>* **test**: 프로젝트 테스트
>* **eject**: 현재 프로젝트의 모든 설정 및 스크립트를 밖으로 내보냅니다.

앞서 말씀 드렸듯이 CRA는 기본적으로 작업환경이 구축되어 있습니다. 해당 환경을 사용자 임의로 커스터마이징하기 위해선 eject 명령어를 통해 모든 설정 및 스크립트를 추출해야 합니다.

앞으로의 포스트에서 eject를 사용하지는 않습니다. 그냥 이러한 기능이 있다고만 알아두시기 바랍니다.