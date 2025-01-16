# Stock Signal - 주식 데이터 분석 사이트

Stock Signal은 주식 데이터를 분석하고 사용자와 관리자용 기능을 제공하는 웹 애플리케이션입니다.
사용자는 관심주식을 추가 삭제해서 원하는 주식의 분석 데이터를 조회할 수 있으며, 관리자는 로그인 후 데이터 갱신(업데이트) 기능을 사용할 수 있습니다.


## **기능 소개**

### **사용자 기능**
1. **JWT 기반 사용자 인증**
   - 사용자와 관리자로 역할 구분.
   - 로그인 및 로그아웃 기능 제공.

2. **주식 데이터 조회**
   - 전날 종가를 기준으로 분석된 데이터를 표시.

3. **관심 주식 추가 삭제**

4. **주식 데이터 시각화**
   - 스프링(Spring) API에서 데이터를 가져와 Chart로 표시.


### **관리자 기능**
1. **데이터 갱신(업데이트)**
   - 관리자로 로그인 시 **"업데이트 버튼"** 활성화.
   - 버튼 클릭 시 Flask API 호출 → 데이터 갱신 및 분석 → Spring 서버에서 DB 업데이트

2. **업데이트 결과 확인**
   - 업데이트 완료 후, 최신 데이터와 분석 결과 확인 가능.


## **사용 기술**


### **프론트엔드**
- **프레임워크**: Next.js (React 기반)
- **스타일링**: Tailwind CSS
- **상태 관리**: React Query (API 요청과 데이터 캐싱)
- **권한별 접근**: Matcher (사용자와 관리자의 권한별 페이지 접근 제한)

### **백엔드**
#### **Spring Boot**
- **프레임워크**: Spring Boot
- **데이터베이스**: PostgreSQL
- **라이브러리**: Spring Security, Spring Data JPA
- **빌드 도구**: Gradle
- **통신**: REST API

#### **Python (Flask)**
- **프레임워크**: Flask
- **데이터 분석**: pandas
- **데이터 출처**: Yahoo Finance API


🔗 **[Stock Signal 파이썬 리포지토리](https://github.com/TheCodeRecipe/stock-api)**

🔗 **[Stock Signal 스프링 리포지토리](https://github.com/TheCodeRecipe/stock-spring)**
