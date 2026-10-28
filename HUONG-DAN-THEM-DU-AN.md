# Hướng dẫn thêm / bớt dự án (không qua admin)

> Nếu đã host trên Netlify và làm theo `HUONG-DAN-ADMIN.md`, hãy dùng trang `/admin/` — không cần đọc file này.

Toàn bộ danh sách dự án nằm trong **một file duy nhất**: `data/projects.json`.
Số chặng, HUD `LAPS 06/06`, nút Prev/Next, danh sách ở classic layout, màn đua đều tự tính từ file này.

## Thêm dự án (ví dụ id `foodly`)
1. Ảnh: `img/hero-foodly.jpg` (1400×1000) và `pages/foodly-1.jpg, -2.jpg, …` (rộng 1400px).
2. Mở `data/projects.json`, copy một phần tử trong mảng `projects`, dán vào vị trí muốn (thứ tự mảng = thứ tự chặng), sửa:
   - `"id": "foodly"` — chữ thường, không dấu; trang sẽ ở địa chỉ `/foodly`.
   - `"name"`, `"color"` (mã hex), `"hero": "/img/hero-foodly.jpg"`, `"pages": ["/pages/foodly-1.jpg", ...]`.
   - `"en"` và `"vi"`: kicker, tag, team, time, role, platform, over, phases (title + items), cap.
3. Không cần tạo file HTML mới: trang dự án dùng chung `project.html` (Netlify tự điều hướng nhờ file `_redirects`). Nếu host nơi khác không hỗ trợ redirect, copy `project.html` thành `foodly.html`.

## Bớt dự án
Xoá phần tử tương ứng khỏi mảng `projects` (và xoá ảnh nếu muốn gọn).

## Đổi thứ tự
Kéo phần tử lên/xuống trong mảng.

## Kiểm tra JSON
Dán nội dung file vào https://jsonlint.com để chắc không thiếu dấu phẩy/ngoặc trước khi upload.
