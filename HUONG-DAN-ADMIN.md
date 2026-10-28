# Trang admin (Decap CMS trên Netlify)

Sau khi làm xong các bước dưới, bạn vào **https://tenmien.com/admin/**, đăng nhập bằng email, sửa/thêm/bớt dự án, upload ảnh, bấm **Publish** → web tự cập nhật sau ~1 phút. Không cần đụng vào code.

Toàn bộ dữ liệu dự án nằm ở `data/projects.json`; CMS đọc/ghi đúng file này. Ảnh upload qua CMS được lưu vào `img/uploads/`.

---

## A. Đưa code lên GitHub (làm 1 lần)

1. Tạo tài khoản GitHub (nếu chưa có) → **New repository**, tên ví dụ `portfolio`, để **Public** hoặc Private đều được, **không** tick "Add a README".
2. Giải nén `portfolio-website.zip`. Upload toàn bộ nội dung thư mục lên repo:
   - Cách dễ nhất: trên trang repo bấm **"uploading an existing file"**, kéo thả tất cả file/thư mục vào, bấm **Commit changes**.
   - Hoặc dùng GitHub Desktop: *File → Add local repository* → chọn thư mục → *Publish repository*.
3. Đảm bảo nhánh mặc định tên là **`main`** (GitHub mặc định như vậy). Nếu là `master`, sửa dòng `branch: main` trong `admin/config.yml` thành `master`.

## B. Deploy lên Netlify (làm 1 lần)

1. Vào https://app.netlify.com → đăng nhập bằng GitHub.
2. **Add new site → Import an existing project → GitHub** → chọn repo `portfolio`.
3. Build settings để trống (Build command: *trống*, Publish directory: `/` hoặc `.`). Bấm **Deploy**.
4. Sau ~1 phút có link dạng `https://ten-ngau-nhien.netlify.app`. Vào **Site configuration → Domain management** để đổi sang tên miền riêng (Netlify hướng dẫn trỏ DNS; SSL tự cấp).

## C. Bật đăng nhập cho trang admin (làm 1 lần)

1. Trong site Netlify: **Site configuration → Identity → Enable Identity**.
2. Ở **Identity → Registration** chọn **Invite only** (để người lạ không tự đăng ký).
3. Ở **Identity → Services → Git Gateway** bấm **Enable Git Gateway** (cho phép CMS ghi vào GitHub thay bạn).
4. Ở tab **Identity** bấm **Invite users** → nhập email của bạn. Mở mail, bấm link *Accept the invite* → đặt mật khẩu.

Xong. Vào `https://tenmien.com/admin/` → **Login with Netlify Identity**.

---

## D. Dùng admin hằng ngày

- **Portfolio → Dự án**: danh sách các chặng. Kéo thả để đổi thứ tự (= thứ tự trên đường đua).
- **Thêm dự án**: bấm **+ Add**, điền:
  - `ID`: chữ thường không dấu, ví dụ `foodly` → trang sẽ có địa chỉ `/foodly`.
  - `Tên`, `Màu nhận diện`, `Ảnh bìa` (1400×1000), `Các trang case study` (chụp từ Figma, rộng 1400px, kéo thả theo đúng thứ tự).
  - Nội dung **tiếng Anh** và **tiếng Việt** (kicker, tagline, nhóm/thời gian/vai trò/nền tảng, tổng quan, giai đoạn → các bước).
- **Bớt dự án**: mở phần tử → biểu tượng thùng rác / dấu ×.
- Bấm **Publish → Publish now**. Netlify build lại trong ~1 phút; refresh web để xem.

Lưu ý: số chặng (06 LAPS, LAP 03/06…), nút Prev/Next, danh sách ở classic layout đều tự tính theo danh sách này.

## E. Nếu không dùng Netlify

CMS cần Netlify Identity + Git Gateway, nên trang admin chỉ chạy khi host trên Netlify. Host nơi khác (Vercel, GitHub Pages, hosting thường) thì web vẫn chạy bình thường, chỉ không có `/admin` — khi đó sửa trực tiếp file `data/projects.json` (cấu trúc giống hệt những gì CMS tạo) rồi upload lại.

Lưu ý khi test trên máy: hãy chạy qua một local server (ví dụ `python -m http.server`) rồi mở `http://localhost:8000`, vì trình duyệt chặn đọc `data/projects.json` khi mở file trực tiếp (`file://`).
