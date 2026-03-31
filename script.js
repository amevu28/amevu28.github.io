
// Biến để lưu vị trí cuộn chuột trước đó (bắt đầu là 0)
let lastScrollTop = 0;

window.onscroll = function() {
    // 1. Lấy đối tượng con mèo và kiểm tra xem nó có tồn tại không
    const pixelCat = document.getElementById('pixel-cat');
    if (!pixelCat) return;

    // 2. Tính toán vị trí cuộn hiện tại (hỗ trợ cả các trình duyệt cũ)
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 3. Tính toán tỷ lệ phần trăm và quãng đường di chuyển (như cũ)
    let totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Kiểm tra nếu trang có thể cuộn được (tránh lỗi chia cho 0)
    if (totalScrollableHeight > 0) {
        let scrollPercentage = currentScrollTop / totalScrollableHeight;
        let maxTravelDistance = window.innerWidth - pixelCat.offsetWidth;
        let currentMoveDistance = scrollPercentage * maxTravelDistance;

        // --- BẮT ĐẦU PHẦN CODE MỚI ĐỂ XOAY MÈO ---

        let scaleX = 1; // Mặc định là nhìn sang trái (giả sử ảnh gốc nhìn sang trái)

        if (currentScrollTop > lastScrollTop) {
            // Đang cuộn XUỐNG (Forward) -> Mèo đi sang trái
            // Giữ nguyên hướng gốc, hoặc đặt scaleX = 1
            scaleX = 1; 
        } else {
            // Đang cuộn LÊN (Backward) -> Mèo đi sang phải
            // Lật ngược hình ảnh bằng scaleX = -1
            scaleX = -1;
        }

        // --- ÁP DỤNG CẢ DI CHUYỂN VÀ XOAY ---
        // Chúng ta kết hợp translateX() để di chuyển và scaleX() để xoay
        pixelCat.style.transform = `translateX(-${currentMoveDistance}px) scaleX(${scaleX})`;

        // Cập nhật lại vị trí cuộn cuối cùng để dùng cho lần sau
        lastScrollTop = currentScrollTop;
    }

    
    // --- Đoạn code bổ sung lắng nghe nút bấm Night Mode ---
const nightModeBtn = document.getElementById('night-mode-toggle');
if (nightModeBtn) {
    nightModeBtn.addEventListener('click', function() {
        // Thêm hoặc xóa class night-mode ở thẻ body
        document.body.classList.toggle('night-mode');
        
        // Đổi chữ trên nút bấm cho hợp hoàn cảnh
        if (document.body.classList.contains('night-mode')) {
            this.textContent = 'AM Mode';
        } else {
            this.textContent = 'PM Mode';
        }
    });
}

};