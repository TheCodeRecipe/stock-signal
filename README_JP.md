# Stock Signal - 株式データ分析サイト

Stock Signalは、**前日の終値データを分析**し、ユーザーおよび管理者向けの機能を提供するWebアプリケーションです。<br>
ユーザーは関心のある株式を追加または削除して必要な分析データを確認できます。管理者はログイン後、データの更新機能を使用して最新データを反映できます。


## **機能紹介**

### **ユーザー機能**
1. **JWTベースのユーザー認証**
   - ユーザーと管理者の役割を区別。
   - ログインおよびログアウト機能を提供。

![ログイン](https://github.com/user-attachments/assets/b61c891d-d2bc-4d09-a714-079a146c6f8c)

2. **株式データの確認**
   - 前日の終値に基づいた分析データを表示。
     
![リスト確認](https://github.com/user-attachments/assets/12acbdf6-da85-44f3-8e26-1e87b1e58a2a)

3. **関心株式の追加・削除**
   
![関心株式追加削除](https://github.com/user-attachments/assets/6532b81e-7c10-49c6-8359-de8da1fce4c1)

4. **株式データの可視化**
   - Spring APIからデータを取得し、グラフで表示。
   
![グラフ](https://github.com/user-attachments/assets/e0c56111-8200-45e3-a3b9-3f03445ab465)


### **管理者機能**
1. **データ更新**
   - 管理者としてログインすると、**「更新ボタン」**が有効化されます。
   - ボタンクリックでFlask APIを呼び出し → データ更新と分析 → SpringサーバーのDBに反映。

![更新](https://github.com/user-attachments/assets/a09cbaed-446c-4902-a0ce-c11f840b4b29)

2. **更新結果の確認**
   - 更新完了後、最新データと分析結果をUIで確認可能。



## **使用技術**

### **フロントエンド**
- **フレームワーク**: Next.js (Reactベース)
- **スタイリング**: Tailwind CSS
- **状態管理**: React Query (APIリクエストとデータキャッシング)
- **権限管理**: Matcher (ユーザーと管理者の権限別ページアクセス制限)

### **バックエンド**
#### **Spring Boot**
- **フレームワーク**: Spring Boot
- **データベース**: PostgreSQL
- **ライブラリ**: Spring Security, Spring Data JPA
- **ビルドツール**: Gradle
- **通信**: REST API

#### **Python (Flask)**
- **フレームワーク**: Flask
- **データ分析**: pandas
- **データソース**: Yahoo Finance API


🔗 **[Stock Signal Python リポジトリ](https://github.com/TheCodeRecipe/stock_api)**

🔗 **[Stock Signal Spring リポジトリ](https://github.com/TheCodeRecipe/stock_spring)**
