# Stock Signal - 주식 데이터 분석 사이트

Stock Signal은 주식 데이터를 분석하고, 최신 정보를 제공하며, JWT 인증 기반의 주식 데이터 업데이트 기능을 포함한 웹 애플리케이션 프로젝트입니다.

## **기능 소개**

### **JWT 기반 회원 인증**
- 비밀번호를 이용한 로그인 및 인증 기능.
- JWT를 이용하여 사용자 인증 및 업로드 페이지 접근 제한.

### **주식 데이터 업데이트**
- 로그인 상태에서 **"업데이트" 버튼**을 클릭하면 주식 데이터를 업데이트 가능.
- 주식 데이터를 다운로드, 분석 후 데이터베이스에 업로드.
- 작업 완료 후 최신 업데이트 시간 표시.

### **주식 데이터 분석 및 추측**
- **야후 파이낸스** 데이터를 가져와 주식 정보를 분석.
- 이동평균선, 저항선, 지지선등을 계산하여 기술적 분석 지원.
- 직접 설계한 로직을 기반으로 주식의 상승/하락 신호를 추측.
- 분석 결과는 업데이트된 데이터로 저장 및 활용 가능.

### **데이터베이스 관리**
- 최신 주식 데이터를 데이터베이스에 업로드 및 저장.
- 과거 데이터 삭제 및 새 데이터로 업데이트.

### **결과 표시**
- 분석 결과와 최신 업데이트 시간은 UI를 통해 직관적으로 표시.

## **특징**
- **보안 강화**:
  - JWT 기반 인증으로 업로드 작업 보호.
  - HTTPS 환경에서 안전한 쿠키 처리.

- **효율적 업데이트**:
  - 로그인 상태에서만 데이터 업데이트 가능.
  - 최신 주식 데이터를 다운로드 및 분석 후 데이터베이스에 반영.
 
## **사용 기술**
- **프론트엔드**: TypeScript, React, Tailwind CSS
- **백엔드**: Python (Flask), JWT, SQLite
- **배포**: Vercel
- **주식 가격 데이터 출처**: Yahoo Finance API
