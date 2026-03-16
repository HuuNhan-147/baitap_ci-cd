# Hướng dẫn sử dụng Docker & DockerHub cho Portfolio Blog

Dự án Portfolio Blog của bạn đã được cấu hình Containerization toàn bộ bằng Docker và Docker Compose theo mô hình:
- **Frontend** (React + Vite)
- **Backend** (Node.js + Express)
- **Database** (MongoDB)

Dưới đây là các lệnh cần thiết để thao tác với quá trình build, run và push images lên Docker Hub.

---

## 1. Hướng dẫn chạy dự án với Docker Compose

Mở Terminal tại thư mục gốc của project (thư mục `d:\HuuNhan_Portfolio_Docker` - nơi chứa file `docker-compose.yml`), sau đó bạn có thể sử dụng các lệnh dưới đây:

### Build và chạy toàn bộ Containers
Để khởi tạo mạng lưới (network), mount volume cho MongoDB, build các Dockerfile và chạy đồng thời cả 3 containers, hãy sử dụng lệnh:

```bash
docker compose up --build -d
```
*(Bỏ flag `-d` nếu bạn muốn xem log của các services chạy trực tiếp trên Terminal)*

Sau khi chạy xong:
- **Frontend** sẽ khả dụng tại: `http://localhost:5173`
- **Backend API** sẽ khả dụng tại: `http://localhost:5000`
- **MongoDB** sẽ đang chạy tại: `mongodb://localhost:27017`

### Tắt và dọn dẹp Containers
Để dừng toàn bộ hệ thống và gỡ bỏ các containers cũng như networks đã tạo:

```bash
docker compose down
```

Nếu bạn muốn xóa luôn cả Volume chứa dữ liệu lưu trữ của database, thêm tham số `-v`:
```bash
docker compose down -v
```

---

## 2. Hướng dẫn Push Images lên DockerHub

Để push images (frontend và backend) của bạn lên tài khoản DockerHub cá nhân (Ví dụ username: `huunhan147`), bạn hãy thực hiện lần lượt các bước sau:

### Bước 1: Đăng nhập vào DockerHub (Nếu chưa đăng nhập)
```bash
docker login
```
*Nhập Username và Password (hoặc Access Token) trên môi trường Terminal của bạn.*

### Bước 2: Build Images cho từng service
Chỉ định tên (Tag) tương ứng với Repo trên DockerHub bằng cú pháp `username/repo-name`.

**Build Image cho Backend:**
```bash
docker build -t huunhan147/blog-backend ./backend
```

**Build Image cho Frontend:**
```bash
docker build -t huunhan147/blog-frontend ./frontend
```

*(Lưu ý: Bạn cũng có thể thêm phiên bản tag như `huunhan147/blog-backend:v1`)*

### Bước 3: Push Images lên DockerHub
Sau khi Build xong và Image đã nằm trong local Docker registry, bạn tiến hành đẩy chúng lên Hub.

**Push Image của Backend:**
```bash
docker push huunhan147/blog-backend
```

**Push Image của Frontend:**
```bash
docker push huunhan147/blog-frontend
```

Sau khi Terminal chạy hoàn tất, bạn có thể kiểm tra trực tiếp trên trang chủ của Docker Hub để xác nhận repositories đã được tạo và chứa source của bạn!
